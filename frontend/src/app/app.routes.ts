import { Routes } from '@angular/router';
import {CountryList} from './components/country-list/country-list';
import {CountryInfo} from './components/country-info/country-info';

export const routes: Routes = [
  { path: '', redirectTo: '/countries', pathMatch: 'full' },
  { path: 'countries', component: CountryList},
  { path: 'countries/:code', component: CountryInfo}
];
