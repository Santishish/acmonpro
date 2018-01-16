import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../services/service.index';
import { User } from './../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(public userService: UsuarioService,
  public router: Router
) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  search (query: string) {
    this.router.navigate(['/search', query]);
  }

}
