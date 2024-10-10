import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerente-home',
  templateUrl: './gerente-home.component.html',
  styleUrls: ['./gerente-home.component.scss'],
  standalone: true,
})
export class GerenteHomeComponent {

  constructor(private router: Router) {}

  navigateTo(feature: string) {
    switch (feature) {
      case 'salas':
        this.router.navigate(['/gerente/salas']);
        break;
      case 'sessoes':
        this.router.navigate(['/gerente/sessoes']);
        break;
      case 'filmes':
        this.router.navigate(['/gerente/filmes']);
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
}
