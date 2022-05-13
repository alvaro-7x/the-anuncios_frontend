import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RespuestaAuth } from '../../interface/auth.interface';

enum TipoVerificacion {
  google, 
  recaptcha
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cargando: boolean = false;

  constructor( private router: Router,
               private authService: AuthService,
              ) { }

  ngOnInit(): void 
  {
  }

  getResponseGoogle(token: string)
  {
    this.verificarResponse(TipoVerificacion.google, token);
  }

  getResponseRecaptcha(response: string)
  {
    this.verificarResponse(TipoVerificacion.recaptcha, response);
  }

  verificarResponse(tipoVerificacion: TipoVerificacion, tokenResponse: string)
  {
    this.cargando = true;
    if(tipoVerificacion === TipoVerificacion.google)
    {
      this.authService.verificarTokenGoogle(tokenResponse).subscribe( (resp: RespuestaAuth) => {
        this.verificacionExitosa(resp);
      });
    }
    else if (tipoVerificacion === TipoVerificacion.recaptcha)
    {
      this.authService.verificarResponseRecaptcha(tokenResponse).subscribe( (resp: RespuestaAuth) => {
        this.verificacionExitosa(resp);
      });
    }
    else
    {
      // console.log('error ningun metodo implementado de autenticacion');
    }
  }

  verificacionExitosa(respuesta: RespuestaAuth)
  {
    this.cargando = false;
    if(respuesta.token)
    {
      localStorage.setItem('token',respuesta.token);
      this.router.navigate(['web']);
    }
    else
    {
      localStorage.removeItem('token');
    }
  }

}
