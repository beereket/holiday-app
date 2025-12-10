import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { countriesReducer } from './countries/countries.reducers';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  countries: countriesReducer
};
