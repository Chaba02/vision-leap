import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Star, 
  Heart, 
  Share2, 
  Calendar, 
  Phone, 
  Mail, 
  Shield,
  Camera,
  Wifi,
  Car,
  Utensils,
  Music,
  Flower2,
  Clock,
  CheckCircle
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockLocations, Location } from "@/data/locations";

const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const location = mockLocations.find(loc => loc.id === id);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Location non trovata</h1>
          <p className="text-muted-foreground">La location che stai cercando non esiste.</p>
          <Link to="/">
            <Button className="btn-primary">Torna alla home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Mock gallery images (in a real app these would come from the location data)
  const galleryImages = [
    location.image,
    "/src/assets/le-mirage-resort.jpg",
    "/src/assets/riad-palmier.jpg",
    "/src/assets/villa-el-hana.jpg"
  ];

  const handleBooking = () => {
    navigate(`/booking/${location.id}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: location.name,
        text: location.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Indietro
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{location.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {location.city}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Fino a {location.capacity} ospiti
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {location.rating} ({location.reviewCount} recensioni)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleShare}
                className="btn-secondary"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Condividi
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsLiked(!isLiked)}
                className={`btn-secondary ${isLiked ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Rimosso' : 'Salva'}
              </Button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                <img
                  src={galleryImages[selectedImage]}
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  {location.verified && (
                    <Badge className="bg-green-500 text-white">
                      <Shield className="w-3 h-3 mr-1" />
                      Verificato
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/90 backdrop-blur-sm"
                  >
                    <Camera className="w-4 h-4 mr-1" />
                    Galleria
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {galleryImages.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedImage(index + 1)}
                >
                  <img
                    src={image}
                    alt={`${location.name} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Panoramica</TabsTrigger>
                  <TabsTrigger value="features">Servizi</TabsTrigger>
                  <TabsTrigger value="reviews">Recensioni</TabsTrigger>
                  <TabsTrigger value="location">Posizione</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Descrizione</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {location.description}
                    </p>
                  </div>

                  <div className="glass-card p-6 rounded-2xl">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Caratteristiche principali</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary" />
                        <span>Capacità: {location.capacity} ospiti</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span>Città: {location.city}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-primary" />
                        <span>Rating: {location.rating}/5</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-primary" />
                        <span>Status: {location.verified ? 'Verificato' : 'Non verificato'}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Servizi inclusi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {location.features.slice(0, showAllFeatures ? location.features.length : 8).map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    {location.features.length > 8 && (
                      <Button
                        variant="outline"
                        onClick={() => setShowAllFeatures(!showAllFeatures)}
                        className="mt-4 btn-secondary"
                      >
                        {showAllFeatures ? 'Mostra meno' : `Mostra tutti (${location.features.length})`}
                      </Button>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Recensioni</h2>
                    <div className="space-y-6">
                      {location.reviews.map((review) => (
                        <div key={review.id} className="border-b border-glass-border/30 pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">{review.author}</span>
                              <div className="flex items-center gap-1">
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
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Posizione</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span>{location.city}, Tunisia</span>
                      </div>
                      <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-12 h-12 mx-auto text-primary mb-2" />
                          <p className="text-muted-foreground">Mappa interattiva</p>
                          <p className="text-sm text-muted-foreground">Clicca per visualizzare la posizione esatta</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Booking Sidebar */}
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {location.priceRange}
                  </div>
                  <p className="text-muted-foreground">Prezzo per evento</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Capacità massima</span>
                    <span className="font-semibold">{location.capacity} ospiti</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tipo location</span>
                    <span className="font-semibold capitalize">{location.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{location.rating}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleBooking}
                  className="btn-primary w-full mb-4"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Prenota ora
                </Button>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="btn-secondary w-full"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Chiama
                  </Button>
                  <Button
                    variant="outline"
                    className="btn-secondary w-full"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Invia email
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-green-50/10 border border-green-200/20 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <Shield className="w-4 h-4" />
                    <span className="font-semibold">Garanzia Zafaf</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✅ Cancellazione gratuita</li>
                    <li>✅ Rimborso garantito</li>
                    <li>✅ Supporto 24/7</li>
                    <li>✅ Assicurazione inclusa</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;