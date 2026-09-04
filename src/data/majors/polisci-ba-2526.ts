// Political Science BA: School of Humanities & Sciences, 2025-2026
// Source: https://bulletin.stanford.edu/programs/POLSC-BA
// Min 70 units. All letter-graded courses must earn C or higher.
// Up to 2 units non-letter-grade POLISCI (CR/S) may count, only toward Additional Coursework.
// Max 25 units from outside the Political Science Dept (POLISCI 150A does NOT count toward limit).
// Max 5 units directed reading (requires petition).
// Max 2 units Student Initiated Courses (requires petition, only for Additional Coursework).
// Max two 3-unit Intro Seminars / Sophomore College courses toward 70-unit total.
// BOSP/SIW courses count toward the 25-unit non-POLISCI limit.
// Double major: may only double-count POLISCI 1 + Methods courses (ECON 102A may not be double-counted).
// Primary/secondary major: may double-count up to 30 units.
// Minor in other dept: may only double-count POLISCI 1.
// 5-unit 200/300-level seminar may count toward Primary Path, Secondary Path, OR Additional Coursework.
// Up to 1 pre-approved or petitioned course per path (primary and secondary each).

import type { MajorConfig, CourseOption, SectionSelectorOption } from '../majorSchema';

// ── Justice and Law ───────────────────────────────────────────────────────────

const JL_POLISCI: CourseOption[] = [
  { dept: 'POLISCI', number: '21Q' }, { dept: 'POLISCI', number: '29N' },
  { dept: 'POLISCI', number: '31' }, { dept: 'POLISCI', number: '31N' },
  { dept: 'POLISCI', number: '31Q' }, { dept: 'POLISCI', number: '32Q' },
  { dept: 'POLISCI', number: '33Q' }, { dept: 'POLISCI', number: '102' },
  { dept: 'POLISCI', number: '103' }, { dept: 'POLISCI', number: '103X' },
  { dept: 'POLISCI', number: '110E' }, { dept: 'POLISCI', number: '114D' },
  { dept: 'POLISCI', number: '122' }, { dept: 'POLISCI', number: '123D' },
  { dept: 'POLISCI', number: '125P' }, { dept: 'POLISCI', number: '126' },
  { dept: 'POLISCI', number: '127A' }, { dept: 'POLISCI', number: '128F' },
  { dept: 'POLISCI', number: '128S' }, { dept: 'POLISCI', number: '130' },
  { dept: 'POLISCI', number: '131L' }, { dept: 'POLISCI', number: '132A' },
  { dept: 'POLISCI', number: '133' }, { dept: 'POLISCI', number: '133Z' },
  { dept: 'POLISCI', number: '134' }, { dept: 'POLISCI', number: '134E' },
  { dept: 'POLISCI', number: '134L' }, { dept: 'POLISCI', number: '134P' },
  { dept: 'POLISCI', number: '135' }, { dept: 'POLISCI', number: '135E' },
  { dept: 'POLISCI', number: '136' }, { dept: 'POLISCI', number: '136R' },
  { dept: 'POLISCI', number: '137' }, { dept: 'POLISCI', number: '137A' },
  { dept: 'POLISCI', number: '138E' }, { dept: 'POLISCI', number: '145B' },
  { dept: 'POLISCI', number: '182' }, { dept: 'POLISCI', number: '211A' },
  { dept: 'POLISCI', number: '221A' }, { dept: 'POLISCI', number: '222S' },
  { dept: 'POLISCI', number: '223' }, { dept: 'POLISCI', number: '225L' },
  { dept: 'POLISCI', number: '226A' }, { dept: 'POLISCI', number: '228C' },
  { dept: 'POLISCI', number: '228R' }, { dept: 'POLISCI', number: '230' },
  { dept: 'POLISCI', number: '230A' }, { dept: 'POLISCI', number: '231' },
  { dept: 'POLISCI', number: '231A' }, { dept: 'POLISCI', number: '231R' },
  { dept: 'POLISCI', number: '232' }, { dept: 'POLISCI', number: '232T' },
  { dept: 'POLISCI', number: '233' }, { dept: 'POLISCI', number: '234' },
  { dept: 'POLISCI', number: '234N' }, { dept: 'POLISCI', number: '234P' },
  { dept: 'POLISCI', number: '234R' }, { dept: 'POLISCI', number: '234S' },
  { dept: 'POLISCI', number: '235A' }, { dept: 'POLISCI', number: '235B' },
  { dept: 'POLISCI', number: '235C' }, { dept: 'POLISCI', number: '235M' },
  { dept: 'POLISCI', number: '235N' }, { dept: 'POLISCI', number: '235U' },
  { dept: 'POLISCI', number: '236' }, { dept: 'POLISCI', number: '236S' },
  { dept: 'POLISCI', number: '237' }, { dept: 'POLISCI', number: '237L' },
  { dept: 'POLISCI', number: '237R' }, { dept: 'POLISCI', number: '238R' },
  { dept: 'POLISCI', number: '238T' }, { dept: 'POLISCI', number: '239' },
  { dept: 'POLISCI', number: '247C' }, { dept: 'POLISCI', number: '327C' },
  { dept: 'POLISCI', number: '333M' }, { dept: 'POLISCI', number: '335T' },
  { dept: 'POLISCI', number: '337M' }, { dept: 'POLISCI', number: '338B' },
  { dept: 'POLISCI', number: '432R' },
];

