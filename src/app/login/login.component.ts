import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  remember: boolean = false;
  email: string;
  auth2: any;

  constructor( public router: Router, public userService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email) this.remember = true;
  }

  googleInit () {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '608698904913-ppkldpheha3pcmf5tc790atmglcpvide.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btnGoogle'));

    });
  }

  attachSignIn (element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.userService.googleLogin(token)
        .subscribe(() => window.location.href = "#/dashboard");
      });
  }

  ingresar (form: NgForm) {
    if (form.invalid) {
      return;
    }

    const user = new User(null, form.value.email, form.value.password);
    this.userService.login(user, form.value.rememberMe)
      .subscribe(res => this.router.navigate(['/dashboard']));
  }

}
