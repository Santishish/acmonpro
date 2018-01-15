import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Doctor } from '../../models/doctor.model';

declare const swal: any;

@Injectable()
export class DoctorService {

  totalDoctors: number = 0;

  constructor(
    public http: HttpClient,
    public userService: UsuarioService
  ) { }

  loadDoctors (page: number = 1) {
    const url = `${URL_SERVICIOS}/api/doctors/${page}`;

    return this.http.get(url)
      .map((res: any) => {
        this.totalDoctors = res.total;
        return res.doctors
      })
  }

  searchDoctor (query: string) {
    const url = `${URL_SERVICIOS}/api/search/doctors/${query}`;

    return this.http.get(url);
  }

  deleteDoctor (id: string) {
    const url = `${URL_SERVICIOS}/api/doctors/${id}?token=${this.userService.token}`;

    return this.http.delete(url)
      .map((res: any) => {
        swal('Médico borrado', `El médico ${res.doctor.name} ha sido eliminado exitosamente`, 'success');
        return true;
      })
  }

  saveDoctor (doctor: Doctor) {
    const url = `${URL_SERVICIOS}/api/doctors?token=${this.userService.token}`;
    return this.http.post(url, doctor)
      .map((res: any) => {
        swal('Médico creado', res.doctor.name, 'success');
        return res.doctor;
      });
  }

  getDoctor (id: string) {
    const url = `${URL_SERVICIOS}/api/doctors/get/${id}`;
    return this.http.get(url)
      .map((res: any) => res.doctor);
  }

  updateDoctor (id: string, doctor: Doctor) {
    const url = `${URL_SERVICIOS}/api/doctors/${id}?token=${this.userService.token}`;
    return this.http.put(url, doctor)
      .map((res: any) => {
        swal('Médico actualizado', res.doctor.name, 'success');
        return res.doctor;
      });
  }
}
