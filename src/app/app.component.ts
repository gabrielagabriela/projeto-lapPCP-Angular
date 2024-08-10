import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './shared/components/menuLateral/menu-lateral/menu-lateral.component';
import { UsuarioService } from './core/services/usuario/usuario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, CommonModule, MenuLateralComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'labpcp-angular';

  showToolbar = true;
  toolbarDados = {
    titulo: '',
    nomeUsuario: '',
  };

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.router.events.subscribe((retorno) => {
      if (retorno instanceof NavigationEnd) {
        this.showToolbar = !this.router.url.includes('login');
        this.toolbarTitulo(this.router.url);
        this.buscaNomeUsuario();
      }
    });
  }

  private buscaNomeUsuario() {
    const idUsuario = this.usuarioService.getIdUsuarioLogado();

    if (idUsuario) {
      this.usuarioService.getNomeUsuarioLogado(idUsuario).subscribe((nome) => {
        this.toolbarDados.nomeUsuario = nome;
      });
    }
  }

  private toolbarTitulo(url: string) {
    if (url.includes('cadastro-docente')) {
      this.toolbarDados.titulo = 'Cadastro de Docente';
    } else if (url.includes('cadastro-turma')) {
      this.toolbarDados.titulo = 'Cadastro de Turma';
    } else if (url.includes('cadastro-aluno')) {
      this.toolbarDados.titulo = 'Cadastro de Aluno';
    } else if (url.includes('cadastro-nota')) {
      this.toolbarDados.titulo = 'Cadastro de Nota';
    } else if (url.includes('listagem-docentes')) {
      this.toolbarDados.titulo = 'Listagem de Docentes';
    } else if (url.includes('notas')) {
      this.toolbarDados.titulo = 'Notas do Aluno';
    } else if (url.includes('inicio')) {
      this.toolbarDados.titulo = 'Dashboard';
    } else if (url.includes('notas')) {
      this.toolbarDados.titulo = 'Notas do Aluno';
    } else {
      this.toolbarDados.titulo = 'Página não encontrada';
    }
  }
}
