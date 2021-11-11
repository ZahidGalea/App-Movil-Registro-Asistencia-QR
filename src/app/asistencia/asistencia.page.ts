import {Component, OnInit} from '@angular/core';
import {Asistencia, DatabaseService} from '../servicios/database.service';
import {ToastController} from '@ionic/angular';
import {DatePipe} from '@angular/common';


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
  selectedView: 'registro';

  constructor(private db: DatabaseService, private datepipe: DatePipe, private toastController: ToastController) {

  }

  ngOnInit() {
    this.presentToast('Cargando asistencias', 1000);
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        console.log(ready);
        this.db.getAsistencias().subscribe(asistencias => {
          console.log(asistencias);
          this.asistencias = asistencias;
        });
      }

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

  addAsistencia() {
    const qrId = this.generateQr();
    const date = new Date();
    const currentDateString = this.datepipe.transform(date, 'yyyy-MM-dd');
    const currentTimeString = this.datepipe.transform(date, 'shortTime');

    this.db.addAsistencia(this.registroAsistencia.carrera, currentDateString,
      currentTimeString, qrId, this.registroAsistencia.ramo, this.registroAsistencia.semestre);
    this.presentToast('Información resguardada correctamente.');

  };

  generateQr() {
    return this.getRandomInt(100, 5000).toString();

  };

  getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}
