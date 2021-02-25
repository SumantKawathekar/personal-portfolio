import { Component, OnInit } from '@angular/core';
import { IndexdbService } from '../indexdb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isData: any;

  constructor(private readonly indexDbService: IndexdbService) { }

  async ngOnInit() {
    await this.getDbData();
  }
  async getDbData() {
    this.isData = this.indexDbService.getUser();
  }
}
