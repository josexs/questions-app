import { QuestionsProvider } from '@providers/api/questions.provider';
import { Component, OnInit } from '@angular/core';
import { QuestionI } from '@interfaces/question.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertProvider } from '@providers/ionic/alert.provider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'admin-create-question',
  templateUrl: 'admin-create-question.page.html',
  styleUrls: ['./admin-create-question.page.scss'],
})
export class AdminCreateQuestionPage implements OnInit {
  question: FormGroup;
  item: QuestionI;
  isSent: boolean;
  routeBack: string;
  constructor(
    private questionsProvider: QuestionsProvider,
    private route: ActivatedRoute,
    private alertProvider: AlertProvider,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.question = this.formBuilder.group({
      text: ['', [Validators.required, Validators.minLength(6)]],
      type: ['normal', [Validators.required]],
      state: [false, [Validators.required]],
    });
  }

  create() {
    if (this.state.value) {
      this.alertProvider.presentAlertWithButtons(
        '¡Oye!',
        'Vas a publicar la pregunta, ¿estas seguro?',
        [
          {
            text: 'No',
            role: 'cancel',
          },
          {
            text: 'Si',
            handler: () => this.confirmCreate(),
          },
        ]
      );
    } else {
      this.confirmCreate();
    }
  }

  confirmCreate() {
    const question: QuestionI = {
      text: this.text.value,
      type: this.type.value,
      state: this.state.value,
      author: 'Admin',
      gender: null,
    };
    this.questionsProvider.createAdminCuestion(question).then(
      () => {
        this.alertProvider.presentAlert('¡Vale!', 'La pregunta ha sido publicada');
        const route = this.state.value ? '/admin/all' : '/admin/sent';
        this.router.navigate([route]);
      },
      (error) => {
        console.error(error);
        this.alertProvider.presentAlert('¡Vaya!', 'Hemos tenido un problema...');
      }
    );
  }

  get text() {
    return this.question.get('text');
  }

  get type() {
    return this.question.get('type');
  }

  get state() {
    return this.question.get('state');
  }
}