import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit 
{

  @Input() anuncio: any;
  @Input() i: number = 0;
  @Input() departamentoBusqueda: string = '';
  @Input() termino: string = '';

  constructor() { }

  ngOnInit(): void 
  {}

}
