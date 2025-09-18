/**
 * Reusable error message component
 * Displays error messages with consistent styling
 */

import { AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorMessage = ({ message, onDismiss, className }: ErrorMessageProps) => {
  return (
    <div className={cn(
      'flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive',
      className
    )}>
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
      <p className="flex-1 text-sm">{message}</p>
      {onDismiss && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="h-auto p-1 hover:bg-destructive/10"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};