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
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <Link to={`/location/${location.id}`}>
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={location.images[0] || '/placeholder.svg'}
              alt={location.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </Link>
        
        {/* Favorite button */}
        {canAddToFavorites && showActions && (
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm ${
              isLocationFavorite 
                ? 'bg-red-500/90 text-white hover:bg-red-600/90' 
                : 'bg-white/90 text-muted-foreground hover:bg-white hover:text-red-500'
            }`}
            onClick={handleToggleFavorite}
            disabled={isToggling}
          >
            <Heart className={`w-4 h-4 ${isLocationFavorite ? 'fill-current' : ''}`} />
          </Button>
        )}
      </div>

      <CardContent className="p-4">
        <Link to={`/location/${location.id}`}>
          <div className="space-y-2">
            {/* Title and Rating */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {location.title}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground flex-shrink-0">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{location.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{location.city}</span>
            </div>

            {/* Guests and Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Max {location.maxGuests} ospiti</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-foreground">
                  €{location.price}
                </span>
                <span className="text-sm text-muted-foreground">/notte</span>
              </div>
            </div>

            {/* Action buttons */}
            {showActions && isClient && (
              <div className="pt-2">
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