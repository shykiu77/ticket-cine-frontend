import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-operador-home',
  templateUrl: './operador-home.component.html',
  styleUrls: ['./operador-home.component.scss'],
  standalone: true,
})
export class OperadorHomeComponent {
  constructor(private router: Router, private authService: AuthService) {}

  navigateTo(feature: string) {
    switch (feature) {
      case 'filmes':
        this.router.navigate(['/gerente/filmes-gerencia']);
        break;
      case 'sessoes':
        this.router.navigate(['/gerente/sessoes']);
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
