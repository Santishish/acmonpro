import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {
  
  constructor (
    public userService: UsuarioService
  ) { }
  
  canActivate() {
    if (this.userService.user.role === 'ADMIN_ROLE') {
      return true;
    }
    this.userService.logout();
    return false;
  }
}
