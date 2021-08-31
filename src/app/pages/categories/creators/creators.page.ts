import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CreatorsService } from '../../../services/creators.service';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.page.html',
  styleUrls: ['./creators.page.scss'],
})
export class CreatorsPage implements OnInit {

  public arrayCreators: any[] = [];
  public identity: any = {};
  constructor(
    private creatorsService: CreatorsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.showLoading();
    this.getCreators();
  }

  getCreators(name = null)
  {
    this.creatorsService.getCreators(0, 100, name).subscribe(
      response => {
        if (response.code === 200)
        {
          this.alertService.stopLoading();
          this.arrayCreators = response.data.results;
        }
      }
    );
  }

  onTypeEmitted(event)
  {
    this.alertService.showLoading();
    this.getCreators(event === '' ? null : event);
  }

}
