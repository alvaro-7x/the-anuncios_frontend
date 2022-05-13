import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  aFormGroup!: FormGroup;
  lang: string = 'es';
  siteKey: string = environment.SITEKEY_CAPTCHA;

  @Output() onResponseReCaptcha: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: FormBuilder)
  {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  ngOnInit() 
  {
  }

  handleSuccess(response: string)
  {
    this.onResponseReCaptcha.emit(response);
  }

}