const JL_NON_POLISCI: CourseOption[] = [
  { dept: 'BUSGEN', number: '143' }, { dept: 'COMM', number: '130N' },
  { dept: 'CSRE', number: '220' }, { dept: 'EDUC', number: '220D' },
  { dept: 'FEMGEN', number: '202' }, { dept: 'HISTORY', number: '152' },
  { dept: 'HISTORY', number: '204G' }, { dept: 'HISTORY', number: '206P' },
  { dept: 'HISTORY', number: '239B' }, { dept: 'HISTORY', number: '252' },
  { dept: 'HUMBIO', number: '173' }, { dept: 'INTLPOL', number: '280' },
  { dept: 'INTNLREL', number: '140A' }, { dept: 'LAW', number: '2519' },
  { dept: 'OSPFLOR', number: '12' }, { dept: 'OSPFLOR', number: '43' },
  { dept: 'OSPFLOR', number: '65' }, { dept: 'OSPOXFRD', number: '18' },
  { dept: 'OSPOXFRD', number: '24' }, { dept: 'OSPCPTWN', number: '45' },
  { dept: 'OSPSANTG', number: '20' }, { dept: 'PHIL', number: '2' },
  { dept: 'PHIL', number: '175W' }, { dept: 'PHIL', number: '179W' },
  { dept: 'PUBLPOL', number: '106' }, { dept: 'PUBLPOL', number: '132' },
  { dept: 'RELIGST', number: '208' }, { dept: 'SIW', number: '105' },
  { dept: 'SIW', number: '106' }, { dept: 'SIW', number: '107' },
  { dept: 'SIW', number: '123' }, { dept: 'SOC', number: '136' },
  { dept: 'THINK', number: '19' }, { dept: 'THINK', number: '47' },
  { dept: 'URBANST', number: '112' },
];

// ── International Relations ───────────────────────────────────────────────────

const IR_POLISCI: CourseOption[] = [
  { dept: 'POLISCI', number: '10N' }, { dept: 'POLISCI', number: '21N' },
  { dept: 'POLISCI', number: '43Q' }, { dept: 'POLISCI', number: '51N' },
  { dept: 'POLISCI', number: '79' }, { dept: 'POLISCI', number: '101' },
  { dept: 'POLISCI', number: '101Z' }, { dept: 'POLISCI', number: '110C' },
  { dept: 'POLISCI', number: '110D' }, { dept: 'POLISCI', number: '110E' },
  { dept: 'POLISCI', number: '110G' }, { dept: 'POLISCI', number: '110X' },
  { dept: 'POLISCI', number: '110Y' }, { dept: 'POLISCI', number: '111' },
  { dept: 'POLISCI', number: '113' }, { dept: 'POLISCI', number: '114' },
  { dept: 'POLISCI', number: '114D' }, { dept: 'POLISCI', number: '114S' },
  { dept: 'POLISCI', number: '115' }, { dept: 'POLISCI', number: '115B' },
  { dept: 'POLISCI', number: '115E' }, { dept: 'POLISCI', number: '116' },
  { dept: 'POLISCI', number: '116A' }, { dept: 'POLISCI', number: '116M' },
  { dept: 'POLISCI', number: '118P' }, { dept: 'POLISCI', number: '119' },
  { dept: 'POLISCI', number: '136R' }, { dept: 'POLISCI', number: '143C' },
  { dept: 'POLISCI', number: '147' }, { dept: 'POLISCI', number: '149S' },
  { dept: 'POLISCI', number: '210' }, { dept: 'POLISCI', number: '210A' },
  { dept: 'POLISCI', number: '211A' }, { dept: 'POLISCI', number: '211B' },
  { dept: 'POLISCI', number: '211N' }, { dept: 'POLISCI', number: '213' },
  { dept: 'POLISCI', number: '213A' }, { dept: 'POLISCI', number: '214R' },
  { dept: 'POLISCI', number: '215A' }, { dept: 'POLISCI', number: '217' },
  { dept: 'POLISCI', number: '217A' }, { dept: 'POLISCI', number: '218T' },
  { dept: 'POLISCI', number: '219' }, { dept: 'POLISCI', number: '235' },
  { dept: 'POLISCI', number: '235M' }, { dept: 'POLISCI', number: '237' },
  { dept: 'POLISCI', number: '242' }, { dept: 'POLISCI', number: '244C' },
  { dept: 'POLISCI', number: '248' }, { dept: 'POLISCI', number: '248D' },
  { dept: 'POLISCI', number: '312' },
];

