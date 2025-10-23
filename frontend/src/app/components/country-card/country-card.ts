import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Country} from '../../services/country';
import {MatChip, MatChipListbox} from '@angular/material/chips';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-country-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButton,
    MatChip,
    MatChipListbox,
    MatDivider
  ],
  templateUrl: './country-card.html',
  styleUrl: './country-card.css'
})
export class CountryCard {
  @Input() countryCode: string = "";
  country: any = {};

  constructor(private router: Router, private countryService: Country) {}
  ngOnInit() {
    this.countryService.getCountryInfo(this.countryCode).subscribe( country => {
      this.country = country;
    })
  }
  goToCountry(code: string) {
    this.router.navigate(['/country', code]);
  }

}
