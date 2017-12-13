import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SenateComponent } from './senate.component';
import { LegislatorComponent } from '../legislator/legislator.component';

const senateRoutes: Routes = [
  { path: 'senate', component: SenateComponent },
  { path: 'legislator/:cid/:cycle', component: LegislatorComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(senateRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SenateRoutingModule { }
