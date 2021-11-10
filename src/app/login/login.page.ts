import {Component, OnInit} from '@angular/core';
import {UsuarioService} from './usuario.service';
import {ToastController} from '@ionic/angular';
import {Router, NavigationExtras} from '@angular/router';
import {Usuario} from './usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    usuario: '',
    password: ''
  };
  usuarioServiceS: Usuario;
  campo: string;

  constructor(private usuarioService: UsuarioService,
              private toastController: ToastController,
              private router: Router) { }

  ngOnInit() {
    this.presentToast('Porfavor, logueate para continuar', 6000);
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
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    if (this.validateModel(this.user)) {
      this.usuarioServiceS = this.usuarioService.getUsuario(this.user.usuario);
      if (this.usuarioService.getUsuario(this.user.usuario).password === this.user.password) {
        this.router.navigate(['/asistencia'],  navigationExtras);
      } else {
        this.presentToast('Usuario o password no validos');
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

