import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InitOptionsPage } from './init-options.page';

import { InitOptionsPageRoutingModule } from './init-options-routing.module';
import { PipesModule } from 'app/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, InitOptionsPageRoutingModule, PipesModule],
  declarations: [InitOptionsPage],
})
export class InitOptionsPageModule {}
