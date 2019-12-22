import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChequiarPageRoutingModule } from './chequiar-routing.module';

import { ChequiarPage } from './chequiar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChequiarPageRoutingModule
  ],
  declarations: [ChequiarPage]
})
export class ChequiarPageModule {}
