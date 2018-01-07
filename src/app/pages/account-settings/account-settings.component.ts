import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor( public settingsService: SettingsService ) { }

  ngOnInit() {
    this.setCheck();
  }

  changeColour (theme: string, link: any) {
    this.applyWorking(link);
    this.settingsService.applyTheme(theme);
  }

  applyWorking (link: any) {
    const selectores: any = document.getElementsByClassName('selector');

    for (let ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  setCheck () {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this.settingsService.ajustes.tema;
    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
