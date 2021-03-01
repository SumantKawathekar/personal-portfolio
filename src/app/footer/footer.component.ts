import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  userData: any;
  socialMediaLinks:any;

  constructor(private readonly appService: AppService) { }

  ngOnInit(): void {

    this.getSocialMediaLinks();
  }

  getSocialMediaLinks() {
    this.appService.getUserInfoObs()
    .subscribe(res => {
      this.userData = res;
      this.socialMediaLinks = this.userData.socialMedia;
      console.log(this.socialMediaLinks)
    });
  }

}
