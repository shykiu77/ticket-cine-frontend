import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Para o roteamento
import { ToolbarModule } from 'primeng/toolbar'; // Para o p-toolbar
import { CommonModule } from '@angular/common'; // Para usar diretivas como *ngIf e *ngFor

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ToolbarModule, RouterModule, CommonModule], // Importar os módulos corretamente
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  // Função para redirecionar para a página de ingressos
  navigateToIngressos() {
    this.router.navigate(['/meus-ingressos']);
  }

  // Função para redirecionar para a página de informações do cliente
  navigateToClienteInfo() {
    this.router.navigate(['/cliente-info']);
  }
}
