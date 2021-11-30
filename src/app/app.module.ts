import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Data, RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';


import {HttpClientModule} from '@angular/common/http';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {DatePipe} from '@angular/common';
import {GoogleMap} from '@ionic-native/google-maps';
import {Camera} from '@ionic-native/camera/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    SQLite,
    SQLitePorter,
    DatePipe,
    Camera,
    GoogleMap
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
  }
}
