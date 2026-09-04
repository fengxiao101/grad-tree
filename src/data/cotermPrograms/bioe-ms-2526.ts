// Bioengineering MS (Coterm), 2025-26
// Source: https://bulletin.stanford.edu/programs/BIOE-MS/
// totalMinUnits: 45
// Lab (≥2, ≥4u) + Quantitative (≥2, ≥6u) + Bio/Tech Electives (≥3, ≥18u) +
// Core Seminars (2 required, 2u) + Additional BioE 200+ (≥3 lecture, ≥9u) +
// Unrestricted Electives (≥6u, 100+)
// Min GPA 3.0. Max 6u directed study/research/teaching practicum across entire program.

import type { MajorConfig } from '../majorSchema';

const BIOE_TECH_ELECTIVES = [
  // AA
  { dept: 'AA', number: '203' }, { dept: 'AA', number: '212' },
  { dept: 'AA', number: '222' }, { dept: 'AA', number: '273' },
  // APPPHYS
  { dept: 'APPPHYS', number: '229' },
  // BIO
  { dept: 'BIO', number: '200' }, { dept: 'BIO', number: '204' },
  { dept: 'BIO', number: '214' }, { dept: 'BIO', number: '220' },
  { dept: 'BIO', number: '229' }, { dept: 'BIO', number: '230' },
  { dept: 'BIO', number: '239' }, { dept: 'BIO', number: '255' },
  { dept: 'BIO', number: '265' }, { dept: 'BIO', number: '273A' },
  { dept: 'BIO', number: '273B' }, { dept: 'BIO', number: '274S' },
  // BIOE
  { dept: 'BIOE', number: '131' }, { dept: 'BIOE', number: '204' },
  { dept: 'BIOE', number: '206' }, { dept: 'BIOE', number: '209' },
  { dept: 'BIOE', number: '210' }, { dept: 'BIOE', number: '212' },
  { dept: 'BIOE', number: '213' }, { dept: 'BIOE', number: '214' },
  { dept: 'BIOE', number: '217' }, { dept: 'BIOE', number: '219' },
  { dept: 'BIOE', number: '220' }, { dept: 'BIOE', number: '221' },
  { dept: 'BIOE', number: '221G' }, { dept: 'BIOE', number: '222' },
  { dept: 'BIOE', number: '224' }, { dept: 'BIOE', number: '225' },
  { dept: 'BIOE', number: '226' }, { dept: 'BIOE', number: '227' },
  { dept: 'BIOE', number: '230' }, { dept: 'BIOE', number: '232' },
  { dept: 'BIOE', number: '235' }, { dept: 'BIOE', number: '236' },
  { dept: 'BIOE', number: '240' }, { dept: 'BIOE', number: '241' },
  { dept: 'BIOE', number: '244' }, { dept: 'BIOE', number: '250' },
  { dept: 'BIOE', number: '256' }, { dept: 'BIOE', number: '260' },
  { dept: 'BIOE', number: '261' }, { dept: 'BIOE', number: '266' },
  { dept: 'BIOE', number: '269' }, { dept: 'BIOE', number: '271' },
  { dept: 'BIOE', number: '279' }, { dept: 'BIOE', number: '281' },
  { dept: 'BIOE', number: '282' }, { dept: 'BIOE', number: '283' },
  { dept: 'BIOE', number: '285' }, { dept: 'BIOE', number: '291' },
  { dept: 'BIOE', number: '300A' }, { dept: 'BIOE', number: '300B' },
  { dept: 'BIOE', number: '301A' }, { dept: 'BIOE', number: '301B' },
  { dept: 'BIOE', number: '301C' }, { dept: 'BIOE', number: '301D' },
  { dept: 'BIOE', number: '301E' }, { dept: 'BIOE', number: '301P' },
  { dept: 'BIOE', number: '305' }, { dept: 'BIOE', number: '311' },
  { dept: 'BIOE', number: '313' }, { dept: 'BIOE', number: '320' },
  { dept: 'BIOE', number: '331' }, { dept: 'BIOE', number: '335' },
  { dept: 'BIOE', number: '337' }, { dept: 'BIOE', number: '355' },
  { dept: 'BIOE', number: '361' }, { dept: 'BIOE', number: '371' },
  { dept: 'BIOE', number: '374A' }, { dept: 'BIOE', number: '374B' },
  { dept: 'BIOE', number: '375' }, { dept: 'BIOE', number: '376' },
  { dept: 'BIOE', number: '377' }, { dept: 'BIOE', number: '381' },
  { dept: 'BIOE', number: '385' }, { dept: 'BIOE', number: '391' },
  { dept: 'BIOE', number: '450' }, { dept: 'BIOE', number: '454' },
  { dept: 'BIOE', number: '485' },
  // BIOMEDIN
  { dept: 'BIOMEDIN', number: '202' }, { dept: 'BIOMEDIN', number: '221' },
  // BMDS
  { dept: 'BMDS', number: '205' }, { dept: 'BMDS', number: '210' },
  { dept: 'BMDS', number: '222' }, { dept: 'BMDS', number: '224' },
  { dept: 'BMDS', number: '274' },
  // BIOS
  { dept: 'BIOS', number: '202' }, { dept: 'BIOS', number: '221' },
  { dept: 'BIOS', number: '249' }, { dept: 'BIOS', number: '253' },
  // BMP
  { dept: 'BMP', number: '211' },
  // CBIO
  { dept: 'CBIO', number: '243' }, { dept: 'CBIO', number: '275' },
  // CEE
  { dept: 'CEE', number: '177E' }, { dept: 'CEE', number: '271B' },
  // CHEM
  { dept: 'CHEM', number: '225' }, { dept: 'CHEM', number: '261' },
  { dept: 'CHEM', number: '263' }, { dept: 'CHEM', number: '271' },
  { dept: 'CHEM', number: '277' }, { dept: 'CHEM', number: '281' },
  { dept: 'CHEM', number: '283' },
  // CHEMENG
  { dept: 'CHEMENG', number: '281' }, { dept: 'CHEMENG', number: '340' },
  { dept: 'CHEMENG', number: '470' },
  // CME
  { dept: 'CME', number: '200' }, { dept: 'CME', number: '204' },
  { dept: 'CME', number: '206' }, { dept: 'CME', number: '211' },
  { dept: 'CME', number: '217' }, { dept: 'CME', number: '298' },
  { dept: 'CME', number: '302' }, { dept: 'CME', number: '303' },
  { dept: 'CME', number: '306' },
  // CS
  { dept: 'CS', number: '106A' }, { dept: 'CS', number: '106B' },
  { dept: 'CS', number: '109' }, { dept: 'CS', number: '152' },
  { dept: 'CS', number: '161' }, { dept: 'CS', number: '173A' },
  { dept: 'CS', number: '182' }, { dept: 'CS', number: '184' },
  { dept: 'CS', number: '205L' }, { dept: 'CS', number: '221' },
  { dept: 'CS', number: '223A' }, { dept: 'CS', number: '224N' },
  { dept: 'CS', number: '224R' }, { dept: 'CS', number: '224W' },
  { dept: 'CS', number: '227A' }, { dept: 'CS', number: '228' },
  { dept: 'CS', number: '229' }, { dept: 'CS', number: '230' },
  { dept: 'CS', number: '231A' }, { dept: 'CS', number: '231N' },
  { dept: 'CS', number: '235' }, { dept: 'CS', number: '237A' },
  { dept: 'CS', number: '238' }, { dept: 'CS', number: '246' },
  { dept: 'CS', number: '248A' }, { dept: 'CS', number: '265' },
  { dept: 'CS', number: '271' }, { dept: 'CS', number: '273B' },
  { dept: 'CS', number: '278' }, { dept: 'CS', number: '281' },
  { dept: 'CS', number: '324' }, { dept: 'CS', number: '336' },
  { dept: 'CS', number: '348A' }, { dept: 'CS', number: '348C' },
  { dept: 'CS', number: '372' }, { dept: 'CS', number: '375' },
  { dept: 'CS', number: '468' },
  // CSB
  { dept: 'CSB', number: '210' }, { dept: 'CSB', number: '240A' },
  { dept: 'CSB', number: '240B' },
  // DATASCI
  { dept: 'DATASCI', number: '294B' },
  // DBIO
  { dept: 'DBIO', number: '201' }, { dept: 'DBIO', number: '210' },
  // DESINST
  { dept: 'DESINST', number: '215' },
  // EARTHSYS
  { dept: 'EARTHSYS', number: '213' }, { dept: 'EARTHSYS', number: '217' },
  { dept: 'EARTHSYS', number: '223' }, { dept: 'EARTHSYS', number: '233' },
  { dept: 'EARTHSYS', number: '255' }, { dept: 'EARTHSYS', number: '256' },
  { dept: 'EARTHSYS', number: '258' },
  // EBS
  { dept: 'EBS', number: '332' },
  // EE
  { dept: 'EE', number: '225' }, { dept: 'EE', number: '236A' },
  { dept: 'EE', number: '261' }, { dept: 'EE', number: '268' },
  { dept: 'EE', number: '269' }, { dept: 'EE', number: '276' },
  { dept: 'EE', number: '355' }, { dept: 'EE', number: '364A' },
  { dept: 'EE', number: '364B' }, { dept: 'EE', number: '367' },
  { dept: 'EE', number: '368' }, { dept: 'EE', number: '369A' },
  { dept: 'EE', number: '369B' }, { dept: 'EE', number: '369C' },
  { dept: 'EE', number: '469B' },
  // ENERGY
  { dept: 'ENERGY', number: '263' },
  // EPI
  { dept: 'EPI', number: '231' },
  // GENE
  { dept: 'GENE', number: '211' }, { dept: 'GENE', number: '231' },
  { dept: 'GENE', number: '242' }, { dept: 'GENE', number: '245' },
  // IMMUNOL
  { dept: 'IMMUNOL', number: '201' }, { dept: 'IMMUNOL', number: '205' },
  { dept: 'IMMUNOL', number: '206' }, { dept: 'IMMUNOL', number: '207' },
  // MATSCI
  { dept: 'MATSCI', number: '210' }, { dept: 'MATSCI', number: '303' },
  { dept: 'MATSCI', number: '380' }, { dept: 'MATSCI', number: '384' },
  // MCP
  { dept: 'MCP', number: '222' }, { dept: 'MCP', number: '256' },
  // ME
  { dept: 'ME', number: '203' }, { dept: 'ME', number: '206A' },
  { dept: 'ME', number: '218A' }, { dept: 'ME', number: '218B' },
  { dept: 'ME', number: '218C' }, { dept: 'ME', number: '220' },
  { dept: 'ME', number: '223' }, { dept: 'ME', number: '224' },
  { dept: 'ME', number: '234' }, { dept: 'ME', number: '280' },
  { dept: 'ME', number: '287' }, { dept: 'ME', number: '303' },
  { dept: 'ME', number: '309' }, { dept: 'ME', number: '310A' },
  { dept: 'ME', number: '318' }, { dept: 'ME', number: '331A' },
  { dept: 'ME', number: '331B' }, { dept: 'ME', number: '335A' },
  { dept: 'ME', number: '335B' }, { dept: 'ME', number: '351A' },
  { dept: 'ME', number: '354' }, { dept: 'ME', number: '387' },
  { dept: 'ME', number: '470' },
  // MS&E
  { dept: 'MS&E', number: '328' },
  // NBIO
  { dept: 'NBIO', number: '206' }, { dept: 'NBIO', number: '227' },
  { dept: 'NBIO', number: '254' },
  // OPHT
  { dept: 'OPHT', number: '207' },
  // PHYSICS
  { dept: 'PHYSICS', number: '212' }, { dept: 'PHYSICS', number: '230' },
  { dept: 'PHYSICS', number: '231' },
  // PSYCH
  { dept: 'PSYCH', number: '204A' }, { dept: 'PSYCH', number: '242' },
  { dept: 'PSYCH', number: '254A' },
  // RAD
  { dept: 'RAD', number: '229' },
  // STATS
  { dept: 'STATS', number: '200' }, { dept: 'STATS', number: '202' },
  { dept: 'STATS', number: '203' }, { dept: 'STATS', number: '207' },
  { dept: 'STATS', number: '215' }, { dept: 'STATS', number: '216' },
  { dept: 'STATS', number: '217' }, { dept: 'STATS', number: '220' },
  { dept: 'STATS', number: '262' }, { dept: 'STATS', number: '305A' },
  { dept: 'STATS', number: '305B' }, { dept: 'STATS', number: '326' },
  // STEMREM
  { dept: 'STEMREM', number: '201A' },
];

