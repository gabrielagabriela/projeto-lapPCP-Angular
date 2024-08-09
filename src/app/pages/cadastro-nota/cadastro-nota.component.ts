import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NotaService } from '../../core/services/nota/nota.service';
import { TurmaService } from '../../core/services/turma/turma.service';
import { DocenteService } from '../../core/services/docente/docente.service';
import { AlunoService } from '../../core/services/aluno/aluno.service';
import { NotaInterface } from '../../shared/interfaces/nota.interface';

@Component({
  selector: 'app-cadastro-nota',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-nota.component.html',
  styleUrl: './cadastro-nota.component.scss',
})
export class CadastroNotaComponent implements OnInit {
  cadastroForm!: FormGroup;
  listagemDocentes: Array<{ id: string; nome: string }> = [];
  listagemAlunos: Array<{ id: string; nome: string }> = [];
  listagemTurmas: Array<{ id: string; nome: string }> = [];

  constructor(
    private notaService: NotaService,
    private turmaService: TurmaService,
    private docenteService: DocenteService,
    private alunoService: AlunoService
  ) {}

  ngOnInit(): void {
    this.criarForm();
    this.obterDocentes();
    this.obterTurmas();
    this.obterAlunos();
  }

  criarForm() {
    this.cadastroForm = new FormGroup({
      aluno: new FormControl(''),
      docente: new FormControl(''),
      nomeTurma: new FormControl(''),
      nomeMateria: new FormControl(''),
      nomeAvaliacao: new FormControl(''),
      dataAvaliacao: new FormControl(''),
      valorNota: new FormControl(),
    });
  }

  obterDocentes() {
    this.docenteService.getDocentes().subscribe((docentes) => {
      this.listagemDocentes = docentes.map((docente) => ({
        id: docente.id,
        nome: docente.nome,
      }));
    });
  }

  obterTurmas() {
    this.turmaService.getTurmas().subscribe((turmas) => {
      this.listagemTurmas = turmas.map((turma) => ({
        id: turma.id,
        nome: turma.nomeTurma,
      }));
    });
  }

  obterAlunos() {
    this.alunoService.getAlunos().subscribe((alunos) => {
      this.listagemAlunos = alunos.map((aluno) => ({
        id: aluno.id,
        nome: aluno.nome,
      }));
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.cadastrar(this.cadastroForm.value);
    }
  }

  cadastrar(nota: NotaInterface) {
    this.notaService.postNota(this.cadastroForm.value).subscribe((retorno) => {
      console.log(retorno);
      window.alert('Nota cadastrada com sucesso!');
    });
  }
}
