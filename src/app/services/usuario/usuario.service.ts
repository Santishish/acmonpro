import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../../config/config';

declare var swal: any;

@Injectable()
export class UsuarioService {
  user: User;
  token: string = '';

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.loadStorage();
  }

  userStorage (id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  login (user: User, remember: boolean = false) {
    const url = `${URL_SERVICIOS}/api/login`;

    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(url, user)
      .map((res: any) => {
        this.userStorage(res.id, res.token, res.user);
        return true;
      });
  }

  googleLogin (token: string) {
    let url = `${URL_SERVICIOS}/api/login/google`;

    return this.http.post(url, { token })
      .map((res: any) => {
        this.userStorage(res.id, res.token, res.user);
        return true;
      });
  }

  logout () {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn () {
    return (this.token) ? true : false;
  }

  loadStorage () {
    if (localStorage.getItem('token')) {
      this.token = localStorage.token;
      this.user = JSON.parse(localStorage.user);
    } else {
      this.token = '';
      this.user = null;
    }
  }

  createUser (user: User) {
    const url = `${URL_SERVICIOS}/api/users`;

    return this.http.post(url, user)
      .map((resp: any) => {
        swal('Usuario creado', user.email, 'success');
        return resp.user;
      });
  }


}
