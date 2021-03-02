import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { IndexdbService } from '../indexdb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isData: any;

  constructor(
    private readonly appService: AppService) { }

   ngOnInit() {
     this.getDbData();
  }
   getDbData() {
    this.appService.getUserInfoObs()
    .subscribe(res => {
      this.isData = res
    });
  }
}
