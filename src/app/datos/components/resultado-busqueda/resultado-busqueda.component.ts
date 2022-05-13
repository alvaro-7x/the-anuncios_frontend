import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit {

	@Input() verResultadosBusqueda: boolean = false;
	@Input() totalAnuncios: number = 0;
	@Input() departamentoBusqueda: string = '';
	@Input() termino: string = '';
  @Input() error: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
