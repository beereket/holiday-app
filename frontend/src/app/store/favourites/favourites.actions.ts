import { createAction, props } from '@ngrx/store';

export const loadFavourites = createAction('[Favourites] Load Local');

export const loadFavouritesSuccess = createAction(
  '[Favourites] Load Local Success',
  props<{ favourites: string[] }>()
);

export const loadFavouritesFailure = createAction(
  '[Favourites] Load Local Failure',
  props<{ error: string }>()
);

export const addFavourite = createAction(
  '[Favourites] Add',
  props<{ id: string }>()
);

export const removeFavourite = createAction(
  '[Favourites] Remove',
  props<{ id: string }>()
);

export const syncFavouritesFromServer = createAction(
  '[Favourites] Sync From Server',
  props<{ favourites: string[] }>()
);

export const syncFavouritesFromServerFailure = createAction(
  '[Favourites] Sync From Server Failure',
  props<{ error: string }>()
);

export const mergeLocalToServer = createAction(
  '[Favourites] Merge Local To Server',
  props<{ uid: string }>()
);
