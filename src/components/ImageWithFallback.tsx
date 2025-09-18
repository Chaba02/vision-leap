import { useState } from "react";
import { Building } from "lucide-react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onError?: () => void;
}

export const ImageWithFallback = ({ 
  src, 
  alt, 
  className = "", 
  fallbackSrc = "/placeholder.svg",
  onError 
}: ImageWithFallbackProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <div className="text-center text-muted-foreground">
          <Building className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Immagine non disponibile</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`bg-muted animate-pulse ${className}`} />
      )}
      <img 
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'hidden' : ''} transition-opacity duration-200`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    </>
  );
};