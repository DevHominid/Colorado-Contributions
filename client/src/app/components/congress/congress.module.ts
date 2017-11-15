import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CongressComponent } from './congress.component';

import { DataService } from '../../services/data.service';

import { CongressRoutingModule } from './congress-routing.module';
import { LegislatorModule } from '../legislator/legislator.module';

@NgModule({
  imports: [
    CommonModule,
    CongressRoutingModule,
    LegislatorModule
  ],
  declarations: [
    CongressComponent,
  ],
  providers: [ DataService ]
})
export class CongressModule {}
