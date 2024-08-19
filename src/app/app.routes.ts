import { Routes } from '@angular/router';
import { AssentosComponent } from '@features/assentos/assentos.component';
import { FilmesComponent } from '@features/filmes/filmes.component';
import { SessoesComponent } from '@features/sessoes/sessoes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'filmes', pathMatch: 'full' },
  { path: 'filmes', component: FilmesComponent },
  { path: 'sessoes/:id', component: SessoesComponent },
  { path: 'assentos/:id', component: AssentosComponent },
];
