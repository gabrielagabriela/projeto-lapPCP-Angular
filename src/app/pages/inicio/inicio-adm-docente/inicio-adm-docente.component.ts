import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio-adm-docente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-adm-docente.component.html',
  styleUrl: './inicio-adm-docente.component.scss'
})
export class InicioAdmDocenteComponent {

  dadosEstatisticos = [
    {
      quantidade: '55',
      entidade: 'Alunos',
    },
    {
      quantidade: '3',
      entidade: 'Turmas',
    },
    {
      quantidade: '8',
      entidade: 'Docentes',
    },
  ];
}
