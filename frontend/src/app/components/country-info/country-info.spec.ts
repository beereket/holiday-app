import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryInfo } from './country-info';

describe('CountryInfo', () => {
  let component: CountryInfo;
  let fixture: ComponentFixture<CountryInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