export const BIOE_MS_2526: MajorConfig = {
  id: 'bioe-ms-2526',
  name: 'Bioengineering MS (Coterm)',
  school: 'School of Engineering',
  year: '2025-26',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/BIOE-MS/',
  category: 'coterm',
  totalMinUnits: 45,
  sections: [
    {
      id: 'core-seminars',
      name: 'Core Seminar Courses (both required, 2 units)',
      slots: [
        {
          id: 'seminar-bioe393',
          label: 'BIOE 393',
          type: 'required',
          options: [{ dept: 'BIOE', number: '393' }],
        },
        {
          id: 'seminar-med255',
          label: 'MED 255',
          type: 'required',
          options: [{ dept: 'MED', number: '255' }],
        },
      ],
    },
    {
      id: 'lab-courses',
      name: 'Lab Courses (≥2 courses, ≥4 units)',
      slots: [
        {
          id: 'lab-slot',
          label: 'Lab Course',
          type: 'pick-from-list',
          count: 2,
          options: [
            { dept: 'BIOE', number: '232' }, { dept: 'BIOE', number: '261' },
            { dept: 'BIOE', number: '301A' }, { dept: 'BIOE', number: '301B' },
            { dept: 'BIOE', number: '301C' }, { dept: 'BIOE', number: '301D' },
            { dept: 'BIOE', number: '301E' }, { dept: 'BIOE', number: '301P' },
          ],
        },
      ],
    },
    {
      id: 'quantitative-courses',
      name: 'Quantitative Courses (≥2 courses, ≥6 units)',
      slots: [
        {
          id: 'quant-slot',
          label: 'Quantitative Course',
          type: 'pick-from-list',
          count: 2,
          options: [
            { dept: 'BIOE', number: '209' }, { dept: 'BIOE', number: '210' },
            { dept: 'BIOE', number: '230' }, { dept: 'BIOE', number: '300B' },
            { dept: 'CME', number: '200' }, { dept: 'CME', number: '204' },
            { dept: 'CME', number: '206' }, { dept: 'CME', number: '263' },
            { dept: 'CME', number: '302' }, { dept: 'CME', number: '306' },
            { dept: 'CME', number: '322' },
            { dept: 'CS', number: '205L' }, { dept: 'CS', number: '228' },
            { dept: 'EE', number: '261' }, { dept: 'EE', number: '278' },
            { dept: 'EE', number: '364A' }, { dept: 'EE', number: '364B' },
            { dept: 'ME', number: '470' },
          ],
        },
      ],
    },
    {
      id: 'bio-tech-electives',
      name: 'Biology or Technical Electives (≥3 courses, ≥18 units)',
      note: 'All BIOE 200+ lecture and lab courses qualify. One may be an ethics course (BIOE131, CS152, CS182, CS184, CS278, CS281). Up to 6 units total may be BIOE391/392 (directed research or teaching practicum). BIOE296 also qualifies.',
      slots: [
        {
          id: 'bio-tech-slot',
          label: 'Biology or Technical Elective',
          type: 'pick-from-list',
          count: 3,
          options: BIOE_TECH_ELECTIVES,
        },
      ],
    },
    {
      id: 'additional-bioe',
      name: 'Additional BioE 200+ Lecture Courses (≥3 courses, ≥9 units)',
      note: 'Three additional BIOE 200+ lecture courses (not seminars, not research units). May overlap with Biology/Technical Electives list above.',
      slots: [
        {
          id: 'additional-bioe-slot',
          label: 'Additional BIOE 200+ Lecture Course',
          type: 'any-approved',
          options: [],
          count: 3,
          minLevel: 200,
        },
      ],
    },
    {
      id: 'unrestricted-electives',
      name: 'Unrestricted Electives (≥6 units, 100+)',
      note: 'Any Stanford course at 100-level or above. Max 6 units of directed study, research, or teaching practicum across the entire program.',
      slots: [
        {
          id: 'unrestricted-slot',
          label: 'Unrestricted Elective (100+)',
          type: 'any-approved',
          options: [],
          count: 2,
          minLevel: 100,
        },
      ],
    },
  ],
};
