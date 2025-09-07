import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, Shield, Heart, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Location } from "@/data/locations";

interface LocationModalProps {
  location: Location | null;
  isOpen: boolean;
  onClose: () => void;
  onBooking: () => void;
}

export const LocationModal = ({ location, isOpen, onClose, onBooking }: LocationModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!location) return null;

  // For demo, we'll use the same image multiple times
  const images = [location.image, location.image, location.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-glass-border/50 max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-0">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-semibold text-foreground">
                {location.name}
              </DialogTitle>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {location.city}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {location.capacity} ospiti
                </div>
                {location.verified && (
                  <div className="verified-badge">
                    <Shield className="w-3 h-3" />
                    Verificato
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={`${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Image Gallery */}
        <div className="relative aspect-[16/9] mx-6 rounded-xl overflow-hidden">
          <img 
            src={images[currentImageIndex]}
            alt={`${location.name} - Immagine ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-3 top-1/2 -translate-y-1/2 glass-card p-2"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-3 top-1/2 -translate-y-1/2 glass-card p-2"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              
              {/* Image indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Rating and Price */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-foreground">{location.rating}</span>
              </div>
              <span className="text-muted-foreground">
                ({location.reviewCount} recensioni)
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-foreground">
                {location.priceRange}
              </div>
              <div className="text-sm text-muted-foreground">
                per evento
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Descrizione</h3>
            <p className="text-muted-foreground leading-relaxed">
              {location.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Servizi inclusi</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {location.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Recensioni</h3>
            <div className="space-y-4">
              {location.reviews.map((review) => (
                <div key={review.id} className="glass-card p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-foreground">{review.author}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < review.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString('it-IT')}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm p-4 -mx-6 -mb-6 border-t border-glass-border/30">
            <Button 
              onClick={onBooking}
              className="btn-primary w-full text-lg py-3"
            >
              Prenota con garanzia
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};