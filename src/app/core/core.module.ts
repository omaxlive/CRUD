import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule, routingComponents } from '../app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from '../posts/components/map/map.component';

@NgModule({
  declarations: [NavComponent, routingComponents, MapComponent],
  imports: [
  SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    LayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9-oPLu_l8WVwAGRfXUS8DePmly5LRnng'
    })
  ],
  exports: [ NavComponent, MapComponent ]
})
export class CoreModule { }
