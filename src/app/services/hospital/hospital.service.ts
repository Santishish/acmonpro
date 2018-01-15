import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UploadService } from '../upload/upload.service';
import { UsuarioService } from '../usuario/usuario.service';

declare const swal: any;

@Injectable()
export class HospitalService {

  constructor(
    public http: HttpClient,
    public uploadService: UploadService,
    public userService: UsuarioService
  ) { }

  loadHospitals (page: number = 1) {
    const url = `${URL_SERVICIOS}/api/hospitals/paginated/${page}`;

    return this.http.get(url);
  }

  loadHosp () {
    const url = `${URL_SERVICIOS}/api/hospitals/all`;

    return this.http.get(url)
      .map((res: any) => res.hospitals);
  }

  getHospital (id: string) {
    const url = `${URL_SERVICIOS}/api/hospitals/${id}`;

    return this.http.get(url)
      .map((res: any) => res.hospital);
  }

  createHospital (name: string) {
    const url = `${URL_SERVICIOS}/api/hospitals?token=${this.userService.token}`;
    const hospital = new Hospital(name);

    return this.http.post(url, hospital)
      .map((res: any) => {
        swal('Hospital creado', `El ${res.hospital.name} ha sido creado`, 'success');
        return true;
      })
  }

  deleteHospital (id: string) {
    const url = `${URL_SERVICIOS}/api/hospitals/${id}?token=${this.userService.token}`;

    return this.http.delete(url)
      .map((res: any) => {
        swal('Hospital borrado', `El ${res.hospital.name} se ha eliminado exitosamente`, 'success');
        return true;
      });
  }

  searchHospital (query: string) {
    const url = `${URL_SERVICIOS}/api/search/hospitals/${query}`;

    return this.http.get(url)
      .map((res: any) => res.hospitals);
  }

  updateHospital (hospital: Hospital) {
    const url = `${URL_SERVICIOS}/api/hospitals/${hospital._id}?token=${this.userService.token}`;

    return this.http.put(url, hospital)
      .map((res: any) => {
        swal('Hospital actualizado', res.hospital.name, 'success');
        return true;
      })
  }

  changeImage (file: File, id: string) {
    this.uploadService.uploadFile(file, 'hospitals', id)
      .then((res: any) => {
        swal('Imagen actualizada', res.hospital.name, 'success');
      })
      .catch(err => console.log(err));
  }
}
