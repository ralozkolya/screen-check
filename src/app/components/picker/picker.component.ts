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
  private currentColor: string;

  @Input()
  private shifted: boolean;

  private mainColors: string[] = MAIN_COLORS;

  private loopTimer: number;
  private loopInterval = 5;

  private redChannel: number;
  private greenChannel: number;
  private blueChannel: number;

  constructor(private fullscreenService: FullscreenService, private colorService: ColorService) {}

  public ngOnInit(): void {
    this.loop(true);
  }

  private changeColor(color: string): void {
    this.cancelLoop();
    this.assignColor(color);
  }

  private changeChannels(): void {
    this.cancelLoop();
    this.assignColor(this.colorService.colorFromChannels(this.redChannel, this.greenChannel, this.blueChannel));
  }

  private assignColor(color: string): void {
    this.assignChannels(color);
    this.colorChange.emit(color);
  }

  private loop(checked: boolean): void {

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

  private cancelLoop(): void {
    clearInterval(this.loopTimer);
    this.loopTimer = 0;
  }

  private toggleFullScreen(): void {
    this.fullscreen.emit(true);
  }

  private assignChannels(color: string): void {
    const hex: string = this.colorService.colorToHex(color).slice(-6);
    this.redChannel = parseInt('0x' + hex.slice(0, 2), 10);
    this.greenChannel = parseInt('0x' + hex.slice(2, 4), 10);
    this.blueChannel = parseInt('0x' + hex.slice(4, 6), 10);
  }

}
