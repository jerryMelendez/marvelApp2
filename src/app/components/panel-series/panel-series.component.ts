import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-series',
  templateUrl: './panel-series.component.html',
  styleUrls: ['./panel-series.component.scss'],
})
export class PanelSeriesComponent implements OnInit {

  @Input() serie;
  constructor() { }

  ngOnInit() {}

}