const IR_NON_POLISCI: CourseOption[] = [
  { dept: 'AFRICAST', number: '111' }, { dept: 'AFRICAST', number: '112' },
  { dept: 'ANTHRO', number: '337' }, { dept: 'ECON', number: '106' },
  { dept: 'HISTORY', number: '102' }, { dept: 'HISTORY', number: '106A' },
  { dept: 'HISTORY', number: '106B' }, { dept: 'HISTORY', number: '261G' },
  { dept: 'HISTORY', number: '279' }, { dept: 'HISTORY', number: '288' },
  { dept: 'INTLPOL', number: '217' }, { dept: 'INTLPOL', number: '219' },
  { dept: 'INTLPOL', number: '244' }, { dept: 'INTLPOL', number: '246' },
  { dept: 'INTLPOL', number: '280' }, { dept: 'INTNLREL', number: '103F' },
  { dept: 'INTNLREL', number: '123' }, { dept: 'INTNLREL', number: '140A' },
  { dept: 'INTNLREL', number: '140C' }, { dept: 'INTNLREL', number: '142' },
  { dept: 'INTNLREL', number: '182' }, { dept: 'MS&E', number: '93Q' },
  { dept: 'MS&E', number: '193' }, { dept: 'OSPBER', number: '77' },
  { dept: 'OSPBER', number: '82' }, { dept: 'OSPBER', number: '126X' },
  { dept: 'OSPCPTWN', number: '10' }, { dept: 'OSPCPTWN', number: '31' },
  { dept: 'OSPFLOR', number: '64' }, { dept: 'OSPFLOR', number: '65' },
  { dept: 'OSPPARIS', number: '122X' }, { dept: 'OSPSANTG', number: '129X' },
  { dept: 'SIW', number: '119' }, { dept: 'SOC', number: '111' },
  { dept: 'SOC', number: '117A' }, { dept: 'THINK', number: '19' },
];

// ── Elections, Representation, and Governance ────────────────────────────────

const ERG_POLISCI: CourseOption[] = [
  { dept: 'POLISCI', number: '20N' }, { dept: 'POLISCI', number: '20Q' },
  { dept: 'POLISCI', number: '25N' }, { dept: 'POLISCI', number: '31N' },
  { dept: 'POLISCI', number: '34N' }, { dept: 'POLISCI', number: '72' },
  { dept: 'POLISCI', number: '75' }, { dept: 'POLISCI', number: '102' },
  { dept: 'POLISCI', number: '104' }, { dept: 'POLISCI', number: '104G' },
  { dept: 'POLISCI', number: '110D' }, { dept: 'POLISCI', number: '110Y' },
  { dept: 'POLISCI', number: '115' }, { dept: 'POLISCI', number: '120B' },
  { dept: 'POLISCI', number: '120C' }, { dept: 'POLISCI', number: '120Z' },
  { dept: 'POLISCI', number: '121' }, { dept: 'POLISCI', number: '121L' },
  { dept: 'POLISCI', number: '123D' }, { dept: 'POLISCI', number: '124A' },
  { dept: 'POLISCI', number: '124L' }, { dept: 'POLISCI', number: '125M' },
  { dept: 'POLISCI', number: '125P' }, { dept: 'POLISCI', number: '125S' },
  { dept: 'POLISCI', number: '127' }, { dept: 'POLISCI', number: '128F' },
  { dept: 'POLISCI', number: '128S' }, { dept: 'POLISCI', number: '130' },
  { dept: 'POLISCI', number: '131L' }, { dept: 'POLISCI', number: '132A' },
  { dept: 'POLISCI', number: '134L' }, { dept: 'POLISCI', number: '134P' },
  { dept: 'POLISCI', number: '135' }, { dept: 'POLISCI', number: '140P' },
  { dept: 'POLISCI', number: '143C' }, { dept: 'POLISCI', number: '143S' },
  { dept: 'POLISCI', number: '145B' }, { dept: 'POLISCI', number: '147' },
  { dept: 'POLISCI', number: '147B' }, { dept: 'POLISCI', number: '147P' },
  { dept: 'POLISCI', number: '148' }, { dept: 'POLISCI', number: '149T' },
  { dept: 'POLISCI', number: '150A' }, { dept: 'POLISCI', number: '157' },
  { dept: 'POLISCI', number: '213E' }, { dept: 'POLISCI', number: '217A' },
  { dept: 'POLISCI', number: '220' }, { dept: 'POLISCI', number: '220C' },
  { dept: 'POLISCI', number: '220R' }, { dept: 'POLISCI', number: '222' },
  { dept: 'POLISCI', number: '222F' }, { dept: 'POLISCI', number: '222S' },
  { dept: 'POLISCI', number: '223' }, { dept: 'POLISCI', number: '223A' },
  { dept: 'POLISCI', number: '224' }, { dept: 'POLISCI', number: '225' },
  { dept: 'POLISCI', number: '226' }, { dept: 'POLISCI', number: '226A' },
  { dept: 'POLISCI', number: '226T' }, { dept: 'POLISCI', number: '227C' },
  { dept: 'POLISCI', number: '227F' }, { dept: 'POLISCI', number: '227R' },
  { dept: 'POLISCI', number: '228C' }, { dept: 'POLISCI', number: '229' },
  { dept: 'POLISCI', number: '234' }, { dept: 'POLISCI', number: '240A' },
  { dept: 'POLISCI', number: '241' }, { dept: 'POLISCI', number: '241B' },
  { dept: 'POLISCI', number: '242G' }, { dept: 'POLISCI', number: '244A' },
  { dept: 'POLISCI', number: '244U' }, { dept: 'POLISCI', number: '245R' },
  { dept: 'POLISCI', number: '246A' }, { dept: 'POLISCI', number: '246H' },
  { dept: 'POLISCI', number: '246P' }, { dept: 'POLISCI', number: '247G' },
  { dept: 'POLISCI', number: '248S' }, { dept: 'POLISCI', number: '249R' },
  { dept: 'POLISCI', number: '293' }, { dept: 'POLISCI', number: '327C' },
  { dept: 'POLISCI', number: '335T' }, { dept: 'POLISCI', number: '340A' },
  { dept: 'POLISCI', number: '344' },
];

