import type { MajorConfig, CourseOption } from '../majorSchema';

// ─── Shared lists ────────────────────────────────────────────────────────────

const ADVANCED_MATH: CourseOption[] = [
  { dept: 'CME', number: '100' },
  { dept: 'MATH', number: '51' },
];

const GEOLOGY_OPTIONS: CourseOption[] = [
  { dept: 'EARTHSYS', number: '128' },
  { dept: 'EPS', number: '1' },
  { dept: 'EPS', number: '4' },
  { dept: 'SUSTAIN', number: '117' },
];

const STATS_OPTIONS: CourseOption[] = [
  { dept: 'CME', number: '106' },
  { dept: 'EARTHSYS', number: '100A' },
  { dept: 'ECON', number: '102A' },
  { dept: 'OCEANS', number: '174H' },
  { dept: 'STATS', number: '101' },
  { dept: 'STATS', number: '110' },
  { dept: 'STATS', number: '116' },
  { dept: 'STATS', number: '117' },
  { dept: 'STATS', number: '141' },
];

const STATS_WITH_BIO202: CourseOption[] = [
  { dept: 'BIO', number: '202' },
  ...STATS_OPTIONS,
];

const EJ_OPTIONS: CourseOption[] = [
  { dept: 'ANTHRO', number: '124B' },
  { dept: 'CSRE', number: '100' },
  { dept: 'CSRE', number: '107' },
  { dept: 'EARTHSYS', number: '91EJ' },
  { dept: 'EARTHSYS', number: '120' },
  { dept: 'EARTHSYS', number: '121' },
  { dept: 'EARTHSYS', number: '125' },
  { dept: 'EARTHSYS', number: '140C' },
  { dept: 'EARTHSYS', number: '142J' },
  { dept: 'EARTHSYS', number: '178M' },
  { dept: 'EARTHSYS', number: '194' },
  { dept: 'EARTHSYS', number: '223E' },
  { dept: 'EPS', number: '20' },
  { dept: 'ETHICSOC', number: '136R' },
  { dept: 'ETHICSOC', number: '171' },
  { dept: 'LAW', number: '2515' },
  { dept: 'NATIVEAM', number: '115' },
  { dept: 'SUSTAIN', number: '118' },
  { dept: 'STS', number: '190' },
];

const WIM_OPTIONS: CourseOption[] = [
  { dept: 'EARTHSYS', number: '46' },
  { dept: 'EARTHSYS', number: '47' },
  { dept: 'EARTHSYS', number: '149' },
  { dept: 'EARTHSYS', number: '177C' },
  { dept: 'EARTHSYS', number: '177M' },
  { dept: 'EARTHSYS', number: '191' },
  { dept: 'ENERGY', number: '199' },
  { dept: 'OCEANS', number: '47H' },
  { dept: 'OCEANS', number: '182H' },
];

// ─── Biosphere ───────────────────────────────────────────────────────────────

const BIO_ECOLOGY: CourseOption[] = [
  { dept: 'BIO', number: '115' },
  { dept: 'BIO', number: '121' },
  { dept: 'BIO', number: '136' },
  { dept: 'BIO', number: '144' },
  { dept: 'BIO', number: '179' },
  { dept: 'EARTHSYS', number: '101C' },
  { dept: 'EARTHSYS', number: '105A' },
  { dept: 'EARTHSYS', number: '105B' },
  { dept: 'EARTHSYS', number: '127' },
  { dept: 'EARTHSYS', number: '128' },
  { dept: 'EARTHSYS', number: '147' },
  { dept: 'EARTHSYS', number: '180' },
  { dept: 'EARTHSYS', number: '183' },
  { dept: 'OCEANS', number: '159H' },
  { dept: 'OCEANS', number: '173' },
  { dept: 'OSPAUSTL', number: '10' },
  { dept: 'OSPAUSTL', number: '28' },
  { dept: 'SUSTAIN', number: '116' },
];

const BIO_BIOGEO: CourseOption[] = [
  { dept: 'CEE', number: '177' },
  { dept: 'CEE', number: '274A' },
  { dept: 'EARTHSYS', number: '143' },
  { dept: 'EARTHSYS', number: '151' },
  { dept: 'EARTHSYS', number: '152' },
  { dept: 'EARTHSYS', number: '155' },
  { dept: 'EARTHSYS', number: '205A' },
  { dept: 'EARTHSYS', number: '255' },
  { dept: 'EARTHSYS', number: '256' },
];

const BIO_ECOSYSTEM_SOCIETY: CourseOption[] = [
  { dept: 'EARTHSYS', number: '107' },
  { dept: 'EARTHSYS', number: '114' },
  { dept: 'EARTHSYS', number: '123' },
  { dept: 'EARTHSYS', number: '150' },
  { dept: 'EARTHSYS', number: '160' },
  { dept: 'EARTHSYS', number: '179' },
  { dept: 'EARTHSYS', number: '185' },
  { dept: 'EARTHSYS', number: '227' },
  { dept: 'ENVRES', number: '250' },
  { dept: 'HUMBIO', number: '116' },
  { dept: 'LAW', number: '2515' },
  { dept: 'SUSTAIN', number: '118' },
];

const BIO_METHODS_OPT: CourseOption[] = [
  { dept: 'EARTHSYS', number: '145' },
  { dept: 'EARTHSYS', number: '162' },
  { dept: 'EARTHSYS', number: '213' },
  { dept: 'EARTHSYS', number: '243H' },
  { dept: 'EPS', number: '240' },
  { dept: 'ESS', number: '220' },
  { dept: 'ESS', number: '224' },
];

// ─── Energy, Science & Technology ────────────────────────────────────────────

const ENERGY_ENGINEERING: CourseOption[] = [
  { dept: 'CEE', number: '176B' },
  { dept: 'CEE', number: '272R' },
  { dept: 'ENERGY', number: '120' },
  { dept: 'MATSCI', number: '156' },
];

const ENERGY_SOURCES: CourseOption[] = [
  { dept: 'EARTHSYS', number: '101' },
  { dept: 'EARTHSYS', number: '102' },
  { dept: 'EARTHSYS', number: '103' },
];

const ENERGY_RESOURCES_TECH: CourseOption[] = [
  { dept: 'CEE', number: '156' },
  { dept: 'CEE', number: '176A' },
  { dept: 'EARTHSYS', number: '101' },
  { dept: 'EARTHSYS', number: '103' },
  { dept: 'EE', number: '116' },
  { dept: 'ENERGY', number: '120' },
  { dept: 'ENERGY', number: '201A' },
  { dept: 'ENERGY', number: '201B' },
  { dept: 'ENERGY', number: '269' },
  { dept: 'MATSCI', number: '156' },
];

const ENERGY_POLICY_ECON: CourseOption[] = [
  { dept: 'CEE', number: '130B' },
  { dept: 'CEE', number: '173S' },
  { dept: 'ECON', number: '133' },
  { dept: 'ECON', number: '156' },
  { dept: 'ENERGY', number: '104' },
  { dept: 'ENERGY', number: '110' },
  { dept: 'ENERGY', number: '171' },
  { dept: 'ENERGY', number: '191' },
  { dept: 'ENERGY', number: '203' },
  { dept: 'GEP', number: '130' },
  { dept: 'GSBGEN', number: '336' },
  { dept: 'LAW', number: '2503' },
  { dept: 'MS&E', number: '243' },
];

const ENERGY_SUSTAIN_DEV: CourseOption[] = [
  { dept: 'CEE', number: '107R' },
  { dept: 'CEE', number: '176B' },
  { dept: 'CEE', number: '176C' },
  { dept: 'CEE', number: '226' },
  { dept: 'EARTHSYS', number: '102' },
  { dept: 'EARTHSYS', number: '118G' },
  { dept: 'EARTHSYS', number: '146A' },
  { dept: 'EARTHSYS', number: '176M' },
  { dept: 'ENERGY', number: '153' },
  { dept: 'ENERGY', number: '176' },
  { dept: 'MATSCI', number: '156' },
  { dept: 'SUSTAIN', number: '170A' },
];

