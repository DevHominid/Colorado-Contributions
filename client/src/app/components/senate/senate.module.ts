import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SenateComponent } from './senate.component';

import { DataService } from '../../services/data.service';

import { SenateRoutingModule } from './senate-routing.module';
import { LegislatorModule } from '../legislator/legislator.module';

@NgModule({
  imports: [
    CommonModule,
    SenateRoutingModule,
    LegislatorModule
  ],
  declarations: [
    SenateComponent,
  ],
  providers: [ DataService ]
})
export class SenateModule {}
