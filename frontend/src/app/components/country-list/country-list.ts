import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { CountryCard } from '../country-card/country-card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { AppState } from '../../store/app.state';
import { loadCountries } from '../../store/countries/countries.actions';
import { selectCountries, selectLoading, selectError } from '../../store/countries/countries.selectors';
import { Country } from '../../store/countries/countries.models';

@Component({
  selector: 'app-country-list',
  imports: [
    CommonModule,
    CountryCard,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  templateUrl: './country-list.html',
  styleUrl: './country-list.css'
})
export class CountryList implements OnInit {
  private store = inject(Store<AppState>);
  private router = inject(Router);

  searchControl = new FormControl('');
  countries$: Observable<Country[]> = this.store.select(selectCountries);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);
  filteredCountries$!: Observable<Country[]>;

  ngOnInit() {
    // Dispatch action to load countries if not already loaded
    this.store.dispatch(loadCountries());

    // Create filtered countries observable
    this.filteredCountries$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        map(searchTerm => searchTerm?.toLowerCase().trim() || '')
      ),
      this.countries$
    ]).pipe(
      map(([searchTerm, countries]) => {
        if (!searchTerm) {
          return countries;
        }
        return countries.filter(country =>
          country.countryCode?.toLowerCase().includes(searchTerm) ||
          country.name?.toLowerCase().includes(searchTerm)
        );
      })
    );
  }
}
