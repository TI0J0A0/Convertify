
export const unitCategories = [
  {
    id: "length",
    name: "Length/Distance",
    icon: "Ruler",
    units: [
      { id: "m", name: "Meter (m)", symbol: "m" },
      { id: "km", name: "Kilometer (km)", symbol: "km" },
      { id: "cm", name: "Centimeter (cm)", symbol: "cm" },
      { id: "mm", name: "Millimeter (mm)", symbol: "mm" },
      { id: "mi", name: "Mile (mi)", symbol: "mi" },
      { id: "ft", name: "Foot (ft)", symbol: "ft" },
      { id: "in", name: "Inch (in)", symbol: "in" },
      { id: "yd", name: "Yard (yd)", symbol: "yd" },
    ],
  },
  {
    id: "weight",
    name: "Weight/Mass",
    icon: "Weight",
    units: [
      { id: "kg", name: "Kilogram (kg)", symbol: "kg" },
      { id: "g", name: "Gram (g)", symbol: "g" },
      { id: "mg", name: "Milligram (mg)", symbol: "mg" },
      { id: "lb", name: "Pound (lb)", symbol: "lb" },
      { id: "oz", name: "Ounce (oz)", symbol: "oz" },
      { id: "st", name: "Stone (st)", symbol: "st" },
    ],
  },
  {
    id: "temperature",
    name: "Temperature",
    icon: "Thermometer",
    units: [
      { id: "C", name: "Celsius (°C)", symbol: "°C" },
      { id: "F", name: "Fahrenheit (°F)", symbol: "°F" },
      { id: "K", name: "Kelvin (K)", symbol: "K" },
    ],
  },
  {
    id: "volume",
    name: "Volume",
    icon: "Beaker",
    units: [
      { id: "L", name: "Liter (L)", symbol: "L" },
      { id: "mL", name: "Milliliter (mL)", symbol: "mL" },
      { id: "gal", name: "Gallon (US gal)", symbol: "gal" },
      { id: "qt", name: "Quart (US qt)", symbol: "qt" },
      { id: "pt", name: "Pint (US pt)", symbol: "pt" },
      { id: "cup", name: "Cup (US cup)", symbol: "cup" },
      { id: "floz", name: "Fluid Ounce (US fl oz)", symbol: "fl oz" },
    ],
  },
  {
    id: "speed",
    name: "Speed",
    icon: "Gauge",
    units: [
      { id: "m/s", name: "Meter/second (m/s)", symbol: "m/s" },
      { id: "km/h", name: "Kilometer/hour (km/h)", symbol: "km/h" },
      { id: "mph", name: "Mile/hour (mph)", symbol: "mph" },
      { id: "knot", name: "Knot (kn)", symbol: "kn" },
    ],
  },
  {
    id: "time",
    name: "Time",
    icon: "Clock",
    units: [
      { id: "s", name: "Second (s)", symbol: "s" },
      { id: "min", name: "Minute (min)", symbol: "min" },
      { id: "hr", name: "Hour (hr)", symbol: "hr" },
      { id: "day", name: "Day (day)", symbol: "day" },
      { id: "week", name: "Week (week)", symbol: "week" },
    ],
  },
  {
    id: "area",
    name: "Area",
    icon: "Square",
    units: [
        { id: "sqm", name: "Square Meter (m²)", symbol: "m²" },
        { id: "sqkm", name: "Square Kilometer (km²)", symbol: "km²" },
        { id: "ha", name: "Hectare (ha)", symbol: "ha" },
        { id: "acre", name: "Acre (acre)", symbol: "acre" },
        { id: "sqft", name: "Square Foot (ft²)", symbol: "ft²" },
        { id: "sqyd", name: "Square Yard (yd²)", symbol: "yd²" },
    ],
  },
  {
    id: "data",
    name: "Data Units",
    icon: "Database",
    units: [
        { id: "bit", name: "Bit (bit)", symbol: "bit" },
        { id: "byte", name: "Byte (B)", symbol: "B" },
        { id: "kb", name: "Kilobyte (KB)", symbol: "KB" },
        { id: "mb", name: "Megabyte (MB)", symbol: "MB" },
        { id: "gb", name: "Gigabyte (GB)", symbol: "GB" },
        { id: "tb", name: "Terabyte (TB)", symbol: "TB" },
    ],
  },
   {
    id: "currency",
    name: "Currency",
    icon: "Landmark",
    units: [
      { id: "USD", name: "US Dollar (USD)", symbol: "$" },
      { id: "EUR", name: "Euro (EUR)", symbol: "€" },
      { id: "GBP", name: "British Pound (GBP)", symbol: "£" },
      { id: "JPY", name: "Japanese Yen (JPY)", symbol: "¥" },
      { id: "CAD", name: "Canadian Dollar (CAD)", symbol: "CA$" },
      { id: "AUD", name: "Australian Dollar (AUD)", symbol: "A$" },
      { id: "CHF", name: "Swiss Franc (CHF)", symbol: "CHF" },
      { id: "CNY", name: "Chinese Yuan (CNY)", symbol: "¥" },
      { id: "INR", name: "Indian Rupee (INR)", symbol: "₹" },
      { id: "BRL", name: "Brazilian Real (BRL)", symbol: "R$" },
    ],
    isApiBased: true,
    apiKey: "e6c132cbdb12f2c1d88ecde8", 
  },
];

const conversionFactors = {
  length: {
    m: { m: 1, km: 0.001, cm: 100, mm: 1000, mi: 0.000621371, ft: 3.28084, in: 39.3701, yd: 1.09361 },
    km: { m: 1000, km: 1, cm: 100000, mm: 1000000, mi: 0.621371, ft: 3280.84, in: 39370.1, yd: 1093.61 },
    cm: { m: 0.01, km: 0.00001, cm: 1, mm: 10, mi: 0.00000621371, ft: 0.0328084, in: 0.393701, yd: 0.0109361 },
    mm: { m: 0.001, km: 0.000001, cm: 0.1, mm: 1, mi: 6.2137e-7, ft: 0.00328084, in: 0.0393701, yd: 0.00109361 },
    mi: { m: 1609.34, km: 1.60934, cm: 160934, mm: 1609340, mi: 1, ft: 5280, in: 63360, yd: 1760 },
    ft: { m: 0.3048, km: 0.0003048, cm: 30.48, mm: 304.8, mi: 0.000189394, ft: 1, in: 12, yd: 0.333333 },
    in: { m: 0.0254, km: 0.0000254, cm: 2.54, mm: 25.4, mi: 1.5783e-5, ft: 0.0833333, in: 1, yd: 0.0277778 },
    yd: { m: 0.9144, km: 0.0009144, cm: 91.44, mm: 914.4, mi: 0.000568182, ft: 3, in: 36, yd: 1 },
  },
  weight: {
    kg: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274, st: 0.157473 },
    g: { kg: 0.001, g: 1, mg: 1000, lb: 0.00220462, oz: 0.035274, st: 0.000157473 },
    mg: { kg: 0.000001, g: 0.001, mg: 1, lb: 2.2046e-6, oz: 3.5274e-5, st: 1.5747e-7 },
    lb: { kg: 0.453592, g: 453.592, mg: 453592, lb: 1, oz: 16, st: 0.0714286 },
    oz: { kg: 0.0283495, g: 28.3495, mg: 28349.5, lb: 0.0625, oz: 1, st: 0.00446429 },
    st: { kg: 6.35029, g: 6350.29, mg: 6350290, lb: 14, oz: 224, st: 1 },
  },
  volume: {
    L: { L: 1, mL: 1000, gal: 0.264172, qt: 1.05669, pt: 2.11338, cup: 4.22675, floz: 33.814 },
    mL: { L: 0.001, mL: 1, gal: 0.000264172, qt: 0.00105669, pt: 0.00211338, cup: 0.00422675, floz: 0.033814 },
    gal: { L: 3.78541, mL: 3785.41, gal: 1, qt: 4, pt: 8, cup: 16, floz: 128 },
    qt: { L: 0.946353, mL: 946.353, gal: 0.25, qt: 1, pt: 2, cup: 4, floz: 32 },
    pt: { L: 0.473176, mL: 473.176, gal: 0.125, qt: 0.5, pt: 1, cup: 2, floz: 16 },
    cup: { L: 0.236588, mL: 236.588, gal: 0.0625, qt: 0.25, pt: 0.5, cup: 1, floz: 8 },
    floz: { L: 0.0295735, mL: 29.5735, gal: 0.0078125, qt: 0.03125, pt: 0.0625, cup: 0.125, floz: 1 },
  },
  speed: {
    "m/s": { "m/s": 1, "km/h": 3.6, mph: 2.23694, knot: 1.94384 },
    "km/h": { "m/s": 0.277778, "km/h": 1, mph: 0.621371, knot: 0.539957 },
    mph: { "m/s": 0.44704, "km/h": 1.60934, mph: 1, knot: 0.868976 },
    knot: { "m/s": 0.514444, "km/h": 1.852, mph: 1.15078, knot: 1 },
  },
  time: {
    s: { s: 1, min: 1/60, hr: 1/3600, day: 1/86400, week: 1/604800 },
    min: { s: 60, min: 1, hr: 1/60, day: 1/1440, week: 1/10080 },
    hr: { s: 3600, min: 60, hr: 1, day: 1/24, week: 1/168 },
    day: { s: 86400, min: 1440, hr: 24, day: 1, week: 1/7 },
    week: { s: 604800, min: 10080, hr: 168, day: 7, week: 1 },
  },
  area: {
    sqm: { sqm: 1, sqkm: 1e-6, ha: 1e-4, acre: 0.000247105, sqft: 10.7639, sqyd: 1.19599 },
    sqkm: { sqm: 1e6, sqkm: 1, ha: 100, acre: 247.105, sqft: 1.076e+7, sqyd: 1.196e+6 },
    ha: { sqm: 1e4, sqkm: 0.01, ha: 1, acre: 2.47105, sqft: 107639, sqyd: 11959.9 },
    acre: { sqm: 4046.86, sqkm: 0.00404686, ha: 0.404686, acre: 1, sqft: 43560, sqyd: 4840 },
    sqft: { sqm: 0.092903, sqkm: 9.2903e-8, ha: 9.2903e-6, acre: 2.2957e-5, sqft: 1, sqyd: 0.111111 },
    sqyd: { sqm: 0.836127, sqkm: 8.3613e-7, ha: 8.3613e-5, acre: 0.000206612, sqft: 9, sqyd: 1 },
  },
  data: {
    bit: { bit: 1, byte: 0.125, kb: 0.125 / 1024, mb: 0.125 / (1024**2), gb: 0.125 / (1024**3), tb: 0.125 / (1024**4) },
    byte: { bit: 8, byte: 1, kb: 1/1024, mb: 1/(1024**2), gb: 1/(1024**3), tb: 1/(1024**4) },
    kb: { bit: 8 * 1024, byte: 1024, kb: 1, mb: 1/1024, gb: 1/(1024**2), tb: 1/(1024**3) },
    mb: { bit: 8 * (1024**2), byte: 1024**2, kb: 1024, mb: 1, gb: 1/1024, tb: 1/(1024**2) },
    gb: { bit: 8 * (1024**3), byte: 1024**3, kb: 1024**2, mb: 1024, gb: 1, tb: 1/1024 },
    tb: { bit: 8 * (1024**4), byte: 1024**4, kb: 1024**3, mb: 1024**2, gb: 1024, tb: 1 },
  }
};

export const getCurrencyApiKey = () => {
    const currencyCategory = unitCategories.find(cat => cat.id === 'currency');
    return currencyCategory ? currencyCategory.apiKey : null;
};

export const convertUnit = async (value, fromUnit, toUnit, categoryId) => {
  if (isNaN(parseFloat(value))) return null;
  const val = parseFloat(value);
  const category = unitCategories.find(cat => cat.id === categoryId);

  if (!category) {
    console.warn("Category not found: " + categoryId);
    return null;
  }

  if (categoryId === "temperature") {
    if (fromUnit === toUnit) return val;
    if (fromUnit === "C") {
      if (toUnit === "F") return (val * 9/5) + 32;
      if (toUnit === "K") return val + 273.15;
    }
    if (fromUnit === "F") {
      if (toUnit === "C") return (val - 32) * 5/9;
      if (toUnit === "K") return ((val - 32) * 5/9) + 273.15;
    }
    if (fromUnit === "K") {
      if (toUnit === "C") return val - 273.15;
      if (toUnit === "F") return ((val - 273.15) * 9/5) + 32;
    }
    return null;
  }

 if (
  categoryId === "currency" &&
  category.isApiBased &&
  /^[A-Z]{3}$/.test(fromUnit) &&
  /^[A-Z]{3}$/.test(toUnit)
) {
    const apiKey = category.apiKey;
    if (!apiKey) {
        console.error("API key for currency conversion is missing.");
        return { error: "API key missing. Cannot perform currency conversion." };
    }
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromUnit}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Currency API Error:", errorData);
             let errorMessage = `API request failed: ${response.statusText}`;
            if (errorData && errorData["error-type"]) {
                errorMessage = `API Error: ${errorData["error-type"]}`;
                 if (errorData["error-type"] === "invalid-key") {
                    errorMessage = "Invalid API Key. Please check your key.";
                } else if (errorData["error-type"] === "inactive-account") {
                    errorMessage = "API Account Inactive. Please check your ExchangeRate-API account.";
                } else if (errorData["error-type"] === "unsupported-code") {
                    errorMessage = `Currency code ${fromUnit} is not supported by the API.`;
                }
            }
            return { error: errorMessage };
        }
        const data = await response.json();
        if (data.result === "success" && data.conversion_rates && data.conversion_rates[toUnit]) {
            const rate = data.conversion_rates[toUnit];
            return val * rate;
        } else {
            console.error("Could not find rate for " + toUnit + " in API response:", data);
            return { error: `Could not find exchange rate for ${fromUnit} to ${toUnit}.` };
        }
    } catch (error) {
        console.error("Network or other error during currency conversion:", error);
        return { error: "Network error or API is unavailable. Please try again later." };
    }
  }
  
  const categoryFactors = conversionFactors[categoryId];
  if (!categoryFactors || !categoryFactors[fromUnit] || !categoryFactors[fromUnit][toUnit]) {
    console.warn("Conversion not found for " + fromUnit + " to " + toUnit + " in " + categoryId);
    return null;
  }
  
  return val * categoryFactors[fromUnit][toUnit];
};

export const getUnitSymbol = (unitId, categoryId) => {
  const category = unitCategories.find(cat => cat.id === categoryId);
  if (!category) return '';
  const unit = category.units.find(u => u.id === unitId);
  return unit ? unit.symbol : '';
};
