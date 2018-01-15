import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/service.index';

declare const swal: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = [];
  page: number = 1;
  loading = true;

  constructor(
    public doctorService: DoctorService
  ) { }

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors () {
    this.loading = true;
    this.doctorService.loadDoctors(this.page)
        .subscribe((res: any) => {
          this.doctors = res;
          this.loading = false;
        });
  }

  changePage (value: number) {
    let page = this.page + value;
    if ((page * 5) - this.doctorService.totalDoctors >= 5) {
      return;
    }

    if (page < 1) {
      page = 1;
      return;
    }

    this.page = page;
    this.loadDoctors();
  }

  searchDoctor (query: string) {
    if (query) {
      this.doctorService.searchDoctor(query)
        .subscribe((res: any) => {
          this.doctors = res.doctors;
        })
    } else {
      this.loadDoctors();
    }
  }

  deleteDoctor (doctor: Doctor) {
    swal({
      title: '¿Estás seguro?',
      text: `Está a punto de eliminar a ${doctor.name}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then((willDelete) => {
      if (willDelete) {
        this.doctorService.deleteDoctor(doctor._id)
          .subscribe(() => this.loadDoctors());
      } else {
        swal('No se completó la operación');
      }
    })
  }

}
