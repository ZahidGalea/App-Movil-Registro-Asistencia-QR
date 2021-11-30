import {Component, OnInit} from '@angular/core';
import {Asistencia, DatabaseService} from '../services/database.service';
import {ToastController} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {UtilitiesService} from '../services/utilities.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NgZone} from '@angular/core';

declare let google;


@Component({
  selector: 'app-home',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asistencias: Asistencia[] = [];
  registroAsistencia = {
    carrera: '',
    ramo: '',
    semestre: ''
  };
  selectedView: '';

  lat: any;
  long: any;
  address: any;

  constructor(private db: DatabaseService, private datepipe: DatePipe,
              private toastController: ToastController, private utilities: UtilitiesService,
              private geolocation: Geolocation,
              public zone: NgZone) {
  }


  async ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getAsistencias().subscribe(asistencias => {
          console.log(asistencias);
          this.asistencias = asistencias;
        });
      }

    });

    this.geolocation.getCurrentPosition().then((data) => {
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
    });
  }


  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        message,
        duration: duration ? duration : 2000
      }
    );
    await toast.present();
  };

  async addAsistencia() {
    const qrId = this.generateQr();
    const date = new Date();
    const currentDateString = this.datepipe.transform(date, 'yyyy-MM-dd');
    const currentTimeString = this.datepipe.transform(date, 'shortTime');


    if (this.utilities.validateModel(this.registroAsistencia)) {
      this.db.addAsistencia(this.registroAsistencia.carrera, currentDateString,
        currentTimeString, qrId, this.registroAsistencia.ramo, this.registroAsistencia.semestre);
      this.geoInformation();

    } else {
      this.presentToast('Falta completar campos ');
    }


  };

  generateQr() {
    return this.getRandomInt(100, 5000).toString();

  };

  getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  geoInformation() {
    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: this.lat,
      lng: this.long
    };

    geocoder.geocode({location: latlng}, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.address = results[0].formatted_address;
            this.presentToast('Registrado desde: ' + this.address, 8000);
          } else {
            console.log('No results found');
          }
        }
      }
    );

  }


}
