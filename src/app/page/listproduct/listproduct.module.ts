import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListproductPageRoutingModule } from './listproduct-routing.module';

import { ListproductPage } from './listproduct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListproductPageRoutingModule
  ],
  declarations: [ListproductPage]
})
export class ListproductPageModule {}
