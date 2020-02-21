import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {
  canActivate(route: ActivatedRouteSnapshot, RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.isAuth) {
      return true;
    } else {
      this.router.navigate(['admin']);
    }
  }

  constructor(private authService: AuthService, private router: Router) { }

  
}
