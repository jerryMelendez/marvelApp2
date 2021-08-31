import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalFavoriteCharactersComponent } from '../modals/modal-favorite-characters/modal-favorite-characters.component';
import { ModalFavoriteComicsComponent } from '../modals/modal-favorite-comics/modal-favorite-comics.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title = '';
  @Input() identity: any = {};
  @Output() typeChanged = new EventEmitter<string>();
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  // El boton de favoritos solo esta activo cuando se entra en la pagina de characters y comics
  async seeFavorites()
  {
    let component;
    if (this.title === 'Characters')
    {
      component = ModalFavoriteCharactersComponent
    }
    else if (this.title === 'Comics')
    {
      component = ModalFavoriteComicsComponent;
    }

    const modal = await this.modalCtrl.create({
      component: component,
      cssClass: 'my-custom-class',
      componentProps: {
        identity: this.identity
      }
    });
    await modal.present();

    const {data} = await modal.onDidDismiss();

    if (data || !data)
    {
      this.typeChanged.emit('close');
    }
  }

}
