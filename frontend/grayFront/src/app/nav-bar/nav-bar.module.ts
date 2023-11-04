import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../store/user/user.reducer';
import { Features } from 'src/Features';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../store/user/user.effects';



@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    StoreModule.forFeature(Features.User, userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  exports: [NavBarComponent]
})
export class NavBarModule { }
