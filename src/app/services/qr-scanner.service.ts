import {Injectable} from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {

  constructor(private qrScanner: QRScanner, private toastController: ToastController) {
  }


  scanQr() {

// Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.presentToast('Camara autorizada.');
          // camera permission was granted


          // start scanning
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.presentToast('Se ecaneo: ' + text);
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          this.presentToast('Camara denegada, sin permisos.');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => this.presentToast('Error con la camara ' + e));

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


}
