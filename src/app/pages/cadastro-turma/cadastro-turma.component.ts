import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TurmaService } from '../../core/services/turma/turma.service';
import { TurmaInterface } from '../../shared/interfaces/turma.interface';
import { DocenteService } from '../../core/services/docente/docente.service';

@Component({
  selector: 'app-cadastro-turma',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-turma.component.html',
  styleUrl: './cadastro-turma.component.scss'
})
export class CadastroTurmaComponent implements OnInit {

  cadastroForm!: FormGroup;
  listagemDocentes: Array<{ id: string, nome: string}> = [];

  constructor(private turmaService: TurmaService, private docenteService: DocenteService){}

  ngOnInit(): void {
    this.criarForm();
    this.obterDocentes();
}

  criarForm(){
    this.cadastroForm = new FormGroup({
      nomeTurma: new FormControl(''),
      docente: new FormControl(''),
      dataInicio: new FormControl(''),
      dataTermino: new FormControl(''),
      horario: new FormControl(''),
    })
  }

  obterDocentes(){
    this.docenteService.getDocentes().subscribe(docentes => {
      this.listagemDocentes = docentes.map(docente => ({
        id: docente.id,
        nome: docente.nome
      }));
    });
  }

  onSubmit(){
    if(this.cadastroForm.valid){
      this.cadastrar(this.cadastroForm.value);
    }
  }

  cadastrar(turma: TurmaInterface){
    this.turmaService.postTurma(this.cadastroForm.value).subscribe((retorno) => {
      console.log(retorno)
      window.alert("Turma cadastrada com sucesso!");
    })
  }
}
