import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginService } from '../../../../core/services/login/login.service';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss'
})
export class MenuLateralComponent {

  menuExpandido = true;

  constructor(private loginService: LoginService){}

  menuexpandir(){
    this.menuExpandido = !this.menuExpandido;
  }

  botaoDeslogar(){
    this.loginService.logout();
  }
}
