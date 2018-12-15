import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { ScenesPage } from "../pages/scenes/scenes";
import { RoutinesPage } from "../pages/routines/routines";
import { TabsPage } from '../pages/tabs/tabs';

// Providers
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DeviceProvider } from "../providers/DeviceProvider";
import { RoutineProvider } from "../providers/RoutineProvider";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ScenesPage,
    RoutinesPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ScenesPage,
    RoutinesPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DeviceProvider,
    RoutineProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
