import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-events',
  templateUrl: './panel-events.component.html',
  styleUrls: ['./panel-events.component.scss'],
})
export class PanelEventsComponent implements OnInit {

  @Input() event;
  constructor() { }

  ngOnInit() {}

}
