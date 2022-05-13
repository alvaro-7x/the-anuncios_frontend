import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad 
{
  constructor( private authService: AuthService,
               private router: Router)
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
  {
    return this.authService.renovarToken()
          .pipe(
            tap( valid => 
            {
              if( !valid )
              {
                this.router.navigateByUrl('/auth');
              }
            })
           );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
  {
    return this.authService.renovarToken()
          .pipe(
            tap( valid => 
            {
              if( !valid )
              {
                this.router.navigateByUrl('/auth');
              }
            })
           );
  }
}
