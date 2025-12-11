export interface FavouriteState {
  favourites: string[];
  loading: boolean;
  error: string | null;
}

export const initialFavouriteState: FavouriteState = {
  favourites: [],
  loading: false,
  error: null
};