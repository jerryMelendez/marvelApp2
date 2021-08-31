import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { ComicService } from '../../../services/comic.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.page.scss'],
})
export class ComicsPage implements OnInit {

  public arrayComics: any[] = [];
  public identity: any = {};
  public pageTitle: string = 'Comics';
  public txtSearch: string = '';

  constructor(
    private comicService: ComicService,
    private alertService: AlertService,
    private userService: UserService,
    private platform: Platform
  ) {
  }

  async ngOnInit() {
    this.identity = await this.userService.getIdentity();
    this.alertService.showLoading();
    this.getComics();
  }

  // Obtiene los comics del api
  getComics(title: string = null)
  {
    this.comicService.getComics(0, 100, title).subscribe(
      response => {
        if (response.code === 200)
        {
          this.alertService.stopLoading();
          this.arrayComics = response.data.results;
        }
      },
      error => {
        this.alertService.mostrarToast('Error getting data');
      }
    )
  }

  // Obtiene los comics favoritos del storage
  async getFavoriteComics()
  {
    this.arrayComics = await this.comicService.getfavoriteComics(this.identity.uid);
  }

  // Recibe del componente panel-search el texto de busqueta y hace la consulta al api
  onTypeEmitted(event)
  {
    this.alertService.showLoading();
    this.getComics(event !== '' ? event : null);
  }



  onTypeEmittedHeader(event)
  {
    if (event === 'close')
    {
      this.getComics(this.txtSearch === '' ? null : this.txtSearch);
    }
  }

}
