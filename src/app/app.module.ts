import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { PickerComponent } from './components/picker/picker.component';
import { BackgroundComponent } from './components/background/background.component';
import { FullscreenService } from './services/fullscreen.service';
import { ColorService } from './services/color.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PickerComponent,
    BackgroundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    FullscreenService,
    ColorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
