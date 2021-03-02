import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { IndexdbService } from '../indexdb.service';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit {
  public userData: any;
  professionalData: any;
  skillSet: any;

  constructor(
    private readonly indexdbService: IndexdbService,
    private readonly appService: AppService) { }

  ngOnInit(): void {
    this.getAllUser()
  }
  public gotoTechnologies() {
    let el = document.getElementById('portfolio');
    
    el.scrollIntoView({behavior: "smooth"});
  }

  public gotoProject() {
    let el = document.getElementById('resume');
    el.scrollIntoView({behavior: "smooth"});
  }

  public gotoTop() {
    let el = document.getElementById('professional-info');
    el.scrollIntoView({behavior: "smooth"});
  }

  async getAllUser() {
    this.appService.getUserInfoObs()
    .subscribe(res => {
      this.userData = res;
      this.professionalData = this.userData.experienceBlocks;
      this.skillSet = this.userData.skills;
    });
  }

  

}
