import { Component, ElementRef, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { IndexdbService } from '../indexdb.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  public userObj: any;
  

  constructor(
    private myElement: ElementRef,
    private readonly indexdbService: IndexdbService,
    private readonly appService: AppService
    ) { }

  ngOnInit(): void {
     this.getAllUser();
  }

  public gotoEduction() {
    let el = document.getElementById('education');
    el.scrollIntoView({behavior: "smooth"});

  }
   getAllUser() {
      this.appService.getUserInfoObs().subscribe(
      res => {
        this.userObj = res
      }
    );
    console.log(this.userObj);
  }

}
