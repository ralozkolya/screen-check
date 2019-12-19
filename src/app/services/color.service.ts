import { Injectable } from '@angular/core';

@Injectable()
export class ColorService {

  private static byteToHex(number: number): string {
    return ('0' + number.toString(16)).slice(-2);
  }

  private static colorToRBGA(color: string): Uint8ClampedArray {
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

  public static colorToHex(color: string): string {
    let rgba: Uint8ClampedArray,
      hex: string;

    rgba = ColorService.colorToRBGA(color);
    hex = [0, 1, 2].map((index) => {
      return ColorService.byteToHex(rgba[index]);
    }).join('');

    return '#' + hex;
  }

  public static colorFromChannels(r: number, g: number, b: number): string {
    let hex: string = ColorService.byteToHex(r);
    hex += ColorService.byteToHex(g);
    hex += ColorService.byteToHex(b);
    return '#' + hex;
  }

}
