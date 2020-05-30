import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';




@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private _alertController: AlertController, private _toastController : ToastController ) {

  }

  async presentInfoAlert(message: string) {
    const alert = await this._alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message : string) {
    const toast = await this._toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
