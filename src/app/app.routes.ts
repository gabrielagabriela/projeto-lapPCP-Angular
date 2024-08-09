import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuLateralComponent } from './shared/components/menuLateral/menu-lateral/menu-lateral.component';
import { InicioComponent } from './pages/inicio/inicio/inicio.component';
import { InicioAdmDocenteComponent } from './pages/inicio/inicio-adm-docente/inicio-adm-docente.component';
import { InicioAlunoComponent } from './pages/inicio/inicio-aluno/inicio-aluno.component';
import { CadastroDocenteComponent } from './pages/cadastroDocente/cadastro-docente/cadastro-docente.component';
import { CadastroTurmaComponent } from './pages/cadastro-turma/cadastro-turma.component';
import { CadastroAlunoComponent } from './pages/cadastro-aluno/cadastro-aluno.component';
import { CadastroNotaComponent } from './pages/cadastro-nota/cadastro-nota.component';


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
  {
    path: 'cadastro-turma',
    component: CadastroTurmaComponent
  },
  {
    path: 'cadastro-aluno',
    component: CadastroAlunoComponent
  },
  {
    path: 'cadastro-nota',
    component: CadastroNotaComponent
  },
];
