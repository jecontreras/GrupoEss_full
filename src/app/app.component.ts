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

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  componentes: Observable<Componente[]>;
  data:USER;
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
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.componentes = this.dataService.getMenuOpts();
    });
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
