import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListproductPage } from './listproduct.page';

const routes: Routes = [
  {
    path: '',
    component: ListproductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListproductPageRoutingModule {}
