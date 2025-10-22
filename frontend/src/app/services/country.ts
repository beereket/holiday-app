import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Country {
  private url = 'https://date.nager.at/api/v3'

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/AvailableCountries`);
  }
  getCountryInfo(code: string): Observable<any> {
    return this.http.get<any>(`${this.url}/CountryInfo/${code}`);
  }

  getPublicholidays(code: string, year: number): Observable<any[]> {
    return this.http.get<any>(`${this.url}/PublicHolidays/${year}/${code}`);
  }
}
