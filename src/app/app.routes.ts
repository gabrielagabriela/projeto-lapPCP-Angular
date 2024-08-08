import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuLateralComponent } from './shared/components/menuLateral/menu-lateral/menu-lateral.component';
import { InicioComponent } from './pages/inicio/inicio/inicio.component';
import { InicioAdmDocenteComponent } from './pages/inicio/inicio-adm-docente/inicio-adm-docente.component';
import { InicioAlunoComponent } from './pages/inicio/inicio-aluno/inicio-aluno.component';
import { CadastroDocenteComponent } from './pages/cadastroDocente/cadastro-docente/cadastro-docente.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'inicioadm',
    component: InicioAdmDocenteComponent
  }, //depois tirar
  {
    path: 'inicioaluno',
    component: InicioAlunoComponent
  }, // depois tirar
  {
    path: 'cadastro-docente',
    component: CadastroDocenteComponent
  },
];
