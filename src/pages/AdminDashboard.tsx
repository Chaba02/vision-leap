import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  LogOut,
  ArrowLeft 
} from 'lucide-react';
import EventForm from '@/components/admin/EventForm';
import DeleteEventDialog from '@/components/admin/DeleteEventDialog';

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

export default function AdminDashboard() {
  const { isAdmin, loading, signOut } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchEvents();
      subscribeToEvents();
    }
  }, [isAdmin]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare gli eventi",
        variant: "destructive",
      });
    } finally {
      setEventsLoading(false);
    }
  };

  const subscribeToEvents = () => {
    const channel = supabase
      .channel('events-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'events' },
        () => fetchEvents()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleDeleteEvent = async (event: Event) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', event.id);

      if (error) throw error;

      toast({
        title: "Evento eliminato",
        description: `"${event.title}" è stato eliminato con successo`,
      });
      setDeletingEvent(null);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile eliminare l'evento",
        variant: "destructive",
      });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'preghiera': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'corso': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sociale': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'conferenza': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
  {/* Header */}
  <header className="bg-white shadow-sm border-b">
    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link 
          to="/" 
          className="flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Torna al sito
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={signOut}>
          <LogOut className="h-4 w-4 mr-1" />
          Esci
        </Button>
      </div>
    </div>
  </header>

  {/* Main */}
  <main className="container mx-auto px-6 py-8">
    <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-1">Gestione Eventi</h2>
        <p className="text-gray-500">Gestisci tutti gli eventi della moschea</p>
      </div>
      <Button onClick={() => setShowEventForm(true)} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Nuovo Evento
      </Button>
    </div>

    {/* Loading */}
    {eventsLoading ? (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-primary border-gray-200 mx-auto mb-4"></div>
        <p className="text-gray-500">Caricamento eventi...</p>
      </div>
    ) : events.length === 0 ? (
      <Card className="text-center py-12">
        <CardContent>
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nessun evento</h3>
          <p className="text-gray-500 mb-4">Non ci sono eventi. Inizia creando il primo evento.</p>
          <Button onClick={() => setShowEventForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Crea primo evento
          </Button>
        </CardContent>
      </Card>
    ) : (
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className={`${!event.is_active ? 'opacity-60' : ''} hover:shadow-lg transition-shadow`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                  {!event.is_active && <Badge variant="secondary">Disattivato</Badge>}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => { setEditingEvent(event); setShowEventForm(true); }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setDeletingEvent(event)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg font-semibold mt-2">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(event.date).toLocaleDateString('it-IT')}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {event.time}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {event.location}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" /> {event.participants} partecipanti
              </div>
              {event.description && <p className="line-clamp-2">{event.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    )}
  </main>

  {/* Modals */}
  {showEventForm && (
    <EventForm
      event={editingEvent}
      onClose={() => { setShowEventForm(false); setEditingEvent(null); }}
      onSuccess={() => { setShowEventForm(false); setEditingEvent(null); fetchEvents(); }}
    />
  )}
  {deletingEvent && (
    <DeleteEventDialog
      event={deletingEvent}
      onClose={() => setDeletingEvent(null)}
      onConfirm={() => handleDeleteEvent(deletingEvent)}
    />
  )}
</div>

  );
}