import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sala } from '../models/sala';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalasService {
  baseUrl = '/api/salas';

  constructor(protected http: HttpClient) {}

  listarSalas(): Observable<Sala[]> {
    const url = environment.apiUrl + this.buildPath('');
    return this.http.get<Sala[]>(url);
  }

  getSalaById(id: number): Observable<Sala | undefined> {
    const url = environment.apiUrl + this.buildPath('/' + id);
    return this.http.get<Sala>(url);
  }

  adicionarSala(sala: Sala): Observable<any> {
    const url = environment.apiUrl + this.buildPath('');
    return this.http.post(url, sala);
  }

  atualizarSala(sala: Sala): Observable<any> {
    const url = environment.apiUrl + this.buildPath('/' + sala.idSala);
    return this.http.put(url, sala);
  }

  excluirSala(id: number): Observable<any> {
    const url = environment.apiUrl + this.buildPath('/' + id);
    return this.http.delete(url);
  }

  private buildPath(recurso: string) {
    return this.baseUrl + recurso;
  }
}
