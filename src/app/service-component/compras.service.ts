import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { FactoryModelService } from '../services/factory.model.service';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(
    private _model: FactoryModelService
  ) {
    // this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.query('cart', query);
  }
  saved (query: any){
    return this._model.create('cart', query);
  }
}