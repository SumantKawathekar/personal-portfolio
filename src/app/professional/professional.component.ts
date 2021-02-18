import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
  

}
