import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FavActions from './favourites.actions';
import { Store } from '@ngrx/store';
import { selectFavourites } from './favourites.selector';
import { map, switchMap, tap, withLatestFrom, filter, take, mergeMap, catchError } from 'rxjs/operators';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc, writeBatch } from '@angular/fire/firestore';
import { of, from } from 'rxjs';

@Injectable()
export class FavouritesEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private auth = inject(Auth);
  private afs = inject(Firestore);

  private authState$ = authState(this.auth);

  loadLocal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavActions.loadFavourites),
      map(() => {
        try {
          const data = localStorage.getItem('favs');
          const favourites = data ? JSON.parse(data) : [];
          
          // Validate that favourites is an array
          if (!Array.isArray(favourites)) {
            throw new Error('Invalid favourites data format');
          }
          
          return FavActions.loadFavouritesSuccess({ favourites });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to load favourites from localStorage';
          return FavActions.loadFavouritesFailure({ error: errorMessage });
        }
      })
    )
  );

  saveLocal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavActions.addFavourite, FavActions.removeFavourite),
        withLatestFrom(this.store.select(selectFavourites)),
        tap(([_, favs]) => {
          try {
            localStorage.setItem('favs', JSON.stringify(favs));
          } catch (error) {
            console.error('Failed to save favourites to localStorage:', error);
          }
        })
      ),
    { dispatch: false }
  );

  loadFromServer$ = createEffect(() =>
    this.authState$.pipe(
      filter(user => !!user),
      switchMap(user => {
        const col = collection(this.afs, `users/${user!.uid}/favourites`);
        return collectionData(col, { idField: 'id' }).pipe(
          map((docs: any[]) =>
            FavActions.syncFavouritesFromServer({
              favourites: docs.map((d: any) => d.id).filter((id: any): id is string => typeof id === 'string')
            })
          ),
          catchError(error => {
            const errorMessage = error?.message || 'Failed to load favourites from server';
            return of(FavActions.syncFavouritesFromServerFailure({ error: errorMessage }));
          })
        );
      })
    )
  );

  mergeLocalToServerOnLogin$ = createEffect(() =>
    this.authState$.pipe(
      filter(user => !!user),
      take(1),
      map(user => FavActions.mergeLocalToServer({ uid: user!.uid }))
    )
  );

  mergeLocalToServer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavActions.mergeLocalToServer),
        mergeMap(({ uid }) => {
          try {
            const localData = localStorage.getItem('favs');
            const local = localData ? JSON.parse(localData) : [];

            if (!Array.isArray(local) || local.length === 0) {
              return of(null);
            }

            const batch = writeBatch(this.afs);
            const col = collection(this.afs, `users/${uid}/favourites`);

            local.forEach((id: string) => {
              if (typeof id === 'string') {
                const ref = doc(col, id);
                batch.set(ref, { createdAt: Date.now() });
              }
            });

            return from(batch.commit()).pipe(
              tap(() => {
                localStorage.removeItem('favs');
                // TODO: Replace with proper notification service
                console.log('Favourites merged successfully with account');
              }),
              catchError(error => {
                console.error('Failed to merge favourites:', error);
                return of(null);
              })
            );
          } catch (error) {
            console.error('Error parsing local favourites:', error);
            return of(null);
          }
        })
      ),
    { dispatch: false }
  );
}
