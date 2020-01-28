import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { PopinfoComponent } from './popinfo/popinfo.component';
import { BuscadorComponent } from './buscador/buscador.component';

@NgModule({
  entryComponents:[
    BuscadorComponent
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
    PopinfoComponent,
    BuscadorComponent
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    PopinfoComponent,
    BuscadorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
