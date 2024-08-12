import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlunoService } from '../../core/services/aluno/aluno.service';
import { AlunoInterface } from '../../shared/interfaces/aluno.interface';
import { TurmaService } from '../../core/services/turma/turma.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TurmaInterface } from '../../shared/interfaces/turma.interface';
import {
  NgSelectComponent,
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
} from '@ng-select/ng-select';
import { ConsultaCepService } from '../../core/services/busca-cep/consulta-cep.service';

@Component({
  selector: 'app-cadastro-aluno',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgSelectComponent,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,
  ],
  templateUrl: './cadastro-aluno.component.html',
  styleUrl: './cadastro-aluno.component.scss',
})
export class CadastroAlunoComponent implements OnInit {
  cadastroForm!: FormGroup;
  listagemTurmas: Array<{ id: string; nomeTurma: string }> = [];
  id!: string | null;
  listagemTurmas2: TurmaInterface[] = [];

  constructor(
    private alunoService: AlunoService,
    private turmaService: TurmaService,
    public activatedRoute: ActivatedRoute,
    private cepService: ConsultaCepService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarForm();
    this.obterTurmas();

    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.alunoService.getAlunoById(this.id).subscribe((retorno) => {
        if (retorno) {
          this.cadastroForm.patchValue({
            ...retorno,
            turma: retorno.turma.map((turma) => turma.id),
          });
        }
      });
    }
  }

  criarForm() {
    this.cadastroForm = new FormGroup({
      nome: new FormControl(''),
      perfil: new FormControl('aluno'),
      email: new FormControl(''),
      senha: new FormControl(''),
      telefone: new FormControl(''),
      genero: new FormControl(''),
      turma: new FormControl([]),
      dataNascimento: new FormControl(''),
      cpf: new FormControl(''),
      rg: new FormControl(''),
      naturalidade: new FormControl(''),
      cep: new FormControl(''),
      logradouro: new FormControl(''),
      numero: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      localidade: new FormControl(''),
      uf: new FormControl(''),
      referencia: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const formValue = this.cadastroForm.value;
      formValue.turma = this.listagemTurmas2.filter((turma) =>
        formValue.turma.includes(turma.id)
      );

      if (this.id) {
        this.editar(this.cadastroForm.value);
      } else {
        this.cadastrar(this.cadastroForm.value);
      }
    } else {
      alert('Preencha os campos');
    }
  }

  cadastrar(usuario: AlunoInterface) {
    this.alunoService
      .postAluno(this.cadastroForm.value)
      .subscribe((retorno) => {
        window.alert('Aluno cadastrado com sucesso!');
        this.cadastroForm.reset();
      });
  }

  editar(usuario: AlunoInterface) {
    usuario.id = this.id!;
    this.alunoService.putAluno(usuario).subscribe((retorno) => {
      window.alert('Aluno editado com sucesso!');
      this.router.navigate(['/inicio']);
    });
  }

  excluir() {
    if (this.id) {
      this.alunoService.deleteAluno(this.id).subscribe(() => {
        window.alert('Aluno excluído com sucesso!');
        this.router.navigate(['/inicio']);
      });
    }
  }

  obterTurmas() {
    this.turmaService.getTurmas().subscribe((turmas) => {
      this.listagemTurmas2 = turmas.map((turma) => ({
        id: turma.id,
        nomeTurma: turma.nomeTurma,
        docente: turma.docente,
        dataInicio: turma.dataInicio,
        dataTermino: turma.dataTermino,
        horario: turma.horario,
      }));
    });
  }

  buscarCep() {
    if (this.cadastroForm.value.cep) {
      this.cepService.buscarCep(this.cadastroForm.value.cep).subscribe({
        next: (retorno) => {
          if ((retorno as any).erro) {
            window.alert('CEP digitado inválido');
          } else {
            this.cadastroForm.patchValue(retorno);
          }
        },
        error: (err) => {
          window.alert('Ocorreu um erro ao buscar o CEP digitado');
          console.log(err);
        },
      });
    }
  }
}
