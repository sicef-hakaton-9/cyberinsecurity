import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent  {
  
  lat = 51.678418;
  lng = 0;
  zoom = 2;
  mapType="satellite";
  //center: google.maps.LatLngLiteral = { lat: 51.59, lng: -0.17 };
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 15,
    center: latLng(51.5072, -0.1276)
  };
  
  
}