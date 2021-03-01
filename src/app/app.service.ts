import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly userInfoObs$: BehaviorSubject<''> = new BehaviorSubject('')

  getUserInfoObs() {
    return this.userInfoObs$.asObservable();
  }
  setUserInfoObs(userInfoData) {
    this.userInfoObs$.next(userInfoData);
  }

  constructor() { }
}
