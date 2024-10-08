import { Routes } from '@angular/router';
import { AssentosComponent } from '@features/assentos/assentos.component';
import { FilmesComponent } from '@features/filmes/filmes.component';
import { LoginComponent } from '@features/login/login.component';
import { SessoesComponent } from '@features/sessoes/sessoes.component';
import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'filmes', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'filmes', component: FilmesComponent },
  {
    path: 'sessoes/:id',
    component: SessoesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'assentos/:id',
    component: AssentosComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'filmes' },
];
