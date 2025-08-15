import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
}

interface DeleteEventDialogProps {
  event: Event;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteEventDialog({ event, onClose, onConfirm }: DeleteEventDialogProps) {
  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Elimina evento</AlertDialogTitle>
          <AlertDialogDescription>
            Sei sicuro di voler eliminare l'evento "{event.title}"?
            <br />
            <span className="text-sm text-muted-foreground">
              Programma per: {new Date(event.date).toLocaleDateString('it-IT')} alle {event.time}
            </span>
            <br /><br />
            Questa azione non può essere annullata.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Annulla</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Elimina
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}