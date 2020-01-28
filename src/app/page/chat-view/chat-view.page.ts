import { Component, OnInit, ViewChild } from '@angular/core';
import {IonContent} from '@ionic/angular';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { MensajesAction } from 'src/app/redux/app.actions';
import { Store } from '@ngrx/store';
import { MENSAJES } from 'src/app/redux/interfax/mensajes';
import * as _ from 'lodash';
import { ChatService } from 'src/app/service-component/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FactoryModelService } from 'src/app/services/factory.model.service';
import { ReduxserService } from 'src/app/service-component/redux.service';
import { DialogService } from 'src/app/service-component/dialog.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.page.html',
  styleUrls: ['./chat-view.page.scss'],
})
export class ChatViewPage implements OnInit {

  public list_mensajes: any = [];
  public myForm_chat: FormGroup;
  public data: any = {};
  public data_user: any = {};
  public id: any;
  public disable_list:boolean = true;
  public ev:any;
  public count:any;
  public id_articulo:any;
  public unico:any = 0;
  public data_articulo:any = [];
  phone_model = 'iPhone';
  nombreUser: string='';
  input = '';
  
  @ViewChild('content',{static: false} ) private content: any

  constructor(
    private _store: Store<MENSAJES>,
    private _chat: ChatService,
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _reduxer: ReduxserService,
    private _model: FactoryModelService,
    private _Dialog_login: DialogService
  ) {
    this._store.select("name")
      .subscribe((store: any) => {
        // console.log(store);
        this.data_user = store.usuario;
        if(Object.keys(store.articulo_select).length >0)this.id_articulo = store.articulo_select;
        if(Object.keys(store.mensajes_init).length >0) {
          // this.list_mensajes = store.mensajes;
          this.unico = 0;
          store.mensajes_init = this.ajuste_key_chat(store.mensajes_init);
          this.list_mensajes = _.unionBy(this.list_mensajes || [], store.mensajes_init, 'id');
          this.list_mensajes = _.orderBy(this.list_mensajes, ['createdAt'], ['asc']);
        }
        // if(!store.search) this.router.navigate(['home']);
        // else 
    });
    if (Object.keys(this.data_user).length === 0) {
      // this.router.navigate(['login']);
      this._Dialog_login.open_login();
    }else if(Object.keys(this.list_mensajes).length === 0) this.get_chat();
    if(this.id_articulo)if(Object.keys(this.id_articulo).length === 0) this.router.navigate(['home']);
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
      }
    });
    this.myForm_chat = this.create_form();

    let
      init: any = 0
    ;
    let interval = setInterval(() => {
      init++;
      this.unico++;
      if (init === 5) {
        init = 0;
      }
      if(this.unico === 1) this.scrollToBottomOnInit();
    }, 1000);
  }
  ngOnInit() {

  }
  scrollToBottomOnInit() {
    this.content.scrollToBottom(1000);
  }
  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this.get_chat();
    this._reduxer.delete_data('mensajes', this.list_mensajes);
  }
  ajuste_key_chat(obj:any){
    // console.log(obj)
    if(!obj) return false;
    obj = obj.filter(row=>(row.emisor.id === this.data_user.id && row.reseptor.id === this.id)
      || (row.emisor.id === this.id && row.reseptor.id === this.data_user.id) && ((row.articulo.id || row.articulo) === this.id_articulo.id)
    );
    // console.log(obj[0])
    if(!obj) return false;
    if(Object.keys(obj).length === 0) return [];
    for(let row of obj){
      if(row.emisor.id === this.data_user.id){
        row.sender = 1;
        row.read = true;
        row.delivered = true;
        row.sent = true;
        row.foto = row.emisor.foto;
        row.user = row.emisor.username;
        if(!row.foto) row.foto = './assets/imagenes/perfil.png';
      }else{
        this.nombreUser = row.emisor.username;
        row.sender = 0;
        row.foto = row.emisor.foto;
        row.user = row.emisor.username;
        if(!row.foto) row.foto = './assets/imagenes/perfil.png';
      }
    }
    return obj;
    
  }

  get_chat() {
    return this._chat.get_detallado({
      where: {
        or : [
          { reseptor: this.id },
          { emisor: this.data_user.id },
          { reseptor: this.data_user.id },
          { emisor: this.id }
        ],
        articulo: this.id_articulo.id
        // reseptor: this.id,
        // emisor: this.data_user.id
      },
      sort: 'createdAt DESC',
      limit: 20
    }).subscribe((rta: any) => {
      // console.log(rta)
      if(this.ev){
        this.disable_list = true;
        if(this.ev.target){
          this.ev.target.complete();
        }
      }
      this._reduxer.data_redux(rta.data, 'chat_init', this.list_mensajes);
      this.ajuste_key_chat(rta.data);
      this.list_mensajes = rta.data;
      this.scrollToBottomOnInit();
      this.list_mensajes = _.unionBy(this.list_mensajes || [], this.list_mensajes, 'id');
      this.list_mensajes = _.orderBy(this.list_mensajes, ['createdAt'], ['asc']);
      
    }, (err)=>{
      if(this.ev){
        this.disable_list = true;
        if(this.ev.target){
          this.ev.target.complete();
        }
      }
    });
  }
  create_form() {
    // console.log(this.id)
    return this.formBuilder.group({
      mensaje: ['', Validators.required],
      emisor: [this.data_user.id, Validators.required],
      reseptor: [this.id, Validators.required],
      creado: [new Date(), Validators.required]
    });
  }
  submit_mensaje() {
    // console.log(this.myForm_chat.value);
    let data = this.myForm_chat.value;
        data.reseptor = this.id;
        data.emisor = this.data_user.id;
        data.articulo = this.id_articulo.id;
    // console.log(data);
    return this._chat.saved(data)
      .subscribe((res: any) => {
        // console.log(res);
          this.myForm_chat = this.create_form();
          this.scrollToBottomOnInit();
      });

  }
}