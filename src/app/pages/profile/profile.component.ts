import { Component, OnInit } from '@angular/core';

import { UsuarioService } from './../../services/service.index';
import { User } from './../../models/user.model';

declare const swal: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  imageToUpload: File;
  temporalImage: string;

  constructor( public userService: UsuarioService ) {
    this.user = userService.user;
  }

  ngOnInit() {
  }

  save (user: User) {
    this.user.name = user.name;
    if ( !this.user.google ) {
      this.user.email = user.email;
    }

    this.userService.updateUser(this.user)
      .subscribe();
  }

  selectImage (file: File) {
    if (!file) {
      this.imageToUpload = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imageToUpload = null;
      return;
    }

    this.imageToUpload = file;

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(file);

    reader.onloadend = () => this.temporalImage = reader.result;
  }

  changeImage () {
    this.userService.changeImage(this.imageToUpload, this.user._id);
  }

}
