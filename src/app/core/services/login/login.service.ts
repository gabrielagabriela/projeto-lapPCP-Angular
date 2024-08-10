import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private usuarioService: UsuarioService) { }

  login(usuario : {email: string, senha: string}){
    this.usuarioService.getUsuarioByEmail(usuario.email).subscribe((retorno)=> {
      if(retorno){
        if(retorno.senha === usuario.senha){
          console.log("logado")
          //sessionStorage.setItem('idUsuarioLogado', JSON.stringify(retorno.id))
          sessionStorage.setItem('idUsuarioLogado', retorno.id);
        } else {
          alert("Email e/ou senha incorretos")
        }
      } else {
        alert("Email e/ou senha incorretos")
      }
    })
  }

  logout(){
    sessionStorage.removeItem('idUsuarioLogado');
  }

}
