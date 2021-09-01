import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public type = 'password'; // El type del input de contraseña
  public userName = '';
  public password = '';
  user: SocialUser;
  loggedIn: boolean;
  private aut: string; // Variable que dira si el usuario ingreso por google o facebook
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private navCtrl: NavController,
    private authService: SocialAuthService
  ) { }

  ngOnInit() {
    console.log('authstate');
    this.authService.authState.subscribe((user) => {
      if (user && user !== null)
      {
        const identity = {
          auth: this.aut,
          displayName: user.name,
          email: user.email,
          fotourl: user.photoUrl,
          nick: user.firstName + '-' + user.lastName.charAt(0),
          uid: user.id
        }

        this.userService.setIdentity(identity);
        console.log(identity);
        this.navCtrl.navigateForward('/home');
        setTimeout(() => {
          location.reload();
        }, 500);
      }
      else
      {
        this.alertService.alertaInformativa('Login error');
      }
    });
  }

  // Evento al pulsar el ojo para ver la contraseña
  changeInputType()
  {
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  signInWithGoogle(): void {
    this.aut = 'google';
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.aut = 'facebook';
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
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
