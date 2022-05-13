import { Injectable } from '@angular/core';
import { HttpContextToken, HttpErrorResponse, HttpHeaders, HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse } from '@angular/common/http';
import { EMPTY, NEVER, Observable, of, pipe, throwError } from 'rxjs';
import { TOKEN_REQUERIDO } from './token.httpcontext';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class VerificarTokenInterceptor implements HttpInterceptor {

  constructor( private router: Router, private authService: AuthService)
  {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    let requestClone = request;

    if (requestClone.context.get(TOKEN_REQUERIDO) === true)
    {
      const token = localStorage.getItem('token') || '';

      if(token.length == 0)
      {
        this.authService.cerrarSesion();
        this.router.navigate(['auth']);
        return NEVER;
      }
      else
      {
        const headers = new HttpHeaders().set('x-token',token);
        requestClone = request.clone({headers: headers});
      }
    }

    return next.handle(requestClone).pipe(
      tap( (httpEvent: any) => 
      {
        if (httpEvent instanceof HttpResponse) 
        {
          if(httpEvent.headers.has('x-token'))
          {
            const nuevoToken = httpEvent.headers.get('x-token') || '';

            if( nuevoToken.length == 0 )
            {
              this.authService.cerrarSesion();
            }
            else
            {
              localStorage.setItem('token', nuevoToken);
            }
          }
        }
      }),
      catchError( this.manejarError )
    );
  }


  manejarError( error: HttpErrorResponse )
  {
    if(error.headers.has('x-token'))
    {
      const token = error.headers.get('x-token') || '';
      if( token.length == 0 )
      {
        localStorage.removeItem('token');
      }
    }
    return throwError('Ocurrio un error.');
  }
}
