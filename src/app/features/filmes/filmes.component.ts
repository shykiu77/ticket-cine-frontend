import { Component, OnInit } from '@angular/core';
import { CartazComponent } from '@components/cartaz/cartaz.component';
import { IMG } from './mock-image';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilmesService } from '@services/filmes.service';
import { Filme } from 'app/models/filme';

@Component({
  selector: 'app-filmes',
  standalone: true,
  imports: [CartazComponent, CommonModule, RouterModule],
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss'],
})
export class FilmesComponent implements OnInit {
  filmes: Filme[] = [];
  constructor(private filmesService: FilmesService) {}
  ngOnInit() {
    this.filmesService.listarFilmes().subscribe(
      (filmes) => {
        this.filmes = filmes;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
