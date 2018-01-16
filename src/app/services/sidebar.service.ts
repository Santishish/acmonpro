import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario/usuario.service';

@Injectable()
export class SidebarService {

  menu: any[] = [];

  constructor(
    public userService: UsuarioService
  ) { }
  
  loadMenu () {
    this.menu = this.userService.menu;
  }

}
