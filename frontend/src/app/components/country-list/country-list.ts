import { Component, OnInit } from '@angular/core';
import {Country} from '../../services/country';
import {Router} from '@angular/router';

@Component({
  selector: 'app-country-list',
  imports: [],
  templateUrl: './country-list.html',
  styleUrl: './country-list.css'
})
export class CountryList {
  countries: any[] = [];

  constructor(private router: Router, private countryService: Country) {}

  ngOnInit(){
    this.countryService.getCountries().subscribe( countries => {
      this.countries = countries;
    })
  }

  goToCountry(code: string) {
    this.router.navigate(['/country', code]);
  }
}
