import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

import { AuthRoutingModule } from './auth-routing.module';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { GoogleComponent } from './components/google/google.component';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    CaptchaComponent,
    GoogleComponent,
    LoginComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
