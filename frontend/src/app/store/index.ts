import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { countriesReducer } from './countries/countries.reducers';
import { favouritesReducer } from './favourites/favourites.reducer';

export const reducers: ActionReducerMap<AppState> = {
  countries: countriesReducer,
  favourites: favouritesReducer
};
