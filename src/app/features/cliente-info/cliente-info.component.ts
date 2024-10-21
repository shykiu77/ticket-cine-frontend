import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Cliente} from "../../models/cliente";
import {ClienteService} from "@services/cliente.service";
import {FormsModule} from "@angular/forms"; // Import necessário para usar diretivas como ngIf e ngModel

@Component({
  selector: 'app-cliente-info',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicionar outros módulos conforme necessário
  templateUrl: './cliente-info.component.html',
  styleUrls: ['./cliente-info.component.scss'],
})
export class ClienteInfoComponent implements OnInit {
  cliente!: Cliente;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getClienteInfo(); // Chame aqui o ID real do cliente logado
  }

  getClienteInfo() {
    const clienteId = 1; // Substituir pelo ID do cliente logado
    this.clienteService.getCliente(clienteId).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }

  updateCliente() {
    this.clienteService.updateCliente(this.cliente.idCliente, this.cliente).subscribe(() => {
      alert('Informações atualizadas com sucesso!');
    });
  }
}
