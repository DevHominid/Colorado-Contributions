import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CongressComponent } from './components/congress/congress.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'congress', component: CongressComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CongressComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
