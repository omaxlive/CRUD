import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule, routingComponents } from '../app-routing.module';



@NgModule({
  declarations: [NavComponent, routingComponents],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    LayoutModule,
  ],
  exports: [ NavComponent ]
})
export class CoreModule { }
