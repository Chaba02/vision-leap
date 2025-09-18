import { useState, useRef, useEffect } from "react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  threshold?: number;
}

export const LazyImage = ({ 
  src, 
  alt, 
  className = "",
  fallbackSrc,
  threshold = 0.1 
}: LazyImageProps) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={imgRef} className={className}>
      {isInView ? (
        <ImageWithFallback
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          fallbackSrc={fallbackSrc}
          onError={() => setIsLoaded(true)}
        />
      ) : (
        <div className={`bg-muted animate-pulse ${className}`} />
      )}
    </div>
  );
};