import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {RegistroAsistenciaService} from './registro-asistencia.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registro = {
    qrId: '',
  };


  constructor(private router: Router,
              private activerouter: ActivatedRoute,
              private toastController: ToastController,
              private datepipe: DatePipe,
              private registroAsistenciaService: RegistroAsistenciaService) {
  }

  ngOnInit() {
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

  registroAsistencia() {
    const navigationExtras: NavigationExtras = {
      state: {
        registro: this.registro
      }
    };
    const qrInfo = this.getQrInformation();
    console.log(qrInfo);
    if (qrInfo === undefined) {
      this.presentToast('QR Con problemas');
      Error('Problemas con el QR');
    } else {
      const date = new Date();
      const currentDateString = this.datepipe.transform(date, 'yyyy-MM-dd');
      const currentTimeString = this.datepipe.transform(date, 'shortTime');
      console.log(currentDateString);
      console.log(currentTimeString);
      this.registroAsistenciaService.addRegistroAsistencia(qrInfo.carrera, currentDateString,
        currentTimeString, qrInfo.qrId, qrInfo.ramo, qrInfo.semestre);
      this.presentToast('Información resguardada correctamente.');
      console.log(this.registroAsistenciaService.getRegistrosAsistencias());
      this.router.navigate(['/asistencia'], navigationExtras);
    }

  };

  getQrInformation() {
    if (this.registro.qrId === '123') {
      return {
        carrera: 'Ing. Informática',
        qrId: '123',
        ramo: 'Progra Movil',
        semestre: '4'
      };
    }

  };


}
