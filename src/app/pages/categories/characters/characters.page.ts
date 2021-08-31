import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CharacterService } from 'src/app/services/character.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {

  public arrayCharacters: any[] = [];
  public identity: any = {};
  public pageTitle: string = 'Characters';
  public txtSearch: string = '';

  constructor(
    private charactersService: CharacterService,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    // this.showCharacter(1011334);
    // this.getComics(1011334);
    this.identity = await this.userService.getIdentity();
    this.alertService.showLoading();
    this.getCharacters();
  }

  // Obtiene los personajes del api
  getCharacters(name: string = null)
  {
    this.charactersService.getCharacters(0, 100, name).subscribe(
      response => {
        if (response.code === 200)
        {
          this.alertService.stopLoading();
          this.arrayCharacters = response.data.results;
        }
      },
      error => {
        this.alertService.mostrarToast('Error getting data');
      }
    )
  }

  // Obtiene los personajes favoritos del storage
  async getFavoriteCharacters()
  {
    this.arrayCharacters = await this.charactersService.getFavoriteCharacters(this.identity.uid);
  }

  // Recibe del componente panel-search el texto de busqueta y hace la consulta al api
  onTypeEmitted(event)
  {
    this.alertService.showLoading();
    this.getCharacters(event !== '' ? event : null);
  }
}
