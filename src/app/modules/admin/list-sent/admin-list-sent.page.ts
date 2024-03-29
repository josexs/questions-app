import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { QuestionsProvider } from '@providers';
import { QuestionI } from '@interfaces';

@Component({
  selector: 'admin-list-sent',
  templateUrl: 'admin-list-sent.page.html',
})
export class AdminListSentPage {
  items: QuestionI[] = [];
  loading = true;
  error = false;
  constructor(
    private questionsProvider: QuestionsProvider,
    private router: Router
  ) {}

  ionViewWillEnter(): void {
    this.getQuestionsSent();
  }

  async getQuestionsSent(): Promise<void> {
    try {
      this.items = await this.questionsProvider.getQuestionsSent();
      this.loading = false;
      this.error = false;
    } catch (error) {
      this.loading = false;
      this.error = true;
    }
  }

  goToEdit(item: QuestionI): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        item: JSON.stringify(item),
        route: JSON.stringify({ sent: true }),
      },
    };
    this.router.navigate([`admin/question`], navigationExtras);
  }
}
