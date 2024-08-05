import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-aluno.component.html',
  styleUrl: './inicio-aluno.component.scss'
})
export class InicioAlunoComponent {

  listaAvaiacoes = [
    {
      nomeAvaliacao :"Avaliação 01",
      materia: "Materia 01",
      data: "12/02/2024"
    },
    {
      nomeAvaliacao :"Avaliação 02",
      materia: "Materia 02",
      data: "12/02/2024"
    },
    {
      nomeAvaliacao :"Avaliação 03",
      materia: "Materia 03",
      data: "12/02/2024"
    }
  ]

  listaMaterias = [
    {
      nomeMateria: "Materia x"
    },
    {
      nomeMateria: "Materia y"
    },
    {
      nomeMateria: "Materia z"
    },
  ]

  listaCursosExtras = [
    {
      nomeCurso: "Curso A"
    },
    {
      nomeCurso: "Curso B"
    },
    {
      nomeCurso: "Curso C"
    }
  ]
}
