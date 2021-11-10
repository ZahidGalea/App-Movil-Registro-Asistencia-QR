import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../login/usuario.service';
import {ToastController} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import {Usuario} from '../login/usuario.model';
import {AppComponent} from '../app.component';

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

  constructor(private usuarioService: UsuarioService,
              private toastController: ToastController,
              private router: Router, private appComponent: AppComponent) {
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
  }

  ingresar() {
    if (this.validateModel(this.user)) {
      this.usuarioServiceS = this.usuarioService.getUsuario(this.user.usuario);
      if (this.appComponent.isEmptyObject(this.usuarioService.getUsuario(this.user.usuario)) === false) {
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


  validateModel(model: any) {
    for (const [key, value] of Object.entries(model)) {
      if (value === '') {
        this.campo = key;
        return false;
      }
    }
    return true;
  }

}
