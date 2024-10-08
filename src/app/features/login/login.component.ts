import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  entityType: 'operador' | 'cliente' | '' = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login() {
    this.error = '';
    if (this.email && this.password && this.entityType) {
      this.authService
        .login(this.email, this.password, this.entityType)
        .subscribe({
          next: () => {
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/filmes';
            this.router.navigateByUrl(returnUrl);
          },
          error: (err) => {
            this.error = err.message || 'Login failed. Please try again.';
          },
        });
    } else {
      this.error = 'Please fill in all fields.';
    }
  }
}
