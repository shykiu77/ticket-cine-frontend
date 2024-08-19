import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cartaz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartaz.component.html',
  styleUrl: './cartaz.component.scss',
})
export class CartazComponent {
  @Input() imagem: string = '';
  @Input() titulo: string = '';
}
