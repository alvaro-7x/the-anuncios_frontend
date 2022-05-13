import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-dos',
  templateUrl: './web-dos.component.html',
  styleUrls: ['./web-dos.component.css']
})
export class WebDosComponent implements OnInit {

	sitioWeb: string = 'dos';
	departamento: string = 'la paz';
  constructor() { }

  ngOnInit(): void
  {}

}
