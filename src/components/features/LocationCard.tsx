/**
 * Location card component displaying location details
 * Used in search results and location listings
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import type { Location } from '@/types';

interface LocationCardProps {
  location: Location;
  showActions?: boolean;
}

export const LocationCard = ({ location, showActions = true }: LocationCardProps) => {
  const { user, isAuthenticated } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [isToggling, setIsToggling] = useState(false);

  const isClient = user?.role === 'CLIENT';
  const canAddToFavorites = isAuthenticated && isClient;
  const isLocationFavorite = isFavorite(location.id);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!canAddToFavorites || isToggling) return;

    try {
      setIsToggling(true);
      if (isLocationFavorite) {
        await removeFromFavorites(location.id);
      } else {
        await addToFavorites(location.id);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Card className="location-card h-full flex flex-col group">
      <div className="relative">
        <Link to={`/location/${location.id}`}>
          <div className="aspect-[4/3] overflow-hidden rounded-t-xl">
            <img
              src={location.images[0] || '/placeholder.svg'}
              alt={location.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </Link>
        
        {/* Favorite button with design system colors */}
        {canAddToFavorites && showActions && (
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isLocationFavorite 
                ? 'bg-destructive/90 text-destructive-foreground hover:bg-destructive' 
                : 'bg-glass/90 text-muted-foreground hover:bg-glass hover:text-destructive'
            }`}
            onClick={handleToggleFavorite}
            disabled={isToggling}
          >
            <Heart className={`w-4 h-4 transition-all ${isLocationFavorite ? 'fill-current scale-110' : ''}`} />
          </Button>
        )}
      </div>

      <CardContent className="p-5 flex-1 flex flex-col">
        <Link to={`/location/${location.id}`} className="flex-1">
          <div className="space-y-3 h-full flex flex-col">
            {/* Title and Rating */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-lg leading-tight">
                {location.title}
              </h3>
              <div className="flex items-center gap-1 bg-warning/10 px-2 py-1 rounded-lg flex-shrink-0">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="text-sm font-semibold text-warning">{location.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate font-medium">{location.city}</span>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Guests and Price */}
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Max {location.maxGuests} ospiti</span>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-foreground">
                  €{location.price}
                </div>
                <div className="text-xs text-muted-foreground">per notte</div>
              </div>
            </div>

            {/* Action buttons */}
            {showActions && isClient && (
              <div className="pt-4">
                <Link to={`/booking/${location.id}`}>
                  <Button className="w-full btn-primary">
                    Prenota ora
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};