import { ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent implements OnInit, OnDestroy 
{

  @ViewChild('buttonDiv') buttonDiv!: ElementRef;
  token: string|undefined = undefined;
  google: any = null;
  window:any = (window as unknown);
  url: string = 'https://accounts.google.com/gsi/client';

  @Output() onResponseGoogle: EventEmitter<string> = new EventEmitter();

  constructor( private ngZone: NgZone, 
             private cd: ChangeDetectorRef
            ) { }

  ngOnInit(): void 
  {
    this.loadScript(this.url);
    this.window['initClient'] = (google:any) => this.ngZone.run( async() => 
    {
      await this.initGoogle(google);
    });
  }

  loadScript(url: string)
  {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    script.setAttribute("onload", "initClient(google)");
    script.setAttribute("id", "script-1");
    body.appendChild(script);

    const funcionInicio = document.createElement("script");
    funcionInicio.innerHTML = "function initClient(google){ };";
    funcionInicio.setAttribute("id", "script-2");
    body.appendChild(funcionInicio);
  }

  initGoogle(google: any)
  {
    this.google = google;

    this.google.accounts.id.initialize(
    {
      client_id: environment.GOOGLE_CLIENTE_ID,
      //callback: (response:any) => {this.getResponseGoogle(response);} 
      callback: (response:any) => { this.ngZone.run( () => this.getResponseGoogle(response))} 
    });
    if(this.buttonDiv)
    {
      this.google.accounts.id.renderButton( this.buttonDiv.nativeElement,{width:"242", height:'44'});
    }
    else
    {
      throw new Error('No se encontro el boton para realizar el login de google');
    }
  }

  getResponseGoogle(response: any)
  {
    if(response && response.credential)
    {
      const token = response.credential || undefined;
      this.token = token;

      //  Cerramos la session de la cuenta de google
      this.cerrarSesion();
    }

    this.onResponseGoogle.emit(this.token);

    // Utilizamos ChangeDetectorRef para actualizar la vista html de ser necesario
    //this.cd.detectChanges();
  }

  removeScript()
  {
    try
    {
      const body = <HTMLDivElement>document.body;
      const script1 = document.getElementById('script-1') || undefined;
      const script2 = document.getElementById('script-2') || undefined;
      if(script1)
       body.removeChild(script1!);

      if(script2)
       body.removeChild(script2!);
    }
    catch(e)
    {}
  }

  cerrarSesion()
  {
    this.google.accounts.id.disableAutoSelect();
    if(this.token)
    {
      const { email } = JSON.parse(atob(this.token.split('.')[1]));
      this.google.accounts.id.revoke(email, (done:any) => { });
    }
  }

  ngOnDestroy(): void
  {
    this.google.accounts.id.disableAutoSelect();
    this.cd.detach();

    this.removeScript();
  }

}
