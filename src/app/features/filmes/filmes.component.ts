import { Component, OnInit } from '@angular/core';
import { CartazComponent } from '@components/cartaz/cartaz.component';
import { IMG } from './mock-image';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilmesService } from '@services/filmes.service';

@Component({
  selector: 'app-filmes',
  standalone: true,
  imports: [CartazComponent, CommonModule, RouterModule],
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss'],
})
export class FilmesComponent implements OnInit {
  img = IMG;
  filmes: any = [];
  constructor(private filmesService: FilmesService) {}
  ngOnInit() {
    this.filmes = this.filmesService.getFilmes();
  }
}
