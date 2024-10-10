import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, tap, catchError, throwError } from 'rxjs';

interface AuthRequest {
  email: string;
  senha: string;
  entidade: 'cliente' | 'operador' | 'gerente';
}


interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token: string | null = null;

  constructor(private router: Router, private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.isAuthenticated = !!this.token;
  }

  login(
    email: string,
    senha: string,
    entidade: 'operador' | 'cliente' | 'gerente'
  ): Observable<AuthResponse> {
    const authRequest: AuthRequest = { email, senha, entidade };
    const url = `${environment.apiUrl}/api/auth`;

    return this.http.post<AuthResponse>(url, authRequest).pipe(
      tap((response: any) => {
        this.isAuthenticated = true;
        this.token = response.token;
        localStorage.setItem('token', response.token);
        localStorage.setItem('userType', entidade);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    this.router.navigate(['/login']);
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }

  getToken(): string | null {
    return this.token;
  }

  getUserType(): string | null {
    return localStorage.getItem('userType');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
