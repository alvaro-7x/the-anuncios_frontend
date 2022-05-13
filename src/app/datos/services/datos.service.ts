import { catchError, debounceTime } from 'rxjs/operators';
import { HttpClient, HttpContext, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { of, pipe, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { RespuestaAnuncio } from '../interface/datos.interface';
import { TOKEN_REQUERIDO } from '../../interceptors/token.httpcontext';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosService 
{
  url: string = environment.url;
  context: HttpContext = new HttpContext();

  constructor(private http: HttpClient, 
              private router: Router,
              private authService: AuthService)
  {
    this.context.set(TOKEN_REQUERIDO, true);
  }

  manejarError(error: HttpErrorResponse)
  {
    if(!localStorage.getItem('token'))
    {
      this.authService.cerrarSesion();
    }
    return throwError('El token no es válido o no existe');
  }

  listarDatosPagina(sitioWeb: string = 'uno', departamento: string, termino: string, page: number=1)
  {
    const params = new HttpParams()
          .append("departamento",departamento)
          .append("termino",termino)
          .append("page",page);

    return this.http.get<RespuestaAnuncio>(`${this.url}/web/${sitioWeb}`, {params: params, context: this.context} )
                    .pipe( 
                      debounceTime(1500),
                      catchError( (error: HttpErrorResponse) => this.manejarError(error) )
                    );
  }

}
