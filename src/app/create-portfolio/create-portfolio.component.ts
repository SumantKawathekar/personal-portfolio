import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSequence } from 'protractor';
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


  constructor(
    private indexdbService: IndexdbService,
    private fb: FormBuilder,
    private readonly route: Router,
  ) { }

  async ngOnInit() {
    this.initiateForm();
    await this.getAllUser();
    

  }

  initiateForm() {
    this.createPortfolioForm = this.fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
      userName: new FormControl(''),
      aboutMe: new FormControl(''),
      universityName: new FormControl(''),
      degreeName: new FormControl(''),
      enableExp: new FormControl('fresher'),
      experienceBlocks: this.fb.array(
        [this.buildExperienceBlock()]),
       skills: this.fb.array([
         this.buildSkillsArray()
       ]),
       address:  this.fb.array(
        [this.buildAddressArray()]),
    })
  }

  buildAddressArray(): FormGroup {
    return this.fb.group({
      houseInfo: [''],
      areaInfo: [''],
      cityInfo: [''],
      zipCode: [''],
      phoneNumber: [''],

    });
  }
  buildSkillsArray(): FormGroup {
    return this.fb.group({
      skillName: ['']

    });
  }
  buildExperienceBlock(): FormGroup {
    return this.fb.group({
      projectTitle: [''],
      projectInfo: [''],
      projectRole: ['']

    });
  }

  onSubmit() {

    const user = {
      name: this.createPortfolioForm.controls.name.value,
      email: this.createPortfolioForm.controls.email.value,
      userName: this.createPortfolioForm.controls.userName.value,
      aboutMe: this.createPortfolioForm.controls.aboutMe.value,
      universityName: this.createPortfolioForm.controls.universityName.value,
      degreeName: this.createPortfolioForm.controls.degreeName.value,
      enableExp: this.createPortfolioForm.controls.enableExp.value,
      experienceBlocks: this.getExpValues(),
      skills: this.getSkills(),
      address: this.getAddress()
    };
    this.indexdbService.addUser(user);
    this.route.navigate(['/intro']);

  }

  getAddress() {
    const addressArr =(<FormArray>this.createPortfolioForm.get('address')).controls;
    const addresses = [];
    for (const iterator of addressArr) {
      addresses.push(iterator.value)
    }

    return addresses;

  }
  getSkills() {
    const skillsArr =(<FormArray>this.createPortfolioForm.get('skills')).controls;
    const skills = [];
    for (const iterator of skillsArr) {
      skills.push(iterator.value)
    }

    return skills;
  }

  getExpValues() {
    const expValueArr =(<FormArray>this.createPortfolioForm.get('experienceBlocks')).controls;
    const experience = [];
    for (const iterator of expValueArr) {
      experience.push(iterator.value)
    }

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
      enableExp: this.userObj.enableExp,
    });
    this.createPortfolioForm.setControl('experienceBlocks', this.setExistingExp(this.userObj.experienceBlocks))
    this.createPortfolioForm.setControl('skills', this.setExistingSkills(this.userObj.skills))
    this.createPortfolioForm.setControl('address', this.setExistingAddress(this.userObj.address))

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
    const formArray = new FormArray([]);
    existingExp.forEach(exp => {
      formArray.push(this.fb.group({
        projectTitle: exp.projectTitle,
        projectInfo: exp.projectInfo,
        projectRole: exp.projectRole
      }))
    });
    return formArray;
  }
  addExperience() {
    (<FormArray>this.createPortfolioForm.get('experienceBlocks')).push(this.buildExperienceBlock());
  }

  removeClick(expGroupIndex: number) {
    if ((<FormArray>this.createPortfolioForm.get('experienceBlocks')).length > 1) {
      (<FormArray>this.createPortfolioForm.get('experienceBlocks')).removeAt(expGroupIndex);
    }
  }

  addSkill() {
    (<FormArray>this.createPortfolioForm.get('skills')).push(this.buildSkillsArray());
  }

  removeSkill(skillIndex: number) {
    if ((<FormArray>this.createPortfolioForm.get('skills')).length > 1) {
      (<FormArray>this.createPortfolioForm.get('skills')).removeAt(skillIndex);
    }
  }

  addAddress() {
    (<FormArray>this.createPortfolioForm.get('address')).push(this.buildAddressArray());
  }
}
