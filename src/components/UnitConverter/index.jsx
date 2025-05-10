import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import CategoryTabs from './CategoryTabs';
import ConversionForm from './ConversionForm';
import ConversionResult from './ConversionResult';
import FavoriteConversions from './FavoriteConversions';
import RecentConversions from './RecentConversions';
import { unitCategories, convertUnit, getUnitSymbol, getCurrencyApiKey } from '@/lib/conversionLogic';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Info } from 'lucide-react';

const UnitConverter = () => {
  const [selectedCategory, setSelectedCategory] = useState(unitCategories[0]);
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(selectedCategory.units[0].id);
  const [toUnit, setToUnit] = useState(selectedCategory.units.length > 1 ? selectedCategory.units[1].id : selectedCategory.units[0].id);
  const [conversionResult, setConversionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [favorites, setFavorites] = useLocalStorage('convertify-favorites', []);
  const [recents, setRecents] = useLocalStorage('convertify-recents', []);
  const { toast } = useToast();

  useEffect(() => {
    setFromUnit(selectedCategory.units[0].id);
    setToUnit(
      selectedCategory.units.length > 1
        ? selectedCategory.units[1].id
        : selectedCategory.units[0].id
    );
    setInputValue('1');
    setConversionResult(null);
  }, [selectedCategory]);

  // 🔧 Correção aqui: validação antes de converter
  useEffect(() => {
    const categoryIsCorrect = unitCategories.find(
      (cat) =>
        cat.id === selectedCategory.id &&
        cat.units.some((u) => u.id === fromUnit) &&
        cat.units.some((u) => u.id === toUnit)
    );

    if (
      !inputValue ||
      !fromUnit ||
      !toUnit ||
      !selectedCategory?.id ||
      isNaN(parseFloat(inputValue)) ||
      !categoryIsCorrect
    ) {
      return;
    }

    handleConvert();
  }, [inputValue, fromUnit, toUnit, selectedCategory]);

  const handleConvert = async () => {
    if (!inputValue || isNaN(parseFloat(inputValue))) {
      setConversionResult(null);
      return;
    }

    if (fromUnit === toUnit) {
      const val = parseFloat(inputValue);
      setConversionResult({
        precise: val,
        rounded: parseFloat(val.toFixed(selectedCategory.id === 'currency' ? 2 : 4)),
      });
      return;
    }

    setIsLoading(true);
    setConversionResult(null);

    const resultOrError = await convertUnit(inputValue, fromUnit, toUnit, selectedCategory.id);

    if (typeof resultOrError === 'object' && resultOrError !== null && resultOrError.error) {
      setConversionResult({
        precise: 'Error',
        rounded: 'Error',
        isApiError: true,
        message: resultOrError.error,
      });
      toast({
        title: 'Conversion Error',
        description: resultOrError.error,
        variant: 'destructive',
      });
    } else if (resultOrError !== null) {
      const precise = resultOrError;
      const rounded = parseFloat(resultOrError.toFixed(
        selectedCategory.id === 'currency' ? 2 :
        selectedCategory.id === 'temperature' ? 1 : 4
      ));
      setConversionResult({ precise, rounded });

      const newRecent = {
        id: Date.now(),
        category: selectedCategory.id,
        fromValue: inputValue,
        fromUnit,
        toValue: rounded,
        toUnit,
        fromSymbol: getUnitSymbol(fromUnit, selectedCategory.id),
        toSymbol: getUnitSymbol(toUnit, selectedCategory.id),
      };
      setRecents(prev => [newRecent, ...prev.filter(r => r.id !== newRecent.id)].slice(0, 5));
    } else {
      setConversionResult(null);
      toast({
        title: 'Conversion Error',
        description: 'Could not perform conversion. Please check units or API status.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleFavorite = () => {
    if (!conversionResult || conversionResult.isApiError || conversionResult.isApiPlaceholder) {
      toast({
        title: 'Cannot Favorite',
        description: 'Please perform a valid conversion first.',
        variant: 'destructive',
      });
      return;
    }

    const newFavorite = {
      id: `${selectedCategory.id}-${inputValue}-${fromUnit}-to-${toUnit}`,
      category: selectedCategory.id,
      categoryName: selectedCategory.name,
      fromValue: inputValue,
      fromUnit,
      toValue: conversionResult.rounded,
      toUnit,
      fromSymbol: getUnitSymbol(fromUnit, selectedCategory.id),
      toSymbol: getUnitSymbol(toUnit, selectedCategory.id),
    };

    if (favorites.find(fav => fav.id === newFavorite.id)) {
      setFavorites(prev => prev.filter(fav => fav.id !== newFavorite.id));
      toast({ title: 'Removed from Favorites' });
    } else {
      setFavorites(prev => [newFavorite, ...prev]);
      toast({ title: 'Added to Favorites!' });
    }
  };

  const isFavorited =
    conversionResult &&
    !conversionResult.isApiError &&
    !conversionResult.isApiPlaceholder &&
    favorites.some(fav => fav.id === `${selectedCategory.id}-${inputValue}-${fromUnit}-to-${toUnit}`);

  const currencyApiKey = getCurrencyApiKey();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <CategoryTabs
        categories={unitCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {!currencyApiKey && selectedCategory.id === 'currency' && (
        <motion.div
          className="mt-4 p-4 bg-destructive/10 dark:bg-destructive/20 border border-destructive/30 dark:border-destructive/40 rounded-md text-sm text-destructive dark:text-red-400 flex items-start shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
          <span>
            <strong>API Key Missing:</strong> Currency conversion requires an API key from ExchangeRate-API. Please add it to the configuration.
          </span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-xl glassmorphism-card overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl text-primary dark:text-sky-300">
                Convert {selectedCategory.name}
              </CardTitle>
              <CardDescription>Enter a value and select units to convert.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ConversionForm
                inputValue={inputValue}
                onInputChange={setInputValue}
                fromUnit={fromUnit}
                onFromUnitChange={setFromUnit}
                toUnit={toUnit}
                onToUnitChange={setToUnit}
                units={selectedCategory.units}
                onSwapUnits={handleSwapUnits}
                isApiCategory={selectedCategory.isApiBased && selectedCategory.id === 'currency'}
              />
              <AnimatePresence mode="wait">
                {conversionResult && (
                  <ConversionResult
                    result={conversionResult}
                    toUnitSymbol={getUnitSymbol(toUnit, selectedCategory.id)}
                    isLoading={isLoading}
                    onFavorite={handleFavorite}
                    isFavorited={isFavorited}
                    isApiError={conversionResult.isApiError}
                    isApiPlaceholder={conversionResult.isApiPlaceholder}
                  />
                )}
              </AnimatePresence>

              {selectedCategory.isApiBased &&
                selectedCategory.id === 'currency' &&
                !conversionResult?.isApiError &&
                currencyApiKey && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-md text-sm text-blue-700 dark:text-blue-300 flex items-start">
                    <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      Live currency rates are provided by ExchangeRate-API and updated periodically. For precise financial transactions, please consult a professional service.
                    </span>
                  </div>
                )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FavoriteConversions favorites={favorites} setFavorites={setFavorites} toast={toast} />
          <Separator />
          <RecentConversions recents={recents} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UnitConverter;
