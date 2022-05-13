import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then( mod => mod.AuthModule)
	},
	{
		path: 'web',
		loadChildren: () => import('./datos/datos.module').then( mod => mod.DatosModule),
		canActivate: [ ValidarTokenGuard ],
		canLoad: [ ValidarTokenGuard ],
	},
	{
		path: '**',
		redirectTo: 'auth'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
