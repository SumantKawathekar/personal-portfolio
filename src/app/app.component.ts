import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { IndexdbService } from './indexdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userObj: Promise<string>;
  constructor(
    private readonly indexdbService: IndexdbService,
    private readonly appService: AppService){}
  title = 'personal-portfolio';
  async ngOnInit() {
    await this.indexdbService.connectDB();
    const users = await this.indexdbService.getUser();
    if(users) {
      this.userObj = JSON.parse(users);
      this.appService.setUserInfoObs(this.userObj);
    }
   
  }
}
