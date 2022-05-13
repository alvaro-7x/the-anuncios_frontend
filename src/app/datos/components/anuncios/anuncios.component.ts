import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';

import { Departamento, RespuestaAnuncio } from '../../interface/datos.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { DatosService } from '../../services/datos.service';
import { ComponentesService } from '../../services/componentes.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit, AfterViewInit, OnDestroy
{

  @Input() sitioWeb: string = 'uno';
  @Input() departamento!: string;
  @ViewChild('contenido', {static: true}) contenido!: ElementRef;
  
  departamentoBusqueda: string = '';
  termino: string = '';
  departamentos: Departamento[] = [];

  page: number = 1;
  totalPaginas: number = 1;
  totalAnuncios: number = 0;
  scroll!: any;
  cargarMasAnuncios: boolean = false;
  sinAnuncios: boolean = false;

  anuncios: RespuestaAnuncio[] = [];

  subscribeBusqueda: any;

  cargandoContenido: boolean = false;

  verResultadosBusqueda: boolean = false;
  verResultadosBusquedaError: boolean = false;

  constructor(
    private authService: AuthService,
    private datosService: DatosService,
    private componentesService: ComponentesService,
    private router: Router,
  ) { }

  ngOnInit(): void 
  {
    this.authService.existeToken();

    this.obtenerDatosPagina(false);

    this.listenerBusqueda();
  }

  listenerBusqueda()
  {
    this.subscribeBusqueda = this.componentesService.eventoBuscar.subscribe(
      (resp: any) => 
      {
        this.departamento = resp.departamento.replace(/[^a-zA-Z- ]/g,'');
        this.departamentoBusqueda = this.getNombreDepartamento(this.departamento);
        this.termino = resp.termino.replace(/[^a-zA-Z ]/g,'');
        this.page = 1;
        this.verResultadosBusqueda = false;
        this.sinAnuncios = false;
        this.anuncios = [];
        this.obtenerDatosPagina(true);
      },
      (error:any) =>
      {
      }
    );
  }

  ngAfterViewInit()
  {
    this.scroll = fromEvent(this.contenido.nativeElement,'scroll').subscribe(
      (e: any) => 
      {
        const scrollTopMax = e.target['scrollTopMax'];
        const scrollPosition = e.target['scrollTop'];

        if((scrollPosition -100) == (scrollTopMax -100))
        {
          if(!this.cargarMasAnuncios)
          {
            if(this.page < this.totalPaginas)
            {
              this.mostrarMas();
            }
            else
            {
              this.sinAnuncios = true;
            }
          }
        }
      }
    );
  }

  obtenerDatosPagina(resultadosBusqueda: boolean)
  {
    this.cargandoContenido = true;
    this.datosService.listarDatosPagina(this.sitioWeb, this.departamento, this.termino, this.page).subscribe(
      (resp:any) => 
      {
        this.anuncios = resp.anuncios;
        this.totalPaginas = resp.totalPaginas;
        this.cargandoContenido = false;
        this.verResultadosBusqueda = resultadosBusqueda;
        this.verResultadosBusquedaError = false;
        this.departamentos = resp.departamentos;
        this.totalAnuncios = resp.totalAnuncios;
        this.departamentoBusqueda = this.getNombreDepartamento(this.departamento);
        if(resultadosBusqueda == false)
          this.componentesService.eventoDepartamentos.emit(this.departamentos);
      },
      (error: any) => 
      {
        this.cargandoContenido = false;
        this.verResultadosBusqueda = resultadosBusqueda;
        this.verResultadosBusquedaError = true;
        this.totalAnuncios = 0;
        this.departamentoBusqueda = this.getNombreDepartamento(this.departamento);
      });
  }

  mostrarMas()
  {
    this.cargarMasAnuncios = true;
    this.page += 1;
    this.datosService.listarDatosPagina(this.sitioWeb, this.departamento, this.termino, this.page).subscribe( 
      (resp:any) => 
      {
        const anunciosNuevos = resp.anuncios;
        this.anuncios = this.anuncios.concat(anunciosNuevos);
        this.cargarMasAnuncios = false;
      },
      (error:any) =>
      {
        this.cargarMasAnuncios = false;
      }
    );
  }

  getNombreDepartamento(departamento: string)
  {
    let tmpDepartamento = undefined;
    if(this.departamentos && this.departamentos.length > 0)
    {
      tmpDepartamento = this.departamentos.find((d) => d.value==departamento);
    }
    return tmpDepartamento? tmpDepartamento.text:'';
  }

  ngOnDestroy()
  {
    if(this.scroll)
      this.scroll.unsubscribe();

    if(this.subscribeBusqueda)
      this.subscribeBusqueda.unsubscribe();
  }


}
