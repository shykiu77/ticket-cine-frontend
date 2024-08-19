import { CommonModule, registerLocaleData, Location } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { CartazComponent } from '@components/cartaz/cartaz.component';
import { IMG } from '@features/filmes/mock-image';
import { AssentosService } from '@services/assentos.service';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-assentos',
  standalone: true,
  imports: [CartazComponent, CommonModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './assentos.component.html',
  styleUrls: ['./assentos.component.scss'],
})
export class AssentosComponent {
  img = IMG;
  date = new Date(Date.now()).toISOString().split('T')[0];
  assentos: any = [];
  selectedSeats: number[] = [];

  //TODO: comunicação com outras telas

  constructor(
    private assentosService: AssentosService,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.assentos = this.assentosService.getAssentos();
    console.log(this.assentos);
  }

  toggleSelection(assento: any) {
    if (!assento.ocupado) {
      if (this.isSelected(assento.numero)) {
        this.selectedSeats = this.selectedSeats.filter(
          (num) => num !== assento.numero
        );
      } else {
        this.selectedSeats.push(assento.numero);
      }
    }
  }

  isSelected(numero: number): boolean {
    return this.selectedSeats.includes(numero);
  }

  getSeatClass(assento: any): string {
    if (assento.ocupado) {
      return 'occupied';
    } else if (this.isSelected(assento.numero)) {
      return 'selected';
    } else {
      return 'available';
    }
  }

  formatDate(isoString: string): string {
    const date = new Date(isoString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  }
}
