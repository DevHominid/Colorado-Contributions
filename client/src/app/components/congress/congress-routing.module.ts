import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CongressComponent } from './congress.component';
import { LegislatorComponent } from '../legislator/legislator.component';

const congressRoutes: Routes = [
  { path: 'congress', component: CongressComponent },
  { path: 'legislator/:cid/:cycle', component: LegislatorComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(congressRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CongressRoutingModule { }
