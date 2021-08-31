import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComicService } from '../../../services/comic.service';

@Component({
  selector: 'app-modal-favorite-comics',
  templateUrl: './modal-favorite-comics.component.html',
  styleUrls: ['./modal-favorite-comics.component.scss'],
})
export class ModalFavoriteComicsComponent implements OnInit {

  @Input() identity: any = {};
  public txtSearch: string = '';
  public arrayComics: any[] = [];
  constructor(
    public modalCtrl: ModalController,
    private comicService: ComicService
  ) { }

  ngOnInit() {
    this.getFavoriteComics();
  }

  onTypeEmitted(event)
  {
    this.txtSearch = event;
  }

  onTypeEmittedComicPanel(event)
  {
    this.getFavoriteComics();
  }

  // Obtiene los comics favoritos del storage
  async getFavoriteComics()
  {
    this.arrayComics = await this.comicService.getfavoriteComics(this.identity.uid);
  }
}
