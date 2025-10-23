import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Country} from '../../services/country';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {CountryCard} from '../country-card/country-card';

@Component({
  selector: 'app-country-info',
  imports: [CommonModule, MatCardModule, MatChipsModule, MatIconModule, MatDividerModule, CountryCard],
  templateUrl: './country-info.html',
  styleUrl: './country-info.css'
})
export class CountryInfo {
  country: any = {};
  holidays: any[] = [];
  year: number = 2025;

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
