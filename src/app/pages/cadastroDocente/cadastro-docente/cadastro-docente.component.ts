import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DocenteInterface } from '../../../shared/interfaces/docente.interface';
import { DocenteService } from '../../../core/services/docente/docente.service';

@Component({
  selector: 'app-cadastro-docente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-docente.component.html',
  styleUrl: './cadastro-docente.component.scss'
})
export class CadastroDocenteComponent implements OnInit {

  cadastroForm!: FormGroup;

  constructor(private docenteService: DocenteService ){}

  ngOnInit(): void {
      this.criarForm();
  }

  criarForm(){
    this.cadastroForm = new FormGroup({
      nome: new FormControl(''),
      perfil: new FormControl('docente'),
      email: new FormControl(''),
      senha: new FormControl(''),
      telefone: new FormControl(''),
      genero: new FormControl(''),
      estadoCivil: new FormControl(''),
      dataNascimento: new FormControl(''),
      cpf: new FormControl(''),
      rg: new FormControl(''),
      naturalidade: new FormControl(''),
      materias: new FormControl(''),
      endereco: new FormControl
    })
  }

  onSubmit(){
    if(this.cadastroForm.valid){
      this.cadastrar(this.cadastroForm.value);
    }
  }

  cadastrar(usuario: DocenteInterface){
    this.docenteService.postDocente(this.cadastroForm.value).subscribe((retorno) => {
      console.log(retorno)
      window.alert("Docente cadastrado com sucesso!");
    })
  }
}

