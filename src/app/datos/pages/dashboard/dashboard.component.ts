import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSidenav } from '@angular/material/sidenav';

import { BuscarComponent } from '../../components/buscar/buscar.component';
import { ComponentesService } from '../../services/componentes.service';
import { DatosService } from '../../services/datos.service';
import { Departamento } from '../../interface/datos.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  showFiller = false;

  departamentos: Departamento[] = [];
  subscribeDepartamentos: any;

  usuario: any;
  imgUsuario: string = '';

  constructor(
    private datosService: DatosService,
    private _bottomSheet: MatBottomSheet,
    private componentesService: ComponentesService,
    private authService: AuthService,
    private router: Router,
  )
  {
    this.usuario = this.authService.getUsuario();
    this.imgUsuario = this.usuario.picture;

    if(this.usuario.picture === 'anonimo')
      this.imgUsuario = 'assets/img/anonimo.png';
  }

  ngOnInit(): void
  {
    this.subscribeDepartamentos = this.componentesService.eventoDepartamentos.subscribe((resp: any) => {
      this.departamentos = resp;
    });
  }

  abrirBusqueda(): void 
  {
    this._bottomSheet.open(BuscarComponent, {data: this.departamentos});
    this.sidenav.close();
  }

  cerrarSesion()
  {
    this.authService.cerrarSesion();
    this.router.navigate(['auth']);
  }

  ngOnDestroy()
  {
    this.subscribeDepartamentos.unsubscribe();
  }

}
