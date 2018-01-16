import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { User } from '../../models/user.model';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params
      .subscribe(params => {
        const query = params['query'];
        this.search(query);
      });
  }

  ngOnInit() {
  }

  search (query: string) {
    const url = `${URL_SERVICIOS}/api/search/all/${query}`;
    this.http.get(url)
      .subscribe((res: any) => {
        this.hospitals = res.hospitals;
        this.doctors = res.doctors;
        this.users = res.users;
      });
  }

}
