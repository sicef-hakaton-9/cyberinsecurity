// import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.css']
// })
// export class MapComponent implements AfterViewInit {
//   @ViewChild('googleMap', { static: false }) mapElement!: ElementRef<HTMLDivElement>;
//   map: google.maps.Map | null = null;
//   directionsService!: google.maps.DirectionsService;
//   directionsRenderer!: google.maps.DirectionsRenderer;

//   constructor() { }

//   ngAfterViewInit(): void {
//     this.loadGoogleMapsApi().then(() => {
//       this.initMap();
//     });
//   }

//   private loadGoogleMapsApi(): Promise<void> {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCAo1c_UMQLk_BpLwkxqZM3fwB-DH6azdw&callback=initMap`;
//       script.async = true;
//       script.defer = true;
//       window.initMap = () => {
//         this.initMap();
//         resolve();
//       };
//       document.head.appendChild(script);
//     });
//   }

//   initMap(): void {
//     this.directionsService = new google.maps.DirectionsService();
//     this.directionsRenderer = new google.maps.DirectionsRenderer();
//     this.map = new google.maps.Map(this.mapElement.nativeElement, {
//       center: { lat: 51.59, lng: -0.17 },
//       zoom: 2,
//     });
//     this.directionsRenderer.setMap(this.map);
//     this.calculateAndDisplayRoute();
//   }

//   calculateAndDisplayRoute() {
//     const request: google.maps.DirectionsRequest = {
//       origin: { lat: 37.7749, lng: -122.4194 }, // Starting point
//       destination: { lat: 34.0522, lng: -118.2437 }, // Destination point
//       travelMode: google.maps.TravelMode.DRIVING,
//     };
  
//     this.directionsService.route(request, (response, status) => {
//       if (status === 'OK') {
//         this.directionsRenderer.setDirections(response);
//       } else {
//         console.error('Directions request failed due to ' + status);
//       }
//     });
//   }
// }
