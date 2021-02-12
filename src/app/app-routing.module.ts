import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { IntroComponent } from './intro/intro.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProfessionalInfoComponent } from './professional-info/professional-info.component';
import { ProjectsComponent } from './projects/projects.component';
import { TechnologiesComponent } from './technologies/technologies.component';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutMeComponent,
    pathMatch: 'full'
  },
  {
    path: 'personal-info',
    component: PersonalInfoComponent,
    pathMatch: 'full'
  },
  {
    path: 'professional-info',
    component: ProfessionalInfoComponent,
    pathMatch: 'full'
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    pathMatch: 'full'
  },
  {
    path: 'technologies',
    component: TechnologiesComponent,
    pathMatch: 'full'
  },
  {
    path: 'contact',
    component: ContactComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
