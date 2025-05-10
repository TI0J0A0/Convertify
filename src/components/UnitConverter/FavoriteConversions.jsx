
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Trash2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FavoriteConversions = ({ favorites, setFavorites, toast }) => {
  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
    toast({ title: 'Removed from Favorites' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="shadow-lg glassmorphism-card">
        <CardHeader className="pb-4">
          <div className="flex items-center">
            <Star className="h-6 w-6 text-yellow-400 mr-2" />
            <CardTitle className="text-xl text-foreground">Favorite Conversions</CardTitle>
          </div>
          <CardDescription>Your saved quick conversions.</CardDescription>
        </CardHeader>
        <CardContent>
          {favorites.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No favorites yet. Save some!</p>
          ) : (
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
              <AnimatePresence>
                {favorites.map((fav) => (
                  <motion.li
                    key={fav.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    className="flex items-center justify-between p-3 bg-background/50 dark:bg-slate-700/30 rounded-md hover:bg-primary/5 dark:hover:bg-slate-600/40 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {fav.fromValue}{fav.fromSymbol} <Zap className="inline h-3 w-3 mx-1 text-primary/70" /> {fav.toValue}{fav.toSymbol}
                      </p>
                      <p className="text-xs text-muted-foreground">{fav.categoryName}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFavorite(fav.id)}
                      className="text-muted-foreground hover:text-destructive h-8 w-8"
                      aria-label="Remove favorite"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FavoriteConversions;
