import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { CharacterService } from '../../services/character.service';
import { ModalController } from '@ionic/angular';
import { ModalDetailCharacterComponent } from '../modals/modal-detail-character/modal-detail-character.component';

@Component({
  selector: 'app-panel-character',
  templateUrl: './panel-character.component.html',
  styleUrls: ['./panel-character.component.scss'],
})
export class PanelCharacterComponent implements OnInit {

  @Output() typeChanged = new EventEmitter<string>();
  @Input() character: Character;
  @Input() identity: any;
  public flagFavorite: boolean = false; // Bandera que se usa para mostrar si el personajes es favorito en el front
  constructor(
    private characterService: CharacterService,
    private alertService: AlertService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.checkFavorite();
  }

  // Comprobar si el personajes está añadido a favoritos
  async checkFavorite()
  {
    this.flagFavorite = await this.characterService.checkFavorite(this.character.id, this.identity.uid);
  }

  // Metodo para agregar un personaje a la lista de favoritos del usuario
  async addFavorite()
  {
    /* Recibimos el personaje y creamos un objeto nuevo a partir del personaje para
       no sobre cargar el storage con toda la información, solamente ponemos lo necesario*/ 
    const char = {
      id: this.character.id,
      name: this.character.name,
      description: this.character.description,
      photoUrl: this.character.thumbnail.path + '.' + this.character.thumbnail.extension
    }
    const data = await this.characterService.addFavorite(char, this.identity.uid);
    
    if (!data)
    {
      this.alertService.mostrarToast('Added to your favorites');
      this.checkFavorite();
    }
  }

  // Remover de favoritos
  async removeFavorite()
  {
    const band = await this.characterService.RemoveFavorite(this.character.id, this.identity.uid);

    if (band)
    {
      this.alertService.mostrarToast('Removed from your favorites');
    }

    this.checkFavorite();
    this.typeChanged.emit('Removed');
  }

  // Ver en un modal el detalle del personaje
  async seeDetail() {
    const modal = await this.modalCtrl.create({
      component: ModalDetailCharacterComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        character: this.character
      }
    });
    return await modal.present();
  }

}
