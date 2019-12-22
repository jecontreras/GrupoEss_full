import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'categoria',
    loadChildren: () => import('./page/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./page/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'chat-view',
    loadChildren: () => import('./page/chat-view/chat-view.module').then( m => m.ChatViewPageModule)
  },
  {
    path: 'chequiar',
    loadChildren: () => import('./page/chequiar/chequiar.module').then( m => m.ChequiarPageModule)
  },
  {
    path: 'comprados',
    loadChildren: () => import('./page/comprados/comprados.module').then( m => m.CompradosPageModule)
  },
  {
    path: 'guardados',
    loadChildren: () => import('./page/guardados/guardados.module').then( m => m.GuardadosPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'listproduct',
    loadChildren: () => import('./page/listproduct/listproduct.module').then( m => m.ListproductPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./page/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'ofertas',
    loadChildren: () => import('./page/ofertas/ofertas.module').then( m => m.OfertasPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./page/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./page/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'productview',
    loadChildren: () => import('./page/productview/productview.module').then( m => m.ProductviewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
