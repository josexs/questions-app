import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Gtag } from 'angular-gtag';
import { AlertProvider, AuthProvider, StorageProvider } from '@providers';

@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: UntypedFormGroup;
  constructor(
    private authProvider: AuthProvider,
    private alertProvider: AlertProvider,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private loadingCtrl: LoadingController,
    private storageProvider: StorageProvider,
    private gtag: Gtag
  ) {}

  ngOnInit(): void {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async ionViewWillEnter(): Promise<void> {
    const token = await this.storageProvider.get('token');
    if (token) {
      this.router.navigate(['admin']);
    }
  }

  async login(): Promise<void> {
    const loading = await this.loadingCtrl.create();
    this.authProvider
      .login({
        email: this.credentials.value.email,
        password: this.credentials.value.password,
      })
      .then(
        async (response: { item: any; token: string }) => {
          await loading.dismiss();
          await this.storageProvider.set('token', response.token);
          this.router.navigate(['admin']);
        },
        async (error) => {
          await loading.dismiss();
          if (error.error && error.error.message) {
            this.alertProvider.presentAlert('Vaya!', error.error.message);
          } else {
            this.alertProvider.presentAlert(
              'Vaya!',
              'Ha ocurrido un error, intentalo mas tarde'
            );
          }
        }
      );
  }

  goBack() {
    this.gtag.event('goToDashboard');
    this.router.navigate(['/dashboard']);
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
}