const ENERGY_METHODS_OPT: CourseOption[] = [
  { dept: 'CS', number: '106A' },
  { dept: 'CS', number: '106B' },
  { dept: 'CS', number: '229' },
  { dept: 'DATASCI', number: '112' },
  { dept: 'DATASCI', number: '154' },
  { dept: 'EARTHSYS', number: '144' },
  { dept: 'EARTHSYS', number: '145' },
  { dept: 'EPS', number: '140' },
  { dept: 'GEOPHYS', number: '148' },
  { dept: 'GEP', number: '130' },
  { dept: 'MATSCI', number: '166' },
  { dept: 'POLISCI', number: '150B' },
];

// ─── Environmental Geoscience ─────────────────────────────────────────────────

const ENVGEO_SOLID_EARTH: CourseOption[] = [
  { dept: 'EARTHSYS', number: '113' },
  { dept: 'EARTHSYS', number: '171' },
  { dept: 'EPS', number: '101' },
  { dept: 'EPS', number: '180' },
];

const ENVGEO_SURFACE: CourseOption[] = [
  { dept: 'EPS', number: '106' },
  { dept: 'ESS', number: '148' },
  { dept: 'ESS', number: '155' },
  { dept: 'ESS', number: '220' },
  { dept: 'ESS', number: '224' },
];

const ENVGEO_EVOLUTION_LIFE: CourseOption[] = [
  { dept: 'EARTHSYS', number: '158' },
  { dept: 'EARTHSYS', number: '205A' },
  { dept: 'EPS', number: '128' },
  { dept: 'EPS', number: '135' },
  { dept: 'ESS', number: '255' },
];

// ─── Human Environmental Systems ─────────────────────────────────────────────

const HES_ECON_GOV: CourseOption[] = [
  { dept: 'BUSGEN', number: '143' },
  { dept: 'CEE', number: '124' },
  { dept: 'CEE', number: '130B' },
  { dept: 'CEE', number: '173S' },
  { dept: 'EBS', number: '130' },
  { dept: 'ECON', number: '51' },
  { dept: 'ECON', number: '106' },
  { dept: 'ECON', number: '118' },
  { dept: 'ECON', number: '150' },
  { dept: 'ECON', number: '155' },
  { dept: 'ECON', number: '156' },
  { dept: 'ECON', number: '178' },
  { dept: 'GEP', number: '130' },
  { dept: 'GEP', number: '160' },
  { dept: 'GEP', number: '248' },
  { dept: 'GEP', number: '268' },
  { dept: 'GEP', number: '269' },
  { dept: 'GEP', number: '382' },
  { dept: 'LAW', number: '2504' },
  { dept: 'MS&E', number: '243' },
  { dept: 'PUBLPOL', number: '308' },
  { dept: 'SUSTAIN', number: '170A' },
  { dept: 'URBANST', number: '183' },
];

const HES_CULTURE_SOCIETY: CourseOption[] = [
  { dept: 'ANTHRO', number: '116B' },
  { dept: 'BIO', number: '144' },
  { dept: 'CEE', number: '151' },
  { dept: 'CEE', number: '226' },
  { dept: 'EARTHSYS', number: '114' },
  { dept: 'EARTHSYS', number: '121' },
  { dept: 'EARTHSYS', number: '123' },
  { dept: 'EARTHSYS', number: '123A' },
  { dept: 'EARTHSYS', number: '150' },
  { dept: 'EARTHSYS', number: '160' },
  { dept: 'EARTHSYS', number: '166' },
  { dept: 'EARTHSYS', number: '169' },
  { dept: 'EARTHSYS', number: '171' },
  { dept: 'EARTHSYS', number: '179' },
  { dept: 'EARTHSYS', number: '181' },
  { dept: 'EARTHSYS', number: '183' },
  { dept: 'EARTHSYS', number: '185' },
  { dept: 'EARTHSYS', number: '195' },
  { dept: 'EARTHSYS', number: '227' },
  { dept: 'EBS', number: '306' },
  { dept: 'HUMBIO', number: '116' },
  { dept: 'OSPSANTG', number: '29' },
  { dept: 'OSPSANTG', number: '58' },
  { dept: 'POLISCI', number: '124A' },
];

const HES_DATA_SCIENCE: CourseOption[] = [
  { dept: 'CEE', number: '226' },
  { dept: 'CS', number: '106B' },
  { dept: 'DATASCI', number: '112' },
  { dept: 'EARTHSYS', number: '141' },
  { dept: 'EARTHSYS', number: '142' },
  { dept: 'EARTHSYS', number: '144' },
  { dept: 'EARTHSYS', number: '145' },
  { dept: 'EARTHSYS', number: '153' },
  { dept: 'EARTHSYS', number: '162' },
  { dept: 'EARTHSYS', number: '213' },
  { dept: 'ENERGY', number: '240' },
  { dept: 'GEP', number: '130' },
  { dept: 'STATS', number: '202' },
  { dept: 'STATS', number: '202F' },
  { dept: 'STATS', number: '202V' },
  { dept: 'STATS', number: '216' },
];

// ─── Land Systems ─────────────────────────────────────────────────────────────

const LAND_ECOSYSTEMS: CourseOption[] = [
  { dept: 'BIO', number: '144' },
  { dept: 'EARTHSYS', number: '105A' },
  { dept: 'EARTHSYS', number: '105B' },
  { dept: 'EARTHSYS', number: '123A' },
  { dept: 'EARTHSYS', number: '127' },
  { dept: 'EARTHSYS', number: '128' },
  { dept: 'EARTHSYS', number: '150' },
  { dept: 'EARTHSYS', number: '155' },
  { dept: 'EARTHSYS', number: '180' },
  { dept: 'EARTHSYS', number: '181' },
  { dept: 'ESS', number: '256' },
  { dept: 'OSPSANTG', number: '58' },
  { dept: 'SUSTAIN', number: '116' },
];

const LAND_WATER: CourseOption[] = [
  { dept: 'CEE', number: '101B' },
  { dept: 'CEE', number: '162E' },
  { dept: 'CEE', number: '166A' },
  { dept: 'CEE', number: '166B' },
  { dept: 'CEE', number: '177' },
  { dept: 'EARTHSYS', number: '104' },
  { dept: 'ESS', number: '220' },
  { dept: 'GEOPHYS', number: '190' },
];

const LAND_USE: CourseOption[] = [
  { dept: 'CEE', number: '124' },
  { dept: 'CEE', number: '176A' },
  { dept: 'CSRE', number: '100' },
  { dept: 'CSRE', number: '107' },
  { dept: 'CSRE', number: '144' },
  { dept: 'CSRE', number: '168' },
  { dept: 'CSRE', number: '173' },
  { dept: 'EARTHSYS', number: '166' },
  { dept: 'EARTHSYS', number: '171' },
  { dept: 'EARTHSYS', number: '176M' },
  { dept: 'EARTHSYS', number: '185' },
  { dept: 'EARTHSYS', number: '195' },
  { dept: 'ECON', number: '106' },
  { dept: 'ENERGY', number: '101' },
  { dept: 'ENERGY', number: '102' },
  { dept: 'ENERGY', number: '104' },
  { dept: 'ENVRES', number: '250' },
  { dept: 'NATIVEAM', number: '100' },
  { dept: 'NATIVEAM', number: '109A' },
  { dept: 'NATIVEAM', number: '115' },
  { dept: 'NATIVEAM', number: '123' },
  { dept: 'OSPSANTG', number: '29' },
  { dept: 'SUSTAIN', number: '116' },
  { dept: 'SUSTAIN', number: '118' },
  { dept: 'URBANST', number: '110' },
  { dept: 'URBANST', number: '113' },
  { dept: 'URBANST', number: '123A' },
  { dept: 'URBANST', number: '164' },
];

const LAND_METHODS_OPT: CourseOption[] = [
  { dept: 'EARTHSYS', number: '142' },
  { dept: 'EARTHSYS', number: '145' },
  { dept: 'EPS', number: '240' },
  { dept: 'ESS', number: '224' },
];

// ─── Oceans, Atmosphere & Climate ────────────────────────────────────────────

