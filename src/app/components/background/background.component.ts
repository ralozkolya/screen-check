import {Component, OnInit, Input, Output} from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent {

  @Input()
  color: string;

}
