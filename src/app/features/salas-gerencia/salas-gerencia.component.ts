import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalasService } from '@services/salas.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

interface Sala {
  idSala: number;
  numero: number;
  qtdAssentos: number;
}

@Component({
  selector: 'app-salas-gerencia',
  templateUrl: './salas-gerencia.component.html',
  styleUrls: ['./salas-gerencia.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SalasGerenciaComponent implements OnInit {
  salas: Sala[] = [];
  novaSala: Sala = {
    idSala: 0,
    numero: 0,
    qtdAssentos: 0,
  };
  salaEditando: Sala | null = null;
  editMode: boolean = false;
  salaModel: Sala = { ...this.novaSala };
  errorMessage: string | null = null;

  constructor(
    private salasService: SalasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarSalas();
  }

  listarSalas() {
    this.salasService.listarSalas().subscribe((data: Sala[]) => {
      this.salas = data;
    });
  }

  adicionarSala() {
    this.errorMessage = null;
    this.salasService.adicionarSala(this.salaModel).subscribe({
      next: () => {
        this.listarSalas();
        this.resetSalaForm();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Ocorreu um erro ao adicionar a sala. Tente novamente mais tarde.';
      },
    });
  }

  editarSala(sala: Sala) {
    this.salaEditando = sala;
    this.salaModel = { ...sala };
    this.editMode = true;
  }

  salvarSala() {
    if (this.salaEditando) {
      this.salasService
        .atualizarSala(this.salaModel)
        .subscribe(() => {
          this.listarSalas();
          this.cancelarEdicao();
        });
    }
  }

  excluirSala(id: number) {
    if (confirm('Tem certeza que deseja excluir esta sala?')) {
      this.salasService.excluirSala(id).subscribe(() => {
        this.listarSalas();
      });
    }
  }

  cancelarEdicao() {
    this.salaEditando = null;
    this.resetSalaForm();
    this.editMode = false;
  }

  resetSalaForm() {
    this.salaModel = { ...this.novaSala };
  }

  voltar() {
    this.router.navigate(['/gerente-home']);
  }
}
