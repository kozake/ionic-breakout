import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BreakoutPage } from './breakout.page';

const routes: Routes = [
  {
    path: '',
    component: BreakoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BreakoutPageRoutingModule {}