const ERG_NON_POLISCI: CourseOption[] = [
  { dept: 'ANTHRO', number: '182D' }, { dept: 'COLLEGE', number: '110' },
  { dept: 'COMM', number: '130N' }, { dept: 'CSRE', number: '220' },
  { dept: 'ECON', number: '116' }, { dept: 'ECON', number: '155' },
  { dept: 'EDUC', number: '197' }, { dept: 'EDUC', number: '220D' },
  { dept: 'FEMGEN', number: '202' }, { dept: 'HISTORY', number: '4' },
  { dept: 'HISTORY', number: '87' }, { dept: 'HISTORY', number: '152' },
  { dept: 'HISTORY', number: '153' }, { dept: 'HISTORY', number: '158C' },
  { dept: 'HISTORY', number: '181B' }, { dept: 'HISTORY', number: '204G' },
  { dept: 'HISTORY', number: '252' }, { dept: 'HISTORY', number: '261G' },
  { dept: 'HISTORY', number: '288' }, { dept: 'HUMBIO', number: '120' },
  { dept: 'HUMBIO', number: '120A' }, { dept: 'HUMBIO', number: '120B' },
  { dept: 'HUMBIO', number: '129S' }, { dept: 'HUMBIO', number: '173' },
  { dept: 'LAW', number: '2519' }, { dept: 'MS&E', number: '193' },
  { dept: 'OSPBER', number: '115X' }, { dept: 'OSPCPTWN', number: '69' },
  { dept: 'OSPFLOR', number: '12' }, { dept: 'OSPFLOR', number: '43' },
  { dept: 'OSPFLOR', number: '78' }, { dept: 'OSPOXFRD', number: '22' },
  { dept: 'OSPOXFRD', number: '24' }, { dept: 'OSPOXFRD', number: '36' },
  { dept: 'OSPPARIS', number: '32' }, { dept: 'OSPPARIS', number: '122X' },
  { dept: 'OSPSANTG', number: '116X' }, { dept: 'PHIL', number: '179W' },
  { dept: 'PUBLPOL', number: '132' }, { dept: 'PUBLPOL', number: '135' },
  { dept: 'PUBLPOL', number: '154' }, { dept: 'PUBLPOL', number: '156' },
  { dept: 'PUBLPOL', number: '209' }, { dept: 'PUBLPOL', number: '353A' },
  { dept: 'SIW', number: '105' }, { dept: 'SIW', number: '106' },
  { dept: 'SIW', number: '107' }, { dept: 'SIW', number: '121' },
  { dept: 'SIW', number: '123' }, { dept: 'SIW', number: '124' },
  { dept: 'SIW', number: '156' }, { dept: 'SOC', number: '118' },
  { dept: 'SOC', number: '135' }, { dept: 'SOC', number: '136' },
  { dept: 'SOC', number: '145' }, { dept: 'THINK', number: '47' },
  { dept: 'THINK', number: '51' }, { dept: 'URBANST', number: '112' },
];

// ── Political Economy and Development ────────────────────────────────────────

