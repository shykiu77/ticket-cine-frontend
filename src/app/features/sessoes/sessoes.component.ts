import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SessoesService } from '@services/sessoes.service';
import { CartazComponent } from '@components/cartaz/cartaz.component';
import { CommonModule, Location } from '@angular/common';
import { IMG } from '@features/filmes/mock-image';

@Component({
  selector: 'app-sessoes',
  standalone: true,
  imports: [CommonModule, CartazComponent, RouterModule],
  templateUrl: './sessoes.component.html',
  styleUrls: ['./sessoes.component.scss'],
})
export class SessoesComponent {
  img = IMG;
  selectedDate: string;
  selectedSessions: { room: number; times: string[] }[] | null = null;
  mockDatas: string[];
  movieDescription: string;
  movieId: string;

  constructor(
    private sessoesService: SessoesService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.movieId = this.route.snapshot.paramMap.get('id') || '1';
    const movieData = this.sessoesService.getMovieData(this.movieId);
    this.movieDescription = movieData.description;
    this.mockDatas = this.sessoesService.getAvailableDates();
    this.selectedDate = this.mockDatas[0];
    this.selectedSessions = movieData.sessions[this.selectedDate] || null;
  }

  goBack(): void {
    this.location.back();
  }

  diaDaSemana(dateStr: string): string {
    const diasDaSemana = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];
    const inputDate = new Date(dateStr);
    const today = new Date();

    if (inputDate.toDateString() === today.toDateString()) {
      return 'Hoje';
    }

    return diasDaSemana[inputDate.getDay()];
  }

  formatDate(isoString: string): string {
    const date = new Date(isoString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  }

  selectDate(date: string): void {
    this.selectedDate = date;
    const movieData = this.sessoesService.getMovieData(this.movieId);
    this.selectedSessions = movieData.sessions[date] || null;
  }
}
