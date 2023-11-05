import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Camera } from "../models/camera.dto";
import { Lights } from "../models/lights.dto"
import { Crime } from "../models/crime.dto";

@Injectable()
export class MapService {
  constructor(private http: HttpClient) { }

  getCrimeData(): Observable<Crime[]> {
    return this.http.get<Crime[]>('http://localhost:3004/crimes?month="2023-06');
  }

  getCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>('http://localhost:3004/cameras');
  }

  getLights(): Observable<Lights[]> {
    return this.http.get<Lights[]>('http://localhost:3004/lights');
  }


}
