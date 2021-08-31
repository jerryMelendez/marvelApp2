import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { SeriesService } from '../../../services/series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {

  public arraySeries: any[] = [];
  public identity: any = {};
  constructor(
    private seriesService: SeriesService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.showLoading();
    this.getSeries();
  }

  getSeries(name = null)
  {
    this.seriesService.getSeries(0, 100, name).subscribe(
      response => {
        if (response.code === 200)
        {
          this.alertService.stopLoading();
          this.arraySeries = response.data.results;
        }
      }
    );
  }

  onTypeEmitted(event)
  {
    this.alertService.showLoading();
    this.getSeries(event === '' ? null : event);
  }

}
