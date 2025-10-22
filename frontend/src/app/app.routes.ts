import { Routes } from '@angular/router';
import {CountryList} from './components/country-list/country-list';
import {CountryInfo} from './components/country-info/country-info';
import {MapSelector} from './components/map-selector/map-selector';

export const routes: Routes = [
  { path: '', component: MapSelector },
  { path: 'countries', component: CountryList},
  { path: 'country/:code', component: CountryInfo}
];
