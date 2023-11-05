import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { MapService } from './map.service';
import { Camera} from '../models/camera.dto';
import { Lights } from '../models/lights.dto';
import { Crime } from '../models/crime.dto';
import { on } from '@ngrx/store';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit,OnDestroy  {
  constructor(private http: HttpClient, private service: MapService) { }
  private map!: L.Map; 
  userCoords: L.LatLng = L.latLng(0, 0);
  base_url = `https://graphhopper.com/api/1/route?key=b95ec9be-3221-42e9-842a-5bf8c3cf991f`;

  alternative_route = {
      max_paths: 3,
  }

  paths: L.LatLng[][] = [];
  
  cameras :Camera[]= [];
  lights: Lights[] = [];
  crime: Crime[] = [];


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
    this.service.getCameras().subscribe((res) => {
      this.cameras = res;
      this.cameras.forEach((camera) => {
        const marker = L.marker([camera.GPS.lat, camera.GPS.lng]).addTo(this.map);
        //this.cameraMap.set(camera.GPS.lat.toString().substring(0,4) + camera.GPS.lng.toString().substring(0,4), camera)
      });
    })
    this.service.getLights().subscribe((res) => {
      this.lights = res;
      this.lights.filter(street => street.light && street.light.length > 0).forEach((street) => {
        street.light.forEach((bulb) => {
          if(bulb.state){
            const marker = L.marker([bulb.lat, bulb.lng]).addTo(this.map);
          }
        })
      })
    });
    
    this.service.getCrimeData().subscribe((res) => {
      this.crime = res;
      this.crime.map((crime) => {if(crime.location) {
        const marker = L.marker([crime.location.latitude, crime.location.longitude]).addTo(this.map);
      }})
    });


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
  startMarker: L.Marker | null = null;
  endPoint: L.LatLng | null = null;
  endMarker: L.Marker | null = null;
  polyline: L.Polyline[] = [];


  async onMapClick(e: L.LeafletMouseEvent) {
    
    if(!this.startPoint){
      this.startPoint = this.map.mouseEventToLatLng(e.originalEvent);
      this.startMarker = L.marker(this.startPoint,
        {
        icon: L.icon({
          iconUrl: '../../assets/location-pin.jpg', 
          iconSize: [20, 40],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34]
        })
      })

      if(this.startMarker)  this.startMarker.addTo(this.map);
    }
    else if(!this.endPoint){
      this.endPoint = this.map.mouseEventToLatLng(e.originalEvent);
      this.endMarker = L.marker(this.endPoint,
        {
          icon: L.icon({
            iconUrl: '../../assets/location-pin.jpg', 
            iconSize: [20, 40],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
          })
        });
      if (this.endMarker) {
        this.endMarker.addTo(this.map);
        // await this.contactApi();
      }      
    }
    else if (this.startPoint && this.endPoint) {
      this.startPoint = this.endPoint = null;
      this.startMarker?.remove();
      this.startMarker = null;
      this.endMarker?.remove();
      this.endMarker = null;
      for (const p of this.polyline) {
        p.remove();
      }
    }
  }

  onCommentClick(){
    
  }
  
  async findRoute(){
    if(this.startPoint && this.endPoint){
      this.contactApi();

    }
  }

  contactApi(): void {
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
    this.http.post(this.base_url, query).subscribe({
      next: (res) => {
        result = res;
        let i = 0;
        (result as any).paths.forEach((path: any) => {
            //const polyline = L.polyline(path.points.coordinates.map((coord: any) => [coord[1], coord[0]]), { color: colors[i] }).addTo(this.map);
            this.paths[i] = path.points.coordinates.map((coord: any) => [coord[1], coord[0]]);
            console.log(this.paths[i]); //[lat, lng
            //this.map.fitBounds(polyline.getBounds());
            i++;
        });
      },
      complete: () => {
        this.calculateSafeRoute();
      }
    });
    console.log(result);
  }


  calculateSafeRoute() {
    try {
      console.log("calc");
      const routeScores: number[] = [];
      let highestSafetyScore = -Infinity;
      let safestRoute = null;

      let highestLights = 1;
      let highestCameras = 1;
      let highestCrimes = 1;
      for (const route of this.paths) {
        let routeSafetyScore = 0;
        let numberOfCameras = 0;
        let numberOfCrimes = 0;
        let numberOfLights = 0;
        for (let i = 0; i < route.length - 1; i++) {
          const segment = [route[i], route[i + 1]];
          console.log(segment);
          const coeffs = {
            A: segment[1].lat - segment[0].lat,
            B: segment[0].lng - segment[1].lng,
            C: segment[1].lat * segment[0].lng - segment[0].lat * segment[1].lng
          }
          //const middle = L.latLng((segment[0].lat + segment[1].lat) / 2, (segment[0].lng + segment[1].lng) / 2);
          //start je tacka M0 za koju gledamo udaljenost
          numberOfCameras += this.cameras.filter(camera => Math.abs(coeffs.A * camera.GPS.lng + coeffs.B * camera.GPS.lat + coeffs.C) / Math.sqrt(coeffs.A * coeffs.A + coeffs.B * coeffs.B) < 0.0001).length;
          numberOfCrimes += this.crime.filter(crime => (crime.location) && Math.abs(coeffs.A * crime.location.longitude + coeffs.B * crime.location.latitude + coeffs.C) / Math.sqrt(coeffs.A * coeffs.A + coeffs.B * coeffs.B) < 0.0001).length; 
          numberOfLights += this.lights.filter(street => street.light && street.light.filter(bulb => bulb.state) && street.light.filter(bulb => Math.abs(coeffs.A * bulb.lng + coeffs.B * bulb.lat + coeffs.C) / Math.sqrt(coeffs.A * coeffs.A + coeffs.B * coeffs.B) < 0.0001)).length;
          //const dist = Math.abs(coeffs.A * start.lng + coeffs.B * start.lat + coeffs.C) / Math.sqrt(coeffs.A * coeffs.A + coeffs.B * coeffs.B);
          //routeSafetyScore += segmentSafetyScore;
        }
        if (numberOfCameras > highestCameras) {
          highestCameras = numberOfCameras;
        }
        if (numberOfCrimes > highestCrimes) {
          highestCrimes = numberOfCrimes;
        }
        if (numberOfLights > highestLights) {
          highestLights = numberOfLights;
        }
        
        const relativeLights = numberOfLights / highestLights;
        const relativeCameras = numberOfCameras / highestCameras;
        const relativeCrimes = (numberOfCrimes / highestCrimes);
        routeSafetyScore = (relativeLights + relativeCameras)/2 - relativeCrimes;

        routeScores.push(routeSafetyScore);

      }
  
      for (let i = 0; i < routeScores.length; i++) {
        for (let j = i + 1; j < routeScores.length-1; j++) {
          if (routeScores[i] < routeScores[j]) {
            const tmp = routeScores[i];
            routeScores[i] = routeScores[j];
            routeScores[j] = tmp;
            const tmp2 = this.paths[i];
            this.paths[i] = this.paths[j];
            this.paths[j] = tmp2;
          }
        }
      }
      for (let i = 0; i < routeScores.length; i++) {
        this.polyline[i] = L.polyline(this.paths[i], {color: colors[i]}).addTo(this.map);
        this.map.fitBounds(this.polyline[i].getBounds());
      }
    } catch (error) {
      console.error('Error calculating the safest route:', error);
    }
  }


  

  
  calculateSegmentSafetyScore(segment: any): number {
    let safetyScore = 0;
  
    // Calculate score based on lighting. More lights could mean higher score.
    // Calculate score based on camera coverage. More cameras could mean higher score.
    // Calculate score reduction based on crime data. More crimes could mean lower score.
  
    // Combine these factors into a final score for the segment.
    return safetyScore;
  }

  ngOnDestroy(): void {
    this.map.stopLocate();
  }



}
const colors: string[] = ['white', 'red', 'black'];
