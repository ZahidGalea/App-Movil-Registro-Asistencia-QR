import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {DatabaseService, Usuario} from '../servicios/database.service';
import {AppComponent} from '../app.component';
import {UtilitiesService} from '../servicios/utilities.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  user = {
    usuario: ''
  };
  usuario: Usuario;
  campo: string;

  constructor(private db: DatabaseService,
              private toastController: ToastController,
              private router: Router, private appComponent: AppComponent, private utilities: UtilitiesService) {
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
    if (this.utilities.validateModel(this.user)) {
      if (this.utilities.isEmptyObject(this.db.getUsuario(this.user.usuario)) === false) {
        console.log(this.db.getUsuario(this.user.usuario));
        this.presentToast('Correo enviado.', 10000);
        this.router.navigate(['/login']);
      } else {
        this.presentToast('Usuario no encontrado');
      }
    } else {
      this.presentToast('Falta completar el campo');
    }

  }


}
