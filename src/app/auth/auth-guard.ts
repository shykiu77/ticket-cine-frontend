import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';  // Para decodificar o token JWT

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getToken();

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const tokenPayload = this.jwtHelper.decodeToken(token);
      const userRole = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      if (route.data['role'] && !route.data['role'].includes(userRole)) {
        console.log('userRole', userRole);
        console.log('route.data[\'role\']', route.data['role']);
        this.router.navigate(['/login']);
        return false;
      }

      return true;  // Usuário autenticado e com o papel correto
    }

    // Redireciona para a página de login se o usuário não estiver autenticado
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  }
}
