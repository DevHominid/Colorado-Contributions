import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { CongressModule } from './components/congress/congress.module';
import { LegislatorModule } from './components/legislator/legislator.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SenateComponent } from './components/senate/senate.component';

import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SenateComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CongressModule,
    LegislatorModule,
    AppRoutingModule
  ],
  providers: [ DataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
