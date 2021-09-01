import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public type = 'password'; // El type del input de contraseña
  public userName = '';
  public password = '';
  
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  // Evento al pulsar el ojo para ver la contraseña
  changeInputType()
  {
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  loginGoogle()
  {
    // this.userService.loginGoogleUser()
    // .then((user: any) => {
    //   // this.alertService.showLoading('Comprobando datos....');

    //   // Guarda los datos del usuario en el local storage
    //   this.userService.setIdentity(user);
    //   this.navCtrl.navigateForward('/home');
    //   setTimeout(() => {
    //     location.reload();
    //   }, 500);
    // }).catch((err) => {

    // });
  }

  loginFacebook()
  {
    // this.userService.loginFacebookUser()
    // .then((user: any) => {
    //   this.userService.setIdentity(user);
    //   this.navCtrl.navigateForward('/home');
    //   setTimeout(() => {
    //     location.reload();
    //   }, 500);
    // }).catch((err) => {

    // })
  }

  // Entrar como un usuario invitado y crear las credenciales de este
  async loginAsGuest()
  {
    const identity = await this.userService.comprobarDatosInvitado();

    if (identity !== null)
    {
      this.userService.setIdentity(identity);
      this.navCtrl.navigateForward('/home');
      setTimeout(() => {
        location.reload();
      }, 500);
    }
    else
    {
      const iden = {
        auth: 'guest',
        displayName: 'guest user',
        email: '',
        fotourl: '../../../assets/images/user.png',
        foto: '',
        nick: 'guestU',
        uid: '17GEtwUqJapXiWbz69YaLffOHEs5'
      }
      this.userService.setIdentity(iden);
      this.navCtrl.navigateForward('/home');
        setTimeout(() => {
          location.reload();
        }, 500);
    }
  }
}
