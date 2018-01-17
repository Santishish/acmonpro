import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerifyTokenGuard implements CanActivate {

  constructor (
    public userService: UsuarioService,
    public router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {
    const token = this.userService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expired = this.expired(payload.exp);
    if (expired) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verifyRenew(payload.exp);
  }

  verifyRenew (expDate: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(expDate * 1000);
      const now = new Date();

      now.setTime(now.getTime() + (1 * 60 * 60 * 1000));

      if (tokenExp.getTime() > now.getTime()) {
        resolve (true);
      } else {
        this.userService.renewToken()
          .subscribe(() =>
            resolve(true),
            () => {
              this.router.navigate(['/login']);
              reject(false);
            });
      }

      resolve(true);
    });
  }

  expired (expDate: number) {
    let now = new Date().getTime() / 1000;

    if (expDate < now) {
      return true;
    } else {
      return false;
    }
  }
}
