import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DocenteInterface } from '../../../shared/interfaces/docente.interface';
import { DocenteService } from '../../../core/services/docente/docente.service';
import { ActivatedRoute } from '@angular/router';
import { MateriaService } from '../../../core/services/materia/materia.service';
import { MateriaInterface } from '../../../shared/interfaces/materia.interface';
import { NgSelectComponent, NgLabelTemplateDirective, NgOptionTemplateDirective } from '@ng-select/ng-select';

@Component({
  selector: 'app-cadastro-docente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectComponent,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,],
  templateUrl: './cadastro-docente.component.html',
  styleUrl: './cadastro-docente.component.scss',
})
export class CadastroDocenteComponent implements OnInit {
  cadastroForm!: FormGroup;
  listagemMaterias: MateriaInterface[] = [];
  id!: string;

  constructor(
    private docenteService: DocenteService, private materiaService: MateriaService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.criarForm();
    this.obterMaterias();
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.docenteService.getDocenteById(this.id).subscribe((retorno) => {
        if (retorno)/* {
          this.cadastroForm.patchValue(retorno);
        } */
          {
            this.cadastroForm.patchValue({
              ...retorno,
              materias: retorno.materias.map(materia => materia.id) // Preenche o formulário com IDs
            });
          }
      });
    }
  }

  criarForm() {
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
      materias: new FormControl([]),
      endereco: new FormControl(),
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid){
      // Converte IDs de volta para objetos Materia
      const formValue = this.cadastroForm.value;
      formValue.materias = this.listagemMaterias.filter(materia =>
        formValue.materias.includes(materia.id)
      ) 

      if (this.id) {
        this.editar(this.cadastroForm.value);
      } else {
        this.cadastrar(this.cadastroForm.value);
      }
    } else {
      alert('Preencha os campos');
    }
  }

  cadastrar(usuario: DocenteInterface) {
    this.docenteService
      .postDocente(this.cadastroForm.value)
      .subscribe((retorno) => {
        console.log(retorno);
        window.alert('Docente cadastrado com sucesso!');
      });
  }

  editar(usuario: DocenteInterface) {
    usuario.id = this.id;
    this.docenteService.putDocente(usuario).subscribe((retorno) => {
      window.alert('Docente editado com sucesso!');
    });
  }

  obterMaterias(){
    this.materiaService.getMaterias().subscribe(materias => {
      this.listagemMaterias = materias.map(materia => ({
        id: materia.id,
        nomeMateria: materia.nomeMateria
      }));
    });
  }
}
