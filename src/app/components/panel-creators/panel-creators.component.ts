import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-creators',
  templateUrl: './panel-creators.component.html',
  styleUrls: ['./panel-creators.component.scss'],
})
export class PanelCreatorsComponent implements OnInit {

  @Input() creator: any;
  constructor() { }

  ngOnInit() {}

}
