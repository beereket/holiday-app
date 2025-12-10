import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Country } from '../../services/country';
import { loadCountries, loadCountriesSuccess, loadCountriesFailure } from './countries.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class CountriesEffects {
  private actions$ = inject(Actions);
  private countryService = inject(Country);

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCountries),
      switchMap(() =>
        this.countryService.getCountries().pipe(
          map(countries => loadCountriesSuccess({ countries })),
          catchError(error => {
            const errorMessage = error?.message || 'Failed to load countries';
            return of(loadCountriesFailure({ error: errorMessage }));
          })
        )
      )
    )
  );
}
