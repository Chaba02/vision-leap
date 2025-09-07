import { Star, MapPin, Users, Shield, Heart, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Location } from "@/data/locations";
import { useState } from "react";

interface LocationCardProps {
  location: Location;
  onClick?: () => void;
  variant?: 'vertical' | 'horizontal';
}

export const LocationCard = ({ location, onClick, variant = 'vertical' }: LocationCardProps) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/location/${location.id}`);
    }
  };

  if (variant === 'horizontal') {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300" onClick={handleCardClick}>
        <div className="flex gap-6">
          {/* Image Container */}
          <div className="relative w-48 h-32 overflow-hidden rounded-xl flex-shrink-0">
            {!imageError ? (
              <img 
                src={location.image}
                alt={location.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Building className="w-8 h-8 mx-auto mb-1 opacity-50" />
                  <p className="text-xs">Immagine non disponibile</p>
                </div>
              </div>
            )}
            
            {/* Overlay with badges */}
            <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
              {location.verified && (
                <div className="bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                  <Shield className="w-2 h-2 inline mr-1" />
                  Verificato
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                className={`bg-background/80 p-1 ${isLiked ? 'text-red-500' : 'text-foreground'} hover:scale-110 transition-all duration-200`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
              >
                <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Price badge */}
            <div className="absolute bottom-2 right-2">
              <div className="bg-background/90 px-2 py-1 text-xs font-medium text-foreground rounded-lg">
                {location.priceRange}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">
                {location.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {location.city}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {location.capacity} ospiti
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold text-yellow-700 dark:text-yellow-300">{location.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({location.reviewCount} recensioni)
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {location.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {location.features.slice(0, 3).map((feature, index) => (
                <span 
                  key={index}
                  className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium"
                >
                  {feature}
                </span>
              ))}
              {location.features.length > 3 && (
                <span className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full font-medium">
                  +{location.features.length - 3} altro
                </span>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0 flex items-center">
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            >
              Vedi dettagli
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-card border border-border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1" onClick={handleCardClick}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imageError ? (
          <img 
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Building className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Immagine non disponibile</p>
            </div>
          </div>
        )}
        
        {/* Overlay with badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {location.verified && (
            <div className="bg-primary/90 text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
              <Shield className="w-3 h-3 inline mr-1" />
              Verificato
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className={`bg-background/80 p-2 ${isLiked ? 'text-red-500' : 'text-foreground'} hover:scale-110 transition-all duration-200`}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Price badge */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-background/90 px-3 py-1 text-sm font-medium text-foreground rounded-lg">
            {location.priceRange}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {location.name}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">{location.city}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-medium">{location.capacity} ospiti</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-full">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-yellow-700 dark:text-yellow-300">{location.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground font-medium">
            ({location.reviewCount} recensioni)
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {location.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {location.features.slice(0, 2).map((feature, index) => (
            <span 
              key={index}
              className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full font-medium border border-primary/20"
            >
              {feature}
            </span>
          ))}
          {location.features.length > 2 && (
            <span className="text-xs px-3 py-1.5 bg-muted/60 text-muted-foreground rounded-full font-medium">
              +{location.features.length - 2} altro
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          Vedi dettagli
        </Button>
      </div>
    </div>
  );
};