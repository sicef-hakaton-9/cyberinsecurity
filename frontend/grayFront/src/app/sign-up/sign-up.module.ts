import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../store/user/user.effects';
import { RouterLink, RouterModule } from '@angular/router';
import { userReducer } from '../store/user/user.reducer';
import { Features } from 'src/Features';
import { SignUpComponent } from './sign-up.component';



@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature(Features.User, userReducer),
    EffectsModule.forFeature([UserEffects]),
    RouterModule,
    RouterLink  
  ]
})
export class SignUpModule { }
