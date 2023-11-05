import { AfterViewInit, Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit  {
    constructor(private http: HttpClient) { }
private map!: L.Map; // Declare map property correctly
     base_url = `https://graphhopper.com/api/1/route?key=b95ec9be-3221-42e9-842a-5bf8c3cf991f`;
     alternative_route = {
        max_paths: 3,
     }
     query = {
        points: [[0.1276, 51.5072 ], [0.12, 51.50]],
        profile: 'foot',
        algorithm: 'alternative_route',
        alternative_route: this.alternative_route,
        points_encoded: false,
        instructions: false,
        elevation: false,
     }
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,    
    center: latLng(51.5072, -0.1276)
  };  

  onMapReady(map: any) {
    console.log('map', map);
    console.log(this.map);
    this.map = map;
  }
  async ngAfterViewInit() {
    // Initialize the map property, checking it is not undefined
    
    // if(!this.map){
    //     console.log(this.map);
    // //     this.map = L.map('map', {
    // //     zoom: this.options.zoom,
    // //     center: this.options.center
    // // });
    // this.map = L.map('leaflet-map');
    // }
    console.log(this.map);
    if (this.map) { // Check that this.map is not undefined
      // Add the tile layer to the map
      console.log('map');
      this.options.layers.forEach(layer => {
        if (layer) layer.addTo(this.map!);
      });
      this.map.locate({setView: true, maxZoom: 16, watch: true});
      //await this.contactApi();
    }
    setTimeout(() => console.log(this.map), 5000);
    }
  


async contactApi() {
    let result;
    console.log('api');
    this.http.post(this.base_url, this.query).subscribe((res) => {
        result = res;
        (result as any).paths.forEach((path: any) => {
            const polyline = L.polyline(path.points.coordinates.map((coord: any) => [coord[1], coord[0]]), { color: 'blue' }).addTo(this.map);
            this.map.fitBounds(polyline.getBounds());
        }
        );
    });
    console.log(result);
}
}
