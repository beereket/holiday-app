import { createReducer, on } from '@ngrx/store';
import {
  loadCountries,
  loadCountriesSuccess,
  loadCountriesFailure
} from './countries.actions';
import { initialCountriesState } from './countries.state';

export const countriesReducer = createReducer(
  initialCountriesState,

    on(loadCountries, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(loadCountriesSuccess, (state, { countries }) => ({
        ...state,
        loading: false,
        countries
    })),
    
     on(loadCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);