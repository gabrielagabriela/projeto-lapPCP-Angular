import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlunoService } from '../../core/services/aluno/aluno.service';
import { AlunoInterface } from '../../shared/interfaces/aluno.interface';
import { TurmaService } from '../../core/services/turma/turma.service';

@Component({
  selector: 'app-cadastro-aluno',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-aluno.component.html',
  styleUrl: './cadastro-aluno.component.scss',
})
export class CadastroAlunoComponent implements OnInit {

  cadastroForm!: FormGroup;
  listagemTurmas: Array<{ id: string, nomeTurma: string}> = [];

  constructor(private alunoService: AlunoService, private turmaService : TurmaService) {}

  ngOnInit(): void {
    this.criarForm();
    this.obterTurmas();
  }

  criarForm() {
    this.cadastroForm = new FormGroup({
      nome: new FormControl(''),
      perfil: new FormControl('aluno'),
      email: new FormControl(''),
      senha: new FormControl(''),
      telefone: new FormControl(''),
      genero: new FormControl(''),
      turma: new FormControl(''),
      dataNascimento: new FormControl(''),
      cpf: new FormControl(''),
      rg: new FormControl(''),
      naturalidade: new FormControl(''),
      endereco: new FormControl
    })
  }

  obterTurmas(){
    this.turmaService.getTurmas().subscribe(turmas => {
      this.listagemTurmas = turmas.map(turma => ({
        id: turma.id,
        nomeTurma: turma.nomeTurma
      }));
    });
  }

 

  onSubmit(){
    if(this.cadastroForm.valid){
      this.cadastrar(this.cadastroForm.value);
    }
  }

  cadastrar(usuario: AlunoInterface){
    this.alunoService.postAluno(this.cadastroForm.value).subscribe((retorno) => {
      console.log(retorno)
      window.alert("Aluno cadastrado com sucesso!");
    })
  }
}
