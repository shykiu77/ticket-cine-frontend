import { Routes } from '@angular/router';
import { AssentosComponent } from '@features/assentos/assentos.component';
import { FilmesComponent } from '@features/filmes/filmes.component';
import { LoginComponent } from '@features/login/login.component';
import { SessoesComponent } from '@features/sessoes/sessoes.component';
import { CadastroComponent } from "@features/cadastro/cadastro.component";
import { OperadorHomeComponent } from '@features/operador-home/operador-home.component';  // Componente para home do operador
import { GerenteHomeComponent } from '@features/gerente-home/gerente-home.component';  // Componente para home do gerente
import { AuthGuard } from './auth/auth-guard';
import {OperadoresComponent} from "@features/operadores/operadores.component";
import {FilmesGerenciaComponent} from "@features/filmes-gerencia/filmes-gerencia.component";
import {SalasGerenciaComponent} from "@features/salas-gerencia/salas-gerencia.component";

export const routes: Routes = [
  { path: '', redirectTo: 'filmes', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'filmes', component: FilmesComponent },  // Acesso para todos os usuários
  {
    path: 'operador-home',
    component: OperadorHomeComponent,  // Home para operadores
    canActivate: [AuthGuard],  // Protegida pelo guard de autenticação
    data: { role: 'Operador' },  // Define o papel necessário para acessar
  },
  {
    path: 'gerente-home',
    component: GerenteHomeComponent,  // Home para gerentes
    canActivate: [AuthGuard],  // Protegida pelo guard de autenticação
    data: { role: 'Gerente' },  // Define o papel necessário para acessar
  },
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
  {
    path: 'gerente/operadores',
    component: OperadoresComponent,
    canActivate: [AuthGuard],  // Protege a rota com AuthGuard
    data: { role: 'Gerente' }
  },
  {
    path: 'gerente/filmes-gerencia',
    component: FilmesGerenciaComponent,
    canActivate: [AuthGuard], // Proteção para Operador e Gerente
    data: { role: ['Gerente'] },
  },
  {
    path: 'gerente/salas',
    component: SalasGerenciaComponent,
    canActivate: [AuthGuard], // Proteção para Operador e Gerente
    data: { role: ['Gerente', 'Operador'] }, // Definindo que tanto 'Gerente' quanto 'Operador' podem acessar
  },
  { path: '**', redirectTo: 'filmes' },  // Redireciona qualquer rota inválida para filmes
];
