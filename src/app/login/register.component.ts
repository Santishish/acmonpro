import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from './../services/service.index';
import { User } from './../models/user.model';

declare function init_plugins();
declare var swal: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(public usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password2: new FormControl(null, Validators.required),
      conditions: new FormControl(false)
    }, { validators: this.areEqual('password', 'password2')});
  }

  areEqual (field1: string, field2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;

      if (pass1 === pass2) {
        return null;
      }
      return {
        areEqual: true
      };
    };
  }

  regUser () {

    if (this.form.invalid) {
      return;
    }

    if (!this.form.value.conditions) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }


    const user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this.usuarioService.createUser(user)
      .subscribe(resp => this.router.navigate(['/login']));
  }

}
