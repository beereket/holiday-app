import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MapsModule, MapsTooltipService} from '@syncfusion/ej2-angular-maps';
import {CommonModule} from '@angular/common';
import {Header} from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, MapsModule, Header],
  templateUrl: './app.html',
  providers: [MapsTooltipService],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
