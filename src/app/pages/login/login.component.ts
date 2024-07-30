import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginFormModel = {
    email: "",
    senha: ""
  };

  onSubmit(){
    if(this.loginFormModel.email == "" || this.loginFormModel.senha == ""){
      alert("Todos os campos precisam ser preenchidos")
    } else{
      alert("redirecionar para a home")
    }
  }

  criarConta(){
    alert("Funcionalidade em contrução")
  }
  esqueciSenha(){
    alert("Funcionalidade em contrução")
  }
}
