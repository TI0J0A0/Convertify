
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

const CategoryTabs = ({ categories, selectedCategory, onSelectCategory }) => {
  const IconComponent = ({ name }) => {
    const Icon = LucideIcons[name];
    return Icon ? <Icon className="h-5 w-5 mr-2 text-primary/80 dark:text-sky-400/80 group-data-[state=active]:text-primary dark:group-data-[state=active]:text-sky-300" /> : <LucideIcons.HelpCircle className="h-5 w-5 mr-2" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Tabs value={selectedCategory.id} onValueChange={(value) => onSelectCategory(categories.find(cat => cat.id === value))}>
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-1 h-auto flex-wrap bg-primary/5 dark:bg-slate-800/60 p-2 rounded-lg">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="group data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-blue-500/10 dark:data-[state=active]:from-sky-500/20 dark:data-[state=active]:to-blue-600/20 data-[state=active]:shadow-md data-[state=active]:text-primary dark:data-[state=active]:text-sky-300 text-muted-foreground hover:bg-primary/5 dark:hover:bg-slate-700/50 transition-all duration-200 py-2.5 px-2 rounded-md flex items-center justify-start sm:justify-center text-left sm:text-center"
            >
              <IconComponent name={category.icon || 'HelpCircle'} />
              <span className="truncate text-xs sm:text-sm">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

export default CategoryTabs;
