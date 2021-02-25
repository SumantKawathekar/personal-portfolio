import { Component, ElementRef, OnInit } from '@angular/core';
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
    ) { }

  ngOnInit(): void {
     this.getAllUser();
  }

  public gotoEduction() {
    let el = document.getElementById('education');
    el.scrollIntoView({behavior: "smooth"});

  }
  async getAllUser() {
    const users = await this.indexdbService.getUser();
    this.userObj = JSON.parse(users);
    console.log(this.userObj);
  }

}
