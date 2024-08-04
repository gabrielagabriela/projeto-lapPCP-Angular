import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UsuarioInterface } from '../../../shared/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'http://localhost:3000/usuarios';

  constructor(private httpClient: HttpClient) { }

  getUsuarios(){
    return this.httpClient.get<Array<UsuarioInterface>>(this.url); 
  }

  getUsuarioById(id: string){
    return this.httpClient.get<UsuarioInterface>(this.url + `/${id}`);
  }

  getUsuarioByEmail(email: string) {
    return this.httpClient.get<Array<UsuarioInterface>>(this.url, {
      params: {
        email: email
      }
    }).pipe(
      map(usuarios => usuarios.find(usuario => usuario.email === email))
    );
  }

  postUsuario(usuario : UsuarioInterface){
    return this.httpClient.post<any>(this.url, usuario);
  }
  
  
  putUsuario(usuario : UsuarioInterface){
    return this.httpClient.put<any>(this.url + `/${usuario.id}`, usuario);
  }
  
  delete(id: string){
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }

}
