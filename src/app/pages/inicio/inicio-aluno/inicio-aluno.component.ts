import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotaService } from '../../../core/services/nota/nota.service';
import { MateriaService } from '../../../core/services/materia/materia.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio-aluno',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio-aluno.component.html',
  styleUrl: './inicio-aluno.component.scss',
})
export class InicioAlunoComponent implements OnInit {
  idUsuario: string | null = null;

  dadosMinhasAvaliacoes: Array<{
    nomeAvaliacao: string;
    nomeMateria: string;
    data: string;
    acao: string;
  }> = [];

  listaMaterias: Array<{
    nomeMateria: string;
  }> = []



  listaCursosExtras = [
    {
      nomeCurso: 'Curso Angular',
    },
    {
      nomeCurso: 'Curso Javascript',
    },
    {
      nomeCurso: 'Curso Java',
    },
  ];

  constructor(
    private notaService: NotaService,
    private materiaService: MateriaService
  ) {}

  ngOnInit(): void {
    this.idUsuario = sessionStorage.getItem('idUsuarioLogado');
    if (this.idUsuario) {
      this.buscarDadosAvaliacoes(this.idUsuario);
      this.buscarMaterias();
    }
  }

  buscarDadosAvaliacoes(id: string) {
    this.notaService.getNotasByIdAluno(id).subscribe((retorno) => {
      const ultimasAvaliacoes = retorno.slice(-3);
      this.dadosMinhasAvaliacoes = ultimasAvaliacoes.map((avaliacao) => ({
        nomeAvaliacao: avaliacao.nomeAvaliacao,
        nomeMateria: avaliacao.nomeMateria,
        data: avaliacao.dataAvaliacao,
        acao: '/notas',
      }));
    });
  }

  buscarMaterias(){
    this.materiaService.getMaterias().subscribe((retorno) => {
      const ultimasMaterias = retorno.slice(-3);
      this.listaMaterias = ultimasMaterias.map((materia) => ({
        nomeMateria: materia.nomeMateria
      }));
    });
  }
}
