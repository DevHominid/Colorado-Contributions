import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CongressComponent } from './components/congress/congress.component';
import { SenateComponent } from './components/senate/senate.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'congress', component: CongressComponent},
  {path: 'senate', component: SenateComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CongressComponent,
    SenateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
