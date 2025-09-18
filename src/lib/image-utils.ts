import { Location } from "@/data/locations";

export const getLocationImages = (location: Location): string[] => {
  // For now, return the single image as an array
  // In a real app, locations would have multiple images
  return [location.image];
};

export const getImageWithFallback = (imageSrc: string, fallbackSrc?: string): string => {
  // Basic implementation - in production, this could check if image exists
  return imageSrc || fallbackSrc || '/placeholder.svg';
};

export const generateImageAlt = (location: Location): string => {
  return `${location.name} - ${location.type} a ${location.city}`;
};

// Utility to preload images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
};