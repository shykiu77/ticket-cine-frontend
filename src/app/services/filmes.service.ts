import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Filme } from '../models/filme';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilmesService {
  baseUrl = '/api/filmes';

  constructor(protected http: HttpClient) {}

  listarFilmes(): Observable<Filme[]> {
    const url = environment.apiUrl + this.buildPath('');
    return this.http.get<Filme[]>(url);
  }

  getFilmeById(id: number): Observable<Filme | undefined> {
    const url = environment.apiUrl + this.buildPath('/' + id);
    return this.http.get<Filme>(url);
  }

  adicionarFilme(filme: Filme): Observable<any> {
    const url = environment.apiUrl + this.buildPath('');
    return this.http.post(url, filme);
  }

  atualizarFilme(filme: Filme): Observable<any> {
    const url = environment.apiUrl + this.buildPath('/' + filme.idFilme);
    return this.http.put(url, filme);
  }

  excluirFilme(id: number): Observable<any> {
    const url = environment.apiUrl + this.buildPath('/' + id);
    return this.http.delete(url);
  }

  private buildPath(recurso: string) {
    return this.baseUrl + recurso;
  }
}
