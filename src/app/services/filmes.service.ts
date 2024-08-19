import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilmesService {
  private filmes = [
    {
      id: 1,
      titulo: 'Um Filho',
      imagem: 'path/to/image1.jpg',
    },
    {
      id: 1,
      titulo: 'Um Filho',
      imagem: 'path/to/image1.jpg',
    },
    {
      id: 1,
      titulo: 'Um Filho',
      imagem: 'path/to/image1.jpg',
    },
    {
      id: 1,
      titulo: 'Um Filho',
      imagem: 'path/to/image1.jpg',
    },
    {
      id: 1,
      titulo: 'Um Filho',
      imagem: 'path/to/image1.jpg',
    },
    {
      id: 1,
      titulo: 'Um Filho',
      imagem: 'path/to/image1.jpg',
    },
    {
      id: 1,
      titulo: 'Um Filho',
      imagem: 'path/to/image1.jpg',
    },
    {
      id: 1,
      titulo: 'Um Filho',
      imagem: 'path/to/image1.jpg',
    },
    {
      id: 1,
      titulo: 'Um Filho',
      imagem: 'path/to/image1.jpg',
    },
    {
      id: 1,
      titulo: 'Um Filho',
      imagem: 'path/to/image1.jpg',
    },
    {
      id: 1,
      titulo: 'Um Filho',
      imagem: 'path/to/image1.jpg',
    },
    {
      id: 1,
      titulo: 'Um Filho',
      imagem: 'path/to/image1.jpg',
    },
  ];

  getFilmes() {
    return this.filmes;
  }
}
