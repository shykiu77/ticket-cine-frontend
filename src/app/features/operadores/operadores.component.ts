import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {OperadoresService} from "@services/operadores.service";

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
  operadorModel: Operador = this.novoOperador; // Este será o modelo vinculado ao formulário

  constructor(private operadoresService: OperadoresService) {}

  ngOnInit(): void {
    this.listarOperadores();
  }

  listarOperadores() {
    this.operadoresService.getOperadores().subscribe((data: Operador[]) => {
      this.operadores = data;
    });
  }

  adicionarOperador() {
    this.operadoresService.addOperador(this.operadorModel).subscribe(() => {
      this.listarOperadores();
      this.resetOperadorForm();
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
}
