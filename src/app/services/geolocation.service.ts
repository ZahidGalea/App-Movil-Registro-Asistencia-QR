import {Injectable} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private geolocation: Geolocation) {
  }

  getGeoLocation() {
    this.geolocation.getCurrentPosition().then((resp) => resp).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
