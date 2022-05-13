import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

import { ComponentesService } from '../../services/componentes.service';
import { Departamento } from '../../interface/datos.interface';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit 
{
  departamentos: Departamento[] = [];
  miFormulario: FormGroup = this.fb.group({
    'departamento': ['', Validators.required],
    'termino': ['',],
  });

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BuscarComponent>,
    private componentesService: ComponentesService,
    private fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: [],
  ) {
    this.departamentos = data;
  }

  ngOnInit(): void {

  }

  cerrarBusqueda(event: MouseEvent): void
  {
    event.preventDefault();
    this._bottomSheetRef.dismiss();
  }

  buscarAnuncios()
  {
    if(this.miFormulario.invalid)
      return;
    
    this.componentesService.eventoBuscar.emit(this.miFormulario.value);
    this._bottomSheetRef.dismiss();
  }

}
