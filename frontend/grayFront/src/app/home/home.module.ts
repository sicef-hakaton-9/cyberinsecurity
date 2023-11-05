import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    NavBarModule,
    RouterModule,
  ]
})
export class HomeModule { }
