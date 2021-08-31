import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Comic } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { ComicService } from 'src/app/services/comic.service';

@Component({
  selector: 'app-modal-detail-comic',
  templateUrl: './modal-detail-comic.component.html',
  styleUrls: ['./modal-detail-comic.component.scss'],
})
export class ModalDetailComicComponent implements OnInit {

  @Input() comic: Comic;
  public arrayCharacters: any[] = []; // Personajes que aparecen en el comic
  constructor(
    public modalCtrl: ModalController,
    private platform: Platform,
    private comicService: ComicService,
    private alertService: AlertService
  ) {
    // Capturamos la funcion del boton de ir atras del dispositivo para que cierre el modal
    if (platform.is('mobile')) {
      window.location.hash = 'no-back-button';
      window.location.hash = 'Again-No-back-button';
      window.onhashchange = function(){
        modalCtrl.dismiss();
      };
    }
   }

  ngOnInit() {
    this.getCharactersInfo();
  }

  async getCharactersInfo()
  {
    this.comicService.getCharacters(this.comic.id).subscribe(
      response => {
        if (response.code === 200)
        {
          this.arrayCharacters = response.data.results;
        }
        else
        {
          this.alertService.mostrarToast('Error getting the data');
        }
      },
      error => {
        this.alertService.mostrarToast('Error getting the data');
      }
    );
  }
}
