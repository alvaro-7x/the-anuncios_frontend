import { Injectable,Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentesService
{
	@Output() eventoBuscar: EventEmitter<any>= new EventEmitter();
	@Output() eventoDepartamentos: EventEmitter<any>= new EventEmitter();
  constructor() { }
}
