import { Component, OnInit } from '@angular/core';
import { IndexdbService } from './indexdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly indexdbService: IndexdbService){}
  title = 'personal-portfolio';
  ngOnInit() {
    this.indexdbService.connectDB();
  }
}
