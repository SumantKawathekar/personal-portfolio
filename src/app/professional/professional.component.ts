import { Component, OnInit } from '@angular/core';
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

  constructor(private readonly indexdbService: IndexdbService) { }

  ngOnInit(): void {
    this.getAllUser()
  }
  public gotoTechnologies() {
    console.log('in technology')
    let el = document.getElementById('portfolio');
    
    el.scrollIntoView({behavior: "smooth"});
  }

  public gotoProject() {
    let el = document.getElementById('resume');
    console.log(el)
    el.scrollIntoView({behavior: "smooth"});
  }

  public gotoTop() {
    let el = document.getElementById('professional-info');
    console.log(el)
    el.scrollIntoView({behavior: "smooth"});
  }

  async getAllUser() {
    const users = await this.indexdbService.getUser();
    this.userData = JSON.parse(users);
    this.professionalData = this.userData.experienceBlocks;
    this.skillSet = this.userData.skills;
    console.log(this.skillSet);
  }

  

}
