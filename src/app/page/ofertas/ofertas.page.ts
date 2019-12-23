import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service-component/producto.service';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ARTICULOS } from 'src/app/redux/interfax/articulos';
import { ReduxserService } from 'src/app/service-component/redux.service';


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
})
export class OfertasPage implements OnInit {
  public list_articulo:any = [];
  public img:any = './assets/imagenes/dilisap1.png';
  public query:any = {
    where:{
      opcion: 'activo'
    }
  }
  public searchtxt:any = '';
  
  public slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: false
  };
  public ev:any = {};
  public disable_list:boolean = true;

  constructor(
    private _Producto: ProductoService,
    private _store: Store<ARTICULOS>,
    private _reduxer: ReduxserService,
  ) { 
    this._store.select("name")
    .subscribe((store:any)=>{
      // console.log(store);
      if(Object.keys(store.articulos).length > 0) this.list_articulo = store.articulos;
    });
    if(Object.keys(this.list_articulo).length === 0) this.get_producto();
  }

  ngOnInit() {
  }
  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this.get_producto();
    this._reduxer.delete_data('articulos', this.list_articulo);
  }
  get_producto(){
    return this._Producto.get(this.query)
    .subscribe((res:any)=>{
      // console.log(res);
      if(this.ev){
        this.disable_list = true;
        if(this.ev.target){
          this.ev.target.complete();
        }
      }
      this._reduxer.data_redux(res.data, 'productos', this.list_articulo);
      this.list_articulo = res;
    });
  }
}
