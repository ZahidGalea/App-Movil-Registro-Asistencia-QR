import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {HttpClientModule} from '@angular/common/http';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {DatePipe} from '@angular/common';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {GoogleMaps} from '@ionic-native/google-maps/ngx';
import {Geocoder} from '@ionic-native/google-maps';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {QRScanner} from '@ionic-native/qr-scanner/ngx';

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
    Geolocation,
    GoogleMaps,
    NativeGeocoder,
    Geocoder,
    BarcodeScanner,
    QRScanner
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
  }
}
