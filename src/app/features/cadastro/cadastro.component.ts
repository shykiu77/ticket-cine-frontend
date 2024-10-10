import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importa o FormsModule
import { CommonModule } from '@angular/common';  // Para diretivas como ngIf
import { Router } from '@angular/router';
import { CadastroService } from 'app/services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],  // Adiciona o FormsModule e CommonModule
})
export class CadastroComponent {
  nome: string = '';
  cpf: string = '';
  dataNascimento: string = '';
  email: string = '';
  senha: string = '';
  error: string = '';
  success: string = '';

  constructor(
    private cadastroService: CadastroService,
    private router: Router
  ) {}

  cadastrar() {
    const cadastroData = {
      nome: this.nome,
      cpf: this.cpf,
      dataNascimento: new Date(this.dataNascimento).toISOString(),
      email: this.email,
      senha: this.senha,
    };

    this.cadastroService.cadastrarCliente(cadastroData).subscribe({
      next: () => {
        this.success = 'Cadastro realizado com sucesso!';
        this.error = '';
        setTimeout(() => {
          this.router.navigate(['/login'], { replaceUrl: true });  // Garante que a página anterior seja substituída
        }, 2000);
      },
      error: (err) => {
        this.error = 'Falha ao cadastrar. Tente novamente.';
        this.success = '';
        console.error('Erro na requisição:', err);
      },
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
