import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'user'): any {
    let url = `${URL_SERVICIOS}/api/img`;
    if (!img) {
      return `${url}/users/xxx`;
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (type) {
      case 'user':
        return `${url}/users/${img}`;
      case 'doctor':
        return `${url}/doctors/${img}`;
      case 'hospital':
        return `${url}/hospitals/${img}`;
      default:
        console.log('El tipo de imagen no existe');
        return `${url}/users/xxx`;
    }


  }

}
