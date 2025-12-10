import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { catchError, map, switchMap, of, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private auth = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) =>
        this.auth.login(email, password).pipe(
          map(result => loginSuccess({ user: result.user })),
          catchError(err => of(loginFailure({ error: err.message })))
        )
      )
    )
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigate(['profile/']))
      ),
    { dispatch: false }
  );
}
