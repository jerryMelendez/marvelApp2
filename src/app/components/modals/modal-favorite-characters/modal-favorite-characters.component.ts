import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CharacterService } from '../../../services/character.service';

@Component({
  selector: 'app-modal-favorite-characters',
  templateUrl: './modal-favorite-characters.component.html',
  styleUrls: ['./modal-favorite-characters.component.scss'],
})
export class ModalFavoriteCharactersComponent implements OnInit {

  @Input() identity: any = {};

  public txtSearch: string = '';
  public arrayCharacters: any[] = [];
  constructor(
    public modalCtrl: ModalController,
    private characterService: CharacterService
  ) { }

  ngOnInit() {
    this.getFavoriteCharacters();
  }

  onTypeEmitted(event)
  {
    this.txtSearch = event;
  }

  onTypeEmittedComicPanel(event)
  {
    this.getFavoriteCharacters();
  }

  // Obtiene los comics favoritos del storage
  async getFavoriteCharacters()
  {
    this.arrayCharacters = await this.characterService.getFavoriteCharacters(this.identity.uid);
  }
}
