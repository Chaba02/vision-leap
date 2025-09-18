import { SearchFilters, VenueType, City, PriceRange, CapacityRange, SortBy } from "@/types/search";

// Utility functions for URL parameter serialization/deserialization
export const serializeFiltersToURL = (filters: Partial<SearchFilters>): URLSearchParams => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== City.ALL && value !== VenueType.ALL && value !== PriceRange.ALL && value !== CapacityRange.ALL && value !== SortBy.RELEVANCE && value !== '') {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','));
      } else if (!Array.isArray(value)) {
        params.set(key, String(value));
      }
    }
  });
  
  return params;
};

export const parseFiltersFromURL = (searchParams: URLSearchParams): SearchFilters => {
  // Enhanced enum parsing with case-insensitive matching and validation
  const parseEnum = <T extends string>(
    enumObject: Record<string, T>, 
    value: string | null, 
    defaultValue: T
  ): T => {
    if (!value) return defaultValue;
    
    // Normalize value for comparison
    const normalizedValue = value.toLowerCase().trim();
    
    // Direct enum value match (exact case)
    const directMatch = Object.values(enumObject).find(enumValue => enumValue === value);
    if (directMatch) return directMatch as T;
    
    // Case-insensitive search for enum values
    const caseInsensitiveMatch = Object.values(enumObject).find(
      enumValue => enumValue.toLowerCase() === normalizedValue
    );
    if (caseInsensitiveMatch) return caseInsensitiveMatch as T;
    
    // Key-based search (e.g., "HAMMAMET" matches City.HAMMAMET)
    const keyMatch = Object.entries(enumObject).find(
      ([key]) => key.toLowerCase() === normalizedValue
    );
    if (keyMatch) return keyMatch[1] as T;
    
    return defaultValue;
  };

  return {
    query: searchParams.get('query') || '',
    city: parseEnum(City, searchParams.get('city'), City.ALL),
    venueType: parseEnum(VenueType, searchParams.get('venueType'), VenueType.ALL),
    priceRange: parseEnum(PriceRange, searchParams.get('priceRange'), PriceRange.ALL),
    capacity: parseEnum(CapacityRange, searchParams.get('capacity'), CapacityRange.ALL),
    date: searchParams.get('date') || '',
    features: searchParams.get('features')?.split(',').filter(Boolean) || [],
    sortBy: parseEnum(SortBy, searchParams.get('sortBy'), SortBy.RELEVANCE)
  };
};

// Mapping functions for natural language parsing
export const getCityFromText = (text: string): City => {
  const lowerText = text.toLowerCase();
  
  const cityMappings: Record<string, City> = {
    'tunisi': City.TUNISI,
    'tunis': City.TUNISI,
    'hammamet': City.HAMMAMET,
    'sousse': City.SOUSSE,
    'djerba': City.DJERBA,
    'monastir': City.MONASTIR,
    'sfax': City.SFAX,
    'mahdia': City.MAHDIA,
    'tozeur': City.TOZEUR,
    'tabarka': City.TABARKA,
    'kairouan': City.KAIROUAN,
    'bizerte': City.BIZERTE,
    'sidi bou said': City.SIDI_BOU_SAID,
    'sidi bou': City.SIDI_BOU_SAID
  };

  for (const [key, value] of Object.entries(cityMappings)) {
    if (lowerText.includes(key)) {
      return value;
    }
  }
  
  return City.ALL;
};

export const getVenueTypeFromText = (text: string): VenueType => {
  const lowerText = text.toLowerCase();
  
  const venueMappings: Record<string, VenueType> = {
    'villa': VenueType.VILLA,
    'resort': VenueType.RESORT,
    'hotel': VenueType.HOTEL,
    'riad': VenueType.RIAD,
    'palazzo': VenueType.PALAZZO,
    'palace': VenueType.PALAZZO,
    'ristorante': VenueType.RESTAURANT,
    'restaurant': VenueType.RESTAURANT
  };

  for (const [key, value] of Object.entries(venueMappings)) {
    if (lowerText.includes(key)) {
      return value;
    }
  }
  
  return VenueType.ALL;
};

export const getCapacityFromNumber = (capacity: number): CapacityRange => {
  if (capacity <= 50) return CapacityRange.INTIMATE;
  if (capacity <= 100) return CapacityRange.SMALL;
  if (capacity <= 200) return CapacityRange.MEDIUM;
  if (capacity <= 500) return CapacityRange.LARGE;
  return CapacityRange.EXTRA_LARGE;
};

export const getPriceRangeFromNumber = (price: number): PriceRange => {
  if (price <= 2000) return PriceRange.BUDGET;
  if (price <= 5000) return PriceRange.MEDIUM;
  if (price <= 7000) return PriceRange.PREMIUM;
  if (price <= 10000) return PriceRange.LUXURY;
  return PriceRange.ULTRA_LUXURY;
};

export const getPriceRangeFromText = (text: string): PriceRange => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('economica') || lowerText.includes('economico') || lowerText.includes('budget')) {
    return PriceRange.BUDGET;
  }
  if (lowerText.includes('media') || lowerText.includes('medio')) {
    return PriceRange.MEDIUM;
  }
  if (lowerText.includes('premium')) {
    return PriceRange.PREMIUM;
  }
  if (lowerText.includes('ultra lusso') || lowerText.includes('ultra-lusso')) {
    return PriceRange.ULTRA_LUXURY;
  }
  if (lowerText.includes('lusso') || lowerText.includes('di lusso') || lowerText.includes('luxury')) {
    return PriceRange.LUXURY;
  }
  
  return PriceRange.ALL;
};

export const getFeaturesFromText = (text: string): string[] => {
  const lowerText = text.toLowerCase();
  const featureMappings: Record<string, string> = {
    'vista mare': 'Vista mare panoramica',
    'spiaggia': 'Spiaggia privata',
    'piscina': 'Piscina privata',
    'giardino': 'Giardini curati',
    'parcheggio': 'Parcheggio privato',
    'catering': 'Servizio catering',
    'wifi': 'WiFi gratuito',
    'tradizionale': 'Architettura tradizionale',
    'moderno': 'Design moderno',
    'storico': 'Palazzo storico',
    'intimo': 'Atmosfera romantica',
    'romantico': 'Atmosfera romantica',
    'cortile': 'Cortile interno',
    'terrazza': 'Terrazza privata',
    'panoramica': 'Vista panoramica',
    'musica': 'Sistema audio/video',
    'audio': 'Sistema audio/video',
    'fotografia': 'Aree fotografiche',
    'foto': 'Aree fotografiche'
  };

  const detectedFeatures: string[] = [];
  for (const [key, value] of Object.entries(featureMappings)) {
    if (lowerText.includes(key)) {
      detectedFeatures.push(value);
    }
  }
  
  return detectedFeatures;
};