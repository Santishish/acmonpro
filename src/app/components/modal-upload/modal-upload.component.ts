import { Component, OnInit } from '@angular/core';
import { UploadService } from './../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

declare const swal: any;

@Component({
  selector: 'modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imageToUpload: File;
  temporalImage: string;

  constructor(public uploadService: UploadService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
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
    this.uploadService.uploadFile(this.imageToUpload, this.modalUploadService.type, this.modalUploadService.id)
      .then(res => {
        this.modalUploadService.notification.emit(res);
        this.closeModal();
      })
      .catch(err => {
        console.log('Error en la carga');
      });
  }

  closeModal () {
    this.temporalImage = null;
    this.imageToUpload = null;

    this.modalUploadService.hideModal();
  }

}
