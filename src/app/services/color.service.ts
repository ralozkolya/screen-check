import { Injectable } from '@angular/core';

@Injectable()
export class ColorService {

  public colorToHex(color: string): string {
    let rgba: Uint8ClampedArray,
      hex: string;

    rgba = this.colorToRBGA(color);
    hex = [0, 1, 2].map((index) => {
      return this.byteToHex(rgba[index]);
    }).join('');

    return '#' + hex;
  }

  public colorFromChannels(r: number, g: number, b: number): string {
    let hex: string = this.byteToHex(r);
    hex += this.byteToHex(g);
    hex += this.byteToHex(b);
    return '#' + hex;
  }

  private byteToHex(number: number): string {
    return ('0' + number.toString(16)).slice(-2);
  }

  private colorToRBGA(color: string): Uint8ClampedArray {
    let canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D;

    canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    context = canvas.getContext('2d');
    context.fillStyle = color;
    context.fillRect(0, 0, 1, 1);
    return context.getImageData(0, 0, 1, 1).data;
  }

}
