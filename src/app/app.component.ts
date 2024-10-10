import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],  // Adiciona o CommonModule
})
export class AppComponent {
  constructor(private authService: AuthService, private jwtHelper: JwtHelperService) {}

  isClient(): boolean {
    const token = this.authService.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const tokenPayload = this.jwtHelper.decodeToken(token);
      const role = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return role === 'Cliente';  // Apenas clientes
    }
    return false;
  }

}
