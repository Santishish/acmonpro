import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UploadService } from './../upload/upload.service';
import { URL_SERVICIOS } from './../../config/config';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

declare var swal: any;

@Injectable()
export class UsuarioService {
  user: User;
  token: string = '';
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public uploadService: UploadService
  ) {
    this.loadStorage();
  }

  renewToken () {
    const url = `${URL_SERVICIOS}/api/login/renewtoken?token=${this.token}`;
    return this.http.get(url)
      .map((res: any) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
        return true;
      })
      .catch(err => {
        this.logout();
        swal('Error de token', 'No fue posible renovar el token', 'error');
        return Observable.throw(err);
      });
  }

  userStorage (id: string, token: string, user: User, menu: any) {
    localStorage.menu = JSON.stringify(menu);
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
    this.menu = menu;
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
        this.userStorage(res.id, res.token, res.user, res.menu);
        return true;
      })
      .catch(err => {
        swal('Error en Login', err.error.message, 'error');
        return Observable.throw(err);
      });
  }

  googleLogin (token: string) {
    let url = `${URL_SERVICIOS}/api/login/google`;

    return this.http.post(url, { token })
      .map((res: any) => {
        this.userStorage(res.id, res.token, res.user, res.menu);
        return true;
      });
  }

  logout () {
    this.user = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  isLoggedIn () {
    return (this.token) ? true : false;
  }

  loadStorage () {
    if (localStorage.getItem('token')) {
      this.token = localStorage.token;
      this.user = JSON.parse(localStorage.user);
      this.menu = JSON.parse(localStorage.menu);
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  createUser (user: User) {
    const url = `${URL_SERVICIOS}/api/users`;

    return this.http.post(url, user)
      .map((resp: any) => {
        swal('Usuario creado', user.email, 'success');
        return resp.user;
      })
      .catch(err => {
        swal(err.error.message, err.error.errors.message, 'error');
        return Observable.throw(err);
      });
  }

  updateUser (user: User) {
    let url = `${URL_SERVICIOS}/api/users/${user._id}?token=${this.token}`;

    return this.http.put(url, user)
      .map((res: any) => {
        if (user._id === this.user._id) {
          this.userStorage(res.userUpdated._id, this.token, res.userUpdated, this.menu);
        }

        swal('Usuario actualizado', user.name, 'success');
        return true;
      })
      .catch(err => {
        swal(err.error.message, err.error.errors.message, 'error');
        return Observable.throw(err);
      });
  }

  changeImage (file: File, id: string) {
    this.uploadService.uploadFile(file, 'users', id)
      .then((res: any) => {
        this.user.img = res.userUpdated.img;
        swal('Imagen actualizada', this.user.name, 'success');
        this.userStorage(id, this.token, this.user, this.menu);
      })
      .catch(err => console.log(err));
  }

  loadUsers (page: number = 1) {
    const url = `${URL_SERVICIOS}/api/users/${page}`;

    return this.http.get(url);
  }

  searchUsers(query: string) {
    const url = `${URL_SERVICIOS}/api/search/users/${query}`;

    return this.http.get(url)
      .map((res: any) => res.users);
  }

  deleteUser (id: string) {
    const url = `${URL_SERVICIOS}/api/users/${id}?token=${this.token}`;

    return this.http.delete(url)
      .map((res: any) => {
        swal('Usuario borrado', `El usuario ${res.userDeleted.name} ha sido eliminado exitosamente`, 'success');
        return true;
      });
  }


}
