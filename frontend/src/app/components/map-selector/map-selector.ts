import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { HighlightService, MapsModule, MapsTooltipService, SelectionService } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppState } from '../../store/app.state';
import { loadCountries } from '../../store/countries/countries.actions';
import { selectCountries, selectLoading, selectError } from '../../store/countries/countries.selectors';
import { Country } from '../../store/countries/countries.models';

@Component({
  selector: 'app-map-selector',
  imports: [
    CommonModule,
    MapsModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  providers: [SelectionService, MapsTooltipService, HighlightService],
  templateUrl: './map-selector.html',
  styleUrl: './map-selector.css'
})
export class MapSelector implements OnInit {
  private store = inject(Store<AppState>);
  private router = inject(Router);

  countries$ = this.store.select(selectCountries);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  countries: Country[] = [];

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

  ngOnInit() {
    // Dispatch action to load countries
    this.store.dispatch(loadCountries());

    // Subscribe to countries and update dataSource
    this.countries$.subscribe(countries => {
      this.countries = countries;
      this.layerOptions[0].dataSource = this.countries;
    });
  }

  onShapeSelected(event: any) {
    const country = this.countries.find(country => country.name === event.shapeData.name);
    if (country) {
      this.goToCountry(country.countryCode);
    }
  }

  goToCountry(code: string) {
    this.router.navigate(['/country', code]);
  }
}
