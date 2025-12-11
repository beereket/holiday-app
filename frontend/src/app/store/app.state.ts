
import { CountriesState } from './countries/countries.state';
import { FavouriteState } from './favourites/favourites.state';

export interface AppState {
  countries: CountriesState;
  favourites: FavouriteState;
}
