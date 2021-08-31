import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/interfaces';
import { ModalController, Platform } from '@ionic/angular';
import { ComicService } from '../../../services/comic.service';
import { CharacterService } from '../../../services/character.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-modal-detail-character',
  templateUrl: './modal-detail-character.component.html',
  styleUrls: ['./modal-detail-character.component.scss']
})
export class ModalDetailCharacterComponent implements OnInit {

  @Input() character: Character;
  public arrayComics: any[] = [];
  constructor(
    public modalCtrl: ModalController,
    private platform: Platform,
    private characterservice: CharacterService,
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
    // console.log(this.character);
    this.getComicsInfo();
  }

  async getComicsInfo()
  {
    this.characterservice.getComics(this.character.id).subscribe(
      response => {
        if (response.code === 200)
        {
          this.arrayComics = response.data.results;
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
  