import { Component, OnInit } from '@angular/core';
import {Country} from '../../services/country';
import {HighlightService, MapsModule, MapsTooltipService, SelectionService} from '@syncfusion/ej2-angular-maps';
import {world_map} from './world-map';
import {MatTableModule} from '@angular/material/table';
import {Router} from '@angular/router';

@Component({
  selector: 'app-map-selector',
  imports: [
    MapsModule,
    MatTableModule,
  ],
  providers: [SelectionService, MapsTooltipService, HighlightService],
  templateUrl: './map-selector.html',
  styleUrl: './map-selector.css'
})
export class MapSelector {
  countries: any[] = [];

  displayedColumns: string[] = ['name', 'countryCode'];

  public layerOptions: any[] = [
    {
      shapeData: world_map,
      shapeDataPath: 'name',

      shapePropertyPath: 'name',
      dataSource: this.countries,

      shapeSettings: {
        autofill: true,
      },

      highlightSettings: {
        enable: true,
        fill: '#4CAF50',
        opacity: 0.6,
        border: {
          color: '#2E7D32',
          width: 2
        }
      },

      selectionSettings: {
        enable: true,
        fill: '#4CAF50',
        opacity: 0.8
      },

      tooltipSettings: {
        visible: true,
        valuePath: 'name'
      }
    }
  ];

  constructor(private router: Router, private countryService: Country) {}

  ngOnInit(){
    this.countryService.getCountries().subscribe( countries => {
      this.countries = countries;
      this.layerOptions[0].dataSource = this.countries;

    })
  }

  onShapeSelected(event: any) {
    console.log(event);
    const code = this.countries.find(country => country.name === event.shapeData.name).countryCode;
    this.goToCountry(code);
  }

  goToCountry(code: string) {
    this.router.navigate(['/country', code]);
  }
}
