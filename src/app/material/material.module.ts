import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule, 
    MatListModule, 
    MatButtonModule
  ],
  exports: [
    MatToolbarModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule, 
    MatListModule, 
    MatButtonModule
  ]
})
export class MaterialModule { }
