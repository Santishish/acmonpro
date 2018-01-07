import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: './assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document) {
    this.loadSettings();
  }

  saveSettings () {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  loadSettings () {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.applyTheme(this.ajustes.tema);
    } else {
      this.applyTheme(this.ajustes.tema);
    }
  }

  applyTheme (theme: string) {
    const url = `assets/css/colors/${theme}.css`;

    this._document.getElementById('theme').setAttribute('href', url);

    this.ajustes.tema = theme;
    this.ajustes.temaUrl = url;

    this.saveSettings();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
