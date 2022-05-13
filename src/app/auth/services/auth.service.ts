import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaAuth, Usuario } from '../interface/auth.interface';
import { of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  url: string = environment.url;
  constructor(private http: HttpClient, private router: Router) { }
  private usuario: Usuario = this.defaultUser();

  verificarTokenGoogle(token: string)
  {
    const data = {
      id_token: token
    };
    return this.http.post<RespuestaAuth>(`${this.url}/auth/google`, data);
  }

  verificarResponseRecaptcha(response: string)
  {
    const data = {
      responseCaptcha: response
    };
    return this.http.post<RespuestaAuth>(`${this.url}/auth/recaptcha`, data);
  }

  getUsuario()
  {
    return { ...this.usuario };
  }

  renovarToken()
  {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('x-token', token);

    return this.http.get<RespuestaAuth>(`${this.url}/auth/renovar-token`,{headers: headers})
                    .pipe(
                      map( resp => 
                      {
                        localStorage.setItem('token', resp.token!);
                        this.usuario = resp.usuario!;
                        return resp.estado;
                      }),
                      catchError( (error: any) => { return of(false); })
                    );
  }

  existeToken()
  {
    const token = localStorage.getItem('token') || '';
    if(token.length == 0)
      this.cerrarSesion();
    return;
  }

  cerrarSesion()
  {
    this.usuario = this.defaultUser();
    localStorage.removeItem('token');
    this.router.navigate(['auth']);
  }

  defaultUser()
  {
    return {
      email: '',
      given_name: '',
      family_name: '',
      picture: '',
      time: new Date()
    };
  }
}
