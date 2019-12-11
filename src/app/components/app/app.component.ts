import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FullscreenService } from '../../services/fullscreen.service';
import { MAIN_COLORS } from '../../enums';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent  {

  @ViewChild('container')
  private container: ElementRef;

  private color: string = MAIN_COLORS[0];

  private shifted = false;

  constructor(private fullscreenService: FullscreenService, private changeDetection: ChangeDetectorRef) {}

  private toggleFullScreen(): void {
    if (this.fullscreenService.isFullScreenAvailable()) {
      this.fullscreenService.toggleFullScreen(this.container);
      // Workaround for inconsistent requestFullScreen API
      setTimeout(() => this.changeDetection.markForCheck(), 50);
    }
  }
}
