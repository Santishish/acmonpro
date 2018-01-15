import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare const swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  loading = true;
  totalRegisters: number;
  page: number = 1;

  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.loadHospitals();
    this.modalUploadService.notification
      .subscribe(() => this.loadHospitals());
  }

  loadHospitals () {
    this.loading = true;
    this.hospitalService.loadHospitals(this.page)
        .subscribe((res: any) => {
          this.totalRegisters = res.total;
          this.hospitals = res.hospitals;
          this.loading = false;
        });
  }

  changePage (value: number) {
    let page = this.page + value;
    if ((page * 5) - this.totalRegisters >= 5) {
      return;
    }

    if (page < 1) {
      page = 1;
      return;
    }

    this.page = page;
    this.loadHospitals();
  }

  searchHospital (query: string) {
    if (query) {
      this.hospitalService.searchHospital(query)
        .subscribe((hospitals: Hospital[]) => {
          this.hospitals = hospitals;
        })
    } else {
      this.loadHospitals();
    }
  }

  createHospital () {
    swal("Ingrese el nombre del hospital", {
      content: "input"
    })
    .then((value: string) => {
      if (value) {
        this.hospitalService.createHospital(value)
            .subscribe(res => this.loadHospitals());
      } else return;
    });
  }

  deleteHospital (hospital: Hospital) {
    swal({
      title: '¿Estás seguro?',
      text: `Está a punto de eliminar el ${hospital.name}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then ((willDelete) => {
      if (willDelete) {
        this.hospitalService.deleteHospital(hospital._id)
          .subscribe(res => this.loadHospitals());
      } else {
        swal('No se completó la operación');
      }
    })
  }

  updateImage (hospital: Hospital) {
    this.modalUploadService.showModal('hospitals', hospital._id);
  }

  updateHospital (hospital: Hospital) {
    this.hospitalService.updateHospital(hospital)
      .subscribe(() => this.loadHospitals());
  }
}
