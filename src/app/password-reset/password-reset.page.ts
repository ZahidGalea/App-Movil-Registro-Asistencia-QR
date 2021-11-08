import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../login/usuario.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  constructor(private usuarioService: UsuarioService, private toastController: ToastController) {
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