const OAC_HUMAN_DIM: CourseOption[] = [
  { dept: 'BIO', number: '103' },
  { dept: 'CEE', number: '175A' },
  { dept: 'EARTHSYS', number: '195' },
  { dept: 'HUMBIO', number: '116' },
  { dept: 'INTLPOL', number: '271' },
  { dept: 'LAW', number: '2506' },
  { dept: 'OCEANS', number: '123H' },
  { dept: 'OCEANS', number: '173H' },
  { dept: 'OCEANS', number: '182H' },
];

const OAC_STATS: CourseOption[] = [
  { dept: 'CME', number: '106' },
  { dept: 'EARTHSYS', number: '100A' },
  { dept: 'ECON', number: '102A' },
  { dept: 'OCEANS', number: '140H' },
  { dept: 'OCEANS', number: '174H' },
  { dept: 'STATS', number: '101' },
  { dept: 'STATS', number: '110' },
  { dept: 'STATS', number: '116' },
  { dept: 'STATS', number: '117' },
  { dept: 'STATS', number: '141' },
];

const OAC_ELECTIVES: CourseOption[] = [
  { dept: 'BIO', number: '140' },
  { dept: 'CEE', number: '261A' },
  { dept: 'EARTHSYS', number: '141' },
  { dept: 'EARTHSYS', number: '152' },
  { dept: 'EPS', number: '45' },
  { dept: 'EPS', number: '125' },
  { dept: 'ESS', number: '71' },
  { dept: 'ESS', number: '171' },
  { dept: 'ESS', number: '259' },
  { dept: 'OCEANS', number: '161H' },
  { dept: 'OCEANS', number: '170' },
  { dept: 'OCEANS', number: '185H' },
];

// ─── Sustainable Food & Agriculture ──────────────────────────────────────────

const SFA_BIOGEO_OPT: CourseOption[] = [
  { dept: 'BIO', number: '115' },
  { dept: 'EARTHSYS', number: '104' },
  { dept: 'EARTHSYS', number: '127' },
  { dept: 'EARTHSYS', number: '142' },
  { dept: 'EARTHSYS', number: '256' },
  { dept: 'HUMBIO', number: '113' },
  { dept: 'HUMBIO', number: '130' },
];

const SFA_SOCIAL_DIM: CourseOption[] = [
  { dept: 'ARCHLGY', number: '124' },
  { dept: 'BIO', number: '144' },
  { dept: 'EARTHSYS', number: '123' },
  { dept: 'EARTHSYS', number: '254' },
  { dept: 'HUMBIO', number: '113S' },
  { dept: 'HUMBIO', number: '166' },
  { dept: 'OSPFLOR', number: '29F' },
];

// ─── Sustainable Societies & Environment ─────────────────────────────────────

const SSE_PLANETARY: CourseOption[] = [
  { dept: 'BIO', number: '81' },
  { dept: 'EPS', number: '1' },
  { dept: 'EPS', number: '2' },
  { dept: 'EPS', number: '4' },
];

const SSE_ENV_SCIENCE: CourseOption[] = [
  { dept: 'CEE', number: '70' },
  { dept: 'CEE', number: '107A' },
  { dept: 'EARTHSYS', number: '101' },
  { dept: 'SUSTAIN', number: '103' },
];

const SSE_ADD_SCIENCE: CourseOption[] = [
  { dept: 'EARTHSYS', number: '105A' },
  { dept: 'EARTHSYS', number: '123A' },
  { dept: 'EARTHSYS', number: '127A' },
  { dept: 'EARTHSYS', number: '128' },
  { dept: 'EARTHSYS', number: '150' },
  { dept: 'EARTHSYS', number: '155' },
  { dept: 'OCEANS', number: '125H' },
  { dept: 'OSPAUSTL', number: '28' },
  { dept: 'OSPSANTG', number: '58' },
  { dept: 'SUSTAIN', number: '101C' },
];

const SSE_STATS: CourseOption[] = [
  { dept: 'ECON', number: '102A' },
  { dept: 'STATS', number: '110' },
  { dept: 'STATS', number: '141' },
  { dept: 'STATS', number: '191' },
];

const SSE_METHODS: CourseOption[] = [
  { dept: 'ANTHRO', number: '91' },
  { dept: 'CEE', number: '226' },
  { dept: 'CHPR', number: '247' },
  { dept: 'CS', number: '106B' },
  { dept: 'CSRE', number: '146A' },
  { dept: 'DATASCI', number: '112' },
  { dept: 'EARTHSYS', number: '100A' },
  { dept: 'EARTHSYS', number: '141' },
  { dept: 'EARTHSYS', number: '142' },
  { dept: 'EARTHSYS', number: '144' },
  { dept: 'EARTHSYS', number: '145' },
  { dept: 'EARTHSYS', number: '153' },
  { dept: 'EARTHSYS', number: '213' },
  { dept: 'EARTHSYS', number: '240' },
  { dept: 'ECON', number: '102B' },
  { dept: 'GEOPHYS', number: '115' },
  { dept: 'HUMBIO', number: '82A' },
  { dept: 'OCEANS', number: '140H' },
  { dept: 'PEDS', number: '202C' },
  { dept: 'POLISCI', number: '150A' },
  { dept: 'POLISCI', number: '150B' },
  { dept: 'POLISCI', number: '150C' },
  { dept: 'SOC', number: '180A' },
  { dept: 'URBANST', number: '123B' },
];

const SSE_BEHAVIOR: CourseOption[] = [
  { dept: 'BUSGEN', number: '115' },
  { dept: 'EARTHSYS', number: '160' },
  { dept: 'EARTHSYS', number: '179' },
  { dept: 'EARTHSYS', number: '213' },
  { dept: 'EARTHSYS', number: '227' },
  { dept: 'EBS', number: '123' },
  { dept: 'EBS', number: '223' },
  { dept: 'EBS', number: '237' },
  { dept: 'EBS', number: '240' },
  { dept: 'EBS', number: '281' },
  { dept: 'GSBGEN', number: '367' },
  { dept: 'HUMBIO', number: '116' },
  { dept: 'LAW', number: '7508' },
  { dept: 'MS&E', number: '252' },
  { dept: 'PSYCH', number: '124' },
  { dept: 'PSYCH', number: '154' },
  { dept: 'PSYCH', number: '265' },
  { dept: 'PUBLPOL', number: '135' },
  { dept: 'SUST', number: '261' },
];

const SSE_GOV_POLICY: CourseOption[] = [
  { dept: 'BUSGEN', number: '143' },
  { dept: 'CEE', number: '130B' },
  { dept: 'CEE', number: '175A' },
  { dept: 'EARTHSYS', number: '168' },
  { dept: 'EARTHSYS', number: '185' },
  { dept: 'EBS', number: '130' },
  { dept: 'EBS', number: '237' },
  { dept: 'ECON', number: '106' },
  { dept: 'ECON', number: '156' },
  { dept: 'ENVRES', number: '260' },
  { dept: 'EPS', number: '194' },
  { dept: 'GEP', number: '248' },
  { dept: 'GEP', number: '382' },
  { dept: 'HUMBIO', number: '116' },
  { dept: 'INTLPOL', number: '271' },
  { dept: 'INTNLREL', number: '146A' },
  { dept: 'LAW', number: '2504' },
  { dept: 'MS&E', number: '243' },
  { dept: 'OSPSANTG', number: '29' },
  { dept: 'POLISCI', number: '124A' },
  { dept: 'PUBLPOL', number: '308' },
  { dept: 'SUSTAIN', number: '101D' },
  { dept: 'SUSTAIN', number: '170A' },
  { dept: 'SUST', number: '234' },
];

const SSE_ENV_JUSTICE: CourseOption[] = [
  { dept: 'CEE', number: '130R' },
  { dept: 'CSRE', number: '328' },
  { dept: 'EARTHSYS', number: '109' },
  { dept: 'EARTHSYS', number: '120' },
  { dept: 'EARTHSYS', number: '121' },
  { dept: 'EARTHSYS', number: '123' },
  { dept: 'EARTHSYS', number: '125' },
  { dept: 'EARTHSYS', number: '169' },
  { dept: 'EARTHSYS', number: '170' },
  { dept: 'EARTHSYS', number: '194' },
  { dept: 'EARTHSYS', number: '194A' },
  { dept: 'EARTHSYS', number: '195' },
  { dept: 'EARTHSYS', number: '223E' },
  { dept: 'EBS', number: '130' },
  { dept: 'EBS', number: '306' },
  { dept: 'ENVRES', number: '220' },
  { dept: 'ESS', number: '166' },
  { dept: 'ESS', number: '234' },
  { dept: 'ETHICSOC', number: '178M' },
  { dept: 'HISTORY', number: '200B' },
  { dept: 'HUMRTS', number: '115' },
  { dept: 'PHIL', number: '174L' },
  { dept: 'SOC', number: '133D' },
  { dept: 'STS', number: '190' },
];

