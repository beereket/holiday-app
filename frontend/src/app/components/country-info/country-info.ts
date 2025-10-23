import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Country} from '../../services/country';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';

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
  ],
  templateUrl: './country-info.html',
  styleUrl: './country-info.css'
})
export class CountryInfo {
  country: any = {};
  holidays: any[] = [];
  year: number = 2025;
  displayedColumns: string[] = ['date', 'localName', 'name', 'types'];

  constructor(private route: ActivatedRoute, private router: Router, private countryService: Country) {}

  ngOnInit(){
    const code = this.route.snapshot.paramMap.get('code') || "";
    this.countryService.getCountryInfo(code).subscribe( country => {
      this.country = country;
      console.log(country);
    })
    this.countryService.getPublicholidays(code, this.year).subscribe( holidays => {
      this.holidays = holidays;
    })
  }


  goToCountry(code: string) {
    this.router.navigate(['/country', code]);
  }
}
