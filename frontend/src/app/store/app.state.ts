import { AuthState } from './auth/auth.state';
import { CountriesState } from './countries/countries.state';

export interface AppState {
  auth: AuthState;
  countries: CountriesState;
}
