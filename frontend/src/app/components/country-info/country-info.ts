import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Country} from '../../services/country';

@Component({
  selector: 'app-country-info',
  imports: [],
  templateUrl: './country-info.html',
  styleUrl: './country-info.css'
})
export class CountryInfo {
  country: any = {};
  holidays: any[] = [];
  year: number = 2025;

  constructor(private route: ActivatedRoute, private countryService: Country) {}

  ngOnInit(){
    const code = this.route.snapshot.paramMap.get('code') || "";
    this.countryService.getCountryInfo(code).subscribe( country => {
      this.country = country;
    })
    this.countryService.getPublicholidays(code, this.year).subscribe( holidays => {
      this.holidays = holidays;
    })
  }


}
