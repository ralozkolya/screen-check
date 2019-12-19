import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class FullscreenService {

  public isFullScreenAvailable(): boolean {
    return document.fullscreenEnabled
      || (<any>document).webkitFullscreenEnabled
      || (<any>document).mozFullScreenEnabled
      || (<any>document).msFullscreenEnabled;
  }

  public toggleFullScreen(element: ElementRef): void {

    let el: HTMLElement | Document;
    let func: Function;

    if (this.isFullScreen()) {

      el = document;

      func = document.exitFullscreen
        || (<any>document).webkitExitFullscreen
        || (<any>document).mozCancelFullScreen
        || (<any>document).msExitFullscreen;
    } else {

      el = element.nativeElement;

      func = (<any>el).requestFullScreen
        || (<any>el).webkitRequestFullscreen
        || (<any>el).mozRequestFullScreen
        || (<any>el).msRequestFullscreen;
    }

    if (func) {
      func.call(el);
    }
  }

  public isFullScreen(): boolean {
    return document.fullscreenElement
      || (<any>document).webkitFullscreenElement
      || (<any>document).mozFullScreenElement
      || (<any>document).msFullscreenElement;
  }

}
