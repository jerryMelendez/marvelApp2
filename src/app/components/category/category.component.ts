import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  @Input() category = '';
  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  goToCategory()
  {
    this.navCtrl.navigateForward('/' + this.category);
  }

}
