import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/data.service';
import { Componente } from './interfaces/interfaces';
import { Observable } from 'rxjs';
import { DialogService } from './service-component/dialog.service';
import { USER } from './redux/interfax/user';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UsuarioAction } from './redux/app.actions';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  componentes:Componente[];
  data:USER;
  vandera:boolean = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    private _store: Store<USER>,
    private _Dialog_login: DialogService,
    private router: Router,
  ) {
    this.initializeApp();

    this._store.select("name")
    .subscribe((store:any)=>{
      // console.log(store);
      this.data = store.usuario ||  store.user || {};
      if(this.data.id){
        if(!this.vandera)this.cargarMenu();
        this.vandera = true;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(async() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.cargarMenu();
    });
  }
  cargarMenu(){
    this.dataService.getMenuOpts().subscribe(rta=>{
      this.componentes = rta
      for(let row of this.componentes){ row.disabled = true; if((!this.data.id) && ( row.name === 'Mensaje' || row.name === 'Comprados')) row.disabled = false;}
    })
  }
  iniciar_seccion(){
    this._Dialog_login.open_login();
  }

  cerrar_seccion(){
    let accion = new UsuarioAction({}, 'delete');
    this._store.dispatch(accion);
    localStorage.removeItem('user');
    this.router.navigate(['home']);
  }
}