// ─── Main export ─────────────────────────────────────────────────────────────

export const EARTHSYS_BS_2526: MajorConfig = {
  id: 'earthsys-bs-2526',
  name: 'Earth Systems (BS)',
  school: 'School of Earth, Energy & Environmental Sciences',
  year: '2025-26',
  category: 'major',
  totalMinUnits: 62,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/EASYS-BS/',
  wimCourses: WIM_OPTIONS,

  sections: [
    {
      id: 'earthsys-core',
      name: 'Core Program Requirements',
      note: 'All courses must be taken for a letter grade. Students may not double-count EARTHSYS 115 across both gateway slots.',
      slots: [
        {
          id: 'earthsys-core-gateway',
          label: 'EARTHSYS 10: Introduction to Earth Systems',
          type: 'required',
          options: [{ dept: 'EARTHSYS', number: '10' }],
        },
        {
          id: 'earthsys-core-global',
          label: 'Global Change Science',
          type: 'pick-one',
          options: [
            { dept: 'EARTHSYS', number: '111' },
            { dept: 'EARTHSYS', number: '115' },
            { dept: 'GEOPHYS', number: '115' },
            { dept: 'SUSTAIN', number: '101C' },
          ],
          note: 'EARTHSYS 111 no longer offered.',
        },
        {
          id: 'earthsys-core-human',
          label: 'Human Society & Environmental Change',
          type: 'pick-one',
          options: [
            { dept: 'EARTHSYS', number: '112' },
            { dept: 'EARTHSYS', number: '108' },
            { dept: 'EARTHSYS', number: '115' },
          ],
          note: 'Cannot double-count EARTHSYS 115 with the Global Change Science slot.',
        },
      ],
    },
    {
      id: 'earthsys-ej',
      name: 'Environmental Justice, Ethics, and Human Rights',
      note: 'Complete 1 course. Must be taken for a letter grade.',
      slots: [
        {
          id: 'earthsys-ej-course',
          label: 'EJ / Ethics / Human Rights course',
          type: 'pick-from-list',
          count: 1,
          options: EJ_OPTIONS,
        },
      ],
    },
    {
      id: 'earthsys-internship',
      name: 'Earth Systems Internship',
      note: 'EARTHSYS 260 and 260A do not need to be taken for a letter grade. Beginning Autumn 2024-25 both are required.',
      slots: [
        {
          id: 'earthsys-260',
          label: 'EARTHSYS 260: Internship',
          type: 'required',
          options: [{ dept: 'EARTHSYS', number: '260' }],
        },
        {
          id: 'earthsys-260a',
          label: 'EARTHSYS 260A: Internship Preparation Workshops',
          type: 'required',
          options: [{ dept: 'EARTHSYS', number: '260A' }],
        },
      ],
    },
    {
      id: 'earthsys-subplan',
      name: 'Subplan',
      trackSelector: true,
      note: 'Choose one of the six subplans below.',
      slots: [],
    },
    {
      id: 'earthsys-capstone',
      name: 'Capstone Experience',
      note: 'All students must take EARTHSYS 210A or 210B. Then choose ONE capstone option below.',
      slots: [
        {
          id: 'earthsys-cap-seminar',
          label: 'Senior Capstone & Reflection (required for all)',
          type: 'pick-one',
          options: [
            { dept: 'EARTHSYS', number: '210A', name: 'Senior Capstone and Reflection' },
            { dept: 'EARTHSYS', number: '210B', name: 'Senior Capstone and Reflection' },
          ],
        },
      ],
      pickOneGroup: [
        {
          id: 'cap-project',
          name: 'Option 1: Earth Systems Capstone Project',
          slots: [
            {
              id: 'earthsys-cap-210p',
              label: 'EARTHSYS 210P: Earth Systems Capstone Project',
              type: 'required',
              options: [{ dept: 'EARTHSYS', number: '210P' }],
            },
          ],
        },
        {
          id: 'cap-honors',
          name: 'Option 2: Earth Systems Honors Program',
          note: "Enroll in 1–9 units of EARTHSYS 199 in the thesis advisor's section. Units may be split across quarters but may not substitute for other curriculum requirements. Completion of the honors thesis satisfies the capstone requirement. EARTHSYS 199A comprises four workshop sessions (2 in fall, 1 each in winter and spring).",
          slots: [
            {
              id: 'earthsys-cap-199',
              label: 'EARTHSYS 199: Honors Program in Earth Systems (1–9 units)',
              type: 'required',
              options: [{ dept: 'EARTHSYS', number: '199' }],
            },
            {
              id: 'earthsys-cap-199a',
              label: 'EARTHSYS 199A: Earth Systems Thesis Workshop (enrolled autumn of senior year)',
              type: 'required',
              options: [{ dept: 'EARTHSYS', number: '199A' }],
            },
          ],
        },
        {
          id: 'cap-nsc',
          name: 'Option 3: Notation in Science Communication (NSC)',
          note: 'Additional elective coursework is required beyond these 3 courses; see NSC Overview at pwrnotations.stanford.edu for details. NSC courses (required and elective) may NOT count toward breadth or depth requirements when used for the capstone.',
          slots: [
            {
              id: 'earthsys-cap-nsc1',
              label: 'PWR 91NSC: Intermediate Writing: Introduction to Science Communication',
              type: 'required',
              options: [{ dept: 'PWR', number: '91NSC' }],
            },
            {
              id: 'earthsys-cap-nsc2',
              label: 'PWR 99A: Portfolio Preparation I',
              type: 'required',
              options: [{ dept: 'PWR', number: '99A' }],
            },
            {
              id: 'earthsys-cap-nsc3',
              label: 'PWR 99B: Portfolio Preparation II',
              type: 'required',
              options: [{ dept: 'PWR', number: '99B' }],
            },
          ],
        },
      ],
    },
    {
      id: 'earthsys-wim',
      name: 'Writing in the Major (WIM)',
      note: 'Complete 1 course. OCEANS 182H fulfills WIM for Oceans, Atmosphere & Climate subplan students. An advisor-approved WIM in a related department may also fulfill this requirement; that WIM course may not also count toward subplan or electives.',
      slots: [
        {
          id: 'earthsys-wim-course',
          label: 'WIM course',
          type: 'pick-from-list',
          count: 1,
          options: WIM_OPTIONS,
        },
      ],
    },
  ],

  tracks: [
    // ── 1. Biosphere ──────────────────────────────────────────────────────────
    {
      id: 'biosphere',
      name: 'Biosphere',
      sections: [
        {
          id: 'bio-found',
          name: 'Foundational Courses',
          note: 'Foundational courses do not need to be taken for a letter grade. All other courses must be taken for a letter grade.',
          slots: [
            {
              id: 'bio-f-bio81',
              label: 'BIO 81: Introduction to Ecology',
              type: 'required',
              options: [{ dept: 'BIO', number: '81' }],
            },
            {
              id: 'bio-f-bio82',
              label: 'BIO 82: Genetics',
              type: 'required',
              options: [{ dept: 'BIO', number: '82' }],
            },
            {
              id: 'bio-f-chem',
              label: 'Chemistry: EPS 2',
              type: 'required',
              options: [{ dept: 'EPS', number: '2' }],
              note: 'May be fulfilled by CHEM 31A & 31B, CHEM 31E, or CHEM AP Exam score of 5.',
            },
            {
              id: 'bio-f-advchem',
              label: 'Advanced Chemistry',
              type: 'pick-one',
              options: [
                { dept: 'AA', number: '47SI' },
                { dept: 'BIO', number: '142' },
                { dept: 'CEE', number: '177' },
                { dept: 'ESS', number: '256' },
              ],
            },
            {
              id: 'bio-f-geophys',
              label: 'Geophysics',
              type: 'pick-one',
              options: [
                { dept: 'EPS', number: '3' },
                { dept: 'GEOPHYS', number: '110' },
                { dept: 'PHYSICS', number: '41' },
                { dept: 'PHYSICS', number: '41E' },
              ],
            },
            {
              id: 'bio-f-econ',
              label: 'ECON 1: Principles of Economics',
              type: 'required',
              options: [{ dept: 'ECON', number: '1' }],
            },
            {
              id: 'bio-f-math19',
              label: 'MATH 19: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '19' }],
            },
            {
              id: 'bio-f-math20',
              label: 'MATH 20: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '20' }],
            },
            {
              id: 'bio-f-math21',
              label: 'MATH 21: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '21' }],
            },
            {
              id: 'bio-f-advmath',
              label: 'Advanced Mathematics',
              type: 'pick-one',
              options: ADVANCED_MATH,
              note: 'MATH 21 is a prerequisite for both options.',
            },
            {
              id: 'bio-f-geo',
              label: 'Geological Science',
              type: 'pick-one',
              options: GEOLOGY_OPTIONS,
            },
            {
              id: 'bio-f-stats',
              label: 'Statistics',
              type: 'pick-from-list',
              count: 1,
              options: STATS_OPTIONS,
            },
          ],
        },
        {
          id: 'bio-subcat',
          name: 'Subcategory Courses',
          note: '6 total subcategory courses required. All must be taken for a letter grade (3–5 units each). EARTHSYS 105A and 105B together count as 1 subcategory course.',
          slots: [
            {
              id: 'bio-sub-ecology',
              label: 'Ecology & Conservation (≥ 2 courses)',
              type: 'pick-from-list',
              count: 2,
              options: BIO_ECOLOGY,
            },
            {
              id: 'bio-sub-biogeo',
              label: 'Biogeochemistry (≥ 1 course)',
              type: 'pick-from-list',
              count: 1,
              options: BIO_BIOGEO,
            },
            {
              id: 'bio-sub-ecosystem',
              label: 'Ecosystem & Society (≥ 1 course)',
              type: 'pick-from-list',
              count: 1,
              options: BIO_ECOSYSTEM_SOCIETY,
            },
            {
              id: 'bio-sub-gis',
              label: 'EARTHSYS 144: GIS (Required Methods)',
              type: 'required',
              options: [{ dept: 'EARTHSYS', number: '144' }],
            },
            {
              id: 'bio-sub-methods',
              label: 'Methods: Optional (1 additional)',
              type: 'pick-from-list',
              count: 1,
              options: BIO_METHODS_OPT,
              note: 'Counts toward the 6 total subcategory courses.',
            },
          ],
        },
      ],
    },

    // ── 2. Energy, Science & Technology ──────────────────────────────────────
    {
      id: 'energy-sci-tech',
      name: 'Energy, Science & Technology',
      sections: [
        {
          id: 'est-found',
          name: 'Foundational Courses',
          note: 'Foundational courses do not need to be taken for a letter grade. All other courses must be taken for a letter grade.',
          slots: [
            {
              id: 'est-f-econ',
              label: 'ECON 1: Principles of Economics',
              type: 'required',
              options: [{ dept: 'ECON', number: '1' }],
            },
            {
              id: 'est-f-phys41',
              label: 'PHYSICS 41: Mechanics',
              type: 'required',
              options: [{ dept: 'PHYSICS', number: '41' }],
            },
            {
              id: 'est-f-phys43',
              label: 'PHYSICS 43: Electricity and Magnetism',
              type: 'required',
              options: [{ dept: 'PHYSICS', number: '43' }],
            },
            {
              id: 'est-f-math19',
              label: 'MATH 19: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '19' }],
            },
            {
              id: 'est-f-math20',
              label: 'MATH 20: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '20' }],
            },
            {
              id: 'est-f-math21',
              label: 'MATH 21: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '21' }],
            },
            {
              id: 'est-f-advmath',
              label: 'Advanced Mathematics',
              type: 'pick-one',
              options: ADVANCED_MATH,
            },
            {
              id: 'est-f-bio',
              label: 'Biology',
              type: 'pick-one',
              options: [
                { dept: 'BIO', number: '81' },
                { dept: 'BIO', number: '83' },
                { dept: 'SUSTAIN', number: '116' },
              ],
            },
            {
              id: 'est-f-geo',
              label: 'Geological Science',
              type: 'pick-one',
              options: GEOLOGY_OPTIONS,
            },
            {
              id: 'est-f-chem',
              label: 'Chemistry',
              type: 'pick-one',
              options: [
                { dept: 'CHEM', number: '31E' },
                { dept: 'EPS', number: '2' },
              ],
              note: 'May be fulfilled by CHEM 31A & 31B, CHEM 31E, or CHEM AP Exam score of 5.',
            },
            {
              id: 'est-f-stats',
              label: 'Statistics',
              type: 'pick-from-list',
              count: 1,
              options: STATS_OPTIONS,
            },
          ],
        },
        {
          id: 'est-subcat',
          name: 'Subcategory Courses',
          note: '7 courses total (3–5 units each). Must be taken for a letter grade. Do not double-count courses across subcategories. Additional 4 courses: at least one each from Energy Resources & Technology, Energy Policy/Econ/Entrepreneurship, and Sustainable Energy & Development; Methods is optional.',
          slots: [
            {
              id: 'est-sub-me30',
              label: 'ME 30: Engineering Thermodynamics (Energy Fundamentals)',
              type: 'required',
              options: [{ dept: 'ME', number: '30' }],
            },
            {
              id: 'est-sub-engr',
              label: 'Engineering (pick 1)',
              type: 'pick-from-list',
              count: 1,
              options: ENERGY_ENGINEERING,
            },
            {
              id: 'est-sub-sources',
              label: 'Energy Sources (pick 1)',
              type: 'pick-from-list',
              count: 1,
              options: ENERGY_SOURCES,
            },
            {
              id: 'est-sub-res-tech',
              label: 'Energy Resources & Technology (≥ 1 additional)',
              type: 'pick-from-list',
              count: 1,
              options: ENERGY_RESOURCES_TECH,
              note: 'Courses used for Energy Fundamentals, Engineering, or Energy Sources may not double-count here.',
            },
            {
              id: 'est-sub-policy',
              label: 'Energy Policy, Economics & Entrepreneurship (≥ 1 additional)',
              type: 'pick-from-list',
              count: 1,
              options: ENERGY_POLICY_ECON,
            },
            {
              id: 'est-sub-sustain',
              label: 'Sustainable Energy & Development (≥ 1 additional)',
              type: 'pick-from-list',
              count: 1,
              options: ENERGY_SUSTAIN_DEV,
            },
            {
              id: 'est-sub-methods',
              label: 'Methods (optional additional)',
              type: 'pick-from-list',
              count: 1,
              optional: true,
              options: ENERGY_METHODS_OPT,
            },
          ],
        },
      ],
    },

    // ── 3. Environmental Geoscience ───────────────────────────────────────────
    {
      id: 'env-geoscience',
      name: 'Environmental Geoscience',
      sections: [
        {
          id: 'eg-found',
          name: 'Foundational Courses',
          note: 'Foundational courses do not need to be taken for a letter grade. All other courses must be taken for a letter grade.',
          slots: [
            {
              id: 'eg-f-bio',
              label: 'BIO 81: Introduction to Ecology',
              type: 'required',
              options: [{ dept: 'BIO', number: '81' }],
            },
            {
              id: 'eg-f-econ',
              label: 'ECON 1: Principles of Economics',
              type: 'required',
              options: [{ dept: 'ECON', number: '1' }],
            },
            {
              id: 'eg-f-geo',
              label: 'Geological Science',
              type: 'pick-one',
              options: GEOLOGY_OPTIONS,
            },
            {
              id: 'eg-f-chem',
              label: 'Chemistry: EPS 2',
              type: 'required',
              options: [{ dept: 'EPS', number: '2' }],
              note: 'May be fulfilled by CHEM 31A & 31B, CHEM 31E, or CHEM AP Exam score of 5.',
            },
            {
              id: 'eg-f-math19',
              label: 'MATH 19: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '19' }],
            },
            {
              id: 'eg-f-math20',
              label: 'MATH 20: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '20' }],
            },
            {
              id: 'eg-f-math21',
              label: 'MATH 21: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '21' }],
            },
            {
              id: 'eg-f-advmath',
              label: 'Advanced Mathematics',
              type: 'pick-one',
              options: ADVANCED_MATH,
            },
            {
              id: 'eg-f-geophys',
              label: 'Geological Science or Geophysics',
              type: 'pick-one',
              options: [
                { dept: 'EPS', number: '3' },
                { dept: 'GEOPHYS', number: '110' },
              ],
            },
            {
              id: 'eg-f-stats',
              label: 'Statistics',
              type: 'pick-from-list',
              count: 1,
              options: STATS_OPTIONS,
            },
            {
              id: 'eg-f-gis',
              label: 'EARTHSYS 144: GIS (Required)',
              type: 'required',
              options: [{ dept: 'EARTHSYS', number: '144' }],
            },
          ],
        },
        {
          id: 'eg-subcat',
          name: 'Subcategory Courses',
          note: '6 courses total (3–5 units each). Must be taken for a letter grade. At least 2 from each of the three subcategories.',
          slots: [
            {
              id: 'eg-sub-solid',
              label: 'The Solid Earth (≥ 2 courses)',
              type: 'pick-from-list',
              count: 2,
              options: ENVGEO_SOLID_EARTH,
            },
            {
              id: 'eg-sub-surface',
              label: "Earth's Surface (≥ 2 courses)",
              type: 'pick-from-list',
              count: 2,
              options: ENVGEO_SURFACE,
            },
            {
              id: 'eg-sub-life',
              label: 'Evolution of Life on Earth (≥ 2 courses)',
              type: 'pick-from-list',
              count: 2,
              options: ENVGEO_EVOLUTION_LIFE,
            },
          ],
        },
      ],
    },

    // ── 4. Human Environmental Systems ───────────────────────────────────────
    {
      id: 'human-env-systems',
      name: 'Human Environmental Systems',
      sections: [
        {
          id: 'hes-found',
          name: 'Foundational Courses',
          note: 'Foundational courses do not need to be taken for a letter grade. All other courses must be taken for a letter grade.',
          slots: [
            {
              id: 'hes-f-econ1',
              label: 'ECON 1: Principles of Economics',
              type: 'required',
              options: [{ dept: 'ECON', number: '1' }],
            },
            {
              id: 'hes-f-econ50',
              label: 'ECON 50: Economic Analysis I',
              type: 'required',
              options: [{ dept: 'ECON', number: '50' }],
            },
            {
              id: 'hes-f-econ102a',
              label: 'ECON 102A: Statistical Methods',
              type: 'required',
              options: [{ dept: 'ECON', number: '102A' }],
            },
            {
              id: 'hes-f-econ102b',
              label: 'ECON 102B: Applied Econometrics',
              type: 'required',
              options: [{ dept: 'ECON', number: '102B' }],
            },
            {
              id: 'hes-f-cs',
              label: 'CS 106A: Programming Methodology',
              type: 'required',
              options: [{ dept: 'CS', number: '106A' }],
              note: 'May test out or petition to have AP Computer Science A credit satisfy this.',
            },
            {
              id: 'hes-f-math19',
              label: 'MATH 19: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '19' }],
            },
            {
              id: 'hes-f-math20',
              label: 'MATH 20: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '20' }],
            },
            {
              id: 'hes-f-math21',
              label: 'MATH 21: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '21' }],
            },
            {
              id: 'hes-f-advmath',
              label: 'Advanced Mathematics',
              type: 'pick-one',
              options: ADVANCED_MATH,
            },
            {
              id: 'hes-f-bio',
              label: 'Biology',
              type: 'pick-one',
              options: [
                { dept: 'BIO', number: '81' },
                { dept: 'SUSTAIN', number: '116' },
              ],
            },
            {
              id: 'hes-f-geo',
              label: 'Geological Sciences',
              type: 'pick-one',
              options: GEOLOGY_OPTIONS,
            },
          ],
        },
        {
          id: 'hes-subcat',
          name: 'Subcategory Courses',
          note: '5 courses total. At least 1 from each of the 3 subcategories. 2 of the 5 must be skills/methods courses (see bulletin for which courses qualify). All courses min 3 units and taken for a letter grade. EARTHSYS 195 must be taken for 3 units. Do not double-count across subcategories.',
          slots: [
            {
              id: 'hes-sub-econ',
              label: 'Economics, Governance & Sustainable Development (≥ 1)',
              type: 'pick-from-list',
              count: 1,
              options: HES_ECON_GOV,
              note: 'Skills/methods course in this subcategory: ESS 268.',
            },
            {
              id: 'hes-sub-culture',
              label: 'Culture, Society & Integrated Social-Environmental Systems (≥ 1)',
              type: 'pick-from-list',
              count: 1,
              options: HES_CULTURE_SOCIETY,
              note: 'EARTHSYS 195 must be taken for 3 units.',
            },
            {
              id: 'hes-sub-data',
              label: 'Data Science & Analysis (≥ 1)',
              type: 'pick-from-list',
              count: 1,
              options: HES_DATA_SCIENCE,
              note: 'Skills/methods courses: CS 106B, EARTHSYS 141/142/144/145/153, ESS 268.',
            },
            {
              id: 'hes-sub-extra',
              label: 'Additional subcategory courses (2 more, ≥ 2 total must be skills/methods)',
              type: 'any-approved',
              count: 2,
              options: [],
              note: 'Choose 2 additional courses from any of the 3 subcategories above. At least 2 of your 5 total subcategory courses must be skills/methods courses.',
            },
          ],
        },
      ],
    },

    // ── 5. Land Systems ───────────────────────────────────────────────────────
    {
      id: 'land-systems',
      name: 'Land Systems',
      sections: [
        {
          id: 'land-found',
          name: 'Foundational Courses',
          note: 'Foundational courses do not need to be taken for a letter grade. All other courses must be taken for a letter grade.',
          slots: [
            {
              id: 'land-f-bio',
              label: 'Biology',
              type: 'pick-one',
              options: [
                { dept: 'BIO', number: '81' },
                { dept: 'SUSTAIN', number: '116' },
              ],
            },
            {
              id: 'land-f-math19',
              label: 'MATH 19: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '19' }],
            },
            {
              id: 'land-f-math20',
              label: 'MATH 20: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '20' }],
            },
            {
              id: 'land-f-math21',
              label: 'MATH 21: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '21' }],
            },
            {
              id: 'land-f-advmath',
              label: 'Advanced Mathematics',
              type: 'pick-one',
              options: ADVANCED_MATH,
            },
            {
              id: 'land-f-econ',
              label: 'ECON 1: Principles of Economics',
              type: 'required',
              options: [{ dept: 'ECON', number: '1' }],
            },
            {
              id: 'land-f-stats',
              label: 'Statistics',
              type: 'pick-from-list',
              count: 1,
              options: STATS_WITH_BIO202,
            },
            {
              id: 'land-f-geophys',
              label: 'Geophysics',
              type: 'pick-one',
              options: [
                { dept: 'EPS', number: '3' },
                { dept: 'GEOPHYS', number: '110' },
                { dept: 'PHYSICS', number: '41' },
                { dept: 'PHYSICS', number: '41E' },
                { dept: 'PHYSICS', number: '45' },
              ],
            },
            {
              id: 'land-f-chem',
              label: 'Chemistry: EPS 2',
              type: 'required',
              options: [{ dept: 'EPS', number: '2' }],
              note: 'May be fulfilled by CHEM 31A & 31B, CHEM 31E, or CHEM AP Exam score of 5.',
            },
            {
              id: 'land-f-geo',
              label: 'Geological Sciences',
              type: 'pick-one',
              options: GEOLOGY_OPTIONS,
            },
          ],
        },
        {
          id: 'land-subcat',
          name: 'Subcategory Courses',
          note: '6 courses total (3–5 units each). At least 1 from each subcategory. Must be taken for a letter grade. Do not double-count across subcategories. EARTHSYS 105A and 105B count as 1 course. EARTHSYS 195 must be taken for 3 units.',
          slots: [
            {
              id: 'land-sub-ecosys',
              label: 'Land Ecosystems (≥ 1)',
              type: 'pick-from-list',
              count: 1,
              options: LAND_ECOSYSTEMS,
            },
            {
              id: 'land-sub-water',
              label: 'Water (≥ 1)',
              type: 'pick-from-list',
              count: 1,
              options: LAND_WATER,
            },
            {
              id: 'land-sub-use',
              label: 'Land Use (≥ 1)',
              type: 'pick-from-list',
              count: 1,
              options: LAND_USE,
              note: 'EARTHSYS 195 must be taken for 3 units.',
            },
            {
              id: 'land-sub-gis',
              label: 'EARTHSYS 144: GIS (Required Methods)',
              type: 'required',
              options: [{ dept: 'EARTHSYS', number: '144' }],
            },
            {
              id: 'land-sub-methods',
              label: 'Methods: Optional (up to 1 additional)',
              type: 'pick-from-list',
              count: 1,
              optional: true,
              options: LAND_METHODS_OPT,
              note: 'Counts toward the 6 total subcategory courses.',
            },
            {
              id: 'land-sub-extra',
              label: 'Additional subcategory courses (to reach 6 total)',
              type: 'any-approved',
              count: 1,
              optional: true,
              options: [],
              note: 'Use courses from Land Ecosystems, Water, or Land Use lists to bring total to 6.',
            },
          ],
        },
      ],
    },

    // ── 6. Oceans, Atmosphere & Climate ──────────────────────────────────────
    {
      id: 'oceans-atm-climate',
      name: 'Oceans, Atmosphere & Climate',
      sections: [
        {
          id: 'oac-found',
          name: 'Foundational Courses',
          note: 'Foundational courses do not need to be taken for a letter grade. All other courses must be taken for a letter grade.',
          slots: [
            {
              id: 'oac-f-econ',
              label: 'ECON 1: Principles of Economics',
              type: 'required',
              options: [{ dept: 'ECON', number: '1' }],
            },
            {
              id: 'oac-f-bio',
              label: 'Biology',
              type: 'pick-one',
              options: [
                { dept: 'BIO', number: '81' },
                { dept: 'BIO', number: '82' },
                { dept: 'BIO', number: '83' },
                { dept: 'BIO', number: '84' },
                { dept: 'BIO', number: '85' },
                { dept: 'OCEANS', number: '182H' },
              ],
            },
            {
              id: 'oac-f-chem',
              label: 'Chemistry',
              type: 'pick-one',
              options: [
                { dept: 'CHEM', number: '31A' },
                { dept: 'CHEM', number: '31E' },
                { dept: 'EPS', number: '2' },
              ],
              note: 'May be fulfilled by CHEM 31A & 31B, CHEM 31E, or CHEM AP Exam score of 5.',
            },
            {
              id: 'oac-f-geo',
              label: 'Geology',
              type: 'pick-one',
              options: [
                { dept: 'EARTHSYS', number: '128' },
                { dept: 'EPS', number: '1' },
                { dept: 'EPS', number: '4' },
              ],
            },
            {
              id: 'oac-f-phys1',
              label: 'Physics: Mechanics',
              type: 'pick-one',
              options: [
                { dept: 'PHYSICS', number: '41' },
                { dept: 'PHYSICS', number: '41E' },
              ],
            },
            {
              id: 'oac-f-phys2',
              label: 'Physics: Light, Heat, or Geophysics',
              type: 'pick-one',
              options: [
                { dept: 'PHYSICS', number: '45' },
                { dept: 'GEOPHYS', number: '110' },
              ],
            },
            {
              id: 'oac-f-stats',
              label: 'Statistics',
              type: 'pick-from-list',
              count: 1,
              options: OAC_STATS,
            },
            {
              id: 'oac-f-math19',
              label: 'MATH 19: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '19' }],
            },
            {
              id: 'oac-f-math20',
              label: 'MATH 20: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '20' }],
            },
            {
              id: 'oac-f-math21',
              label: 'MATH 21: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '21' }],
            },
            {
              id: 'oac-f-advmath',
              label: 'CME 100: Vector Calculus (Required)',
              type: 'required',
              options: [{ dept: 'CME', number: '100' }],
              note: 'May be fulfilled by completing both MATH 51 & MATH 52. MATH 21 is a prerequisite.',
            },
            {
              id: 'oac-f-humandim',
              label: 'Human Dimensions',
              type: 'pick-from-list',
              count: 1,
              options: OAC_HUMAN_DIM,
              note: 'EARTHSYS 195 must be taken for 3 units. OCEANS 182H may also satisfy Biology foundational and WIM.',
            },
          ],
        },
        {
          id: 'oac-subcat',
          name: 'Subcategory Courses',
          note: 'Choose ONE primary subcategory (Oceanography, Climate, or Marine Biology & Conservation) and complete all its courses. Plus 2 additional courses from the Electives subcategory or any other subcategory. Courses min 3 units, for a letter grade.',
          slots: [
            {
              id: 'oac-sub-ocn1',
              label: 'Oceanography: EARTHSYS 146A (Atm. Circulation)',
              type: 'required',
              optional: true,
              options: [{ dept: 'EARTHSYS', number: '146A' }],
              note: 'Required if choosing Oceanography subcategory.',
            },
            {
              id: 'oac-sub-ocn2',
              label: 'Oceanography: Ocean Circulation',
              type: 'pick-one',
              optional: true,
              options: [
                { dept: 'EARTHSYS', number: '146B' },
                { dept: 'EARTHSYS', number: '164' },
              ],
            },
            {
              id: 'oac-sub-ocn3',
              label: 'Oceanography: EARTHSYS 151 (Biological Oceanography)',
              type: 'required',
              optional: true,
              options: [{ dept: 'EARTHSYS', number: '151' }],
            },
            {
              id: 'oac-sub-ocn4',
              label: 'Oceanography: EARTHSYS 152 (Marine Chemistry)',
              type: 'required',
              optional: true,
              options: [{ dept: 'EARTHSYS', number: '152' }],
            },
            {
              id: 'oac-sub-clim1',
              label: 'Climate: EARTHSYS 146A (Atm. Circulation)',
              type: 'required',
              optional: true,
              options: [{ dept: 'EARTHSYS', number: '146A' }],
              note: 'Required if choosing Climate subcategory.',
            },
            {
              id: 'oac-sub-clim2',
              label: 'Climate: EARTHSYS 146B (Ocean Circulation)',
              type: 'required',
              optional: true,
              options: [{ dept: 'EARTHSYS', number: '146B' }],
            },
            {
              id: 'oac-sub-clim3',
              label: 'Climate: Scientific Basis of Climate Change',
              type: 'pick-one',
              optional: true,
              options: [
                { dept: 'ESS', number: '102' },
                { dept: 'CEE', number: '64' },
              ],
            },
            {
              id: 'oac-sub-clim4',
              label: 'Climate: Advanced Climate Dynamics',
              type: 'pick-one',
              optional: true,
              options: [
                { dept: 'ESS', number: '228' },
                { dept: 'ESS', number: '248' },
                { dept: 'ESS', number: '288' },
              ],
            },
            {
              id: 'oac-sub-mar1',
              label: 'Marine Biology: BIO 136 (Macroevolution)',
              type: 'required',
              optional: true,
              options: [{ dept: 'BIO', number: '136' }],
              note: 'Required if choosing Marine Biology & Conservation subcategory.',
            },
            {
              id: 'oac-sub-mar2',
              label: 'Marine Biology: BIO 143H (Quantitative Methods)',
              type: 'required',
              optional: true,
              options: [{ dept: 'BIO', number: '143H' }],
            },
            {
              id: 'oac-sub-mar3',
              label: 'Marine Biology: EARTHSYS 151 (Biological Oceanography)',
              type: 'required',
              optional: true,
              options: [{ dept: 'EARTHSYS', number: '151' }],
            },
            {
              id: 'oac-sub-mar4',
              label: 'Marine Biology: OCEANS 125H (Environmental Change & Marine Biodiversity)',
              type: 'required',
              optional: true,
              options: [{ dept: 'OCEANS', number: '125H' }],
            },
            {
              id: 'oac-sub-elec',
              label: 'Additional courses: Electives or another subcategory (2 required)',
              type: 'pick-from-list',
              count: 2,
              options: OAC_ELECTIVES,
              note: 'May also be drawn from courses in the other two main subcategories (Oceanography, Climate, Marine Biology).',
            },
          ],
        },
      ],
    },

    // ── 7. Sustainable Food & Agriculture ────────────────────────────────────
    {
      id: 'sust-food-ag',
      name: 'Sustainable Food & Agriculture',
      sections: [
        {
          id: 'sfa-found',
          name: 'Foundational Courses',
          note: 'Foundational courses do not need to be taken for a letter grade. All other courses must be taken for a letter grade.',
          slots: [
            {
              id: 'sfa-f-eco',
              label: 'Ecology',
              type: 'pick-one',
              options: [
                { dept: 'BIO', number: '81' },
                { dept: 'SUSTAIN', number: '116' },
              ],
            },
            {
              id: 'sfa-f-bio',
              label: 'Biology',
              type: 'pick-one',
              options: [
                { dept: 'BIO', number: '82' },
                { dept: 'BIO', number: '83' },
              ],
            },
            {
              id: 'sfa-f-econ',
              label: 'ECON 1: Principles of Economics',
              type: 'required',
              options: [{ dept: 'ECON', number: '1' }],
            },
            {
              id: 'sfa-f-chem',
              label: 'Chemistry: EPS 2',
              type: 'required',
              options: [{ dept: 'EPS', number: '2' }],
              note: 'May be fulfilled by CHEM 31A & 31B, CHEM 31E, or CHEM AP Exam score of 5.',
            },
            {
              id: 'sfa-f-geo',
              label: 'Geoscience',
              type: 'pick-one',
              options: [
                { dept: 'EPS', number: '1' },
                { dept: 'EPS', number: '4' },
                { dept: 'SUSTAIN', number: '117' },
              ],
            },
            {
              id: 'sfa-f-geomech',
              label: 'Geo-Mechanics',
              type: 'pick-one',
              options: [
                { dept: 'EPS', number: '3' },
                { dept: 'GEOPHYS', number: '110' },
                { dept: 'PHYSICS', number: '41' },
                { dept: 'PHYSICS', number: '41E' },
              ],
            },
            {
              id: 'sfa-f-math19',
              label: 'MATH 19: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '19' }],
            },
            {
              id: 'sfa-f-math20',
              label: 'MATH 20: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '20' }],
            },
            {
              id: 'sfa-f-math21',
              label: 'MATH 21: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '21' }],
            },
            {
              id: 'sfa-f-advmath',
              label: 'Advanced Mathematics',
              type: 'pick-one',
              options: ADVANCED_MATH,
            },
            {
              id: 'sfa-f-stats',
              label: 'Statistics',
              type: 'pick-from-list',
              count: 1,
              options: STATS_WITH_BIO202,
            },
          ],
        },
        {
          id: 'sfa-subcat',
          name: 'Subcategory Courses',
          note: '6 total subcategory courses required. Min 3 units each, for a letter grade (unless no letter grade option).',
          slots: [
            {
              id: 'sfa-sub-185',
              label: 'EARTHSYS 185: Feeding Nine Billion',
              type: 'required',
              options: [{ dept: 'EARTHSYS', number: '185' }],
            },
            {
              id: 'sfa-sub-econ106',
              label: 'ECON 106: World Food Economy',
              type: 'required',
              options: [{ dept: 'ECON', number: '106' }],
            },
            {
              id: 'sfa-sub-soils',
              label: 'EARTHSYS 155: Science of Soils (Required Biogeophysical)',
              type: 'required',
              options: [{ dept: 'EARTHSYS', number: '155' }],
            },
            {
              id: 'sfa-sub-biogeo',
              label: 'Biogeophysical Dimensions (1 additional)',
              type: 'pick-from-list',
              count: 1,
              options: SFA_BIOGEO_OPT,
            },
            {
              id: 'sfa-sub-social',
              label: 'Social Dimensions (1 course)',
              type: 'pick-from-list',
              count: 1,
              options: SFA_SOCIAL_DIM,
            },
            {
              id: 'sfa-sub-field',
              label: 'Applied Study in the Field (1 course)',
              type: 'pick-one',
              options: [
                { dept: 'EARTHSYS', number: '180' },
                { dept: 'EARTHSYS', number: '181' },
              ],
              note: 'EARTHSYS 181A and 181B together satisfy this requirement.',
            },
          ],
        },
      ],
    },

    // ── 8. Sustainable Societies & Environment ────────────────────────────────
    {
      id: 'sust-societies-env',
      name: 'Sustainable Societies & Environment',
      sections: [
        {
          id: 'sse-found',
          name: 'Foundational Courses',
          note: 'Foundational courses do not need to be taken for a letter grade. All other courses must be taken for a letter grade.',
          slots: [
            {
              id: 'sse-f-econ',
              label: 'ECON 1: Principles of Economics',
              type: 'required',
              options: [{ dept: 'ECON', number: '1' }],
            },
            {
              id: 'sse-f-cs',
              label: 'CS 106A: Programming Methodology',
              type: 'required',
              options: [{ dept: 'CS', number: '106A' }],
              note: 'May test out or petition to have AP Computer Science A credit satisfy this.',
            },
            {
              id: 'sse-f-math19',
              label: 'MATH 19: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '19' }],
            },
            {
              id: 'sse-f-math20',
              label: 'MATH 20: Calculus',
              type: 'required',
              options: [{ dept: 'MATH', number: '20' }],
            },
            {
              id: 'sse-f-psych',
              label: 'Psychology',
              type: 'pick-one',
              options: [
                { dept: 'PSYCH', number: '1' },
                { dept: 'PSYCH', number: '70' },
              ],
            },
            {
              id: 'sse-f-planetary',
              label: 'Planetary Science',
              type: 'pick-one',
              options: SSE_PLANETARY,
            },
            {
              id: 'sse-f-envsci',
              label: 'Environmental Science',
              type: 'pick-one',
              options: SSE_ENV_SCIENCE,
            },
            {
              id: 'sse-f-addsci',
              label: 'Additional Science (second Planetary or Environmental Science course)',
              type: 'pick-from-list',
              count: 1,
              options: [
                ...SSE_PLANETARY,
                ...SSE_ENV_SCIENCE,
                ...SSE_ADD_SCIENCE,
              ],
              note: 'May be a second course from the Planetary or Environmental Science lists, or from the Additional Science list.',
            },
            {
              id: 'sse-f-stats',
              label: 'Statistics',
              type: 'pick-from-list',
              count: 1,
              options: SSE_STATS,
            },
            {
              id: 'sse-f-methods',
              label: 'Methods (3 courses; at least 1 must be qualitative)',
              type: 'pick-from-list',
              count: 3,
              options: SSE_METHODS,
              note: 'Qualitative methods courses: ANTHRO 91, CHPR 247, CSRE 146A, HUMBIO 82A, PEDS 202C, SOC 180A, URBANST 123B.',
            },
          ],
        },
        {
          id: 'sse-subcat',
          name: 'Subcategory Courses',
          note: '5 courses total (min 3 units each, min 15 units total). At least 1 from each subcategory. Must be taken for a letter grade. Do not double-count across subcategories. EARTHSYS 195 must be taken for 3 units.',
          slots: [
            {
              id: 'sse-sub-behavior',
              label: 'Behavior & Decision Science (≥ 1)',
              type: 'pick-from-list',
              count: 1,
              options: SSE_BEHAVIOR,
            },
            {
              id: 'sse-sub-gov',
              label: 'Governance & Environmental Policy (≥ 1)',
              type: 'pick-from-list',
              count: 1,
              options: SSE_GOV_POLICY,
            },
            {
              id: 'sse-sub-justice',
              label: 'Environmental Justice & Social Movements (≥ 1)',
              type: 'pick-from-list',
              count: 1,
              options: SSE_ENV_JUSTICE,
              note: 'EARTHSYS 195 must be taken for 3 units.',
            },
            {
              id: 'sse-sub-extra',
              label: 'Additional subcategory courses (2 more)',
              type: 'any-approved',
              count: 2,
              options: [],
              note: 'Choose 2 additional courses from any of the 3 subcategories above.',
            },
          ],
        },
      ],
    },
  ],
};
