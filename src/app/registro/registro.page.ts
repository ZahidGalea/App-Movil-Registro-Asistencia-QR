import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private router: Router, private toastController: ToastController) {
  }

  ngOnInit() {
  }

  /**
   * Muestra un toast al usuario
   *
   * @param message Mensaje a presentar al usuario
   * @param duration Duración el toast, este es opcional
   */
  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        message,
        duration: duration ? duration : 2000
      }
    );
    await toast.present();
  }

}
