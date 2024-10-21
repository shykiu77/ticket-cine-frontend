import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

export interface Genero {
  idGenero: number;
  tipo: string;
}

@Injectable({
  providedIn: 'root',
})
export class GeneroService {
  baseUrl = '/api/Generos';

  constructor(private http: HttpClient) {}

  listarGeneros(): Observable<Genero[]> {
    const url = environment.apiUrl + this.baseUrl;
    return this.http.get<Genero[]>(url);
  }
}
