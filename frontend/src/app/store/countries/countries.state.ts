import { Country } from './countries.models';

export interface CountriesState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

export const initialCountriesState: CountriesState = {
    countries: [],
    loading: false,
    error: null
};