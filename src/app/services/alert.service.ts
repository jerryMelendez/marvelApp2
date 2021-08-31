import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public loading: any;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) { }

  async alertaInformativa( message: string ) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
  stopLoading()
  {
    if (this.loading)
    {
      this.loading.dismiss();
    }
    else
    {
      setTimeout(() => {
        if (this.loading)
        {
          this.loading.dismiss();
        }
      }, 4000);
    }
  }

  async showLoading(message: string = null)
  {
    this.loading = await this.loadingCtrl.create({
      message
    });

    await this.loading.present();
  }

  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      position: 'bottom',
      color: 'white',
      duration: 3000
    });
    toast.present();
  }
}
