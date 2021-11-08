import {Component, OnInit} from '@angular/core';
import {UsuarioService} from './usuario.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private usuarioService: UsuarioService, private toastController: ToastController) {
  }

  ngOnInit() {
    this.presentToast('Hola perrin', 600);
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
