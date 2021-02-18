import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import { IntroComponent } from '../intro/intro.component';
import { PersonalComponent } from '../personal/personal.component';
import { ProfessionalComponent } from '../professional/professional.component';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'intro',
        pathMatch: 'full'
    },
    {
        path: 'personal',
        component: PersonalComponent
    },
    {
        path: 'professional',
        component: ProfessionalComponent
    },
    {
        path: 'intro',
        component: IntroComponent
    },
    {
        path: 'contact',
        component: ContactComponent

    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
