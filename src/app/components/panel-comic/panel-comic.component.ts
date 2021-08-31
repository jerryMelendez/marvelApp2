import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Comic } from 'src/app/interfaces/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { ComicService } from 'src/app/services/comic.service';
import { ModalDetailComicComponent } from '../modals/modal-detail-comic/modal-detail-comic.component';

@Component({
  selector: 'app-panel-comic',
  templateUrl: './panel-comic.component.html',
  styleUrls: ['./panel-comic.component.scss'],
})
export class PanelComicComponent implements OnInit {

  @Output() typeChanged = new EventEmitter<string>();
  @Input() comic: Comic;
  @Input() identity: any;
  public flagFavorite: boolean = false; // Bandera que se usa para mostrar si el comic es favorito en el front
  constructor(
    private comicService: ComicService,
    private alertService: AlertService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.checkFavorite();
  }

  // Comprobar si el comic está añadido a favoritos
  async checkFavorite()
  {
    this.flagFavorite = await this.comicService.checkFavorite(this.comic.id, this.identity.uid);
  }

  // Metodo para agregar un personaje a la lista de favoritos del usuario
  async addFavorite()
  {
    /* Recibimos el personaje y creamos un objeto nuevo a partir del personaje para
       no sobre cargar el storage con toda la información, solamente ponemos lo necesario*/ 
    const char = {
      id: this.comic.id,
      title: this.comic.title,
      description: this.comic.description,
      photoUrl: this.comic.thumbnail.path + '.' + this.comic.thumbnail.extension
    }
    const data = await this.comicService.addFavorite(char, this.identity.uid);
    
    if (!data)
    {
      this.alertService.mostrarToast('Added to your favorites');
      this.checkFavorite();
    }
  }

  // Remover de favoritos
  async removeFavorite()
  {
    const band = await this.comicService.RemoveFavorite(this.comic.id, this.identity.uid);

    if (band)
    {
      this.alertService.mostrarToast('Removed from your favorites');
    }

    this.checkFavorite();
    this.typeChanged.emit('Removed');
  }

  // Ver en un modal el detalle del comic
  async seeDetail() {
    const modal = await this.modalCtrl.create({
      component: ModalDetailComicComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        comic: this.comic
      }
    });
    return await modal.present();
  }
}
