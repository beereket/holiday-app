import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MapSelector} from './components/map-selector/map-selector';
import {MapsModule, MapsTooltipService} from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MapsModule, MapSelector],
  templateUrl: './app.html',
  providers: [MapsTooltipService],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
