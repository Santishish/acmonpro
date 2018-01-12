import { Injectable } from '@angular/core';

import { URL_SERVICIOS } from './../../config/config';

@Injectable()
export class UploadService {

  constructor() { }

  uploadFile (file: File, type: string, id: string) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('img', file, file.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      const url = `${URL_SERVICIOS}/api/upload/${type}/${id}`;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }

}
