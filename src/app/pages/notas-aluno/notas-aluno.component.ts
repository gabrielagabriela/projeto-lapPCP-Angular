import { Component, OnInit } from '@angular/core';
import { InformacaoAluno } from '../../shared/interfaces/aluno.interface';
import { InformacaoTurma } from '../../shared/interfaces/turma.interface';
import { UsuarioService } from '../../core/services/usuario/usuario.service';
import { AlunoService } from '../../core/services/aluno/aluno.service';
import { TurmaService } from '../../core/services/turma/turma.service';
import { NotaService } from '../../core/services/nota/nota.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notas-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notas-aluno.component.html',
  styleUrl: './notas-aluno.component.scss'
})
export class NotasAlunoComponent implements OnInit {

  idAluno!: string | null;

  informacaoAluno: InformacaoAluno = {
    nome: '',
    email: '',
    genero: '',
    telefone: '',
    cpf: ''
  };

  informacaoTurma: InformacaoTurma = {
    docente: '',
    nomeTurma:'',
    horario: '',
  }

  listagemNota: Array<{
    id: string;
    nomeAvaliacao: string;
    data: string;
    nomeMateria: string;
    valorNota: number;
  }> = [];

  constructor(private usuarioService: UsuarioService, private alunoService: AlunoService, private turmaService: TurmaService, private notaService: NotaService ){}

  ngOnInit(): void {
    this.idAluno = this.usuarioService.getIdUsuarioLogado();

    console.log('ID do aluno:', this.idAluno);

    if(this.idAluno){
    this.buscarAluno(this.idAluno);
    this.buscarNotas(this.idAluno);
    }

  }

  buscarAluno(id : string){
    this.alunoService.getAlunoById(id).subscribe((retorno) => {
      if(retorno){
        console.log(retorno)
        this.informacaoAluno = {
          nome: retorno.nome,
          email: retorno.email,
          genero: retorno.genero,
          telefone: retorno.telefone,
          cpf: retorno.cpf
        };

        this.buscarTurma(retorno.turma);
      }
    })

  }

  buscarTurma(id: string){
    this.turmaService.getTurmaById(id).subscribe((retorno) => {
      if(retorno){
        console.log(retorno)
        this.informacaoTurma = {
          docente: retorno.docente,
          nomeTurma: retorno.nomeTurma,
          horario: retorno.horario
        }
      }
    })
  }

  buscarNotas(idAluno: string){
    this.notaService.getNotasByIdAluno(idAluno).subscribe((retorno) => {
      retorno.forEach((nota) => {
        if(nota){
          this.listagemNota.push({
            id: nota.id,
            nomeAvaliacao: nota.nomeAvaliacao,
            data: nota.dataAvaliacao,
            nomeMateria: nota.nomeMateria,
            valorNota: nota.valorNota
          })
        }
      })
    })
  }
}

