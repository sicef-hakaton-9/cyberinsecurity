import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { Features } from 'src/Features';
import { userReducer } from '../store/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../store/user/user.effects';



@NgModule({
  declarations: [LogInComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature(Features.User, userReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class LogInModule { }
