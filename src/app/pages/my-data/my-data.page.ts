import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var window: any;
@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.page.html',
  styleUrls: ['./my-data.page.scss'],
})
export class MyDataPage implements OnInit {

  public width = (window.innerWidth) * 0.5;
  public photoUrl: string = '';
  public identity: any = {};
  public image: SafeResourceUrl;
  public lat: number = 0;
  public lng: number = 0;
  selectedFile: any = {};
  public fotourl: any;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    public platform: Platform,
    private geoLocation: Geolocation,
    private camera: Camera,
    private sanitizer: DomSanitizer,
  ) { 
    this.getIdentity();
    this.getLocation();}

  ngOnInit() {
  }

  // El getLocation obtendra las coordenadas y las enviará al componente de mapa
  async getLocation() {
    this.geoLocation.getCurrentPosition().then(async (resp) => {

      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      console.log([this.lat, this.lng]);
     }).catch((error) => {
     });
  }

  async getIdentity()
  {
    console.log('getidentity');
    this.identity = await this.userService.getIdentity();
    this.photoUrl = this.identity.foto !== '' ? this.identity.foto : this.identity.fotourl;
  }

  tomarFoto()
  {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    // Captura la foto de la camara
    this.camera.getPicture(options).then(async (imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    //  this.image = 'data:image/jpeg;base64,' + imageData;
     this.image = this.sanitizer.bypassSecurityTrustResourceUrl(imageData && (imageData.webPath));
     await this.userService.uploadPhoto(this.image, this.identity);
    }, (err) => {
     // Handle error
    });
  }

  subirFoto( event: any ): void
  {
    console.log('Selected File');
    this.selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile); 
    reader.onload = (_event) => { 
      this.fotourl = reader.result;
      this.identity.fotourl = reader.result;
      this.userService.setIdentity(this.identity, true);
    }

  }
}
