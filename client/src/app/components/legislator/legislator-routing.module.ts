import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegislatorComponent } from './legislator.component';

const legislatorRoutes: Routes = [
  { path: 'legislator/:cid/:cycle', component: LegislatorComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(legislatorRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LegislatorRoutingModule { }
