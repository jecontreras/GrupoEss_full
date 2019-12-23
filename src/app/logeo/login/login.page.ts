import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserAction, UsuarioAction } from 'src/app/redux/app.actions';
import { Store } from '@ngrx/store';
import { USER } from 'src/app/redux/interfax/user';
import { async } from 'q';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { RegistroPage } from '../registro/registro.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public myForm_login: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private _userService: UserService,
    private _authSrvice: AuthService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private _store: Store<USER>,
    private router: Router,
    private modalCtrl: ModalController,
  ) {
    this.myForm_login = this.create_form();
    if (this._authSrvice.isLoggedIn()) {
      // this.router.navigate(['home']);
      this.cerrarModal();
    }
  }

  ngOnInit() { }

  create_form() {
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      ip: ['', Validators.required],
      acceso: ['celular', Validators.required],
    });
  }

  async submit_login() {
    let data = this.myForm_login.value;
    if(!data.email || !data.password) {
      const toast = await this.toastController.create({
        message: "Por favor introducir tu email o tu password",
        duration: 2000
      });
      toast.present();
      return false;
    }
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Iniciando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
    this._userService.login(data).subscribe(
      async(response: any) => {
        loading.dismiss();
        if(response.success){
          localStorage.setItem('user', JSON.stringify(response.data));
          let accion:any = new UsuarioAction(response.data, 'post');
          this._store.dispatch(accion);
          // this.router.navigate(['home']);
          this.cerrarModal();
        }else{
          const toast = await this.toastController.create({
            message: response.mensaje,
            duration: 2000
          });
          toast.present();
        }

      });

  }
  cerrarModal() {
    this.modalCtrl.dismiss();
  }
  open_registro(){
    this.modalCtrl.create({
      component: RegistroPage,
      componentProps: {
        obj: {}
      }
    }).then(modal=>modal.present());
  }

}
