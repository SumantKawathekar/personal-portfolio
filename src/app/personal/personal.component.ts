import { Component, OnInit } from '@angular/core';
import { IndexdbService } from '../indexdb.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  public userData: any;

  constructor(private readonly indexdbService: IndexdbService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  async getAllUser() {
    const users = await this.indexdbService.getUser();
    this.userData = JSON.parse(users);
    console.log(this.userData);
  }

}
