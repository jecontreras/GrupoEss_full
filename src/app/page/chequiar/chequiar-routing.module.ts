import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChequiarPage } from './chequiar.page';

const routes: Routes = [
  {
    path: '',
    component: ChequiarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChequiarPageRoutingModule {}
