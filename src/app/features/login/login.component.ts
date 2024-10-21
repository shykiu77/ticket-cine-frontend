import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { AuthService } from 'app/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';  // Importa JWT Helper para manipular tokens

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  providers: [JwtHelperService],
  imports: [FormsModule, CommonModule],  // Adiciona o FormsModule e CommonModule
})
export class LoginComponent {
  email: string = '';
  password: string = '';  // Altere de 'senha' para 'password'
  entidade: 'cliente' | 'operador' | 'gerente' = 'cliente';  // Definir valor padrão
  error: string = '';

  constructor(private authService: AuthService, private router: Router, private jwtHelper: JwtHelperService) {}

  login() {
    this.authService.login(this.email, this.password, this.entidade).subscribe({
      next: (response: any) => {
        // Armazena o token JWT no localStorage
        localStorage.setItem('token', response.token);

        // Extraímos as informações do token JWT
        const tokenPayload = this.jwtHelper.decodeToken(response.token);
        const role = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        // Redireciona o usuário com base no papel
        if (role === 'Cliente') {
          this.router.navigate(['/filmes']);  // Redireciona para a página de filmes para clientes
        } else if (role === 'Operador') {
          this.router.navigate(['/operador-home']);  // Redireciona para a home do operador
        } else if (role === 'Gerente') {
          this.router.navigate(['/gerente-home']);  // Redireciona para a home do gerente
        } else {
          this.error = 'Papel de usuário inválido.';
        }
      },
      error: (err) => {
        this.error = 'Falha no login. Verifique suas credenciais.';
        console.error(err);
      },
    });
  }

  navigateToCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
