import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Country } from '../../services/country';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppState } from '../../store/app.state';
import { addFavourite, removeFavourite, loadFavourites } from '../../store/favourites/favourites.actions';
import { isFavourite } from '../../store/favourites/favourites.selector';

@Component({
  selector: 'app-country-info',
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './country-info.html',
  styleUrl: './country-info.css'
})
export class CountryInfo implements OnInit {
  private store = inject(Store<AppState>);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private countryService = inject(Country);

  country: any = {};
  holidays: any[] = [];
  year: number = 2025;
  displayedColumns: string[] = ['date', 'localName', 'name', 'types'];
  countryCode: string = '';

  ngOnInit() {
    this.countryCode = this.route.snapshot.paramMap.get('code') || '';
    
    // Load favourites
    this.store.dispatch(loadFavourites());

    this.countryService.getCountryInfo(this.countryCode).subscribe(country => {
      this.country = country;
      console.log(country);
    });
    
    this.countryService.getPublicholidays(this.countryCode, this.year).subscribe(holidays => {
      this.holidays = holidays;
    });
  }

  goToCountry(code: string) {
    this.router.navigate(['/country', code]);
  }

  toggleFavourite() {
    this.isFavourite$.pipe(take(1)).subscribe(isFav => {
      if (isFav) {
        this.store.dispatch(removeFavourite({ id: this.countryCode }));
      } else {
        this.store.dispatch(addFavourite({ id: this.countryCode }));
      }
    });
  }

  get isFavourite$(): Observable<boolean> {
    return this.store.select(isFavourite(this.countryCode));
  }
}
