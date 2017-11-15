import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegislatorComponent } from './legislator.component';

import { DataService } from '../../services/data.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LegislatorComponent
  ],
  exports: [
    LegislatorComponent
  ],
  providers: [ DataService ]
})
export class LegislatorModule {}
