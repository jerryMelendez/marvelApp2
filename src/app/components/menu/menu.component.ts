import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular'; 
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public identity: any = {};

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getIdentity();
  }

  editMyData()
  {
    this.navCtrl.navigateForward('/my-data');
    this.menu.close();
  }

  async getIdentity()
  {
    this.identity = await this.userService.getIdentity();
    // Si la variable foto del identity está vacío se mostrará la foto de su gmail, si no se mostrará la que haya subido
  }

  async logOut()
  {
    const data = await this.userService.logOut();

    if (data || !data)
    {
      this.navCtrl.navigateForward('/login');
      this.menu.close();
    }
  }

}
