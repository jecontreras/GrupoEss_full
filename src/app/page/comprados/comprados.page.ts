import { Component, OnInit } from '@angular/core';
import { ReduxserService } from 'src/app/service-component/redux.service';
import { ARTICULOS } from 'src/app/redux/interfax/articulos';
import { Store } from '@ngrx/store';
import { ComprasService } from 'src/app/service-component/compras.service';
import { DialogService } from 'src/app/service-component/dialog.service';

@Component({
  selector: 'app-comprados',
  templateUrl: './comprados.page.html',
  styleUrls: ['./comprados.page.scss'],
})
export class CompradosPage implements OnInit {
  public list_comprados:any = [];
  public data_user:any;

  constructor(
    private _compras: ComprasService,
    private _reduxer: ReduxserService,
    private _store: Store<ARTICULOS>,
    private _Dialog_login: DialogService
  ) { 

    this._store.select("name")
    .subscribe((store:any)=>{
      this.data_user = store.usuario;
      if(Object.keys(store.compras).length > 0) this.list_comprados = store.compras;
    });
    if(Object.keys(this.data_user).length ===0) this._Dialog_login.open_login();
    if(Object.keys(this.list_comprados).length === 0) this.get_compras();

  }

  ngOnInit() {
  }

  get_compras(){
    return this._compras.get({
      where:{},
      limit: 10
    })
    .subscribe((rta:any)=>{
      rta = rta.data;
      console.log(rta);
      this.list_comprados = rta;
      this._reduxer.data_redux(rta, 'compras', []);
    });
  }

}
