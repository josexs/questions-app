import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OptionsResumePage } from './options-resume.page';
import { PipesModule } from 'app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: OptionsResumePage,
      },
    ]),
  ],
  declarations: [OptionsResumePage],
})
export class OptionsResumeModule {}