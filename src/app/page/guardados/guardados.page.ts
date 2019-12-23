import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service-component/producto.service';
import { ARTICULOS } from 'src/app/redux/interfax/articulos';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';


@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.page.html',
  styleUrls: ['./guardados.page.scss'],
})
export class GuardadosPage implements OnInit {
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

  constructor(
    private _Producto: ProductoService,
    private _store: Store<ARTICULOS>,
  ) { 
    this._store.select("name")
    .subscribe((store:any)=>{
      console.log(store);
      if(store.favorito.length > 0)this.list_articulo = store.favorito;
    });
    // if(store.favorito.length === 0) this.get_producto();
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
      this.list_articulo = res.data;
    });
  }

}
