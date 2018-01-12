import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../services/service.index';
import { User } from './../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(public userService: UsuarioService) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

}
