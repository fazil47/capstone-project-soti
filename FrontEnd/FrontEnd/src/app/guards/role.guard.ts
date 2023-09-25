// import { CanActivateFn } from '@angular/router';

// export const roleGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate(['login']);
      return false;
    }
    const token = JSON.parse(localStorage.getItem('currentUser')).token;

    let jwtData = token.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    
    let isAdmin :Boolean= decodedJwtData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].includes("Admin");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log(this.jwtHelper.decodeToken(token));
      if(isAdmin)
      {
        return true;
      }
      else
      {
        this.router.navigate(['']);
        return false;
      }
      
    }

    this.router.navigate(['login']);
    return false;
  }
}
