import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import SectionHeader from "./SectionHeader";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  participants: number;
  is_active: boolean;
}

const getTypeColor = (type: string): string => {
  switch (type) {
    case 'preghiera':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'corso':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'sociale':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'conferenza':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const EventiSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false); // nuovo stato

  useEffect(() => {
    fetchEvents();
    subscribeToEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToEvents = () => {
    const channel = supabase
      .channel('public-events')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'events' },
        () => fetchEvents()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  if (loading) {
    return (
      <section id="eventi" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Eventi" 
            subtitle="I prossimi eventi e attività della nostra comunità" 
          />
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Caricamento eventi...</p>
          </div>
        </div>
      </section>
    );
  }

  const eventsToShow = showAll ? events : events.slice(0, 4); // seleziona eventi da mostrare

  return (
    <section id="eventi" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Eventi" 
          subtitle="I prossimi eventi e attività della nostra comunità" 
        />
        
        {events.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nessun evento in programma</h3>
            <p className="text-muted-foreground">
              Al momento non ci sono eventi attivi. Torna presto per aggiornamenti.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2">
              {eventsToShow.map((event) => (
                <Card key={event.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={getTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-4 line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('it-IT')}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Users className="w-4 h-4 mr-2" />
                      {event.participants} partecipanti
                    </div>
                  </div>
                  
                  {event.description && (
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  )}
                </Card>
              ))}
            </div>

            {!showAll && events.length > 4 && (
              <div className="text-center mt-12">
                <Button 
                  size="lg" 
                  className="font-medium px-8"
                  onClick={() => setShowAll(true)} // mostra tutti al click
                >
                  Vedi tutti gli eventi
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default EventiSection;
