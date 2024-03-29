import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OptionsGameI, ParticipantI } from '@interfaces';
import { StorageProvider } from '@providers';

@Component({
  selector: 'app-end-game',
  templateUrl: 'end-game.page.html',
})
export class EndGamePage {
  @ViewChild('slider') slides: any;
  shifts = [];
  winner: any;
  loser: any;
  state = false;
  rounds = 0;
  options: OptionsGameI;
  constructor(
    private storageProvider: StorageProvider,
    private router: Router
  ) {}

  async ionViewWillEnter(): Promise<void> {
    setTimeout(() => {
      if (this.slides) {
        this.slides.lockSwipes(true);
      }
    }, 500);
    await this.checkEndGame();
    await this.getClassification();
    // this.storageProvider.clear();
  }

  async checkEndGame() {
    this.options = await this.storageProvider.get('options');
    if (this.options) {
      if (this.options.state !== 'end') {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  async getClassification(): Promise<void> {
    const shifts: ParticipantI[] = await this.storageProvider.get('shifts');
    shifts.sort((a, b) => {
      if (a.positive - a.negative > b.positive - b.negative) {
        return -1;
      }
      if (a.positive - a.negative < b.positive - b.negative) {
        return 1;
      }
    });
    this.shifts = shifts;
    this.winner = this.shifts[0];
    this.loser = this.shifts[this.shifts.length - 1];
    this.rounds = this.winner.positive + this.winner.negative;
    this.state = true;
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
