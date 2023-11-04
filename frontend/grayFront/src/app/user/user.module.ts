import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../store/user/user.reducer';
import { Features } from 'src/Features';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../store/user/user.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(Features.User, userReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserModule { }
