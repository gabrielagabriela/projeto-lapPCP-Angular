import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DocenteInterface } from '../../../shared/interfaces/docente.interface';
import { DocenteService } from '../../../core/services/docente/docente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriaService } from '../../../core/services/materia/materia.service';
import { MateriaInterface } from '../../../shared/interfaces/materia.interface';
import {
  NgSelectComponent,
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
} from '@ng-select/ng-select';
import { ConsultaCepService } from '../../../core/services/busca-cep/consulta-cep.service';

@Component({
  selector: 'app-cadastro-docente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgSelectComponent,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,
  ],
  templateUrl: './cadastro-docente.component.html',
  styleUrl: './cadastro-docente.component.scss',
})
export class CadastroDocenteComponent implements OnInit {
  cadastroForm!: FormGroup;
  listagemMaterias: MateriaInterface[] = [];
  id!: string | null;

  constructor(
    private docenteService: DocenteService,
    private materiaService: MateriaService,
    public activatedRoute: ActivatedRoute,
    private cepService: ConsultaCepService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarForm();
    this.obterMaterias();
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.docenteService.getDocenteById(this.id).subscribe((retorno) => {
        if (retorno) {
          this.cadastroForm.patchValue({
            ...retorno,
            materias: retorno.materias.map((materia) => materia.id),
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
      formValue.materias = this.listagemMaterias.filter((materia) =>
        formValue.materias.includes(materia.id)
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

  cadastrar(usuario: DocenteInterface) {
    this.docenteService
      .postDocente(this.cadastroForm.value)
      .subscribe((retorno) => {
        console.log(retorno);
        window.alert('Docente cadastrado com sucesso!');
        this.cadastroForm.reset();
      });
  }

  editar(usuario: DocenteInterface) {
    usuario.id = this.id!;
    this.docenteService.putDocente(usuario).subscribe((retorno) => {
      window.alert('Docente editado com sucesso!');
      this.router.navigate(['/listagem-docentes']);
    });
  }

  excluir() {
    if (this.id) {
      this.docenteService.deleteDocente(this.id).subscribe(() => {
        window.alert('Docente excluído com sucesso!');
        this.router.navigate(['/listagem-docentes']);
      });
    }
  }

  obterMaterias() {
    this.materiaService.getMaterias().subscribe((materias) => {
      this.listagemMaterias = materias.map((materia) => ({
        id: materia.id,
        nomeMateria: materia.nomeMateria,
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
