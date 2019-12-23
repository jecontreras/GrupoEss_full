// app.ts

import * as _action from './app.actions';
import * as _ from 'lodash';

let APP = dropt();
let data:any;
function dropt(){
  return {
    nameapp: Object(),
    articulos: Array(),
    mensajes: Array(),
    mensajes_init: Array(),
    notificaciones: Array(),
    comentarios: Array(),
    compras: Array(),
    cart: Array(),
    favorito: Array(),
    user: Object(),
    usuario: Object(),
    search: Object(),
    eventos: Array(),
    categoria: Array(),
    subasta: Array(),
    negocios: Array(),
    articulo_select: Object()
};
}
export function appReducer(state: any = APP, action: _action.actions) {
  if(JSON.parse(localStorage.getItem('APP'))) {
    state = JSON.parse(localStorage.getItem('APP'));
    validacion_key(state);
  }
  else {
    localStorage.removeItem('APP');
    localStorage.setItem('APP', JSON.stringify(state));
  }
  // console.log(state);
  function local_Storage(APP){
    localStorage.removeItem('APP');
    localStorage.setItem('APP', JSON.stringify(APP));
    state = JSON.parse(localStorage.getItem('APP'));
    return state
  }
  function proceso_data(lista:any, data:any, opt){
    let idx = _.findIndex(lista, ['id', data.id]);
    if(idx >-1){
      if(opt === 'delete') lista.splice(idx, 1);
      else lista[idx]= data;
    }else{
      if(opt === 'post') lista.push(data);
    }
    return lista;
  }
  function validacion_key(state){
    if(!state.articulos) state.articulos = [];
    if(!state.cart) state.cart = [];
    if(!state.categoria) state.categoria = [];
    if(!state.comentarios) state.comentarios = [];
    if(!state.compras) state.compras = [];
    if(!state.eventos) state.eventos = [];
    if(!state.favorito) state.favorito = [];
    if(!state.mensajes) state.mensajes = [];
    if(!state.mensajes_init) state.mensajes_init = [];
    if(!state.nameapp) state.nameapp = {};
    if(!state.notificaciones) state.notificaciones = [];
    if(!state.search) state.search = {};
    if(!state.subasta) state.subasta = [];
    if(!state.user) state.user = {};
    if(!state.usuario) state.usuario = {};
    if(!state.negocios) state.negocios = [];
    if(!state.articulo_select) state.articulo_select = {}
  }
  function data_borrar(modelo){
    if(state[modelo]){
      state[modelo]=[];
    }
  }
  switch (action.type) {
    case _action.NAMEAPP:{
      switch (action.opt){
        case 'post': {
          state.nameapp = action.payload;
          return local_Storage(state);
        }
        break;
        case 'drop':{
          state.nameapp = {};
          return local_Storage(state);
        }
        break;
        default: return local_Storage(state);
        break;
      }
    }
    break;
    case _action.ARTICULOS:{
      switch (action.opt){
        case 'post': {
          // console.log(action.payload);
          if(!state.articulos) state.articulos = [];
          data = proceso_data(state.articulos,action.payload, 'post');
          state.articulos = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.articulos,action.payload, 'put');
          state.articulos = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.articulos,action.payload, 'delete');
          state.articulos = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.articulos = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    case _action.MENSAJES:{
      switch (action.opt){
        case 'post': {
          if(!state.mensajes) state.mensajes = [];
          data = proceso_data(state.mensajes,action.payload, 'post');
          let data_fil = data.filter(row => row.articulo.id === action.payload.articulo.id);
          if(Object.keys(data_fil).length >0) {
            data.mensajes = action.payload.mensajes;
            data.id = data_fil[0].mensajes;
            data = proceso_data(state.mensajes,action.payload, 'delete');
          }
          state.mensajes = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.mensajes,action.payload, 'put');
          state.mensajes = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.mensajes,action.payload, 'delete');
          state.mensajes = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.mensajes = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    case _action.MENSAJESINIT:{
      switch (action.opt){
        case 'post': {
          if(!state.mensajes_init) state.mensajes_init = [];
          data = proceso_data(state.mensajes_init,action.payload, 'post');
          state.mensajes_init = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.mensajes_init,action.payload, 'put');
          state.mensajes_init = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.mensajes_init,action.payload, 'delete');
          state.mensajes_init = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.mensajes_init = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    case _action.NOTIFICACIONES:{
      switch (action.opt){
        case 'post': {
          if(!state.notificaciones) state.notificaciones = [];
          data = proceso_data(state.notificaciones,action.payload, 'post');
          state.notificaciones = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.notificaciones,action.payload, 'put');
          state.notificaciones = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.notificaciones,action.payload, 'delete');
          state.notificaciones = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.notificaciones = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    case _action.COMENTARIOS: {
      switch (action.opt){
        case 'post': {
          if(!state.comentarios) state.comentarios = [];
          data = proceso_data(state.comentarios,action.payload, 'post');
          state.comentarios = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.comentarios,action.payload, 'put');
          state.comentarios = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.comentarios,action.payload, 'delete');
          state.comentarios = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.comentarios = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    case _action.COMPRAS:{
      switch (action.opt){
        case 'post': {
          if(!state.compras) state.compras = [];
          data = proceso_data(state.compras,action.payload, 'post');
          state.compras = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.compras,action.payload, 'put');
          state.compras = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.compras,action.payload, 'delete');
          state.compras = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.compras = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    case _action.CART: {
      switch(action.opt) {
        case 'post' :
            !state.cart  ? state.cart = [] : ''; 
            data = proceso_data(state.cart,action.payload, 'post');
            state.cart = data;
            return local_Storage(state);
        break;
        case 'put': {
          data = proceso_data(state.cart,action.payload, 'put');
          state.cart = data;
          return local_Storage(state);
        }
        break;
        case 'delete': 
          data = proceso_data(state.cart,action.payload, 'delete');
          state.cart = data;
          return local_Storage(state);
        break;
        case 'drop': {
          state.cart = [];
          return local_Storage(state);
        }
        break;
      }
    }
    break;
    case _action.USER: {
      switch(action.opt) {
        case 'post' :
          if(!state.user) state.user = {};
            state.user = action.payload;
            return local_Storage(state);
        break;
        case 'put': {
          state.user = action.payload;
        }
        return local_Storage(state);
        break;
        case 'delete': 
          state.user = {};
          return local_Storage(state);
        break;
        case 'drop': {
          state.user = {};
          return local_Storage(state);
        }
        break;
      }
    }
    case _action.USUARIO: {
      switch(action.opt) {
        case 'post' :
          if(!state.usuario) state.usuario = {};
            state.usuario = action.payload;
            return local_Storage(state);
        break;
        case 'put': {
          state.usuario = action.payload;
        }
        return local_Storage(state);
        break;
        case 'delete': 
          state.usuario = {};
          return local_Storage(state);
        break;
        case 'drop': {
          state.usuario = {};
          state = dropt();
          return local_Storage(state);
        }
        break;
      }
    }
    case _action.SEARCH: {
      switch(action.opt){
        case 'post':{
          state.search = action.payload;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.search = {};
          return local_Storage(state);
        }
        break;
        default: return state;
      }
    }
    case _action.ARTICULO_SELECT: {
      switch(action.opt){
        case 'post':{
          state.articulo_select = action.payload;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.articulo_select = {};
          return local_Storage(state);
        }
        break;
        default: return state;
      }
    }
    break;
    case _action.EVENTOS:{
      switch (action.opt){
        case 'post': {
          if(!state.eventos) state.eventos = [];
          data = proceso_data(state.eventos,action.payload, 'post');
          state.eventos = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.eventos,action.payload, 'put');
          state.eventos = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.eventos,action.payload, 'delete');
          state.eventos = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.eventos = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    case _action.CATEGORIA:{
      switch (action.opt){
        case 'post': {
          if(!state.categoria) state.categoria = [];
          data = proceso_data(state.categoria,action.payload, 'post');
          state.categoria = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.categoria,action.payload, 'put');
          state.categoria = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.categoria,action.payload, 'delete');
          state.categoria = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.categoria = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    case _action.SUBASTA:{
      switch (action.opt){
        case 'post': {
          if(!state.subasta) state.subasta = [];
          data = proceso_data(state.subasta,action.payload, 'post');
          state.subasta = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.subasta,action.payload, 'put');
          state.subasta = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.subasta,action.payload, 'delete');
          state.subasta = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.subasta = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    case _action.NEGOCIOS:{
      switch (action.opt){
        case 'post': {
          if(!state.negocios) state.negocios = [];
          data = proceso_data(state.negocios,action.payload, 'post');
          state.negocios = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.negocios,action.payload, 'put');
          state.negocios = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.negocios,action.payload, 'delete');
          state.negocios = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.negocios = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    case _action.FAVORITOS:{
      switch (action.opt){
        case 'post': {
          if(!state.favorito) state.favorito = [];
          data = proceso_data(state.favorito,action.payload, 'post');
          state.favorito = data;
          return local_Storage(state);
        }
        break;
        case 'put': {
          data = proceso_data(state.favorito,action.payload, 'put');
          state.favorito = data;
          return local_Storage(state);
        }
        break;
        case 'delete': {
          data = proceso_data(state.favorito,action.payload, 'delete');
          state.favorito = data;
          return local_Storage(state);
        }
        break;
        case 'drop': {
          state.favorito = [];
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    default: return state;
  }
}
