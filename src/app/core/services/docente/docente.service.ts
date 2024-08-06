import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocenteInterface } from '../../../shared/interfaces/docente.interface';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  url = 'http://localhost:3000/usuarios';

  constructor(private httpClient: HttpClient) { }

  
  getDocentes(){
    return this.httpClient.get<Array<DocenteInterface>>(this.url); 
  } // na classe de listagem de docente, fazer a filtragem de usuarios perfil docente

  getDocenteById(id: string){
    return this.httpClient.get<DocenteInterface>(this.url + `/${id}`);
  }



  postDocente(usuario : DocenteInterface){
    return this.httpClient.post<any>(this.url, usuario);
  }
  
  
  putDocente(usuario : DocenteInterface){
    return this.httpClient.put<any>(this.url + `/${usuario.id}`, usuario);
  }
  
  deleteDocente(id: string){
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }
}
