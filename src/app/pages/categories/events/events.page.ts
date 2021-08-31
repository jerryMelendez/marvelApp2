import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  public arrayEvents: any[] = [];
  public identity: any = {};
  constructor(
    private eventsService: EventsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.showLoading();
    this.getEvents();
  }

  getEvents(name = null)
  {
    this.eventsService.getEvents(0, 100, name).subscribe(
      response => {
        if (response.code === 200)
        {
          this.alertService.stopLoading();
          this.arrayEvents = response.data.results;
        }
      }
    );
  }

  onTypeEmitted(event)
  {
    this.alertService.showLoading();
    this.getEvents(event === '' ? null : event);
  }

}
