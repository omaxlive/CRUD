import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from './angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
