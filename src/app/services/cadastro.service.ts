import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

interface CadastroRequest {
  nome: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  baseUrl = '/api/Clientes';

  constructor(private http: HttpClient) {}

  cadastrarCliente(cadastroData: CadastroRequest): Observable<any> {
    const url = environment.apiUrl + this.buildPath('');
    return this.http.post(url, cadastroData);
  }

  private buildPath(recurso: string) {
    return this.baseUrl + recurso;
  }
}
