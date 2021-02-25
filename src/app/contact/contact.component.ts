import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IndexdbService } from '../indexdb.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public showSucces = false;
  public submitted = false;
  public contactForm: FormGroup;
  public href=""
  userData: any;
  address: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly indexdbService: IndexdbService
    ) { }

  ngOnInit(): void {
    this.initiateForm();
    this.getAllUser()
  }

  private initiateForm() {
    this.contactForm = this.fb.group({
      contactName: new FormControl('', Validators.required),
      contactEmail: new FormControl('', Validators.required),
      contactSubject: new FormControl(''),
      contactMessage: new FormControl('', Validators.required)
    })
  }

  public submitContactRequest() {
   this.submitted = true;
   this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.showSucces = true;

    }, 5000);
  }
  async getAllUser() {
    const users = await this.indexdbService.getUser();
    this.userData = JSON.parse(users);
    this.address = this.userData.address
  }

}
