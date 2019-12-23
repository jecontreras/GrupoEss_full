import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatViewPageRoutingModule } from './chat-view-routing.module';

import { ChatViewPage } from './chat-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChatViewPageRoutingModule,
    IonicModule.forRoot(), 
  ],
  declarations: [ChatViewPage]
})
export class ChatViewPageModule {}
