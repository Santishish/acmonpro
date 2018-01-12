import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from './../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor ( public userService: UsuarioService, public router: Router ) {  }

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {

      return true;
    } else {
      this.router.navigate(['/login']);
      return false;

    }
  }
}
