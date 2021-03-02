import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSequence } from 'protractor';
import { AppService } from '../app.service';
import { IndexdbService } from '../indexdb.service';

@Component({
  selector: 'app-create-portfolio',
  templateUrl: './create-portfolio.component.html',
  styleUrls: ['./create-portfolio.component.scss']
})
export class CreatePortfolioComponent implements OnInit {
  public createPortfolioForm: FormGroup;
  public userObj: any;
  experienceBlocks: FormArray;
  experience =[];
  public experienceForm: FormGroup;
  public addressForm: FormGroup;
  public otherInfoForm: FormGroup;
  @ViewChild('stepper') stepper: MatStepper;
  public expVals = [{
    value:'fresher', viewValue: 'fresher'},
    {value:'experienced', viewValue: 'experienced',
  }]

  constructor(
    private indexdbService: IndexdbService,
    private fb: FormBuilder,
    private readonly route: Router,
    private readonly appService: AppService
  ) { }

  async ngOnInit() {
    this.initiateForm();
    await this.getAllUser();
  }

  initiateForm() {
    this.createPortfolioForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      shortDescription: ['', Validators.required],
      aboutMe: ['', [Validators.required, Validators.minLength(200)]],
      universityName: ['', Validators.required],
      degreeName: ['', Validators.required],
      hobbies: this.fb.array(
        [this.buildHobbyArray()])

    })
    this.experienceForm = this.fb.group({
      // enableExp: new FormControl('fresher'),
      selectExp: ['', Validators.required],
      resumeLink: ['', Validators.required],
      companyName: [''],
      experienceBlocks: this.fb.array(
        [this.buildExperienceBlock()]),
        skills: this.fb.array([
          this.buildSkillsArray()
        ]),
    })
    this.addressForm = this.fb.group({
      address:  this.fb.array(
        [this.buildAddressArray()]),
    })

    this.otherInfoForm = this.fb.group({
             
      socialMedia: this.fb.array(
        [this.buildSocialMediaArray()]
      )
    })
  }
  buildHobbyArray(): FormGroup {
    return this.fb.group({
      hobbyDetail: ['']
    })
  }
    buildSocialMediaArray(): FormGroup {
      return this.fb.group({
        fbLink: [''],
        gplusLink: [''],
        linkedinLink: [''],
        instaLink:[''],
        skypeLink: ['']
      })
  }

  buildAddressArray(): FormGroup {
    return this.fb.group({
      houseInfo: ['', Validators.required],
      areaInfo: ['', Validators.required],
      cityInfo: ['', Validators.required],
      zipCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
  }
  buildSkillsArray(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required]

    });
  }
  buildExperienceBlock(): FormGroup {
    return this.fb.group({
      projectTitle: [''],
      projectInfo: [''],
      projectRole: [''],
    });
  }

  onSubmit() {

    const user = {
      name: this.createPortfolioForm.controls.name.value,
      email: this.createPortfolioForm.controls.email.value,
      shortDescription: this.createPortfolioForm.controls.shortDescription.value,
      aboutMe: this.createPortfolioForm.controls.aboutMe.value,
      universityName: this.createPortfolioForm.controls.universityName.value,
      degreeName: this.createPortfolioForm.controls.degreeName.value,
      enableExp: this.experienceForm.controls.selectExp.value,
      resumeLink: this.experienceForm.controls.resumeLink.value,
      hobbies: this.getExistingHobbies(),
      companyName: this.getExistingCompanyname(),
      experienceBlocks: this.getExpValues(),
      skills: this.getSkills(),
      address: this.getAddress(),
      socialMedia: this.getSocialMediaLinks()
    };
    console.log(user)
    this.indexdbService.addUser(user).then(res => this.appService.setUserInfoObs(user))
    this.route.navigate(['/intro']);

  }
  getExistingCompanyname() {
    if(this.experienceForm.controls.selectExp.value === 'fresher') {
      return ''
    } else {
      return this.experienceForm.controls.companyName.value;
    }
  }
  getSocialMediaLinks() {
    const socialMediaArr =(<FormArray>this.otherInfoForm.get('socialMedia')).controls;
    const socialMediaLinks = [];
    for (const iterator of socialMediaArr) {
      socialMediaLinks.push(iterator.value)
    }

    return socialMediaLinks;

  }

  getAddress() {
    const addressArr =(<FormArray>this.addressForm.get('address')).controls;
    const addresses = [];
    for (const iterator of addressArr) {
      addresses.push(iterator.value)
    }

    return addresses;

  }
  getExistingHobbies() {
    const hobbiesArr =(<FormArray>this.createPortfolioForm.get('hobbies')).controls;
    const hobbies = [];
    for (const iterator of hobbiesArr) {
      hobbies.push(iterator.value)
    }

    return hobbies;
  }
  getSkills() {
    const skillsArr =(<FormArray>this.experienceForm.get('skills')).controls;
    const skills = [];
    for (const iterator of skillsArr) {
      skills.push(iterator.value)
    }

    return skills;
  }

  getExpValues() {
    const expValueArr =(<FormArray>this.experienceForm.get('experienceBlocks')).controls;
    let experience = [];
    if(this.experienceForm.controls.selectExp.value === 'experienced'){
    for (const iterator of expValueArr) {
      experience.push(iterator.value)
    }
  } else {
    experience = [];
  }
    console.log(experience)
    return experience;
  }
  async getAllUser() {
    const users = await this.indexdbService.getUser();
    if(users) {
      this.userObj = JSON.parse(users);
      this.editUser();
    } 

  }
  public editUser() {
    this.createPortfolioForm.patchValue({
      name: this.userObj.name,
      email: this.userObj.email,
      aboutMe: this.userObj.aboutMe,
      universityName: this.userObj.universityName,
      degreeName: this.userObj.degreeName,
      shortDescription: this.userObj.shortDescription
    });
    this.experienceForm.patchValue({
      selectExp: this.userObj.enableExp,
      companyName: this.userObj.companyName,
      resumeLink: this.userObj.resumeLink
    })
    this.experienceForm.setControl('experienceBlocks', this.userObj.selectExp==='fresher'? 
          this.setExistingFresher(): this.setExistingExp(this.userObj.experienceBlocks))
    this.experienceForm.setControl('skills', this.setExistingSkills(this.userObj.skills))
    this.addressForm.setControl('address', this.setExistingAddress(this.userObj.address))
    this.otherInfoForm.setControl('socialMedia', this.setExistingSocialMedia(this.userObj.socialMedia))
    this.createPortfolioForm.setControl('hobbies', this.setExistingHobbies(this.userObj.hobbies))

  }

  setExistingSocialMedia(existingLinks) {
    const formArray = new FormArray([]);
    existingLinks.forEach(link => {
      formArray.push(this.fb.group({
        fbLink: link.fbLink,
        gplusLink: link.gplusLink,
        linkedinLink: link.linkedinLink,
        instaLink:link.instaLink,
        skypeLink: link.skypeLink
      }))
    });
    return formArray;
  }

  setExistingFresher() {
    const formArray = new FormArray([]);
    formArray.push(this.fb.group({
      projectTitle: '',
      projectInfo: '',
      projectRole: '',
    }))
    return formArray
  }

  setExistingAddress(existingAddress): FormArray {
    const formArray = new FormArray([]);
    existingAddress.forEach(address => {
      formArray.push(this.fb.group({
        houseInfo: address.houseInfo,
        areaInfo: address.areaInfo,
        cityInfo: address.cityInfo,
        zipCode: address.zipCode,
        phoneNumber: address.phoneNumber
      }))
    });
    return formArray;
  }
  setExistingHobbies(existingHobbies): FormArray {
    const formArray = new FormArray([]);
    existingHobbies.forEach(skill => {
      formArray.push(this.fb.group({
        hobbyDetail:skill.hobbyDetail
      }))
    });
    return formArray;

  }
  setExistingSkills(existingSkills): FormArray {
    const formArray = new FormArray([]);
    existingSkills.forEach(skill => {
      formArray.push(this.fb.group({
        skillName:skill.skillName
      }))
    });
    return formArray;

  }
  setExistingExp(existingExp): FormArray {
    let formArray = new FormArray([]);
    if(existingExp.length >0) {
    existingExp.forEach(exp => {
      formArray.push(this.fb.group({
        projectTitle: exp.projectTitle,
        projectInfo: exp.projectInfo,
        projectRole: exp.projectRole,
      }))
    });
  } else {
    formArray.push(this.fb.group({
      projectTitle: '',
        projectInfo: '',
        projectRole: '',
    }))
  }
    return formArray;
  }
  addExperience() {
    (<FormArray>this.experienceForm.get('experienceBlocks')).push(this.buildExperienceBlock());
  }

  removeClick(expGroupIndex: number) {
    if ((<FormArray>this.experienceForm.get('experienceBlocks')).length > 1) {
      (<FormArray>this.experienceForm.get('experienceBlocks')).removeAt(expGroupIndex);
    }
  }

  addSkill() {
    (<FormArray>this.experienceForm.get('skills')).push(this.buildSkillsArray());
  }

  removeSkill(skillIndex: number) {
    if ((<FormArray>this.experienceForm.get('skills')).length > 1) {
      (<FormArray>this.experienceForm.get('skills')).removeAt(skillIndex);
    }
  }

  addAddress() {
    (<FormArray>this.addressForm.get('address')).push(this.buildAddressArray());
  }

  addHobby() {
    (<FormArray>this.createPortfolioForm.get('hobbies')).push(this.buildHobbyArray());
  }
  removeHobby(hobbyIndex: number) {
    if ((<FormArray>this.createPortfolioForm.get('hobbies')).length > 1) {
      (<FormArray>this.createPortfolioForm.get('hobbies')).removeAt(hobbyIndex);
    }
  }
  public getExperinceValue() {
    // console.log('exp val', this.experienceForm.controls.selectExp.value);
    // if(this.experienceForm.controls.selectExp.value === 'fresher'){
    //   this.setExistingFresher();
    // } else {
    //   this.setExistingExp(this.userObj.experienceBlocks)
    // }
  }

}
