import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('../app/pages/tabs/tabs.module').then(m => m.TabsPageModule),
    //loadChildren: './pages/tabs/tabs.module#TabsPageModule',
    canLoad: [UserGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    //loadChildren: './pages/login/login.module#LoginPageModule'
  },

  { path: '', pathMatch: 'full', redirectTo: 'login' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
