import { Component, OnInit } from '@angular/core';
import {Country} from '../../services/country';
import {MapsModule} from '@syncfusion/ej2-angular-maps';
import {world_map} from './world-map';

@Component({
  selector: 'app-map-selector',
  imports: [
    MapsModule
  ],
  templateUrl: './map-selector.html',
  styleUrl: './map-selector.css'
})
export class MapSelector {
  countries: any[] = [];
  public layerOptions: any[] = [
    {
      shapeData: world_map,
      shapeDataPath: 'name',

      shapePropertyPath: 'name',
      dataSource: this.countries,

      shapeSettings: {
        autofill: true,
      },

      tooltipSettings: {
        visible: true,
        valuePath: 'name'
      }
    }
  ];

  constructor(private countryService: Country) {}

  ngOnInit(){
    this.countryService.getCountries().subscribe( countries => {
      this.countries = countries;
    })
  }
}
