import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { userReducer } from './store/user/user.reducer';
import { SignUpModule } from './sign-up/sign-up.module';
import { LogInModule } from './log-in/log-in.module';
// import { MapComponent } from './map/map.component';
import { CommentComponent } from './comment/comment.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
// import { MapModule } from './map/map.module';
import { HomeModule } from './home/home.module';
import { CommentModule } from './comment/comment.module';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';
import { MapModule } from './map/map.module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SignUpModule,
    HomeModule,
    NavBarModule,
    CommentModule,
    LogInModule,
    MapModule,
    LeafletModule,
    StoreModule.forRoot(userReducer, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: isDevMode() }),
    EffectsModule.forRoot([]),
    RouterModule.forRoot([
      { path: 'sign-up', component: SignUpComponent },
      { path: 'log-in', component: LogInComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full'},
      { path: 'map', component: MapComponent},
      { path:'nav-bar', component: NavBarComponent},
      { path:'comment', component: CommentComponent},
      { path:'home', component: HomeComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

