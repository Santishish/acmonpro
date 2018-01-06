import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtPorcentaje') txtPorcentaje: ElementRef;

  @Input() leyenda: string = '';
  @Input() porcentaje: number = 50;
  @Output('onClick') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
  }

  onChanges(newValue: number) {

    if (!newValue || newValue < 0) this.porcentaje = 0;
    if (newValue > 100) this.porcentaje = 100;
    this.txtPorcentaje.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
  }

  cambiarValor(valor: number) {
    if (this.porcentaje + valor < 0 || this.porcentaje + valor > 100) return;
    this.porcentaje += valor;
    this.cambioValor.emit(this.porcentaje);
    this.txtPorcentaje.nativeElement.focus();
  }

}
