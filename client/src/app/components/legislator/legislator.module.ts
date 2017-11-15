import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegislatorComponent } from './legislator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LegislatorComponent
  ],
  exports: [
    LegislatorComponent
  ]
})
export class LegislatorModule {}
