import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { WebUnoComponent } from './pages/web-uno/web-uno.component';
import { WebDosComponent } from './pages/web-dos/web-dos.component';

const routes: Routes = [{
	path: '',
	component: DashboardComponent,
	children: [
		{
			path: 'uno',
			component: WebUnoComponent
		},
		{
			path: 'dos',
			component: WebDosComponent
		},
		{
			path: '**',
			redirectTo: 'uno'
		}
	]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosRoutingModule { }
