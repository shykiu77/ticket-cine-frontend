import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';  // Certifique-se de ter o environment configurado

interface Operador {
  cpf: string;
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root',
})
export class OperadoresService {
  private baseUrl = `${environment.apiUrl}/api/Operadores`;

  constructor(private http: HttpClient) {}

  getOperadores(): Observable<Operador[]> {
    return this.http.get<Operador[]>(this.baseUrl);
  }

  getOperadorById(cpf: string): Observable<Operador> {
    return this.http.get<Operador>(`${this.baseUrl}/${cpf}`);
  }

  addOperador(operador: Operador): Observable<Operador> {
    return this.http.post<Operador>(this.baseUrl, operador);
  }

  updateOperador(cpf: string, operador: Operador): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${cpf}`, operador);
  }

  deleteOperador(cpf: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${cpf}`);
  }
}
