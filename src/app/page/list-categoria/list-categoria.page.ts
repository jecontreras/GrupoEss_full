import { Component, OnInit } from '@angular/core';
import { FactoryModelService } from 'src/app/services/factory.model.service';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/service-component/categoria.service';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.page.html',
  styleUrls: ['./list-categoria.page.scss'],
})
export class ListCategoriaPage implements OnInit {

  public list_articulo:any = {data:[]};
  public img:any = './assets/imagenes/dilisap1.png';
  public data:any = {};
  public query:any = {
    where:{}
  }
  public searchtxt:any = '';

  public evScroll:any = {};

  public loading:any;
  public ev:any = {};
  public disable_list:boolean = true;
  public id:any;

  constructor(
    private _model: FactoryModelService,
    private route: ActivatedRoute,
    private _categoria: CategoriaService
  ) { 

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.query.where.categoria = params['id'];
        this.id = params['id'];
        this.get_productoCategoria();
        this.get_categoria();
      }
    });
  }
  get_categoria(){
    return this._categoria.get({
      where:{
        id: this.id
      },
      limit: 1
    })
    .subscribe((rta:any)=>{
      rta = rta.data[0];
      if(!rta) return false;
      this.data = rta;
    });
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
        },
        {
          codigo:{
            contains: _.kebabCase(this.searchtxt) || ''
          }
        },
        {
          descripcion:{
            contains: _.kebabCase(this.searchtxt) || ''
          }
        },
      ];
    }else{
      delete this.query.where.or;
    }
    this.list_articulo.data = [];
    this.get_productoCategoria();
  }
  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this.get_productoCategoria();
    
  }
  loadData(ev){
    //console.log(ev);
    this.evScroll = ev;
    this.query.skip++;
    this.get_productoCategoria();
  }
  get_productoCategoria(){
    return this._model.query('categoriaarticulo',this.query)
    .subscribe((res:any)=>{
      //console.log(res);
      for(let row of res.data){ 
        this.list_articulo.data.push(row.articulo);
      }
      this.list_articulo.data = _.unionBy(this.list_articulo.data || [], this.list_articulo.data, 'id');
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
}
