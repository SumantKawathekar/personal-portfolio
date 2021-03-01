import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';






@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule, 
    MatListModule, 
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatStepperModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  exports: [
    MatToolbarModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule, 
    MatListModule, 
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatStepperModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule
  ]
})
export class MaterialModule { }
