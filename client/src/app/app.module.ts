import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CongressComponent } from './components/congress/congress.component';
import { SenateComponent } from './components/senate/senate.component';
import { LegislatorComponent } from './components/legislator/legislator.component';

import { DataService } from './services/data.service';
import { LegislatorComponent } from './components/legislator/legislator.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'congress', component: CongressComponent},
  {path: 'congress/legislator/:cid', component: LegislatorComponent},
  {path: 'senate', component: SenateComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CongressComponent,
    SenateComponent,
    LegislatorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
