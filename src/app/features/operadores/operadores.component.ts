import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { OperadoresService } from '@services/operadores.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";

interface Operador {
  cpf: string;
  nome: string;
  email: string;
  senha: string;
}

@Component({
  selector: 'app-operadores',
  templateUrl: './operadores.component.html',
  styleUrls: ['./operadores.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class OperadoresComponent implements OnInit {
  operadores: Operador[] = [];
  novoOperador: Operador = { cpf: '', nome: '', email: '', senha: '' };
  operadorEditando: Operador | null = null;
  editMode: boolean = false;
  operadorModel: Operador = { ...this.novoOperador };
  errorMessage: string | null = null;


  constructor(private operadoresService: OperadoresService, private router: Router) {}

  ngOnInit(): void {
    this.listarOperadores();
  }

  listarOperadores() {
    this.operadoresService.getOperadores().subscribe((data: Operador[]) => {
      this.operadores = data;
    });
  }

  adicionarOperador() {
    this.errorMessage = null; // Resetar a mensagem de erro antes de tentar adicionar
    this.operadoresService.addOperador(this.operadorModel).subscribe({
      next: () => {
        this.listarOperadores();
        this.resetOperadorForm();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.errorMessage = 'Não foi possível adicionar o operador. O CPF já está cadastrado.';
        } else {
          this.errorMessage = 'Ocorreu um erro ao adicionar o operador. Tente novamente mais tarde.';
        }
      },
    });
  }

  editarOperador(operador: Operador) {
    this.operadorEditando = operador;
    this.operadorModel = { ...operador }; // Clona os dados para edição
    this.editMode = true;
  }

  salvarOperador() {
    if (this.operadorEditando) {
      this.operadoresService
        .updateOperador(this.operadorEditando.cpf, this.operadorModel)
        .subscribe(() => {
          this.listarOperadores();
          this.cancelarEdicao();
        });
    }
  }

  excluirOperador(cpf: string) {
    if (confirm('Tem certeza que deseja excluir este operador?')) {
      this.operadoresService.deleteOperador(cpf).subscribe(() => {
        this.listarOperadores();
      });
    }
  }

  cancelarEdicao() {
    this.operadorEditando = null;
    this.resetOperadorForm();
    this.editMode = false;
  }

  resetOperadorForm() {
    this.operadorModel = { cpf: '', nome: '', email: '', senha: '' };
  }

  voltar() {
    this.router.navigate(['/gerente-home']);
  }


}
