
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Heart, Loader2, AlertTriangle, ServerCrash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ConversionResult = ({ result, toUnitSymbol, isLoading, onFavorite, isFavorited, isApiError, isApiPlaceholder }) => {
  const { toast } = useToast();

  const handleCopy = (valueToCopy) => {
    if (typeof valueToCopy !== 'string' && typeof valueToCopy !== 'number') {
        toast({ title: 'Copy Failed', description: 'Cannot copy this value.', variant: 'destructive' });
        return;
    }
    navigator.clipboard.writeText(valueToCopy.toString())
      .then(() => {
        toast({
          title: 'Copied to clipboard!',
          description: `${valueToCopy} ${toUnitSymbol || ''}`,
        });
      })
      .catch(err => {
        toast({
          title: 'Copy Failed',
          description: 'Could not copy to clipboard.',
          variant: 'destructive',
        });
        console.error('Copy failed: ', err);
      });
  };

  if (isLoading) {
    return (
      <motion.div 
        className="mt-6 p-6 bg-muted/50 dark:bg-slate-800/40 rounded-lg flex items-center justify-center min-h-[100px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-lg font-medium text-muted-foreground">Converting...</span>
      </motion.div>
    );
  }

  if (!result) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`mt-6 p-6 rounded-xl shadow-lg ${isApiError ? 'bg-destructive/10 dark:bg-red-900/30 border border-destructive/30' : 'bg-gradient-to-br from-primary/10 to-blue-500/10 dark:from-sky-500/20 dark:to-blue-600/20'}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {isApiError ? (
           <div className="text-center">
            <ServerCrash className="h-10 w-10 text-destructive dark:text-red-400 mx-auto mb-3" />
            <p className="text-xl font-bold text-destructive dark:text-red-300">Conversion Failed</p>
            <p className="text-sm text-destructive/80 dark:text-red-400/80 mt-1">{result.message || 'An unknown error occurred.'}</p>
          </div>
        ) : isApiPlaceholder ? (
           <div className="text-center">
            <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{result.rounded}</p>
            <p className="text-sm text-amber-500 dark:text-amber-300 mt-1">{result.message}</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-primary dark:text-sky-300 font-medium mb-1">Result:</p>
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-4xl md:text-5xl font-bold text-primary dark:text-sky-300">
                  {result.rounded}
                </span>
                <span className="ml-2 text-xl text-primary/80 dark:text-sky-400/80">{toUnitSymbol}</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(result.rounded)}
                  className="rounded-full hover:bg-primary/10 dark:hover:bg-primary/20"
                  aria-label="Copy rounded result"
                >
                  <Copy className="h-5 w-5 text-primary/90 dark:text-sky-400/90" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onFavorite}
                  className="rounded-full hover:bg-primary/10 dark:hover:bg-primary/20"
                  aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`h-5 w-5 transition-colors ${isFavorited ? 'text-red-500 fill-red-500' : 'text-primary/90 dark:text-sky-400/90'}`} />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Precise: {result.precise} {toUnitSymbol}
              <Button
                variant="link"
                size="sm"
                onClick={() => handleCopy(result.precise)}
                className="ml-1 p-0 h-auto text-xs text-primary/70 hover:text-primary"
                aria-label="Copy precise result"
              >
                (Copy Precise)
              </Button>
            </p>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ConversionResult;
