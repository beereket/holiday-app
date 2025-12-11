import { Routes } from '@angular/router';
import {CountryList} from './components/country-list/country-list';
import {CountryInfo} from './components/country-info/country-info';
import {MapSelector} from './components/map-selector/map-selector';
import { LoginPage } from './components/auth/login-page/login-page';
import { RegisterPage } from './components/auth/register-page/register-page';
import { ProfilePage } from './components/auth/profile-page/profile-page';
import { FavouritesPage } from './components/favourites/favourites';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: MapSelector },
  { path: 'countries', component: CountryList},
  { path: 'country/:code', component: CountryInfo},
  { path: 'favourites', component: FavouritesPage},
  { path: 'login', component: LoginPage },
  { path: 'signup', component: RegisterPage },
  { path: 'profile', component: ProfilePage, canActivate: [authGuard] },
];
