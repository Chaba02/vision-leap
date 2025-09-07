// ENUM-based filter structure for standardized filtering
export enum VenueType {
  ALL = 'all',
  VILLA = 'villa',
  RESORT = 'resort',
  HOTEL = 'hotel',
  RIAD = 'riad',
  PALAZZO = 'palazzo',
  RESTAURANT = 'restaurant'
}

export enum City {
  ALL = 'all',
  TUNISI = 'Tunisi',
  HAMMAMET = 'Hammamet',
  SOUSSE = 'Sousse',
  DJERBA = 'Djerba',
  MONASTIR = 'Monastir',
  SFAX = 'Sfax',
  MAHDIA = 'Mahdia',
  TOZEUR = 'Tozeur',
  TABARKA = 'Tabarka',
  KAIROUAN = 'Kairouan',
  BIZERTE = 'Bizerte',
  SIDI_BOU_SAID = 'Sidi Bou Said'
}

export enum PriceRange {
  ALL = 'all',
  BUDGET = '0-2000',
  MEDIUM = '2000-5000',
  PREMIUM = '5000-7000',
  LUXURY = '7000-10000',
  ULTRA_LUXURY = '10000+'
}

export enum CapacityRange {
  ALL = 'all',
  INTIMATE = '0-50',
  SMALL = '50-100',
  MEDIUM = '100-200',
  LARGE = '200-500',
  EXTRA_LARGE = '500+'
}

export enum SortBy {
  RELEVANCE = 'relevance',
  PRICE_LOW_TO_HIGH = 'price_asc',
  PRICE_HIGH_TO_LOW = 'price_desc',
  RATING = 'rating',
  NAME = 'name',
  CAPACITY = 'capacity'
}

export interface SearchFilters {
  query: string;
  city: City;
  venueType: VenueType;
  priceRange: PriceRange;
  capacity: CapacityRange;
  date: string;
  features: string[];
  sortBy: SortBy;
}

export interface SearchState {
  filters: SearchFilters;
  isSearching: boolean;
  isFocused: boolean;
  showAdvancedFilters: boolean;
  results: any[];
  totalResults: number;
}