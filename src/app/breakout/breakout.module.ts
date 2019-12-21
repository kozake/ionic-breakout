import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BreakoutPageRoutingModule } from './breakout-routing.module';

import { BreakoutPage } from './breakout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BreakoutPageRoutingModule
  ],
  declarations: [BreakoutPage]
})
export class BreakoutPageModule {}
