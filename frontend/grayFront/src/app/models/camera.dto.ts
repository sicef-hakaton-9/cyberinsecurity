export interface Camera {
    Camera: string,
    Zone: string,
    Location: string,
    GPS: LatLong
}

export interface LatLong {
    lat: number,
    lng: number
}