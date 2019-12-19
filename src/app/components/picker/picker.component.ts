import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FullscreenService } from '../../services/fullscreen.service';
import { MAIN_COLORS } from '../../enums';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css']
})

export class PickerComponent implements OnInit {

  @Output()
  public colorChange: EventEmitter<string> = new EventEmitter();

  @Output()
  public fullscreen: EventEmitter<boolean> = new EventEmitter();

  @Output()
  public hide: EventEmitter<boolean> = new EventEmitter();

  @Input()
  currentColor: string;

  @Input()
  shifted: boolean;

  mainColors: string[] = MAIN_COLORS;

  loopTimer: number;
  loopInterval = 5;

  redChannel: number;
  greenChannel: number;
  blueChannel: number;

  constructor(public fullscreenService: FullscreenService) {}

  public ngOnInit(): void {
    this.loop(true);
  }

  changeColor(color: string): void {
    this.cancelLoop();
    this.assignColor(color);
  }

  changeChannels(): void {
    this.cancelLoop();
    this.assignColor(ColorService.colorFromChannels(this.redChannel, this.greenChannel, this.blueChannel));
  }

  assignColor(color: string): void {
    this.assignChannels(color);
    this.colorChange.emit(color);
  }

  loop(checked: boolean): void {

    this.cancelLoop();

    if (checked) {
      let index: number = Math.max(MAIN_COLORS.indexOf(this.currentColor), 0);
      let actualInterval: number;
      const callback: Function = () => {
        this.assignColor(MAIN_COLORS[index++]);
        if (index >= MAIN_COLORS.length) {
          index = 0;
        }
      };

      actualInterval = Math.max(this.loopInterval, .5);
      if (isNaN(actualInterval)) {
        actualInterval = 5;
      }

      this.loopTimer = setInterval(callback, actualInterval * 1000);

      callback();
    }
  }

  cancelLoop(): void {
    clearInterval(this.loopTimer);
    this.loopTimer = 0;
  }

  toggleFullScreen(): void {
    this.fullscreen.emit(true);
  }

  assignChannels(color: string): void {
    const hex: string = ColorService.colorToHex(color).slice(-6);
    this.redChannel = parseInt(hex.slice(0, 2), 16);
    this.greenChannel = parseInt(hex.slice(2, 4), 16);
    this.blueChannel = parseInt(hex.slice(4, 6), 16);
  }

}
