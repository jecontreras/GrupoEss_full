import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MENSAJES } from 'src/app/redux/interfax/mensajes';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/service-component/chat.service';
import { MensajesInitAction, ArticuloSelectAction,MensajesAction } from 'src/app/redux/app.actions';
import { ReduxserService } from 'src/app/service-component/redux.service';
import { DialogService } from 'src/app/service-component/dialog.service';
import { ProductoService } from 'src/app/service-component/producto.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public list_mensajes: Array<Object> = [];
  
  public data_user:any;
  public store:any;
  public disable_list: boolean = true;
  public ev:any;
  public evScroll:any = {};
  public query:any = {
    where:{},
    sort: 'updatedAt DESC',
    skip: 0,
    limit: 10
  };
  constructor(
    private _store: Store<MENSAJES>,
    private router: Router,
    private route: ActivatedRoute,
    private _reduxer: ReduxserService,
    private _chat: ChatService,
    private _Dialog_login: DialogService,
    private _producto: ProductoService,
    public toastController: ToastController,
  ) {
    this._store.select("name")
      .subscribe((store: any) => {
        console.log(store);
        this.store = store;
        this.data_user = store.usuario;
        if(Object.keys(store.mensajes).length > 0) this.list_mensajes = store.mensajes;
        
      });
      if(Object.keys(this.data_user).length ===0){
        // this.router.navigate(['login']);
        this._Dialog_login.open_login();
      }else if(Object.keys(this.list_mensajes).length === 0) {
        this.query.where = {
          or:[
            {emisor: this.data_user.id},
            {reseptor: this.data_user.id}
          ],
          articulo: {'!=': null}
        };
        this.get_chat();
      }
  }
  ngOnInit() {
  }

  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this._reduxer.delete_data('chat', this.list_mensajes);
    this.query.where = {
      or:[
        {emisor: this.data_user.id},
        {reseptor: this.data_user.id}
      ],
      articulo: {'!=': null}
    };
    this.get_chat();
  }

  get_chat(){
    return this._chat.get(this.query)
    .subscribe((rta:any)=>{
      // console.log(rta, this.list_mensajes);
        if(this.ev){
          this.disable_list = true;
          if(this.ev.target){
            this.ev.target.complete();
          }
        }
        this._reduxer.data_redux(rta.data, 'chat', this.list_mensajes);
        this.list_mensajes = _.unionBy(this.list_mensajes || [], rta.data, 'id');
    }, (err)=>{
      if(this.ev){
        this.disable_list = true;
        if(this.ev.target){
          this.ev.target.complete();
        }
      }
    });
  }

  loadData(ev){
    //console.log(ev);
    this.evScroll = ev;
    this.query.skip++;
    this.get_chat();
  }

  iniciar_chat(item:any){
    let id:any;
    if(item.reseptor.id === this.data_user.id)  id = item.emisor.id;
    else id = item.reseptor.id;
    let data:any = {
      id: item.articulo.id,
      titulo: item.articulo.titulo,
      foto: item.articulo.foto,
      costopromosion: item.articulo.costopromosion,
      costoventa: item.articulo.costoventa
    };
    let accion = new ArticuloSelectAction(data, 'post')
    this._store.dispatch(accion)
    this.router.navigate(['/chat_view', id]);
  }
  borrar(item:object, idx:number){
    this._chat.delete(item)
    .subscribe(rta=>this.presentToast('Eliminado Exitoso'));
    this._chat.deleteDetellado(item)
    .subscribe(rta=>console.log(rta));
    let accion = new MensajesAction(item, 'delete');
    this._store.dispatch(accion);
    accion = new MensajesInitAction(item, 'drop');
    this._store.dispatch(accion);
    this.list_mensajes.splice(idx, 1);
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: 'iontoast'
    });
    toast.present();
  }

}
