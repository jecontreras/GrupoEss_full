import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service-component/producto.service';
import * as _ from 'lodash';
import { ARTICULOS } from 'src/app/redux/interfax/articulos';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.page.html',
  styleUrls: ['./listproduct.page.scss'],
})
export class ListproductPage implements OnInit {

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
  public evScroll:any = {};

  public loading:any;
  public ev:any = {};
  public disable_list:boolean = true;

  constructor(
    private _Producto: ProductoService,
    private _store: Store<ARTICULOS>,
  ) { 
    this._store.select("name")
    .subscribe((store:any)=>{
      console.log(store);
      if(Object.keys(store.search).length >0) { this.search(); this.searchtxt = store.search.txt;}
    });
    if(!this.searchtxt) this.get_producto();
  }

  ngOnInit() {

    // this.list_articulo = [
    //   {
    //     titulo: "Prueba",
    //     foto: "./assets/imagenes/dilisap1.png"
    //   }
    // ]

  }
  search(opt = 'false'){
    if(this.searchtxt.length > 1){
      this.query.where.or = [
        {
          titulo:{
            contains: this.searchtxt || ''
          }
        },
        {
          slug:{
            contains: _.kebabCase(this.searchtxt) || ''
          }
        }
      ];
    }else{
      delete this.query.where.or;
    }
    if(this.query.where.estado === 'especificar') delete this.query.where.estado;

    if(this.query.where.costoventa === 'todos') delete this.query.where.costoventa;
    else{
      this.query.sort= this.query.where.costoventa;
      delete this.query.where.costoventa;

    }


    this.get_producto();
  }
  get_producto(){
    return this._Producto.get(this.query)
    .subscribe((res:any)=>{
      console.log(res);
      this.list_articulo = res;
      if(this.ev){
        this.disable_list = true;
        if(this.ev.target){
          this.ev.target.complete();
        }
      }
      if( this.evScroll.target ){
        this.evScroll.target.complete()
      }
      if(this.loading) this.loading.dismiss();
    },(error)=>{
      if(this.ev){
        this.disable_list = true;
        if(this.ev.target){
          this.ev.target.complete();
        }
      }
    });
  }
  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this.get_producto();
    
  }
  loadData(ev){
    //console.log(ev);
    this.evScroll = ev;
    this.query.skip++;
    this.get_producto();
  }

}
