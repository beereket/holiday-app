import { createReducer, on } from '@ngrx/store';
import { initialFavouriteState } from './favourites.state';
import * as FavActions from './favourites.actions';

export const favouritesReducer = createReducer(
  initialFavouriteState,

  on(FavActions.loadFavourites, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(FavActions.loadFavouritesSuccess, (state, { favourites }) => ({
    ...state,
    favourites,
    loading: false,
    error: null
  })),

  on(FavActions.loadFavouritesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(FavActions.addFavourite, (state, { id }) => {
    // Prevent duplicates
    if (state.favourites.includes(id)) {
      return state;
    }
    return {
      ...state,
      favourites: [...state.favourites, id],
      error: null
    };
  }),

  on(FavActions.removeFavourite, (state, { id }) => ({
    ...state,
    favourites: state.favourites.filter(f => f !== id),
    error: null
  })),

  on(FavActions.syncFavouritesFromServer, (state, { favourites }) => ({
    ...state,
    favourites,
    loading: false,
    error: null
  })),

  on(FavActions.syncFavouritesFromServerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