const PED_POLISCI: CourseOption[] = [
  { dept: 'POLISCI', number: '25N' }, { dept: 'POLISCI', number: '31Q' },
  { dept: 'POLISCI', number: '34N' }, { dept: 'POLISCI', number: '43Q' },
  { dept: 'POLISCI', number: '46N' }, { dept: 'POLISCI', number: '101' },
  { dept: 'POLISCI', number: '101Z' }, { dept: 'POLISCI', number: '102' },
  { dept: 'POLISCI', number: '103' }, { dept: 'POLISCI', number: '103X' },
  { dept: 'POLISCI', number: '104' }, { dept: 'POLISCI', number: '110C' },
  { dept: 'POLISCI', number: '110G' }, { dept: 'POLISCI', number: '110X' },
  { dept: 'POLISCI', number: '114' }, { dept: 'POLISCI', number: '114D' },
  { dept: 'POLISCI', number: '115E' }, { dept: 'POLISCI', number: '116' },
  { dept: 'POLISCI', number: '118P' }, { dept: 'POLISCI', number: '120B' },
  { dept: 'POLISCI', number: '121' }, { dept: 'POLISCI', number: '121L' },
  { dept: 'POLISCI', number: '122' }, { dept: 'POLISCI', number: '124L' },
  { dept: 'POLISCI', number: '125M' }, { dept: 'POLISCI', number: '125S' },
  { dept: 'POLISCI', number: '127' }, { dept: 'POLISCI', number: '127A' },
  { dept: 'POLISCI', number: '137A' }, { dept: 'POLISCI', number: '141' },
  { dept: 'POLISCI', number: '141A' }, { dept: 'POLISCI', number: '143S' },
  { dept: 'POLISCI', number: '147' }, { dept: 'POLISCI', number: '147B' },
  { dept: 'POLISCI', number: '148' }, { dept: 'POLISCI', number: '149S' },
  { dept: 'POLISCI', number: '149T' }, { dept: 'POLISCI', number: '153' },
  { dept: 'POLISCI', number: '153Z' }, { dept: 'POLISCI', number: '168' },
  { dept: 'POLISCI', number: '204E' }, { dept: 'POLISCI', number: '210A' },
  { dept: 'POLISCI', number: '213E' }, { dept: 'POLISCI', number: '220' },
  { dept: 'POLISCI', number: '220C' }, { dept: 'POLISCI', number: '220R' },
  { dept: 'POLISCI', number: '221A' }, { dept: 'POLISCI', number: '222P' },
  { dept: 'POLISCI', number: '223' }, { dept: 'POLISCI', number: '225L' },
  { dept: 'POLISCI', number: '226' }, { dept: 'POLISCI', number: '230' },
  { dept: 'POLISCI', number: '231' }, { dept: 'POLISCI', number: '232' },
  { dept: 'POLISCI', number: '232T' }, { dept: 'POLISCI', number: '233R' },
  { dept: 'POLISCI', number: '234P' }, { dept: 'POLISCI', number: '235U' },
  { dept: 'POLISCI', number: '236' }, { dept: 'POLISCI', number: '236S' },
  { dept: 'POLISCI', number: '238R' }, { dept: 'POLISCI', number: '241' },
  { dept: 'POLISCI', number: '241B' }, { dept: 'POLISCI', number: '241K' },
  { dept: 'POLISCI', number: '241S' }, { dept: 'POLISCI', number: '241T' },
  { dept: 'POLISCI', number: '242G' }, { dept: 'POLISCI', number: '243' },
  { dept: 'POLISCI', number: '243P' }, { dept: 'POLISCI', number: '244A' },
  { dept: 'POLISCI', number: '244C' }, { dept: 'POLISCI', number: '244D' },
  { dept: 'POLISCI', number: '244H' }, { dept: 'POLISCI', number: '244U' },
  { dept: 'POLISCI', number: '245C' }, { dept: 'POLISCI', number: '245F' },
  { dept: 'POLISCI', number: '245R' }, { dept: 'POLISCI', number: '246' },
  { dept: 'POLISCI', number: '246A' }, { dept: 'POLISCI', number: '246H' },
  { dept: 'POLISCI', number: '247' }, { dept: 'POLISCI', number: '247A' },
  { dept: 'POLISCI', number: '247C' }, { dept: 'POLISCI', number: '247G' },
  { dept: 'POLISCI', number: '247T' }, { dept: 'POLISCI', number: '248' },
  { dept: 'POLISCI', number: '248D' }, { dept: 'POLISCI', number: '248S' },
  { dept: 'POLISCI', number: '249' }, { dept: 'POLISCI', number: '249R' },
  { dept: 'POLISCI', number: '312' }, { dept: 'POLISCI', number: '327C' },
  { dept: 'POLISCI', number: '344' },
];

const PED_NON_POLISCI: CourseOption[] = [
  { dept: 'AFRICAST', number: '111' }, { dept: 'AFRICAST', number: '112' },
  { dept: 'ANTHRO', number: '337' }, { dept: 'BUSGEN', number: '143' },
  { dept: 'CLASSICS', number: '116' }, { dept: 'ECON', number: '1' },
  { dept: 'ECON', number: '50' }, { dept: 'ECON', number: '51' },
  { dept: 'ECON', number: '52' }, { dept: 'ECON', number: '102A' },
  { dept: 'ECON', number: '102B' }, { dept: 'ECON', number: '106' },
  { dept: 'ECON', number: '113' }, { dept: 'ECON', number: '116' },
  { dept: 'ECON', number: '155' }, { dept: 'EDUC', number: '197' },
  { dept: 'GEP', number: '160' }, { dept: 'HISTORY', number: '87' },
  { dept: 'HISTORY', number: '97S' }, { dept: 'HISTORY', number: '106A' },
  { dept: 'HISTORY', number: '106B' }, { dept: 'HISTORY', number: '181B' },
  { dept: 'HISTORY', number: '279' }, { dept: 'HUMBIO', number: '129S' },
  { dept: 'ILAC', number: '384' }, { dept: 'INTLPOL', number: '214A' },
  { dept: 'INTLPOL', number: '244' }, { dept: 'INTLPOL', number: '246' },
  { dept: 'INTNLREL', number: '123' }, { dept: 'INTNLREL', number: '140C' },
  { dept: 'INTNLREL', number: '142' }, { dept: 'MS&E', number: '180' },
  { dept: 'OSPBER', number: '79' }, { dept: 'OSPBER', number: '115X' },
  { dept: 'OSPBER', number: '126X' }, { dept: 'OSPCPTWN', number: '10' },
  { dept: 'OSPCPTWN', number: '31' }, { dept: 'OSPCPTWN', number: '69' },
  { dept: 'OSPFLOR', number: '64' }, { dept: 'OSPFLOR', number: '78' },
  { dept: 'OSPFLOR', number: '92' }, { dept: 'OSPOXFRD', number: '18' },
  { dept: 'OSPOXFRD', number: '36' }, { dept: 'OSPPARIS', number: '32' },
  { dept: 'OSPSANTG', number: '116X' }, { dept: 'PUBLPOL', number: '106' },
  { dept: 'SIW', number: '103' }, { dept: 'SOC', number: '111' },
  { dept: 'SOC', number: '117A' }, { dept: 'SOC', number: '135' },
  { dept: 'SOC', number: '145' }, { dept: 'STS', number: '139' },
  { dept: 'STS', number: '156' },
];

