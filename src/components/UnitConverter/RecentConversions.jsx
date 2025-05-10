
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { History, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const RecentConversions = ({ recents }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="shadow-lg glassmorphism-card">
        <CardHeader className="pb-4">
          <div className="flex items-center">
            <History className="h-6 w-6 text-primary/80 dark:text-sky-400/80 mr-2" />
            <CardTitle className="text-xl text-foreground">Recent Conversions</CardTitle>
          </div>
          <CardDescription>Your last few conversions.</CardDescription>
        </CardHeader>
        <CardContent>
          {recents.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No recent conversions.</p>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {recents.map((recent) => (
                <motion.li
                  key={recent.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-2.5 bg-background/30 dark:bg-slate-700/20 rounded-md"
                >
                  <p className="text-sm text-foreground">
                    {recent.fromValue}{recent.fromSymbol} <Zap className="inline h-3 w-3 mx-1 text-primary/60" /> {recent.toValue}{recent.toSymbol}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {recent.category.charAt(0).toUpperCase() + recent.category.slice(1)}
                  </p>
                </motion.li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentConversions;
