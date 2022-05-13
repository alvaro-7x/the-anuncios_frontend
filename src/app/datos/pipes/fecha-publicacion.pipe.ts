import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'fechaPublicacion'
})
export class FechaPublicacionPipe implements PipeTransform {

	meses: string[] = [ 'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre' ];

	constructor(private domSanitizer: DomSanitizer)
	{ }

	darFormatoFecha(fecha: string)
	{
		const fechaOriginal = fecha.split('-');
		if(fechaOriginal.length == 3)
		{
			const [anio, mes, dia] = fechaOriginal;
			const nuevoMes:string = this.meses[parseInt(mes) - 1];
			return `${dia}/${nuevoMes}/${anio}`;
		}
		else
		{
			return fecha;
		}
	}

  transform(value: string): string 
  {
  	const fechaPublicacion = value.split('|');
  	let fecha: string;
  	if(fechaPublicacion.length == 1)
    {
    	fecha = value;
    }
    else if(fechaPublicacion.length == 2)
    {
    	const [fechaDate, fechaText] = fechaPublicacion;
    	fecha = `Aproximadamente el:<br/>${this.darFormatoFecha(fechaDate)}<br/>(${fechaText})`;
    }
    else
    {
    	fecha = value;
    }

    return fecha;
  }

}
