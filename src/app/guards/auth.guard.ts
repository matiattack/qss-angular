import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {

    let userString = localStorage.getItem('byUser');
    let token = localStorage.getItem('token');
    let tokenDate = localStorage.getItem('tokenDate');

    if (userString && token && tokenDate) {
      return true;
    }

    this.router.navigate(['/registration']);
    return false;
  }
}
