import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuLateralComponent } from './shared/components/menuLateral/menu-lateral/menu-lateral.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
];
