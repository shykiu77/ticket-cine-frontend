import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importe o FormsModule
import { FilmesService } from '@services/filmes.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GeneroService } from '@services/genero.service';  // Serviço para obter gêneros
import { AuthService } from 'app/auth/auth.service'; // Importe o AuthService

interface Filme {
  idFilme: number;
  titulo: string;
  descricao: string;
  poster: string;
  duracao: number;
  idGenero?: number | null;
}

interface Genero {
  idGenero: number;
  tipo: string;
}

@Component({
  selector: 'app-filmes-gerencia',
  templateUrl: './filmes-gerencia.component.html',
  styleUrls: ['./filmes-gerencia.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],  // Adicione o FormsModule aqui
})
export class FilmesGerenciaComponent implements OnInit {
  filmes: Filme[] = [];
  generos: Genero[] = []; // Array para armazenar os gêneros
  novoFilme: Filme = {
    idFilme: 0,
    titulo: '',
    descricao: '',
    poster: '',
    duracao: 0,
    idGenero: null,
  };
  filmeEditando: Filme | null = null;
  editMode: boolean = false;
  filmeModel: Filme = { ...this.novoFilme };
  errorMessage: string | null = null;

  constructor(
    private filmesService: FilmesService,
    private generoService: GeneroService,  // Serviço para obter gêneros
    private router: Router,
    private authService: AuthService // Adicione o AuthService aqui
  ) {}

  ngOnInit(): void {
    this.listarFilmes();
    this.listarGeneros();  // Carrega os gêneros
  }

  listarFilmes() {
    this.filmesService.listarFilmes().subscribe((data: Filme[]) => {
      this.filmes = data;
    });
  }

  listarGeneros() {
    this.generoService.listarGeneros().subscribe((data: Genero[]) => {
      this.generos = data;  // Popula a lista de gêneros
    });
  }

  adicionarFilme() {
    this.errorMessage = null; // Resetar a mensagem de erro antes de tentar adicionar
    this.filmesService.adicionarFilme(this.filmeModel).subscribe({
      next: () => {
        this.listarFilmes();
        this.resetFilmeForm();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Ocorreu um erro ao adicionar o filme. Tente novamente mais tarde.';
      },
    });
  }

  editarFilme(filme: Filme) {
    this.filmeEditando = filme;
    this.filmeModel = { ...filme }; // Clona os dados para edição
    this.editMode = true;
  }

  salvarFilme() {
    if (this.filmeEditando) {
      this.filmesService
        .atualizarFilme(this.filmeModel)
        .subscribe(() => {
          this.listarFilmes();
          this.cancelarEdicao();
        });
    }
  }

  excluirFilme(id: number) {
    if (confirm('Tem certeza que deseja excluir este filme?')) {
      this.filmesService.excluirFilme(id).subscribe(() => {
        this.listarFilmes();
      });
    }
  }

  cancelarEdicao() {
    this.filmeEditando = null;
    this.resetFilmeForm();
    this.editMode = false;
  }

  resetFilmeForm() {
    this.filmeModel = { ...this.novoFilme };
  }

  voltar() {
    // Usa o AuthService para verificar o tipo de usuário
    const userType = this.authService.getUserType();

    // Redireciona para a home adequada com base no tipo de usuário
    if (userType === 'gerente') {
      this.router.navigate(['/gerente-home']);
    } else if (userType === 'operador') {
      this.router.navigate(['/operador-home']);
    } else {
      // Se for outro tipo de usuário, pode redirecionar para outra página ou dar erro
      this.router.navigate(['/login']);
    }
  }

  getGenero(idGenero: number | null): string {
    const genero = this.generos.find(g => g.idGenero === idGenero);
    return genero ? genero.tipo : 'Desconhecido';
  }
}
