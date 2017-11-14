import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CongressComponent } from './components/congress/congress.component';
import { SenateComponent } from './components/senate/senate.component';
import { LegislatorComponent } from './components/legislator/legislator.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'congress', component: CongressComponent},
  {path: 'congress/legislator/:cid', component: LegislatorComponent},
  {path: 'senate', component: SenateComponent},
  {path: 'senate/legislator/:cid', component: LegislatorComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
