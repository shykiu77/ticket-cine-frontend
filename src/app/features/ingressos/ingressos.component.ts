import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import necessário para usar diretivas como ngIf

@Component({
  selector: 'app-ingressos',
  standalone: true,
  imports: [CommonModule], // Adicionar outros módulos conforme necessário
  templateUrl: './ingressos.component.html',
  styleUrls: ['./ingressos.component.scss'],
})
export class IngressosComponent implements OnInit {
  ingressos: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // Implementar lógica para buscar os ingressos
  }
}
