import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(private myElement: ElementRef) { }

  ngOnInit(): void {
  }

  public gotoEduction() {
    let el = document.getElementById('education');
    el.scrollIntoView({behavior: "smooth"});

  }

}
