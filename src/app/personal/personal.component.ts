import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { IndexdbService } from '../indexdb.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  public userData: any;
  skillSet: any;
  hobbySet: any;

  constructor(
    private readonly indexdbService: IndexdbService,
    private readonly appService: AppService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  async getAllUser() {
    this.appService.getUserInfoObs()
    .subscribe(res => {
      this.userData = res;
      this.hobbySet = this.userData.hobbies;
    });
   
  }

}
