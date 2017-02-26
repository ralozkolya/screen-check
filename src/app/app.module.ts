import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app/app.component';
import { PickerComponent } from './components/picker/picker.component';
import { BackgroundComponent } from './components/background/background.component';
import {FullscreenService} from "./services/fullscreen.service";
import {ColorService} from "./services/color.service";

@NgModule({
  declarations: [
    AppComponent,
    PickerComponent,
    BackgroundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    FullscreenService,
    ColorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
