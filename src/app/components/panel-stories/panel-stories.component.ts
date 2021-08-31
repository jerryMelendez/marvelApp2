import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-stories',
  templateUrl: './panel-stories.component.html',
  styleUrls: ['./panel-stories.component.scss'],
})
export class PanelStoriesComponent implements OnInit {

  @Input() storie;
  constructor() { }

  ngOnInit() {}

}
