import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsuarioService } from './../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  page: number = 1;
  totalRegisters: number = 0;
  loading: boolean = true;

  constructor(public userService: UsuarioService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.loadUsers();
    this.modalUploadService.notification
      .subscribe(res => {
        this.loadUsers();
      });
  }

  loadUsers () {
    this.loading = true;
    this.userService.loadUsers(this.page)
      .subscribe((res: any) => {
        this.totalRegisters = res.total;
        this.users = res.users;
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
    this.loadUsers();
  }

  searchUser (query: string) {
    if (query) {
      this.userService.searchUsers(query)
        .subscribe((users: User[]) => {
          this.users = users;
        });
    } else {
      this.loadUsers();
    }
  }

  deleteUser (user: User) {
    if (user._id === this.userService.user._id) {
      swal('No se puede eliminar al usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Estás seguro?',
      text: `Está a punto de eliminar a ${user.name}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then((willDelete) => {
      if (willDelete) {
        this.userService.deleteUser(user._id)
          .subscribe((deleted: boolean) => {
            this.loadUsers();
          });
      } else {
        swal('No se eliminó');
      }
    });

  }

  saveUser (user: User) {
    this.userService.updateUser(user)
      .subscribe();
  }

  showModal (id: string) {
    this.modalUploadService.showModal('users', id);
  }

}
