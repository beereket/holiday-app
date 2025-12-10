import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectCountriesState = (state: AppState) => state.countries;

export const selectCountries = createSelector(
  selectCountriesState,
  state => state.countries
);

export const selectLoading = createSelector(
  selectCountriesState,
  state => state.loading
);

export const selectError = createSelector(
  selectCountriesState,
  state => state.error
);
