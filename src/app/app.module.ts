import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DataInterceptor } from '../providers/data/dataInterceptor';
import { DataProvider } from '../providers/data/data';
import { IonicStorageModule } from "@ionic/storage";
import { GenresPage } from "../pages/genres/genres";
import { Keyboard } from "@ionic-native/keyboard";
import {DetailsPage} from "../pages/details/details";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GenresPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GenresPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: DataInterceptor, multi: true},
    DataProvider,
    Keyboard,
    InAppBrowser,
    YoutubeVideoPlayer
  ]
})
export class AppModule {}
