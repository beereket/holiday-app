import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CountryCard } from '../country-card/country-card';
import { AppState } from '../../store/app.state';
import { loadFavourites } from '../../store/favourites/favourites.actions';
import { selectFavourites, selectFavouritesLoading, selectFavouritesError } from '../../store/favourites/favourites.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favourites',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CountryCard
  ],
  templateUrl: './favourites.html',
  styleUrl: './favourites.css'
})
export class FavouritesPage implements OnInit {
  private store = inject(Store<AppState>);

  favourites$: Observable<string[]> = this.store.select(selectFavourites);
  loading$: Observable<boolean> = this.store.select(selectFavouritesLoading);
  error$: Observable<string | null> = this.store.select(selectFavouritesError);

  ngOnInit() {
    // Load favourites from localStorage
    this.store.dispatch(loadFavourites());
  }
}

