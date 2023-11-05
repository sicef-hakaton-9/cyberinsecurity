import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit,OnDestroy  {
  constructor(private http: HttpClient) { }
  private map!: L.Map; 
  userCoords: L.LatLng = L.latLng(0, 0);
  base_url = `https://graphhopper.com/api/1/route?key=b95ec9be-3221-42e9-842a-5bf8c3cf991f`;

  alternative_route = {
      max_paths: 3,
  }
  
  

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 50, attribution: 'CartoDB' })
    ],
    zoom: 15,    
    center: latLng(51.5072, -0.1276)
  };  

  onMapReady(map: any) {
    console.log('map', map);
    console.log(this.map);
    this.map = map;
  }

  async ngAfterViewInit() {
    
    // if(!this.map){
    //     console.log(this.map);
    // //     this.map = L.map('map', {
    // //     zoom: this.options.zoom,
    // //     center: this.options.center
    // // });
    // this.map = L.map('leaflet-map');
    // }

    console.log(this.map);
    if (this.map) { 
      console.log('map');
      this.options.layers.forEach(layer => {
        if (layer) layer.addTo(this.map!);
      });


      //this.map.locate({setView: true, maxZoom: 50 });
      //this.userCoords=this.map.getCenter();
      //await this.contactApi();
    }
  }

  startPoint: L.LatLng | null = null;
  endPoint: L.LatLng | null = null;
  
  async onMapClick(e: MouseEvent) {
    
    if(!this.startPoint){
      this.startPoint = this.map.mouseEventToLatLng(e);
      const startMarker = L.marker(this.startPoint);
      if(startMarker)  startMarker.addTo(this.map);
    }
    else if(!this.endPoint){
      this.endPoint = this.map.mouseEventToLatLng(e);
      const endMarker = L.marker(this.endPoint);
      if (endMarker) {
        endMarker.addTo(this.map);
        // await this.contactApi();
      }      
    }

  }
  
  async findRoute(){
    if(this.startPoint && this.endPoint){
      await this.contactApi();
    }
  }

  async contactApi() {
    let result;
    console.log('api');
    const query = {
      points: [[this.startPoint?.lng, this.startPoint?.lat ], [this.endPoint?.lng, this.endPoint?.lat]],
      profile: 'foot',
      algorithm: 'alternative_route',
      alternative_route: this.alternative_route,
      points_encoded: false,
      instructions: false,
      elevation: false,
    }
    this.http.post(this.base_url, query).subscribe((res) => {
      result = res;
      let i = 0;
      (result as any).paths.forEach((path: any) => {
          const polyline = L.polyline(path.points.coordinates.map((coord: any) => [coord[1], coord[0]]), { color: colors[i] }).addTo(this.map);
          this.map.fitBounds(polyline.getBounds());
          i++;
      }
      );
    });
    console.log(result);
  }

  ngOnDestroy(): void {
    this.map.stopLocate();
  }

}
const colors = ['red', 'green', 'blue'];
