import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service-component/categoria.service';
import { ReduxserService } from 'src/app/service-component/redux.service';
import { ARTICULOS } from 'src/app/redux/interfax/articulos';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  public list_categoria:any = [];

  constructor(
    private _categoria: CategoriaService,
    private _reduxer: ReduxserService,
    private _store: Store<ARTICULOS>,
  ) { 

    this._store.select("name")
    .subscribe((store:any)=>{
      if(Object.keys(store.categoria).length > 0) this.list_categoria = store.categoria;
    });
    if(Object.keys(this.list_categoria).length === 0) this.get_categoria();

  }

  ngOnInit() {
  }

  get_categoria(){
    return this._categoria.get({
      where:{
        estado: 'activo',
        categoriaDe: 'producto'
      },
      limit: 10
    })
    .subscribe((rta:any)=>{
      rta = rta.data;
      console.log(rta);
      this.list_categoria = rta;
      this._reduxer.data_redux(rta, 'categoria', []);
    });
  }

}

