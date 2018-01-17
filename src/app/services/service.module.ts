import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http/';
import { ModalUploadService } from './../components/modal-upload/modal-upload.service';

import { SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, AdminGuard, VerifyTokenGuard, UploadService, HospitalService, DoctorService } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    UploadService,
    ModalUploadService,
    HospitalService,
    DoctorService,
    AdminGuard,
    VerifyTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
