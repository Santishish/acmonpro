import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { DoctorService, HospitalService } from '../../services/service.index';
import { Doctor } from '../../models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  hospitals: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  doctor: Doctor = new Doctor('', '', '', '', '');
  id: string;

  constructor(
    public doctorService: DoctorService,
    public hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id !== 'new') {
        this.getDoctor(this.id);
      }
    });
  }

  ngOnInit() {
    this.hospitalService.loadHosp()
      .subscribe((hospitals: any) => this.hospitals = hospitals);
    this.modalUploadService.notification
      .subscribe(res => {
        this.doctor.img = res.doctor.img;
      });
  }

  saveDoctor (f: NgForm) {
    if (f.invalid) return;
    if (this.id === 'new') {
      this.doctorService.saveDoctor(this.doctor)
        .subscribe(doctor => {
          this.doctor._id = doctor._id;
          this.router.navigate(['/doctor', doctor._id]);
        });
    } else {
      this.doctorService.updateDoctor(this.id, this.doctor)
        .subscribe();
    }
  }

  getDoctor (id: string) {
    this.doctorService.getDoctor(id)
      .subscribe(doctor => {
        this.doctor = doctor;
        this.doctor.hospital = doctor.hospital._id;
        this.changeHospital(this.doctor.hospital);
      });
  }

  changeHospital (id: string) {
    this.hospitalService.getHospital(id)
      .subscribe(hospital => this.hospital = hospital);
  }

  changePhoto () {
    this.modalUploadService.showModal('doctors', this.doctor._id);
  }

}
