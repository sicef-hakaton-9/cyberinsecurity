import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { MapService } from './map.service';
import { CommentModule } from '../comment/comment.module';



@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    LeafletModule,
    NavBarModule,
    CommentModule
  ],
  providers: [MapService]
})
export class MapModule { 
  
}
