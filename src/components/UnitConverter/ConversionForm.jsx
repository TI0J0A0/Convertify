
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ConversionForm = ({
  inputValue,
  onInputChange,
  fromUnit,
  onFromUnitChange,
  toUnit,
  onToUnitChange,
  units,
  onSwapUnits,
  isApiCategory,
}) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <motion.div 
          className="space-y-2 md:col-span-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Label htmlFor="inputValue" className="text-foreground/80">Amount</Label>
          <Input
            id="inputValue"
            type="number"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter value"
            className="text-lg py-3 bg-background/70 dark:bg-slate-800/50 border-border focus:border-primary"
          />
        </motion.div>

        <motion.div 
          className="space-y-2 md:col-span-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="fromUnit" className="text-foreground/80">From</Label>
          <Select value={fromUnit} onValueChange={onFromUnitChange}>
            <SelectTrigger id="fromUnit" className="text-base py-3 bg-background/70 dark:bg-slate-800/50 border-border focus:border-primary">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
        
        <motion.div 
          className="flex items-center justify-center md:col-span-1"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onSwapUnits}
            className="mt-auto h-11 w-11 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            aria-label="Swap units"
            disabled={isApiCategory}
          >
            <ArrowRightLeft className="h-5 w-5 text-primary" />
          </Button>
        </motion.div>
      </div>

      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Label htmlFor="toUnit" className="text-foreground/80">To</Label>
        <Select value={toUnit} onValueChange={onToUnitChange}>
          <SelectTrigger id="toUnit" className="text-base py-3 bg-background/70 dark:bg-slate-800/50 border-border focus:border-primary">
            <SelectValue placeholder="Select unit" />
          </SelectTrigger>
          <SelectContent>
            {units.map((unit) => (
              <SelectItem key={unit.id} value={unit.id}>
                {unit.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    </motion.div>
  );
};

export default ConversionForm;
