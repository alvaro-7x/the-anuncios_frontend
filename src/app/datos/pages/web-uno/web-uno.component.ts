import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-uno',
  templateUrl: './web-uno.component.html',
  styleUrls: ['./web-uno.component.css']
})
export class WebUnoComponent implements OnInit
{
	sitioWeb: string = 'uno';
	departamento: string = 'la-paz';
  constructor() { }

  ngOnInit(): void
  {
  }

}
