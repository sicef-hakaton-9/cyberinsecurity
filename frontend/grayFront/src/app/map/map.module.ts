import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';



@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    LeafletModule,
  ],
})
export class MapModule { 
  
// }
