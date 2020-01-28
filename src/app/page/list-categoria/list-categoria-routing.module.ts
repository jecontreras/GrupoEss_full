import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCategoriaPage } from './list-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: ListCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCategoriaPageRoutingModule {}
