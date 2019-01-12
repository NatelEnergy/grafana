import { locale, scaledUnits, simpleCountUnit, toFixed, toFixedUnit, ValueFormatCategory } from './valueFormats';
import {
  dateTimeAsIso,
  dateTimeAsUS,
  dateTimeFromNow,
  toClockMilliseconds,
  toClockSeconds,
  toDays,
  toDurationInHoursMinutesSeconds,
  toDurationInMilliseconds,
  toDurationInSeconds,
  toHours,
  toMicroSeconds,
  toMilliSeconds,
  toMinutes,
  toNanoSeconds,
  toSeconds,
  toTimeTicks,
} from './dateTimeFormatters';
import { toHex, sci, toHex0x, toPercent, toPercentUnit } from './arithmeticFormatters';
import { binarySIPrefix, currency, decimalSIPrefix } from './symbolFormatters';

export const getCategories = (): ValueFormatCategory[] => [
  {
    name: 'none',
    formats: [
      { name: 'none', id: 'none', fn: toFixed },
      {
        name: 'short',
        id: 'short',
        fn: scaledUnits(1000, ['', ' K', ' Mil', ' Bil', ' Tri', ' Quadr', ' Quint', ' Sext', ' Sept']),
      },
      { name: 'percent (0-100)', id: 'percent', fn: toPercent },
      { name: 'percent (0.0-1.0)', id: 'percentunit', fn: toPercentUnit },
      { name: 'Humidity (%H)', id: 'humidity', fn: toFixedUnit('%H') },
      { name: 'decibel', id: 'dB', fn: toFixedUnit('dB') },
      { name: 'hexadecimal (0x)', id: 'hex0x', fn: toHex0x },
      { name: 'hexadecimal', id: 'hex', fn: toHex },
      { name: 'scientific notation', id: 'sci', fn: sci },
      { name: 'locale format', id: 'locale', fn: locale },
    ],
  },
  {
    name: 'acceleration',
    formats: [
      { name: 'Meters/sec²', id: 'accMS2', fn: toFixedUnit('m/sec²') },
      { name: 'Feet/sec²', id: 'accFS2', fn: toFixedUnit('f/sec²') },
      { name: 'G unit', id: 'accG', fn: toFixedUnit('g') },
    ],
  },
  {
    name: 'angle',
    formats: [
      { name: 'Degrees (°)', id: 'degree', fn: toFixedUnit('°') },
      { name: 'Radians', id: 'radian', fn: toFixedUnit('rad') },
      { name: 'Gradian', id: 'grad', fn: toFixedUnit('grad') },
    ],
  },
  {
    name: 'area',
    formats: [
      { name: 'Square Meters (m²)', id: 'areaM2', fn: toFixedUnit('m²') },
      { name: 'Square Feet (ft²)', id: 'areaF2', fn: toFixedUnit('ft²') },
      { name: 'Square Miles (mi²)', id: 'areaMI2', fn: toFixedUnit('mi²') },
    ],
  },
  {
    name: 'computation throughput',
    formats: [
      { name: 'FLOP/s', id: 'flops', fn: decimalSIPrefix('FLOP/s') },
      { name: 'MFLOP/s', id: 'mflops', fn: decimalSIPrefix('FLOP/s', 2) },
      { name: 'GFLOP/s', id: 'gflops', fn: decimalSIPrefix('FLOP/s', 3) },
      { name: 'TFLOP/s', id: 'tflops', fn: decimalSIPrefix('FLOP/s', 4) },
      { name: 'PFLOP/s', id: 'pflops', fn: decimalSIPrefix('FLOP/s', 5) },
      { name: 'EFLOP/s', id: 'eflops', fn: decimalSIPrefix('FLOP/s', 6) },
    ],
  },
  {
    name: 'concentration',
    formats: [
      { name: 'parts-per-million (ppm)', id: 'ppm', fn: toFixedUnit('ppm') },
      { name: 'parts-per-billion (ppb)', id: 'conppb', fn: toFixedUnit('ppb') },
      { name: 'nanogram per cubic meter (ng/m³)', id: 'conngm3', fn: toFixedUnit('ng/m³') },
      { name: 'nanogram per normal cubic meter (ng/Nm³)', id: 'conngNm3', fn: toFixedUnit('ng/Nm³') },
      { name: 'microgram per cubic meter (μg/m³)', id: 'conμgm3', fn: toFixedUnit('μg/m³') },
      { name: 'microgram per normal cubic meter (μg/Nm³)', id: 'conμgNm3', fn: toFixedUnit('μg/Nm³') },
      { name: 'milligram per cubic meter (mg/m³)', id: 'conmgm3', fn: toFixedUnit('mg/m³') },
      { name: 'milligram per normal cubic meter (mg/Nm³)', id: 'conmgNm3', fn: toFixedUnit('mg/Nm³') },
      { name: 'gram per cubic meter (g/m³)', id: 'congm3', fn: toFixedUnit('g/m³') },
      { name: 'gram per normal cubic meter (g/Nm³)', id: 'congNm3', fn: toFixedUnit('g/Nm³') },
      { name: 'milligrams per decilitre (mg/dL)', id: 'conmgdL', fn: toFixedUnit('mg/dL') },
      { name: 'millimoles per litre (mmol/L)', id: 'conmmolL', fn: toFixedUnit('mmol/L') },
    ],
  },
  {
    name: 'currency',
    formats: [
      { name: 'Dollars ($)', id: 'currencyUSD', fn: currency('$') },
      { name: 'Pounds (£)', id: 'currencyGBP', fn: currency('£') },
      { name: 'Euro (€)', id: 'currencyEUR', fn: currency('€') },
      { name: 'Yen (¥)', id: 'currencyJPY', fn: currency('¥') },
      { name: 'Rubles (₽)', id: 'currencyRUB', fn: currency('₽') },
      { name: 'Hryvnias (₴)', id: 'currencyUAH', fn: currency('₴') },
      { name: 'Real (R$)', id: 'currencyBRL', fn: currency('R$') },
      { name: 'Danish Krone (kr)', id: 'currencyDKK', fn: currency('kr') },
      { name: 'Icelandic Króna (kr)', id: 'currencyISK', fn: currency('kr') },
      { name: 'Norwegian Krone (kr)', id: 'currencyNOK', fn: currency('kr') },
      { name: 'Swedish Krona (kr)', id: 'currencySEK', fn: currency('kr') },
      { name: 'Czech koruna (czk)', id: 'currencyCZK', fn: currency('czk') },
      { name: 'Swiss franc (CHF)', id: 'currencyCHF', fn: currency('CHF') },
      { name: 'Polish Złoty (PLN)', id: 'currencyPLN', fn: currency('PLN') },
      { name: 'Bitcoin (฿)', id: 'currencyBTC', fn: currency('฿') },
    ],
  },
  {
    name: 'data (IEC)',
    formats: [
      { name: 'bits', id: 'bits', fn: binarySIPrefix('b') },
      { name: 'bytes', id: 'bytes', fn: binarySIPrefix('B') },
      { name: 'kibibytes', id: 'kbytes', fn: binarySIPrefix('B', 1) },
      { name: 'mebibytes', id: 'mbytes', fn: binarySIPrefix('B', 2) },
      { name: 'gibibytes', id: 'gbytes', fn: binarySIPrefix('B', 3) },
    ],
  },
  {
    name: 'data (Metric)',
    formats: [
      { name: 'bits', id: 'decbits', fn: decimalSIPrefix('d') },
      { name: 'bytes', id: 'decbytes', fn: decimalSIPrefix('B') },
      { name: 'kilobytes', id: 'deckbytes', fn: decimalSIPrefix('B', 1) },
      { name: 'megabytes', id: 'decmbytes', fn: decimalSIPrefix('B', 2) },
      { name: 'gigabytes', id: 'decgbytes', fn: decimalSIPrefix('B', 3) },
    ],
  },
  {
    name: 'data rate',
    formats: [
      { name: 'packets/sec', id: 'pps', fn: decimalSIPrefix('pps') },
      { name: 'bits/sec', id: 'bps', fn: decimalSIPrefix('bps') },
      { name: 'bytes/sec', id: 'Bps', fn: decimalSIPrefix('B/s') },
      { name: 'kilobytes/sec', id: 'KBs', fn: decimalSIPrefix('Bs', 1) },
      { name: 'kilobits/sec', id: 'Kbits', fn: decimalSIPrefix('bps', 1) },
      { name: 'megabytes/sec', id: 'MBs', fn: decimalSIPrefix('Bs', 2) },
      { name: 'megabits/sec', id: 'Mbits', fn: decimalSIPrefix('bps', 2) },
      { name: 'gigabytes/sec', id: 'GBs', fn: decimalSIPrefix('Bs', 3) },
      { name: 'gigabits/sec', id: 'Gbits', fn: decimalSIPrefix('bps', 3) },
    ],
  },
  {
    name: 'date & time',
    formats: [
      { name: 'YYYY-MM-DD HH:mm:ss', id: 'dateTimeAsIso', fn: dateTimeAsIso },
      { name: 'DD/MM/YYYY h:mm:ss a', id: 'dateTimeAsUS', fn: dateTimeAsUS },
      { name: 'From Now', id: 'dateTimeFromNow', fn: dateTimeFromNow },
    ],
  },
  {
    name: 'energy',
    formats: [
      { name: 'Watt (W)', id: 'watt', fn: decimalSIPrefix('W') },
      { name: 'Kilowatt (kW)', id: 'kwatt', fn: decimalSIPrefix('W', 1) },
      { name: 'Milliwatt (mW)', id: 'mwatt', fn: decimalSIPrefix('W', -1) },
      { name: 'Watt per square meter (W/m²)', id: 'Wm2', fn: toFixedUnit('W/m²') },
      { name: 'Volt-ampere (VA)', id: 'voltamp', fn: decimalSIPrefix('VA') },
      { name: 'Kilovolt-ampere (kVA)', id: 'kvoltamp', fn: decimalSIPrefix('VA', 1) },
      { name: 'Volt-ampere reactive (var)', id: 'voltampreact', fn: decimalSIPrefix('var') },
      { name: 'Kilovolt-ampere reactive (kvar)', id: 'kvoltampreact', fn: decimalSIPrefix('var', 1) },
      { name: 'Watt-hour (Wh)', id: 'watth', fn: decimalSIPrefix('Wh') },
      { name: 'Kilowatt-hour (kWh)', id: 'kwatth', fn: decimalSIPrefix('Wh', 1) },
      { name: 'Kilowatt-min (kWm)', id: 'kwattm', fn: decimalSIPrefix('W/Min', 1) },
      { name: 'Joule (J)', id: 'joule', fn: decimalSIPrefix('J') },
      { name: 'Electron volt (eV)', id: 'ev', fn: decimalSIPrefix('eV') },
      { name: 'Ampere (A)', id: 'amp', fn: decimalSIPrefix('A') },
      { name: 'Kiloampere (kA)', id: 'kamp', fn: decimalSIPrefix('A', 1) },
      { name: 'Milliampere (mA)', id: 'mamp', fn: decimalSIPrefix('A', -1) },
      { name: 'Volt (V)', id: 'volt', fn: decimalSIPrefix('V') },
      { name: 'Kilovolt (kV)', id: 'kvolt', fn: decimalSIPrefix('V', 1) },
      { name: 'Millivolt (mV)', id: 'mvolt', fn: decimalSIPrefix('V', -1) },
      { name: 'Decibel-milliwatt (dBm)', id: 'dBm', fn: decimalSIPrefix('dBm') },
      { name: 'Ohm (Ω)', id: 'ohm', fn: decimalSIPrefix('Ω') },
      { name: 'Lumens (Lm)', id: 'lumens', fn: decimalSIPrefix('Lm') },
    ],
  },
  {
    name: 'flow',
    formats: [
      { name: 'Gallons/min (gpm)', id: 'flowgpm', fn: toFixedUnit('gpm') },
      { name: 'Cubic meters/sec (cms)', id: 'flowcms', fn: toFixedUnit('cms') },
      { name: 'Cubic feet/sec (cfs)', id: 'flowcfs', fn: toFixedUnit('cfs') },
      { name: 'Cubic feet/min (cfm)', id: 'flowcfm', fn: toFixedUnit('cfm') },
      { name: 'Litre/hour', id: 'litreh', fn: toFixedUnit('l/h') },
      { name: 'Litre/min (l/min)', id: 'flowlpm', fn: toFixedUnit('l/min') },
      { name: 'milliLitre/min (mL/min)', id: 'flowmlpm', fn: toFixedUnit('mL/min') },
    ],
  },
  {
    name: 'force',
    formats: [
      { name: 'Newton-meters (Nm)', id: 'forceNm', fn: decimalSIPrefix('Nm') },
      { name: 'Kilonewton-meters (kNm)', id: 'forcekNm', fn: decimalSIPrefix('Nm', 1) },
      { name: 'Newtons (N)', id: 'forceN', fn: decimalSIPrefix('N') },
      { name: 'Kilonewtons (kN)', id: 'forcekN', fn: decimalSIPrefix('N', 1) },
    ],
  },
  {
    name: 'hash rate',
    formats: [
      { name: 'hashes/sec', id: 'Hs', fn: decimalSIPrefix('H/s') },
      { name: 'kilohashes/sec', id: 'KHs', fn: decimalSIPrefix('H/s', 1) },
      { name: 'megahashes/sec', id: 'MHs', fn: decimalSIPrefix('H/s', 2) },
      { name: 'gigahashes/sec', id: 'GHs', fn: decimalSIPrefix('H/s', 3) },
      { name: 'terahashes/sec', id: 'THs', fn: decimalSIPrefix('H/s', 4) },
      { name: 'petahashes/sec', id: 'PHs', fn: decimalSIPrefix('H/s', 5) },
      { name: 'exahashes/sec', id: 'EHs', fn: decimalSIPrefix('H/s', 6) },
    ],
  },
  {
    name: 'mass',
    formats: [
      { name: 'milligram (mg)', id: 'massmg', fn: decimalSIPrefix('g', -1) },
      { name: 'gram (g)', id: 'massg', fn: decimalSIPrefix('g') },
      { name: 'kilogram (kg)', id: 'masskg', fn: decimalSIPrefix('g', 1) },
      { name: 'metric ton (t)', id: 'masst', fn: toFixedUnit('t') },
    ],
  },
  {
    name: 'length',
    formats: [
      { name: 'millimetre (mm)', id: 'lengthmm', fn: decimalSIPrefix('m', -1) },
      { name: 'feet (ft)', id: 'lengthft', fn: toFixedUnit('ft') },
      { name: 'meter (m)', id: 'lengthm', fn: decimalSIPrefix('m') },
      { name: 'kilometer (km)', id: 'lengthkm', fn: decimalSIPrefix('m', 1) },
      { name: 'mile (mi)', id: 'lengthmi', fn: toFixedUnit('mi') },
    ],
  },
  {
    name: 'pressure',
    formats: [
      { name: 'Millibars', id: 'pressurembar', fn: decimalSIPrefix('bar', -1) },
      { name: 'Bars', id: 'pressurebar', fn: decimalSIPrefix('bar') },
      { name: 'Kilobars', id: 'pressurekbar', fn: decimalSIPrefix('bar', 1) },
      { name: 'Hectopascals', id: 'pressurehpa', fn: toFixedUnit('hPa') },
      { name: 'Kilopascals', id: 'pressurekpa', fn: toFixedUnit('kPa') },
      { name: 'Inches of mercury', id: 'pressurehg', fn: toFixedUnit('"Hg') },
      { name: 'PSI', id: 'pressurepsi', fn: scaledUnits(1000, ['psi', 'ksi', 'Mpsi']) },
    ],
  },
  {
    name: 'radiation',
    formats: [
      { name: 'Becquerel (Bq)', id: 'radbq', fn: decimalSIPrefix('Bq') },
      { name: 'curie (Ci)', id: 'radci', fn: decimalSIPrefix('Ci') },
      { name: 'Gray (Gy)', id: 'radgy', fn: decimalSIPrefix('Gy') },
      { name: 'rad', id: 'radrad', fn: decimalSIPrefix('rad') },
      { name: 'Sievert (Sv)', id: 'radsv', fn: decimalSIPrefix('Sv') },
      { name: 'rem', id: 'radrem', fn: decimalSIPrefix('rem') },
      { name: 'Exposure (C/kg)', id: 'radexpckg', fn: decimalSIPrefix('C/kg') },
      { name: 'roentgen (R)', id: 'radr', fn: decimalSIPrefix('R') },
      { name: 'Sievert/hour (Sv/h)', id: 'radsvh', fn: decimalSIPrefix('Sv/h') },
    ],
  },
  {
    name: 'temperature',
    formats: [
      { name: 'Celsius (°C)', id: 'celsius', fn: toFixedUnit('°C') },
      { name: 'Farenheit (°F)', id: 'farenheit', fn: toFixedUnit('°F') },
      { name: 'Kelvin (K)', id: 'kelvin', fn: toFixedUnit('K') },
    ],
  },
  {
    name: 'time',
    formats: [
      { name: 'Hertz (1/s)', id: 'hertz', fn: decimalSIPrefix('Hz') },
      { name: 'nanoseconds (ns)', id: 'ns', fn: toNanoSeconds },
      { name: 'microseconds (µs)', id: 'µs', fn: toMicroSeconds },
      { name: 'milliseconds (ms)', id: 'ms', fn: toMilliSeconds },
      { name: 'seconds (s)', id: 's', fn: toSeconds },
      { name: 'minutes (m)', id: 'm', fn: toMinutes },
      { name: 'hours (h)', id: 'h', fn: toHours },
      { name: 'days (d)', id: 'd', fn: toDays },
      { name: 'duration (ms)', id: 'dtdurationms', fn: toDurationInMilliseconds },
      { name: 'duration (s)', id: 'dtdurations', fn: toDurationInSeconds },
      { name: 'duration (hh:mm:ss)', id: 'dthms', fn: toDurationInHoursMinutesSeconds },
      { name: 'Timeticks (s/100)', id: 'timeticks', fn: toTimeTicks },
      { name: 'clock (ms)', id: 'clockms', fn: toClockMilliseconds },
      { name: 'clock (s)', id: 'clocks', fn: toClockSeconds },
    ],
  },
  {
    name: 'throughput',
    formats: [
      { name: 'ops/sec (ops)', id: 'ops', fn: simpleCountUnit('ops') },
      { name: 'requests/sec (rps)', id: 'reqps', fn: simpleCountUnit('reqps') },
      { name: 'reads/sec (rps)', id: 'rps', fn: simpleCountUnit('rps') },
      { name: 'writes/sec (wps)', id: 'wps', fn: simpleCountUnit('wps') },
      { name: 'I/O ops/sec (iops)', id: 'iops', fn: simpleCountUnit('iops') },
      { name: 'ops/min (opm)', id: 'opm', fn: simpleCountUnit('opm') },
      { name: 'reads/min (rpm)', id: 'rpm', fn: simpleCountUnit('rpm') },
      { name: 'writes/min (wpm)', id: 'wpm', fn: simpleCountUnit('wpm') },
    ],
  },
  {
    name: 'volume',
    formats: [
      { name: 'millilitre (mL)', id: 'mlitre', fn: decimalSIPrefix('L', -1) },
      { name: 'litre (L)', id: 'litre', fn: decimalSIPrefix('L') },
      { name: 'cubic metre', id: 'm3', fn: toFixedUnit('m³') },
      { name: 'Normal cubic metre', id: 'Nm3', fn: toFixedUnit('Nm³') },
      { name: 'cubic decimetre', id: 'dm3', fn: toFixedUnit('dm³') },
      { name: 'gallons', id: 'gallons', fn: toFixedUnit('gal') },
    ],
  },
];
