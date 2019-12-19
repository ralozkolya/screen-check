import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FullscreenService } from '../../services/fullscreen.service';
import { MAIN_COLORS } from '../../enums';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent  {

  @ViewChild('container', { static: false })
  container: ElementRef;

  color: string = MAIN_COLORS[0];

  shifted = false;

  constructor(public fullscreenService: FullscreenService, public changeDetection: ChangeDetectorRef) {}

  toggleFullScreen(): void {
    if (this.fullscreenService.isFullScreenAvailable()) {
      this.fullscreenService.toggleFullScreen(this.container);
      // Workaround for inconsistent requestFullScreen API
      setTimeout(() => this.changeDetection.markForCheck(), 50);
    }
  }
}
