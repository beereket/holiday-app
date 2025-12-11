import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavouriteState } from './favourites.state';

export const selectFavState = createFeatureSelector<FavouriteState>('favourites');

export const selectFavourites = createSelector(
  selectFavState,
  state => state.favourites
);

export const selectFavouritesLoading = createSelector(
  selectFavState,
  state => state.loading
);

export const selectFavouritesError = createSelector(
  selectFavState,
  state => state.error
);

export const isFavourite = (id: string) =>
  createSelector(selectFavState, state => state.favourites.includes(id));
