import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../login/usuario.service';
import {ToastController} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import {Usuario} from '../login/usuario.model';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  user = {
    usuario: ''
  };
  usuarioServiceS: Usuario;
  campo: string;

  constructor(private usuarioService: UsuarioService, private toastController: ToastController, private router: Router) {
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

  ingresar() {
    // Se declara e instancia un elemento de tipo NavigationExtras
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    if (this.validateModel(this.user)) {
      this.usuarioServiceS = this.usuarioService.getUsuario(this.user.usuario);
      if (this.isEmptyObject(this.usuarioService.getUsuario(this.user.usuario)) === false) {
        console.log(this.usuarioService.getUsuario(this.user.usuario));
        this.presentToast('Correo enviado.', 10000);
        this.router.navigate(['/login']);
      } else {
        this.presentToast('Usuario no encontrado');
      }
    } else {
      this.presentToast('Falta completar: ' + this.campo);
    }

  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  validateModel(model: any) {
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (const [key, value] of Object.entries(model)) {
      console.log(model);
      console.log(key);
      console.log(value);
      // Si un valor es "" se retornara false y se avisara de lo faltante
      if (value === '') {
        // Se asigna el campo faltante
        this.campo = key;
        // Se retorna false
        return false;
      }
    }
    return true;
  }

}
