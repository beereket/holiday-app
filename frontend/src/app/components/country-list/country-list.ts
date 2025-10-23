import { Component, OnInit } from '@angular/core';
import { Country } from '../../services/country';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CountryCard } from '../country-card/country-card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith, combineLatest } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-list',
  imports: [
    CommonModule,
    CountryCard,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './country-list.html',
  styleUrl: './country-list.css'
})
export class CountryList implements OnInit {
  searchControl = new FormControl('');
  countries$!: Observable<any[]>;
  filteredCountries$!: Observable<any[]>;

  constructor(private router: Router, private countryService: Country) {}

  ngOnInit() {
    this.countries$ = this.countryService.getCountries();

    this.filteredCountries$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map(searchTerm => searchTerm?.toLowerCase().trim() || ''),
      combineLatest(this.countries$),
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
