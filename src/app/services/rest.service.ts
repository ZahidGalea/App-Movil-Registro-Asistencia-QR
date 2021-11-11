import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


interface Dato {
  userId: string;
  id: string;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})


export class RestService {
  dato: Dato;

  constructor(
    private httpClient: HttpClient) {
  }

  getDatosNumbersApi(month, day) {
    return this.httpClient.get(`https://numbersapi.p.rapidapi.com/${month}/${day}/date`, {
      headers: {
        'x-rapidapi-host': 'numbersapi.p.rapidapi.com',
        'x-rapidapi-key': '8bee725bcdmsh99906e299d6148ep1c8096jsnab45c8b6e60d'
      },
      params: {
        fragment: false,
        json: true
      }
    });
  }


}
