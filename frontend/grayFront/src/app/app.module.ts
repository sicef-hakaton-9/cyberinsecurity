import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'sign-up', component: SignUpComponent },
      { path: 'log-in', component: LogInComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
