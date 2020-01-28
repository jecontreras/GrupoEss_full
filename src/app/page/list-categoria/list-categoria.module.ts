import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCategoriaPageRoutingModule } from './list-categoria-routing.module';

import { ListCategoriaPage } from './list-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCategoriaPageRoutingModule
  ],
  declarations: [ListCategoriaPage]
})
export class ListCategoriaPageModule {}