// ── Data Science ──────────────────────────────────────────────────────────────

const DS_POLISCI: CourseOption[] = [
  { dept: 'POLISCI', number: '55' }, { dept: 'POLISCI', number: '120B' },
  { dept: 'POLISCI', number: '127' }, { dept: 'POLISCI', number: '141A' },
  { dept: 'POLISCI', number: '147P' }, { dept: 'POLISCI', number: '150A' },
  { dept: 'POLISCI', number: '150B' }, { dept: 'POLISCI', number: '150C' },
  { dept: 'POLISCI', number: '150R' }, { dept: 'POLISCI', number: '151' },
  { dept: 'POLISCI', number: '153' }, { dept: 'POLISCI', number: '153Z' },
  { dept: 'POLISCI', number: '154' }, { dept: 'POLISCI', number: '157' },
  { dept: 'POLISCI', number: '158' }, { dept: 'POLISCI', number: '182' },
  { dept: 'POLISCI', number: '227C' }, { dept: 'POLISCI', number: '227F' },
  { dept: 'POLISCI', number: '241S' }, { dept: 'POLISCI', number: '247A' },
  { dept: 'POLISCI', number: '251A' }, { dept: 'POLISCI', number: '259' },
  { dept: 'POLISCI', number: '344' }, { dept: 'POLISCI', number: '356A' },
  { dept: 'POLISCI', number: '356B' }, { dept: 'POLISCI', number: '358' },
];

const DS_NON_POLISCI: CourseOption[] = [
  { dept: 'COMM', number: '106' }, { dept: 'COMM', number: '154' },
  { dept: 'CS', number: '106A' }, { dept: 'CS', number: '106B' },
  { dept: 'CS', number: '109' }, { dept: 'ECON', number: '121' },
  { dept: 'ECON', number: '180' }, { dept: 'OSPOXFRD', number: '82' },
  { dept: 'STATS', number: '101' }, { dept: 'STATS', number: '110' },
];

const POLISCI_PATHS: Array<{
  id: string;
  name: string;
  polisci: CourseOption[];
  nonPolisci: CourseOption[];
}> = [
  { id: 'justice-law', name: 'Justice and Law', polisci: JL_POLISCI, nonPolisci: JL_NON_POLISCI },
  { id: 'intl-rel', name: 'International Relations', polisci: IR_POLISCI, nonPolisci: IR_NON_POLISCI },
  { id: 'erg', name: 'Elections, Representation, and Governance', polisci: ERG_POLISCI, nonPolisci: ERG_NON_POLISCI },
  { id: 'ped', name: 'Political Economy and Development', polisci: PED_POLISCI, nonPolisci: PED_NON_POLISCI },
  { id: 'ds', name: 'Data Science', polisci: DS_POLISCI, nonPolisci: DS_NON_POLISCI },
];

function makePathOption(
  role: 'primary' | 'secondary',
  minUnits: number,
  path: (typeof POLISCI_PATHS)[number],
): SectionSelectorOption {
  return {
    id: `${role}-${path.id}`,
    name: path.name,
    minUnits,
    sections: [
      {
        id: `${role}-${path.id}-courses`,
        name: `${path.name} (${minUnits} units minimum)`,
        minUnits,
        unitOnly: true,
        note: `Complete at least ${minUnits} units in this ${role} path. At most one pre-approved or petitioned non-POLISCI course may count toward the path.`,
        slots: [
          {
            id: `${role}-${path.id}-polisci`,
            label: `${path.name}: POLISCI Courses`,
            type: 'any-approved',
            options: path.polisci,
          },
          {
            id: `${role}-${path.id}-non-polisci`,
            label: `${path.name}: Pre-Approved Non-POLISCI (max 1)`,
            type: 'any-approved',
            optional: true,
            options: path.nonPolisci,
            note: 'At most one non-POLISCI course may count toward this path.',
          },
        ],
      },
    ],
  };
}

