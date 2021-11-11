import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Router, NavigationExtras} from '@angular/router';
import {DatabaseService, Usuario} from '../servicios/database.service';
import {UtilitiesService} from '../servicios/utilities.service';


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

  constructor(private db: DatabaseService,
              private toastController: ToastController,
              private router: Router,
              private utilities: UtilitiesService) {
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
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    if (this.utilities.validateModel(this.user)) {
      this.db.getUsuario(this.user.usuario).then(data => {
          if (data.password === this.user.password) {
            this.router.navigate(['/asistencia'], navigationExtras);
          } else {
            this.presentToast('Password no valido');
          }
        }
      ).catch(reason => this.presentToast('Usuario no encontrado'));
    } else {
      this.presentToast('Falta completar campos ');
    }
    ;

  }


}

