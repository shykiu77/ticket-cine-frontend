import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-gerente-home',
  templateUrl: './gerente-home.component.html',
  styleUrls: ['./gerente-home.component.scss'],
  standalone: true,
})
export class GerenteHomeComponent {

  constructor(private router: Router, private authService: AuthService) {}

  navigateTo(feature: string) {
    switch (feature) {
      case 'salas':
        this.router.navigate(['/gerente/salas']);
        break;
      case 'sessoes':
        this.router.navigate(['/gerente/sessoes']);
        break;
      case 'filmes':
        this.router.navigate(['/gerente/filmes-gerencia']);
        break;
      case 'operadores':
        this.router.navigate(['/gerente/operadores']);
        break;
      case 'relatorios':
        this.router.navigate(['/gerente/relatorios']);
        break;
      default:
        break;
    }
  }


  logout() {
    this.authService.logout(); // Chama o método logout do AuthService
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}
