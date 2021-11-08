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
      console.log(this.usuarioService.getUsuario(this.user.usuario))
      if (this.usuarioService.getUsuario(this.user.usuario).password === this.user.password) {
        this.router.navigate(['/asistencia'], navigationExtras); // navegamos hacia el Home y enviamos información adicional
      } else {
        this.presentToast('Usuario o password no validos');
      }
    } else {
      this.presentToast('Falta completar: ' + this.campo);
    }

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