export const POLISCI_BA_2526: MajorConfig = {
  id: 'polisci-ba-2526',
  name: 'Political Science (BA)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/POLSC-BA/',
  category: 'major',
  totalMinUnits: 70,
  sections: [
    // ── Introductory Course (5 units) ──────────────────────────────────────────
    {
      id: 'intro',
      name: 'Introductory Course (5 units)',
      allowDoubleCount: true,
      minCourses: 1,
      note: 'Preferably taken in freshman or sophomore year. Double majors and students pursuing a minor in another dept may double-count this course.',
      slots: [
        {
          id: 'polisci1',
          label: 'POLISCI 1: The Science of Politics',
          type: 'required',
          options: [{ dept: 'POLISCI', number: '1', name: 'The Science of Politics' }],
        },
      ],
    },

    // ── Methods Course (5 units) ───────────────────────────────────────────────
    {
      id: 'methods',
      name: 'Methods Course (5 units, at least 1 required)',
      allowDoubleCount: true,
      minCourses: 1,
      note: 'Complete at least 1 methods course. Double majors may double-count methods courses (except ECON 102A). POLISCI 150A does not count toward the 25-unit non-POLISCI limit; all others do. One pre-approved course (including CS 106A, CS 106B, ECON 102A, STATS 60) may satisfy the Methods requirement.',
      slots: [
        {
          id: 'methods-course',
          label: 'Political Science Methods',
          type: 'pick-one',
          options: [
            { dept: 'CS', number: '106A', name: 'Programming Methodology' },
            { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
            { dept: 'ECON', number: '102A', name: 'Introduction to Statistical Methods (Postcalculus) for Social Scientists' },
            { dept: 'POLISCI', number: '150A', name: 'Data Science for Politics' },
            { dept: 'STATS', number: '60', name: 'Introduction to Statistical Methods: Precalculus' },
            { dept: 'STATS', number: '101', name: 'Data Science 101' },
          ],
        },
      ],
    },

    // ── Two Paths: Primary ≥25 units + Secondary ≥15 units ────────────────────
    {
      id: 'primary-path',
      name: 'Primary Path (25 units minimum)',
      selectorLabel: 'Select primary path',
      selectorOptions: POLISCI_PATHS.map(path => makePathOption('primary', 25, path)),
      note: 'Choose one of the five paths and complete at least 25 units. The required 5-unit 200/300-level seminar may count toward this path. At most one pre-approved or petitioned non-POLISCI course may count.',
      slots: [],
    },
    {
      id: 'secondary-path',
      name: 'Secondary Path (15 units minimum)',
      selectorLabel: 'Select secondary path',
      selectorOptions: POLISCI_PATHS.map(path => makePathOption('secondary', 15, path)),
      note: 'Choose a different one of the five paths and complete at least 15 units. The required 5-unit 200/300-level seminar may count toward this path. At most one pre-approved or petitioned non-POLISCI course may count.',
      slots: [],
    },

    // ── Additional Coursework (20 units) ──────────────────────────────────────
    {
      id: 'additional',
      name: 'Additional Political Science Coursework (20 units)',
      minUnits: 20,
      unitOnly: true,
      note: 'Additional POLISCI coursework. Max 5 units directed reading (requires petition). Max 2 units Student Initiated Courses (requires petition). The required 5-unit 200/300-level seminar may count here OR toward the Primary/Secondary Path. Pre-approved non-POLISCI courses that count here but NOT toward any path: HUMBIO 172B, PUBLPOL 1, PUBLPOL 122, STATS 60.',
      slots: [
        {
          id: 'addl-courses',
          label: 'Additional POLISCI Courses',
          type: 'any-approved',
          options: [
            { dept: 'HUMBIO', number: '172B', name: 'Children, Youth, and the Law' },
            { dept: 'PUBLPOL', number: '1', name: 'Introduction to Public Policy' },
            { dept: 'PUBLPOL', number: '122', name: 'BioSecurity and Pandemic Resilience' },
            { dept: 'STATS', number: '60', name: 'Introduction to Statistical Methods: Precalculus' },
          ],
        },
      ],
    },

    // ── Seminar Requirement (5 units) ──────────────────────────────────────────
    {
      id: 'seminar',
      name: 'Seminar Course (5 units, 200- or 300-level)',
      doubleCountGroup: 'polisci-seminar-overlap',
      minCourses: 1,
      note: 'Must take at least one 5-unit, 200-level or 300-level undergraduate seminar in Political Science. This seminar may count toward Primary Path, Secondary Path, OR Additional Coursework: it is not a separate 5 units on top of those.',
      slots: [
        {
          id: 'seminar-course',
          label: 'POLISCI 200 or 300-level Seminar',
          type: 'any-approved',
          minUnits: 5,
          options: [],
          note: '5 units, 200- or 300-level. Applied toward path or additional coursework: not additive.',
        },
      ],
    },

    // ── Capstone (required: choose 1 of 4 options) ────────────────────────────
    {
      id: 'capstone',
      name: 'Capstone Experience (choose 1 option)',
      doubleCountGroup: 'polisci-capstone-overlap',
      minCourses: 1,
      note: 'All students must complete one capstone option. Discuss with faculty advisor and department staff during junior year to make a timely decision.',
      slots: [
        {
          id: 'cap-honors-thesis',
          label: 'Option A: Honors Thesis (POLISCI 299A–299D)',
          type: 'pick-from-list',
          count: 4,
          optional: true,
          options: [
            { dept: 'POLISCI', number: '299A', name: 'Research Design' },
            { dept: 'POLISCI', number: '299B', name: 'Honors Thesis Seminar' },
            { dept: 'POLISCI', number: '299C', name: 'Honors Thesis' },
            { dept: 'POLISCI', number: '299D', name: 'Honors Thesis' },
          ],
          note: 'Write an honors thesis. Up to 20 units may count toward Additional Coursework.',
        },
        {
          id: 'cap-interdisciplinary-honors',
          label: 'Option B: Interdisciplinary Honors (IHN program)',
          type: 'manual',
          optional: true,
          options: [],
          note: 'Complete an Interdisciplinary Honors (IHN) program: Democracy, Development and the Rule of Law (DDRL-IHN), Ethics in Society (ETHSO-IHN), or International Security Studies (INSST-IHN).',
        },
        {
          id: 'cap-practicum',
          label: 'Option C: Policy Practicum',
          type: 'pick-one',
          optional: true,
          options: [
            { dept: 'POLISCI', number: '226', name: 'Superpower California: The Indispensable State' },
            { dept: 'POLISCI', number: '293', name: 'Democracy in the Balance: Polarization and the Road Ahead' },
            { dept: 'POLISCI', number: '294', name: 'AI Policy Development: Leveraging Social Science to Ensure Responsible Generative AI' },
          ],
          note: 'Complete one of the approved policy practicum courses.',
        },
        {
          id: 'cap-project',
          label: 'Option D: Capstone Project',
          type: 'pick-one',
          optional: true,
          options: [
            { dept: 'POLISCI', number: '290A', name: 'Capstone Project - Autumn' },
            { dept: 'POLISCI', number: '290B', name: 'Capstone Project - Winter' },
            { dept: 'POLISCI', number: '290C', name: 'Capstone Project - Spring' },
          ],
          note: 'Enroll in the quarter that works for your timeline.',
        },
      ],
    },

    // ── Writing in the Major (WIM) ─────────────────────────────────────────────
    {
      id: 'wim',
      name: 'Writing in the Major (WIM)',
      minCourses: 1,
      note: 'WIM course must be taken for 5 units. All designated WIM courses are 5-unit POLISCI seminars.',
      slots: [
        {
          id: 'wim-course',
          label: 'WIM Course (5 units)',
          type: 'pick-one',
          options: [
            { dept: 'POLISCI', number: '103', name: 'Justice' },
            { dept: 'POLISCI', number: '110C', name: 'America and the World Economy' },
            { dept: 'POLISCI', number: '110D', name: 'War and Peace in American Foreign Policy' },
            { dept: 'POLISCI', number: '120C', name: 'American Political Institutions in Uncertain Times' },
            { dept: 'POLISCI', number: '121', name: 'Political Power in American Cities' },
            { dept: 'POLISCI', number: '148', name: 'Chinese Politics' },
            { dept: 'POLISCI', number: '236S', name: 'Philanthropy for Sustainable Development' },
            { dept: 'POLISCI', number: '290A', name: 'Capstone Project - Autumn' },
            { dept: 'POLISCI', number: '290B', name: 'Capstone Project - Winter' },
            { dept: 'POLISCI', number: '290C', name: 'Capstone Project - Spring' },
            { dept: 'POLISCI', number: '293', name: 'Democracy in the Balance: Polarization and the Road Ahead' },
            { dept: 'POLISCI', number: '299A', name: 'Research Design' },
          ],
        },
      ],
    },
  ],

  wimCourses: [
    { dept: 'POLISCI', number: '103', name: 'Justice' },
    { dept: 'POLISCI', number: '110C', name: 'America and the World Economy' },
    { dept: 'POLISCI', number: '110D', name: 'War and Peace in American Foreign Policy' },
    { dept: 'POLISCI', number: '120C', name: 'American Political Institutions in Uncertain Times' },
    { dept: 'POLISCI', number: '121', name: 'Political Power in American Cities' },
    { dept: 'POLISCI', number: '148', name: 'Chinese Politics' },
    { dept: 'POLISCI', number: '236S', name: 'Philanthropy for Sustainable Development' },
    { dept: 'POLISCI', number: '290A', name: 'Capstone Project - Autumn' },
    { dept: 'POLISCI', number: '290B', name: 'Capstone Project - Winter' },
    { dept: 'POLISCI', number: '290C', name: 'Capstone Project - Spring' },
    { dept: 'POLISCI', number: '293', name: 'Democracy in the Balance: Polarization and the Road Ahead' },
    { dept: 'POLISCI', number: '299A', name: 'Research Design' },
  ],
};
