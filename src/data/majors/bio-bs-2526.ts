// Biology BS: School of Humanities & Sciences, 2025–2026
// Source: https://bulletin.stanford.edu/programs/BIO-BS/
// totalMinUnits: 89
// 7 subplans (tracks); choose ONE.
// WIM: one of BIO 47, 127, 168, 196A, 199A, 199W
// Capstone: Honors (BIO 199+199W) OR Independent (199A+199B) OR approved out-of-dept.
// CHEM 31E substitutes for CHEM 31A+31B in all subplans.
// AP credit may satisfy Math, Physics, Chemistry, Statistics per subplan.
// BIO 199/199X/199A/199B: max 7 units count toward electives.
// Honors: BIO 199W may double-count for WIM, electives, and honors simultaneously.

import type { MajorConfig } from '../majorSchema';
import type { CourseOption } from '../majorSchema';

// ── Shared physics sequence groups ────────────────────────────────────────────

const PHYSICS_20_SLOTS = (prefix: string) => [
  { id: `${prefix}-p21`, label: 'PHYSICS 21: Mechanics and Fluids', type: 'required' as const, options: [{ dept: 'PHYSICS', number: '21' }] },
  { id: `${prefix}-p22`, label: 'PHYSICS 22: Mechanics, Fluids, and Heat Lab', type: 'required' as const, options: [{ dept: 'PHYSICS', number: '22' }] },
  { id: `${prefix}-p23`, label: 'PHYSICS 23: Electricity, Magnetism, and Optics', type: 'required' as const, options: [{ dept: 'PHYSICS', number: '23' }] },
  { id: `${prefix}-p24`, label: 'PHYSICS 24: E&M and Optics Laboratory', type: 'required' as const, options: [{ dept: 'PHYSICS', number: '24' }] },
];

const PHYSICS_40_SLOTS = (prefix: string) => [
  { id: `${prefix}-p41`, label: 'PHYSICS 41: Mechanics', type: 'required' as const, options: [{ dept: 'PHYSICS', number: '41' }] },
  { id: `${prefix}-p43`, label: 'PHYSICS 43: Electricity and Magnetism', type: 'required' as const, options: [{ dept: 'PHYSICS', number: '43' }] },
  { id: `${prefix}-p45`, label: 'PHYSICS 45: Light and Heat', type: 'required' as const, options: [{ dept: 'PHYSICS', number: '45' }] },
];

const PHYSICS_4020_SLOTS = (prefix: string) => [
  { id: `${prefix}-m41`, label: 'PHYSICS 41: Mechanics', type: 'required' as const, options: [{ dept: 'PHYSICS', number: '41' }] },
  { id: `${prefix}-m23`, label: 'PHYSICS 23: Electricity, Magnetism, and Optics', type: 'required' as const, options: [{ dept: 'PHYSICS', number: '23' }] },
  { id: `${prefix}-m24`, label: 'PHYSICS 24: E&M and Optics Laboratory', type: 'required' as const, options: [{ dept: 'PHYSICS', number: '24' }] },
];

// ── Out-of-department elective options (shared across all subplans) ────────────

const OUT_OF_DEPT_OPTIONS: CourseOption[] = [
  { dept: 'BIOC', number: '241' }, { dept: 'BMDS', number: '202' }, { dept: 'BMDS', number: '221' },
  { dept: 'BMDS', number: '273' }, { dept: 'BIOE', number: '101' }, { dept: 'BIOE', number: '103' },
  { dept: 'BIOE', number: '214' }, { dept: 'BIOE', number: '217' }, { dept: 'BIOE', number: '220' },
  { dept: 'BIOE', number: '231' }, { dept: 'BIOE', number: '279' }, { dept: 'BIOE', number: '450' },
  { dept: 'BMDS', number: '173A' }, { dept: 'BMDS', number: '210' }, { dept: 'CBIO', number: '101' },
  { dept: 'CBIO', number: '240' }, { dept: 'CEE', number: '161I' }, { dept: 'CEE', number: '177' },
  { dept: 'CEE', number: '274D' }, { dept: 'CHEM', number: '141' }, { dept: 'CHEM', number: '143' },
  { dept: 'CHEM', number: '171' }, { dept: 'CHEM', number: '183' }, { dept: 'CHEM', number: '184' },
  { dept: 'CHEM', number: '185' }, { dept: 'CHEM', number: '283' }, { dept: 'CHEMENG', number: '110A' },
  { dept: 'CS', number: '106A' }, { dept: 'CS', number: '106B' }, { dept: 'CS', number: '107' },
  { dept: 'CS', number: '109' }, { dept: 'DBIO', number: '210' }, { dept: 'EARTHSYS', number: '114' },
  { dept: 'EARTHSYS', number: '123A' }, { dept: 'EARTHSYS', number: '141' }, { dept: 'EARTHSYS', number: '142' },
  { dept: 'EARTHSYS', number: '144' }, { dept: 'EARTHSYS', number: '146B' }, { dept: 'EARTHSYS', number: '151' },
  { dept: 'EARTHSYS', number: '152' }, { dept: 'EARTHSYS', number: '155' }, { dept: 'EARTHSYS', number: '158' },
  { dept: 'EARTHSYS', number: '240' }, { dept: 'EPS', number: '139' }, { dept: 'GENE', number: '202' },
  { dept: 'GENE', number: '211' }, { dept: 'GENE', number: '235' }, { dept: 'HUMBIO', number: '113' },
  { dept: 'HUMBIO', number: '130' }, { dept: 'HUMBIO', number: '131' }, { dept: 'HUMBIO', number: '134' },
  { dept: 'HUMBIO', number: '135' }, { dept: 'HUMBIO', number: '154C' }, { dept: 'IMMUNOL', number: '201' },
  { dept: 'IMMUNOL', number: '202' }, { dept: 'IMMUNOL', number: '205' }, { dept: 'IMMUNOL', number: '206' },
  { dept: 'IMMUNOL', number: '209' }, { dept: 'MCP', number: '156' }, { dept: 'OCEANS', number: '173H' },
  { dept: 'OSPAUSTL', number: '10' }, { dept: 'OSPAUSTL', number: '28' }, { dept: 'OSPAUSTL', number: '32' },
  { dept: 'OSPSANTG', number: '85' }, { dept: 'PSYC', number: '124' }, { dept: 'PSYCH', number: '202' },
  { dept: 'PSYCH', number: '221' }, { dept: 'STATS', number: '191' }, { dept: 'STATS', number: '200' },
  { dept: 'STATS', number: '202' }, { dept: 'SURG', number: '101' }, { dept: 'SUSTAIN', number: '103' },
];

// ── Elective menu lists ────────────────────────────────────────────────────────

const BB_MENU1: CourseOption[] = [
  { dept: 'BIO', number: '126' }, { dept: 'BIO', number: '132' }, { dept: 'BIO', number: '152' },
  { dept: 'BIO', number: '153' }, { dept: 'BIO', number: '163' }, { dept: 'BIO', number: '165' },
  { dept: 'BIO', number: '173' }, { dept: 'BIO', number: '188' }, { dept: 'BIO', number: '211' },
  { dept: 'BIO', number: '214' }, { dept: 'BIOE', number: '231' }, { dept: 'BMDS', number: '224' },
  { dept: 'CHEM', number: '181' }, { dept: 'CHEM', number: '183' }, { dept: 'CHEM', number: '184' },
  { dept: 'CHEM', number: '185' }, { dept: 'CHEM', number: '283' }, { dept: 'CS', number: '279' },
  { dept: 'CSB', number: '250' }, { dept: 'EE', number: '236A' }, { dept: 'MCP', number: '256' },
  { dept: 'STATS', number: '191' },
];

const CMO_MENU1: CourseOption[] = [
  { dept: 'BIO', number: '173' }, { dept: 'BIO', number: '126' }, { dept: 'BIO', number: '132' },
  { dept: 'CHEM', number: '141' }, { dept: 'CHEM', number: '143' }, { dept: 'CBIO', number: '101' },
  { dept: 'BIO', number: '188' }, { dept: 'BIOE', number: '101' }, { dept: 'BIO', number: '165' },
  { dept: 'BIO', number: '119' }, { dept: 'BIO', number: '139' }, { dept: 'BIO', number: '160' },
  { dept: 'BIO', number: '162' }, { dept: 'BIO', number: '168' }, { dept: 'BIO', number: '127' },
  { dept: 'BIO', number: '111' }, { dept: 'BIO', number: '178' }, { dept: 'BIO', number: '102' },
  { dept: 'BIO', number: '149' }, { dept: 'BIO', number: '151' }, { dept: 'BIO', number: '154' },
  { dept: 'BIO', number: '155' }, { dept: 'BIO', number: '112' }, { dept: 'BIO', number: '145' },
  { dept: 'BIO', number: '161' }, { dept: 'CHEM', number: '283' }, { dept: 'BIO', number: '153' },
  { dept: 'BIO', number: '163' }, { dept: 'BIO', number: '146' }, { dept: 'BIO', number: '124' },
  { dept: 'BIO', number: '120' },
];

const CSB_MENU1: CourseOption[] = [
  { dept: 'BIO', number: '113' }, { dept: 'BIO', number: '126' }, { dept: 'BIO', number: '127' },
  { dept: 'BIO', number: '165' }, { dept: 'BIO', number: '176' }, { dept: 'BIO', number: '182' },
  { dept: 'BIO', number: '187' }, { dept: 'BIO', number: '188' }, { dept: 'BIO', number: '251' },
  { dept: 'BIO', number: '294' }, { dept: 'BIO', number: '287A' }, { dept: 'BIOE', number: '101' },
  { dept: 'BMDS', number: '215' }, { dept: 'CS', number: '270' }, { dept: 'CS', number: '273B' },
  { dept: 'CS', number: '274' }, { dept: 'CS', number: '275' }, { dept: 'CS', number: '279' },
  { dept: 'CS', number: '371' }, { dept: 'CBIO', number: '243' }, { dept: 'GENE', number: '211' },
  { dept: 'EARTHSYS', number: '114' }, { dept: 'IMMUNOL', number: '206' }, { dept: 'IMMUNOL', number: '207' },
  { dept: 'BIO', number: '163' }, { dept: 'BIOE', number: '222' },
];

const EEE_MENU1: CourseOption[] = [
  { dept: 'BIO', number: '35' }, { dept: 'BIO', number: '105A' }, { dept: 'BIO', number: '105B' },
  { dept: 'BIO', number: '113' }, { dept: 'BIO', number: '114A' }, { dept: 'BIO', number: '114B' },
  { dept: 'BIO', number: '115' }, { dept: 'BIO', number: '119' }, { dept: 'BIO', number: '121' },
  { dept: 'BIO', number: '123' }, { dept: 'BIO', number: '125' }, { dept: 'BIO', number: '127' },
  { dept: 'BIO', number: '136' }, { dept: 'BIO', number: '137' }, { dept: 'BIO', number: '140' },
  { dept: 'BIO', number: '141' }, { dept: 'BIO', number: '144' }, { dept: 'BIO', number: '148' },
  { dept: 'BIO', number: '162H' }, { dept: 'BIO', number: '165' }, { dept: 'BIO', number: '169' },
  { dept: 'BIO', number: '173H' }, { dept: 'BIO', number: '176' }, { dept: 'BIO', number: '179' },
  { dept: 'BIO', number: '182' }, { dept: 'BIO', number: '183' }, { dept: 'BIO', number: '185' },
  { dept: 'BIO', number: '187' }, { dept: 'BIO', number: '201' }, { dept: 'BIO', number: '223' },
  { dept: 'BIO', number: '251' }, { dept: 'BIO', number: '273A' }, { dept: 'BMDS', number: '173A' },
  { dept: 'EARTHSYS', number: '151' }, { dept: 'EARTHSYS', number: '155' }, { dept: 'EARTHSYS', number: '185' },
  { dept: 'EARTHSYS', number: '205A' }, { dept: 'EPS', number: '161' }, { dept: 'HUMBIO', number: '113' },
  { dept: 'HUMBIO', number: '114' }, { dept: 'OCEANS', number: '125H' },
];

const MICRO_MENU1: CourseOption[] = [
  { dept: 'BIO', number: '111' }, { dept: 'BIO', number: '115' }, { dept: 'BIO', number: '120' },
  { dept: 'BIO', number: '165' }, { dept: 'BIO', number: '178' }, { dept: 'BIO', number: '188' },
  { dept: 'BIO', number: '201' }, { dept: 'BIO', number: '230' }, { dept: 'BIO', number: '273A' },
  { dept: 'EARTHSYS', number: '114' }, { dept: 'GENE', number: '242' }, { dept: 'IMMUNOL', number: '201' },
  { dept: 'MI', number: '210' }, { dept: 'BIO', number: '127' }, { dept: 'BIO', number: '172' },
  { dept: 'IMMUNOL', number: '205' }, { dept: 'IMMUNOL', number: '209' }, { dept: 'IMMUNOL', number: '223' },
  { dept: 'BIO', number: '190' },
];

const NEURO_MENU1: CourseOption[] = [
  { dept: 'BIO', number: '126' }, { dept: 'BIO', number: '132' }, { dept: 'BIO', number: '145' },
  { dept: 'BIO', number: '149' }, { dept: 'BIO', number: '150' }, { dept: 'BIO', number: '151' },
  { dept: 'BIO', number: '157' }, { dept: 'BIO', number: '160' }, { dept: 'BIO', number: '161' },
  { dept: 'BIO', number: '204' }, { dept: 'BIO', number: '211' }, { dept: 'BIO', number: '222' },
  { dept: 'PSYCH', number: '169' }, { dept: 'PSYCH', number: '202' }, { dept: 'BIO', number: '154' },
  { dept: 'PSYC', number: '121' }, { dept: 'PSYC', number: '124' }, { dept: 'PSYC', number: '135' },
  { dept: 'PSYC', number: '152' },
];

export const BIO_BS_2526: MajorConfig = {
  id: 'bio-bs-2526',
  name: 'Biology (BS)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/BIO-BS/',
  category: 'major',
  totalMinUnits: 89,
  sections: [
    // ── Subplan selector ──────────────────────────────────────────────────────
    {
      id: 'bio-subplan-selector',
      name: 'Subplan (choose 1 of 7)',
      trackSelector: true,
      note: 'All Biology BS students must declare one subplan. Each subplan has its own BioFoundations, lab, STEM, and elective requirements.',
      slots: [],
    },

    // ── Capstone (universal: choose 1) ───────────────────────────────────────
    {
      id: 'capstone',
      name: 'Capstone Experience (choose 1)',
      slots: [],
      pickOneGroup: [
        {
          id: 'cap-honors',
          name: 'Option 1: Honors Program',
          note: 'Min 3.0 GPA in all major requirements (excluding BIO 198, 198X, 199, 199X, 290, 291, 296). Complete ≥10 units BIO 199 or 199X in the SAME lab (junior/senior year only; 7 of 10 may double-count toward electives) + 3 units BIO 199W (counts for WIM and electives). Submit honors proposal during winter quarter of junior year. Present at Achauer Undergraduate Biology Honors Symposium. Submit thesis approved by 2 Academic Council members (≥1 from Biology faculty).',
          slots: [
            { id: 'cap-honors-199', label: 'BIO 199 or 199X: Research (≥10 units)', type: 'pick-one',
              minUnits: 10,
              options: [
                { dept: 'BIO', number: '199', name: 'Undergraduate Research' },
                { dept: 'BIO', number: '199X', name: 'Out-of-Department Undergraduate Research' },
              ] },
            { id: 'cap-honors-199w', label: 'BIO 199W: Senior Honors Thesis (WIM)', type: 'required',
              options: [{ dept: 'BIO', number: '199W', name: 'Senior Honors Thesis (WIM)' }] },
          ],
        },
        {
          id: 'cap-independent',
          name: 'Option 2: Independent Capstone',
          note: 'BIO 199A (3 units: Cohort A spring junior year OR Cohort B winter senior year) + BIO 199B (3 units: Cohort A fall senior year OR Cohort B spring senior year). Projects may include creative works, research or business internships, travel-based study, teaching, or community service. No preliminary materials required: proposal developed during BIO 199A.',
          slots: [
            { id: 'cap-ind-199a', label: 'BIO 199A: Independent Capstone Part A', type: 'required',
              options: [{ dept: 'BIO', number: '199A', name: 'The Independent Capstone in Biology' }] },
            { id: 'cap-ind-199b', label: 'BIO 199B: Independent Capstone Part B', type: 'required',
              options: [{ dept: 'BIO', number: '199B', name: 'The Independent Capstone in Biology' }] },
          ],
        },
        {
          id: 'cap-outdept',
          name: 'Option 4: Approved Out-of-Department Capstone',
          note: 'Options: (1) Notation in Science Communication (NSC): notationsc@stanford.edu; (2) Science, Technology, and Society Honors Program: kyokos@stanford.edu; (3) Interdisciplinary Honors in the Arts: artsinstitute@stanford.edu; (4) Undergraduate Honors in Education: aykelman@stanford.edu. Student is responsible for fulfilling all program requirements and deadlines.',
          slots: [
            { id: 'cap-outdept-course', label: 'Approved Out-of-Department Capstone', type: 'any-approved', options: [] },
          ],
        },
      ],
    },

    // ── WIM (universal across all subplans) ───────────────────────────────────
    {
      id: 'wim',
      name: 'Writing in the Major (WIM)',
      minCourses: 1,
      slots: [
        {
          id: 'wim-course',
          label: 'WIM Course',
          type: 'pick-one',
          options: [
            { dept: 'BIO', number: '47', name: 'Introduction to Research in Ecology and Evolutionary Biology' },
            { dept: 'BIO', number: '127', name: 'Genomic approaches to the study of human disease' },
            { dept: 'BIO', number: '168', name: 'Explorations in Stem Cell Biology' },
            { dept: 'BIO', number: '196A', name: 'Biology Senior Reflection' },
            { dept: 'BIO', number: '199A', name: 'The Independent Capstone in Biology' },
            { dept: 'BIO', number: '199W', name: 'Senior Honors Thesis (also counts for honors)' },
          ],
        },
      ],
    },
  ],

  tracks: [
    // ── GENERAL BIOLOGY ───────────────────────────────────────────────────────
    {
      id: 'general',
      name: 'General Biology',
      sections: [
        {
          id: 'gen-biofound',
          name: 'BioFoundations (≥4 of 6 courses)',
          minCourses: 4,
          slots: [
            {
              id: 'gen-bf',
              label: 'BioFoundations Courses',
              type: 'pick-from-list',
              count: 4,
              options: [
                { dept: 'BIO', number: '81', name: 'Introduction to Ecology' },
                { dept: 'BIO', number: '82', name: 'Genetics' },
                { dept: 'BIO', number: '83', name: 'Biochemistry & Molecular Biology' },
                { dept: 'BIO', number: '84', name: 'Physiology' },
                { dept: 'BIO', number: '85', name: 'Evolution' },
                { dept: 'BIO', number: '86', name: 'Cell Biology' },
              ],
            },
          ],
        },
        {
          id: 'gen-lab',
          name: 'Foundational Laboratory',
          note: 'Complete one molecular/cell lab (BIO 43 or BIO 45) AND BIO 47. BIO 47 satisfies the WIM requirement.',
          slots: [
            { id: 'gen-lab-mol', label: 'BIO 43 or BIO 45 (Cell/Molecular Lab)', type: 'pick-one',
              options: [
                { dept: 'BIO', number: '43', name: 'Introduction to Laboratory Research in Neuronal Cell Biology' },
                { dept: 'BIO', number: '45', name: 'Introduction to Laboratory Research in Cell and Molecular Biology' },
              ] },
            { id: 'gen-lab-47', label: 'BIO 47: Research in Ecology and Evolutionary Biology (WIM)', type: 'required',
              options: [{ dept: 'BIO', number: '47', name: 'Introduction to Research in Ecology and Evolutionary Biology (WIM)' }] },
          ],
        },
        {
          id: 'gen-math',
          name: 'Mathematics (choose one sequence)',
          slots: [],
          pickOneGroup: [
            {
              id: 'gen-math-seq',
              name: 'MATH 19 + 20 + 21 (Calculus series)',
              slots: [
                { id: 'gen-m19', label: 'MATH 19: Calculus', type: 'required', options: [{ dept: 'MATH', number: '19' }] },
                { id: 'gen-m20', label: 'MATH 20: Calculus', type: 'required', options: [{ dept: 'MATH', number: '20' }] },
                { id: 'gen-m21', label: 'MATH 21: Calculus', type: 'required', options: [{ dept: 'MATH', number: '21' }] },
              ],
            },
            {
              id: 'gen-math-51',
              name: 'MATH 51 (Linear Algebra, Multivariable Calculus)',
              slots: [
                { id: 'gen-m51', label: 'MATH 51', type: 'required', options: [{ dept: 'MATH', number: '51' }] },
              ],
            },
            {
              id: 'gen-math-cme',
              name: 'CME 100 (Vector Calculus for Engineers)',
              slots: [
                { id: 'gen-cme100', label: 'CME 100', type: 'required', options: [{ dept: 'CME', number: '100' }] },
              ],
            },
          ],
        },
        {
          id: 'gen-physics',
          name: 'Physics (choose one sequence)',
          note: 'AP credit may satisfy part of the physics requirement.',
          slots: [],
          pickOneGroup: [
            { id: 'gen-phys20', name: 'PHYSICS 20 Series', slots: PHYSICS_20_SLOTS('gen-p20') },
            { id: 'gen-phys40', name: 'PHYSICS 40 Series', slots: PHYSICS_40_SLOTS('gen-p40') },
            { id: 'gen-phys4020', name: 'PHYSICS 40/20 Mixed', slots: PHYSICS_4020_SLOTS('gen-p4020') },
          ],
        },
        {
          id: 'gen-chem',
          name: 'Chemistry',
          note: 'CHEM 31E (5 units) substitutes for both CHEM 31A and CHEM 31B.',
          slots: [
            { id: 'gen-c31a', label: 'CHEM 31A or CHEM 31E', type: 'pick-one',
              options: [
                { dept: 'CHEM', number: '31A', name: 'Chemical Principles I' },
                { dept: 'CHEM', number: '31E', name: 'Chemical Foundations (substitutes 31A+31B)' },
              ] },
            { id: 'gen-c31b', label: 'CHEM 31B', type: 'required',
              options: [{ dept: 'CHEM', number: '31B', name: 'Chemical Principles II' }],
              note: 'Waived if CHEM 31E was taken.' },
            { id: 'gen-c33', label: 'CHEM 33', type: 'required',
              options: [{ dept: 'CHEM', number: '33', name: 'Structure and Reactivity of Carbon-Based Molecules' }] },
            { id: 'gen-c121', label: 'CHEM 121', type: 'required',
              options: [{ dept: 'CHEM', number: '121', name: 'Understanding the Natural and Unnatural World through Chemistry' }] },
          ],
        },
        {
          id: 'gen-stats',
          name: 'Statistics (≥1 course)',
          slots: [
            { id: 'gen-stats-c', label: 'Statistics', type: 'pick-one',
              options: [
                { dept: 'BIO', number: '141', name: 'Introduction to Statistics for Biology' },
                { dept: 'STATS', number: '60', name: 'Introduction to Statistical Methods: Precalculus' },
                { dept: 'CME', number: '106', name: 'Introduction to Probability and Statistics for Engineers' },
                { dept: 'CS', number: '109', name: 'Introduction to Probability for Computer Scientists' },
                { dept: 'OCEANS', number: '174H', name: 'Experimental Design and Probability' },
              ] },
          ],
        },
        {
          id: 'gen-electives',
          name: 'Electives (≥23 units)',
          unitOnly: true,
          minUnits: 23,
          note: 'Choose from: (A) BIO 100–113 and BIO 115–195 courses (additional BioFoundations limit 1; lab courses BIO 43/45/47 limit 1 total); OR (B) approved out-of-department STEM courses (see bulletin). Max 7 units from BIO 199/199X/199A/199B toward electives. Honors: BIO 199W may double-count for WIM, electives, and honors.',
          slots: [
            { id: 'gen-elec', label: 'Electives', type: 'any-approved', options: OUT_OF_DEPT_OPTIONS,
              note: 'Also accepts: BIO 100-113, BIO 115-195. Search for any BIO course or use out-of-dept list. See bulletin for full approved list.' },
          ],
        },
      ],
    },

    // ── BIOCHEMISTRY AND BIOPHYSICS ───────────────────────────────────────────
    {
      id: 'biochem-biophys',
      name: 'Biochemistry and Biophysics',
      sections: [
        {
          id: 'bb-biofound',
          name: 'BioFoundations (≥3 of 4 courses)',
          minCourses: 3,
          slots: [
            { id: 'bb-bf', label: 'BioFoundations (BIO 82/83/84/86)', type: 'pick-from-list', count: 3,
              options: [
                { dept: 'BIO', number: '82', name: 'Genetics' },
                { dept: 'BIO', number: '83', name: 'Biochemistry & Molecular Biology' },
                { dept: 'BIO', number: '84', name: 'Physiology' },
                { dept: 'BIO', number: '86', name: 'Cell Biology' },
              ] },
          ],
        },
        {
          id: 'bb-lab',
          name: 'Foundational Laboratory',
          slots: [
            { id: 'bb-lab-45', label: 'BIO 45: Lab in Cell and Molecular Biology', type: 'required',
              options: [{ dept: 'BIO', number: '45', name: 'Introduction to Laboratory Research in Cell and Molecular Biology' }] },
          ],
        },
        {
          id: 'bb-math',
          name: 'Mathematics',
          note: 'Two requirements: a calculus course AND a differential equations course.',
          slots: [
            { id: 'bb-math1', label: 'MATH 51 or CME 100', type: 'pick-one',
              options: [
                { dept: 'MATH', number: '51', name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' },
                { dept: 'CME', number: '100', name: 'Vector Calculus for Engineers' },
              ] },
            { id: 'bb-math2', label: 'MATH 53 or CME 102', type: 'pick-one',
              options: [
                { dept: 'MATH', number: '53', name: 'Differential Equations with Linear Algebra, Fourier Methods, and Modern Applications' },
                { dept: 'CME', number: '102', name: 'Ordinary Differential Equations for Engineers' },
              ] },
          ],
        },
        {
          id: 'bb-physics',
          name: 'Physics',
          note: 'PHYSICS 45 (4 units) along with AP Physics C credit may substitute for PHYSICS 41 and PHYSICS 43.',
          slots: [
            { id: 'bb-p41', label: 'PHYSICS 41: Mechanics', type: 'required',
              options: [{ dept: 'PHYSICS', number: '41', name: 'Mechanics' }] },
            { id: 'bb-p43', label: 'PHYSICS 43: Electricity and Magnetism', type: 'required',
              options: [{ dept: 'PHYSICS', number: '43', name: 'Electricity and Magnetism' }] },
          ],
        },
        {
          id: 'bb-chem',
          name: 'Chemistry',
          note: 'CHEM 31E (5 units) substitutes for both CHEM 31A and CHEM 31B.',
          slots: [
            { id: 'bb-c31a', label: 'CHEM 31A or CHEM 31E', type: 'pick-one',
              options: [
                { dept: 'CHEM', number: '31A', name: 'Chemical Principles I' },
                { dept: 'CHEM', number: '31E', name: 'Chemical Foundations (substitutes 31A+31B)' },
              ] },
            { id: 'bb-c31b', label: 'CHEM 31B', type: 'required',
              options: [{ dept: 'CHEM', number: '31B', name: 'Chemical Principles II' }],
              note: 'Waived if CHEM 31E was taken.' },
            { id: 'bb-c33', label: 'CHEM 33', type: 'required',
              options: [{ dept: 'CHEM', number: '33', name: 'Structure and Reactivity of Carbon-Based Molecules' }] },
            { id: 'bb-c121', label: 'CHEM 121', type: 'required',
              options: [{ dept: 'CHEM', number: '121', name: 'Understanding the Natural and Unnatural World through Chemistry' }] },
            { id: 'bb-c141', label: 'CHEM 141: Chemical Principles of Life I', type: 'required',
              options: [{ dept: 'CHEM', number: '141', name: 'The Chemical Principles of Life I' }] },
            { id: 'bb-c143', label: 'CHEM 143: Chemical Principles of Life II', type: 'required',
              options: [{ dept: 'CHEM', number: '143', name: 'The Chemical Principles of Life II' }] },
          ],
        },
        {
          id: 'bb-cs',
          name: 'Computer Science (1 required)',
          slots: [
            { id: 'bb-cs-c', label: 'CS 106A or CS 106B', type: 'pick-one',
              options: [
                { dept: 'CS', number: '106A', name: 'Programming Methodology' },
                { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
              ] },
          ],
        },
        {
          id: 'bb-stats',
          name: 'Statistics (≥1 course)',
          slots: [
            { id: 'bb-stats-c', label: 'Statistics', type: 'pick-one',
              options: [
                { dept: 'BIO', number: '141', name: 'Introduction to Statistics for Biology' },
                { dept: 'CME', number: '106', name: 'Introduction to Probability and Statistics for Engineers' },
                { dept: 'CS', number: '109', name: 'Introduction to Probability for Computer Scientists' },
                { dept: 'STATS', number: '60', name: 'Introduction to Statistical Methods: Precalculus' },
              ] },
          ],
        },
        {
          id: 'bb-electives',
          name: 'Electives (20 units: 10 Menu I + 10 additional)',
          minUnits: 20,
          unitOnly: true,
          note: '10 units from Biochemistry/Biophysics Menu I (courses cannot double-count toward additional electives). 10 additional units from BIO 100–113, BIO 115–195, or approved out-of-dept STEM courses. Max 7 units BIO 199/199X/199A/199B.',
          slots: [
            { id: 'bb-menu1', label: 'Menu I (≥10 units)', type: 'any-approved', minUnits: 10,
              options: BB_MENU1 },
            { id: 'bb-elec', label: 'Additional Electives (≥10 units)', type: 'any-approved',
              options: OUT_OF_DEPT_OPTIONS,
              note: 'Also accepts BIO 100-113, BIO 115-195. Menu I courses cannot double-count here.' },
          ],
        },
      ],
    },

    // ── CELLULAR, MOLECULAR, AND ORGANISMAL BIOLOGY (CMO) ────────────────────
    {
      id: 'cmo',
      name: 'Cellular, Molecular, and Organismal Biology',
      sections: [
        {
          id: 'cmo-biofound',
          name: 'BioFoundations (ALL 4 required)',
          slots: [
            { id: 'cmo-bf82', label: 'BIO 82: Genetics', type: 'required', options: [{ dept: 'BIO', number: '82' }] },
            { id: 'cmo-bf83', label: 'BIO 83: Biochemistry & Molecular Biology', type: 'required', options: [{ dept: 'BIO', number: '83' }] },
            { id: 'cmo-bf84', label: 'BIO 84: Physiology', type: 'required', options: [{ dept: 'BIO', number: '84' }] },
            { id: 'cmo-bf86', label: 'BIO 86: Cell Biology', type: 'required', options: [{ dept: 'BIO', number: '86' }] },
          ],
        },
        {
          id: 'cmo-lab',
          name: 'Foundational Laboratory (≥1)',
          slots: [
            { id: 'cmo-lab-c', label: 'BIO 43 or BIO 45', type: 'pick-one',
              options: [
                { dept: 'BIO', number: '43', name: 'Introduction to Laboratory Research in Neuronal Cell Biology' },
                { dept: 'BIO', number: '45', name: 'Introduction to Laboratory Research in Cell and Molecular Biology' },
              ] },
          ],
        },
        {
          id: 'cmo-math',
          name: 'Mathematics (choose one sequence)',
          slots: [],
          pickOneGroup: [
            {
              id: 'cmo-math-seq',
              name: 'MATH 19 + 20 (Calculus)',
              slots: [
                { id: 'cmo-m19', label: 'MATH 19: Calculus', type: 'required', options: [{ dept: 'MATH', number: '19' }] },
                { id: 'cmo-m20', label: 'MATH 20: Calculus', type: 'required', options: [{ dept: 'MATH', number: '20' }] },
              ],
            },
            {
              id: 'cmo-math-51',
              name: 'MATH 51',
              slots: [{ id: 'cmo-m51', label: 'MATH 51', type: 'required', options: [{ dept: 'MATH', number: '51' }] }],
            },
            {
              id: 'cmo-math-cme',
              name: 'CME 100',
              slots: [{ id: 'cmo-cme100', label: 'CME 100', type: 'required', options: [{ dept: 'CME', number: '100' }] }],
            },
          ],
        },
        {
          id: 'cmo-physics',
          name: 'Physics (choose one sequence)',
          slots: [],
          pickOneGroup: [
            { id: 'cmo-phys20', name: 'PHYSICS 20 Series', slots: PHYSICS_20_SLOTS('cmo-p20') },
            { id: 'cmo-phys40', name: 'PHYSICS 40 Series', slots: PHYSICS_40_SLOTS('cmo-p40') },
            { id: 'cmo-phys4020', name: 'PHYSICS 40/20 Mixed', slots: PHYSICS_4020_SLOTS('cmo-p4020') },
          ],
        },
        {
          id: 'cmo-chem',
          name: 'Chemistry',
          note: 'CHEM 31E (5 units) substitutes for both CHEM 31A and CHEM 31B.',
          slots: [
            { id: 'cmo-c31a', label: 'CHEM 31A or CHEM 31E', type: 'pick-one',
              options: [
                { dept: 'CHEM', number: '31A', name: 'Chemical Principles I' },
                { dept: 'CHEM', number: '31E', name: 'Chemical Foundations (substitutes 31A+31B)' },
              ] },
            { id: 'cmo-c31b', label: 'CHEM 31B', type: 'required',
              options: [{ dept: 'CHEM', number: '31B', name: 'Chemical Principles II' }],
              note: 'Waived if CHEM 31E was taken.' },
            { id: 'cmo-c33', label: 'CHEM 33', type: 'required',
              options: [{ dept: 'CHEM', number: '33', name: 'Structure and Reactivity of Carbon-Based Molecules' }] },
            { id: 'cmo-c121', label: 'CHEM 121', type: 'required',
              options: [{ dept: 'CHEM', number: '121', name: 'Understanding the Natural and Unnatural World through Chemistry' }] },
          ],
        },
        {
          id: 'cmo-cs',
          name: 'Computer Science (1 required)',
          slots: [
            { id: 'cmo-cs-c', label: 'CS 106A or CS 106B', type: 'pick-one',
              options: [
                { dept: 'CS', number: '106A', name: 'Programming Methodology' },
                { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
              ] },
          ],
        },
        {
          id: 'cmo-stats',
          name: 'Statistics (≥1 course)',
          slots: [
            { id: 'cmo-stats-c', label: 'Statistics', type: 'pick-one',
              options: [
                { dept: 'BIO', number: '141', name: 'Introduction to Statistics for Biology' },
                { dept: 'CME', number: '106', name: 'Introduction to Probability and Statistics for Engineers' },
                { dept: 'CS', number: '109', name: 'Introduction to Probability for Computer Scientists' },
                { dept: 'STATS', number: '60', name: 'Introduction to Statistical Methods: Precalculus' },
              ] },
          ],
        },
        {
          id: 'cmo-electives',
          name: 'Electives (25 units: 15 Menu I + 10 additional)',
          minUnits: 25,
          unitOnly: true,
          note: '15 units from CMO Menu I (cannot double-count toward additional electives). 10 additional units from BIO 100–113, BIO 115–195, or approved out-of-dept STEM courses. Max 7 units BIO 199/199X/199A/199B.',
          slots: [
            { id: 'cmo-menu1', label: 'CMO Menu I (≥15 units)', type: 'any-approved', minUnits: 15,
              options: CMO_MENU1 },
            { id: 'cmo-elec', label: 'Additional Electives (≥10 units)', type: 'any-approved',
              options: OUT_OF_DEPT_OPTIONS,
              note: 'Also accepts BIO 100-113, BIO 115-195. Menu I courses cannot double-count here.' },
          ],
        },
      ],
    },

    // ── COMPUTATIONAL AND SYSTEMS BIOLOGY ─────────────────────────────────────
    {
      id: 'comp-systems',
      name: 'Computational and Systems Biology',
      sections: [
        {
          id: 'csb-biofound',
          name: 'BioFoundations (≥2 of 6 courses)',
          minCourses: 2,
          slots: [
            { id: 'csb-bf', label: 'BioFoundations', type: 'pick-from-list', count: 2,
              options: [
                { dept: 'BIO', number: '81', name: 'Introduction to Ecology' },
                { dept: 'BIO', number: '82', name: 'Genetics' },
                { dept: 'BIO', number: '83', name: 'Biochemistry & Molecular Biology' },
                { dept: 'BIO', number: '84', name: 'Physiology' },
                { dept: 'BIO', number: '85', name: 'Evolution' },
                { dept: 'BIO', number: '86', name: 'Cell Biology' },
              ] },
          ],
        },
        {
          id: 'csb-lab',
          name: 'Foundational Laboratory (≥2, BIO 47 satisfies WIM)',
          minCourses: 2,
          slots: [
            { id: 'csb-lab-c', label: 'Lab Courses (≥2)', type: 'pick-from-list', count: 2,
              options: [
                { dept: 'BIO', number: '43', name: 'Introduction to Laboratory Research in Neuronal Cell Biology' },
                { dept: 'BIO', number: '45', name: 'Introduction to Laboratory Research in Cell and Molecular Biology' },
                { dept: 'BIO', number: '47', name: 'Introduction to Research in Ecology and Evolutionary Biology (WIM)' },
              ] },
          ],
        },
        {
          id: 'csb-math',
          name: 'Mathematics',
          note: 'Both requirements must be met: MATH 19+20+21 series (or equivalent) AND MATH 51 or CME 100.',
          slots: [
            { id: 'csb-m19', label: 'MATH 19: Calculus', type: 'required', options: [{ dept: 'MATH', number: '19' }] },
            { id: 'csb-m20', label: 'MATH 20: Calculus', type: 'required', options: [{ dept: 'MATH', number: '20' }] },
            { id: 'csb-m21', label: 'MATH 21: Calculus', type: 'required', options: [{ dept: 'MATH', number: '21' }] },
            { id: 'csb-math2', label: 'MATH 51 or CME 100', type: 'pick-one',
              options: [
                { dept: 'MATH', number: '51', name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' },
                { dept: 'CME', number: '100', name: 'Vector Calculus for Engineers' },
              ] },
          ],
        },
        {
          id: 'csb-physics',
          name: 'Physics (choose one sequence)',
          slots: [],
          pickOneGroup: [
            { id: 'csb-phys20', name: 'PHYSICS 20 Series', slots: PHYSICS_20_SLOTS('csb-p20') },
            { id: 'csb-phys40', name: 'PHYSICS 40 Series', slots: PHYSICS_40_SLOTS('csb-p40') },
            { id: 'csb-phys4020', name: 'PHYSICS 40/20 Mixed', slots: PHYSICS_4020_SLOTS('csb-p4020') },
          ],
        },
        {
          id: 'csb-chem',
          name: 'Chemistry',
          note: 'CHEM 31E (5 units) substitutes for both CHEM 31A and CHEM 31B.',
          slots: [
            { id: 'csb-c31a', label: 'CHEM 31A or CHEM 31E', type: 'pick-one',
              options: [
                { dept: 'CHEM', number: '31A', name: 'Chemical Principles I' },
                { dept: 'CHEM', number: '31E', name: 'Chemical Foundations (substitutes 31A+31B)' },
              ] },
            { id: 'csb-c31b', label: 'CHEM 31B', type: 'required',
              options: [{ dept: 'CHEM', number: '31B', name: 'Chemical Principles II' }],
              note: 'Waived if CHEM 31E was taken.' },
          ],
        },
        {
          id: 'csb-cs',
          name: 'Computer Science',
          slots: [
            { id: 'csb-cs1', label: 'CS 106A or CS 106B', type: 'pick-one',
              options: [
                { dept: 'CS', number: '106A', name: 'Programming Methodology' },
                { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
              ] },
            { id: 'csb-cs2', label: 'CS 229 or CS 221', type: 'pick-one',
              options: [
                { dept: 'CS', number: '229', name: 'Machine Learning' },
                { dept: 'CS', number: '221', name: 'Artificial Intelligence: Principles and Techniques' },
              ] },
          ],
        },
        {
          id: 'csb-stats',
          name: 'Statistics (1 course from each group)',
          slots: [
            { id: 'csb-stats1', label: 'Group 1: Probability', type: 'pick-one',
              note: 'STATS 117+118 may be taken as a pair to satisfy Group 1.',
              options: [
                { dept: 'CS', number: '109', name: 'Introduction to Probability for Computer Scientists' },
                { dept: 'STATS', number: '117', name: 'Introduction to Probability Theory (pair with STATS 118)' },
              ] },
            { id: 'csb-stats2', label: 'Group 2: Applied Statistics', type: 'pick-one',
              options: [
                { dept: 'STATS', number: '141', name: 'Introduction to Statistics for Biology' },
                { dept: 'STATS', number: '191', name: 'Introduction to Applied Statistics' },
              ] },
          ],
        },
        {
          id: 'csb-electives',
          name: 'Electives (20 units: 10 Menu I + 10 additional)',
          minUnits: 20,
          unitOnly: true,
          note: '10 units from Computational & Systems Biology Menu I (cannot double-count toward additional electives). 10 additional units from BIO 100–113, BIO 115–195, or approved out-of-dept STEM courses.',
          slots: [
            { id: 'csb-menu1', label: 'CSB Menu I (≥10 units)', type: 'any-approved', minUnits: 10,
              options: CSB_MENU1 },
            { id: 'csb-elec', label: 'Additional Electives (≥10 units)', type: 'any-approved',
              options: OUT_OF_DEPT_OPTIONS,
              note: 'Also accepts BIO 100-113, BIO 115-195. Menu I courses cannot double-count here.' },
          ],
        },
      ],
    },

    // ── ECOLOGY, EVOLUTION, AND ENVIRONMENT (EEE) ─────────────────────────────
    {
      id: 'eee',
      name: 'Ecology, Evolution, and Environment',
      sections: [
        {
          id: 'eee-biofound',
          name: 'BioFoundations (ALL 3 required)',
          slots: [
            { id: 'eee-bf81', label: 'BIO 81: Introduction to Ecology', type: 'required', options: [{ dept: 'BIO', number: '81' }] },
            { id: 'eee-bf82', label: 'BIO 82: Genetics', type: 'required', options: [{ dept: 'BIO', number: '82' }] },
            { id: 'eee-bf85', label: 'BIO 85: Evolution', type: 'required', options: [{ dept: 'BIO', number: '85' }] },
          ],
        },
        {
          id: 'eee-lab',
          name: 'Foundational Laboratory (BIO 47 required; satisfies WIM)',
          slots: [
            { id: 'eee-lab-47', label: 'BIO 47: Research in Ecology and Evolutionary Biology (WIM)', type: 'required',
              options: [{ dept: 'BIO', number: '47', name: 'Introduction to Research in Ecology and Evolutionary Biology (WIM)' }] },
          ],
        },
        {
          id: 'eee-math',
          name: 'Mathematics (choose one sequence)',
          slots: [],
          pickOneGroup: [
            {
              id: 'eee-math-cme',
              name: 'CME 100',
              slots: [{ id: 'eee-cme100', label: 'CME 100', type: 'required', options: [{ dept: 'CME', number: '100' }] }],
            },
            {
              id: 'eee-math-seq',
              name: 'MATH 19 + 20 + 21',
              slots: [
                { id: 'eee-m19', label: 'MATH 19', type: 'required', options: [{ dept: 'MATH', number: '19' }] },
                { id: 'eee-m20', label: 'MATH 20', type: 'required', options: [{ dept: 'MATH', number: '20' }] },
                { id: 'eee-m21', label: 'MATH 21', type: 'required', options: [{ dept: 'MATH', number: '21' }] },
              ],
            },
            {
              id: 'eee-math-51',
              name: 'MATH 51',
              slots: [{ id: 'eee-m51', label: 'MATH 51', type: 'required', options: [{ dept: 'MATH', number: '51' }] }],
            },
          ],
        },
        {
          id: 'eee-physics-or-cs',
          name: 'Physics OR Computer Science (choose one)',
          note: 'Choose either a full Physics sequence OR one CS course.',
          slots: [],
          pickOneGroup: [
            { id: 'eee-phys20', name: 'Physics: PHYSICS 20 Series', slots: PHYSICS_20_SLOTS('eee-p20') },
            { id: 'eee-phys40', name: 'Physics: PHYSICS 40 Series', slots: PHYSICS_40_SLOTS('eee-p40') },
            { id: 'eee-phys4020', name: 'Physics: PHYSICS 40/20 Mixed', slots: PHYSICS_4020_SLOTS('eee-p4020') },
            {
              id: 'eee-cs-opt',
              name: 'Computer Science (CS 106A or CS 106B)',
              slots: [
                { id: 'eee-cs-c', label: 'CS 106A or CS 106B', type: 'pick-one',
                  options: [
                    { dept: 'CS', number: '106A', name: 'Programming Methodology' },
                    { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
                  ] },
              ],
            },
          ],
        },
        {
          id: 'eee-chem',
          name: 'Chemistry',
          note: 'CHEM 31E (5 units) substitutes for both CHEM 31A and CHEM 31B.',
          slots: [
            { id: 'eee-c31a', label: 'CHEM 31A or CHEM 31E', type: 'pick-one',
              options: [
                { dept: 'CHEM', number: '31A', name: 'Chemical Principles I' },
                { dept: 'CHEM', number: '31E', name: 'Chemical Foundations (substitutes 31A+31B)' },
              ] },
            { id: 'eee-c31b', label: 'CHEM 31B', type: 'required',
              options: [{ dept: 'CHEM', number: '31B', name: 'Chemical Principles II' }],
              note: 'Waived if CHEM 31E was taken.' },
          ],
        },
        {
          id: 'eee-stats',
          name: 'Statistics (≥1 course)',
          slots: [
            { id: 'eee-stats-c', label: 'Statistics', type: 'pick-one',
              options: [
                { dept: 'BIO', number: '141', name: 'Introduction to Statistics for Biology' },
                { dept: 'CME', number: '106', name: 'Introduction to Probability and Statistics for Engineers' },
                { dept: 'CS', number: '109', name: 'Introduction to Probability for Computer Scientists' },
                { dept: 'OCEANS', number: '174H', name: 'Experimental Design and Probability' },
                { dept: 'STATS', number: '60', name: 'Introduction to Statistical Methods: Precalculus' },
              ] },
          ],
        },
        {
          id: 'eee-electives',
          name: 'Electives (40 units: 18 Menu I + 22 additional)',
          minUnits: 40,
          unitOnly: true,
          note: '18 units from EEE Menu I (cannot double-count toward additional electives). 22 additional units from BIO 100–113, BIO 115–195, or approved out-of-dept STEM courses. Max 7 units BIO 199/199X/199A/199B.',
          slots: [
            { id: 'eee-menu1', label: 'EEE Menu I (≥18 units)', type: 'any-approved', minUnits: 18,
              options: EEE_MENU1 },
            { id: 'eee-elec', label: 'Additional Electives (≥22 units)', type: 'any-approved',
              options: OUT_OF_DEPT_OPTIONS,
              note: 'Also accepts BIO 100-113, BIO 115-195. Menu I courses cannot double-count here.' },
          ],
        },
      ],
    },

    // ── MICROBIAL SCIENCES ────────────────────────────────────────────────────
    {
      id: 'microbial',
      name: 'Microbial Sciences',
      sections: [
        {
          id: 'micro-biofound',
          name: 'BioFoundations (≥3 of 6 courses)',
          minCourses: 3,
          slots: [
            { id: 'micro-bf', label: 'BioFoundations', type: 'pick-from-list', count: 3,
              options: [
                { dept: 'BIO', number: '81', name: 'Introduction to Ecology' },
                { dept: 'BIO', number: '82', name: 'Genetics' },
                { dept: 'BIO', number: '83', name: 'Biochemistry & Molecular Biology' },
                { dept: 'BIO', number: '84', name: 'Physiology' },
                { dept: 'BIO', number: '85', name: 'Evolution' },
                { dept: 'BIO', number: '86', name: 'Cell Biology' },
              ] },
          ],
        },
        {
          id: 'micro-lab',
          name: 'Foundational Laboratory (BIO 45 + BIO 47)',
          note: 'BIO 47 satisfies the WIM requirement.',
          slots: [
            { id: 'micro-lab45', label: 'BIO 45: Lab in Cell and Molecular Biology', type: 'required',
              options: [{ dept: 'BIO', number: '45', name: 'Introduction to Laboratory Research in Cell and Molecular Biology' }] },
            { id: 'micro-lab47', label: 'BIO 47: Research in Ecology and Evolutionary Biology (WIM)', type: 'required',
              options: [{ dept: 'BIO', number: '47', name: 'Introduction to Research in Ecology and Evolutionary Biology (WIM)' }] },
          ],
        },
        {
          id: 'micro-math',
          name: 'Mathematics (choose one sequence)',
          slots: [],
          pickOneGroup: [
            {
              id: 'micro-math-cme',
              name: 'CME 100',
              slots: [{ id: 'micro-cme100', label: 'CME 100', type: 'required', options: [{ dept: 'CME', number: '100' }] }],
            },
            {
              id: 'micro-math-seq',
              name: 'MATH 19 + 20 + 21',
              slots: [
                { id: 'micro-m19', label: 'MATH 19', type: 'required', options: [{ dept: 'MATH', number: '19' }] },
                { id: 'micro-m20', label: 'MATH 20', type: 'required', options: [{ dept: 'MATH', number: '20' }] },
                { id: 'micro-m21', label: 'MATH 21', type: 'required', options: [{ dept: 'MATH', number: '21' }] },
              ],
            },
            {
              id: 'micro-math-51',
              name: 'MATH 51',
              slots: [{ id: 'micro-m51', label: 'MATH 51', type: 'required', options: [{ dept: 'MATH', number: '51' }] }],
            },
          ],
        },
        {
          id: 'micro-physics',
          name: 'Physics (choose one sequence)',
          slots: [],
          pickOneGroup: [
            { id: 'micro-phys20', name: 'PHYSICS 20 Series', slots: PHYSICS_20_SLOTS('micro-p20') },
            { id: 'micro-phys40', name: 'PHYSICS 40 Series', slots: PHYSICS_40_SLOTS('micro-p40') },
            { id: 'micro-phys4020', name: 'PHYSICS 40/20 Mixed', slots: PHYSICS_4020_SLOTS('micro-p4020') },
          ],
        },
        {
          id: 'micro-chem',
          name: 'Chemistry',
          note: 'CHEM 31E (5 units) substitutes for both CHEM 31A and CHEM 31B.',
          slots: [
            { id: 'micro-c31a', label: 'CHEM 31A or CHEM 31E', type: 'pick-one',
              options: [
                { dept: 'CHEM', number: '31A', name: 'Chemical Principles I' },
                { dept: 'CHEM', number: '31E', name: 'Chemical Foundations (substitutes 31A+31B)' },
              ] },
            { id: 'micro-c31b', label: 'CHEM 31B', type: 'required',
              options: [{ dept: 'CHEM', number: '31B', name: 'Chemical Principles II' }],
              note: 'Waived if CHEM 31E was taken.' },
            { id: 'micro-c33', label: 'CHEM 33', type: 'required',
              options: [{ dept: 'CHEM', number: '33', name: 'Structure and Reactivity of Carbon-Based Molecules' }] },
            { id: 'micro-c121', label: 'CHEM 121', type: 'required',
              options: [{ dept: 'CHEM', number: '121', name: 'Understanding the Natural and Unnatural World through Chemistry' }] },
          ],
        },
        {
          id: 'micro-stats',
          name: 'Statistics (≥1 course)',
          slots: [
            { id: 'micro-stats-c', label: 'Statistics', type: 'pick-one',
              options: [
                { dept: 'BIO', number: '141', name: 'Introduction to Statistics for Biology' },
                { dept: 'CME', number: '106', name: 'Introduction to Probability and Statistics for Engineers' },
                { dept: 'CS', number: '109', name: 'Introduction to Probability for Computer Scientists' },
                { dept: 'STATS', number: '60', name: 'Introduction to Statistical Methods: Precalculus' },
              ] },
          ],
        },
        {
          id: 'micro-electives',
          name: 'Electives (29 units: 9 Menu I + 20 additional)',
          minUnits: 29,
          unitOnly: true,
          note: '9 units from Microbial Sciences Menu I (cannot double-count toward additional electives). 20 additional units from BIO 100–113, BIO 115–195, or approved out-of-dept STEM courses. Max 7 units BIO 199/199X/199A/199B.',
          slots: [
            { id: 'micro-menu1', label: 'Microbial Sciences Menu I (≥9 units)', type: 'any-approved', minUnits: 9,
              options: MICRO_MENU1 },
            { id: 'micro-elec', label: 'Additional Electives (≥20 units)', type: 'any-approved',
              options: OUT_OF_DEPT_OPTIONS,
              note: 'Also accepts BIO 100-113, BIO 115-195. Menu I courses cannot double-count here.' },
          ],
        },
      ],
    },

    // ── NEUROSCIENCES ─────────────────────────────────────────────────────────
    {
      id: 'neuro',
      name: 'Neurosciences',
      sections: [
        {
          id: 'neuro-biofound',
          name: 'BioFoundations (≥2 of 3 courses)',
          minCourses: 2,
          slots: [
            { id: 'neuro-bf', label: 'BioFoundations (BIO 82/83/86)', type: 'pick-from-list', count: 2,
              options: [
                { dept: 'BIO', number: '82', name: 'Genetics' },
                { dept: 'BIO', number: '83', name: 'Biochemistry & Molecular Biology' },
                { dept: 'BIO', number: '86', name: 'Cell Biology' },
              ] },
          ],
        },
        {
          id: 'neuro-lab',
          name: 'Foundational Laboratory (≥1)',
          slots: [
            { id: 'neuro-lab-c', label: 'BIO 43 or BIO 45', type: 'pick-one',
              options: [
                { dept: 'BIO', number: '43', name: 'Introduction to Laboratory Research in Neuronal Cell Biology' },
                { dept: 'BIO', number: '45', name: 'Introduction to Laboratory Research in Cell and Molecular Biology' },
              ] },
          ],
        },
        {
          id: 'neuro-math',
          name: 'Mathematics (choose one sequence)',
          slots: [],
          pickOneGroup: [
            {
              id: 'neuro-math-cme',
              name: 'CME 100',
              slots: [{ id: 'neuro-cme100', label: 'CME 100', type: 'required', options: [{ dept: 'CME', number: '100' }] }],
            },
            {
              id: 'neuro-math-seq',
              name: 'MATH 19 + 20',
              slots: [
                { id: 'neuro-m19', label: 'MATH 19', type: 'required', options: [{ dept: 'MATH', number: '19' }] },
                { id: 'neuro-m20', label: 'MATH 20', type: 'required', options: [{ dept: 'MATH', number: '20' }] },
              ],
            },
            {
              id: 'neuro-math-51',
              name: 'MATH 51',
              slots: [{ id: 'neuro-m51', label: 'MATH 51', type: 'required', options: [{ dept: 'MATH', number: '51' }] }],
            },
          ],
        },
        {
          id: 'neuro-physics',
          name: 'Physics (choose one sequence)',
          slots: [],
          pickOneGroup: [
            { id: 'neuro-phys20', name: 'PHYSICS 20 Series', slots: PHYSICS_20_SLOTS('neuro-p20') },
            { id: 'neuro-phys40', name: 'PHYSICS 40 Series', slots: PHYSICS_40_SLOTS('neuro-p40') },
            { id: 'neuro-phys4020', name: 'PHYSICS 40/20 Mixed', slots: PHYSICS_4020_SLOTS('neuro-p4020') },
          ],
        },
        {
          id: 'neuro-chem',
          name: 'Chemistry',
          note: 'CHEM 31E substitutes for CHEM 31A+31B. CHEM 121 is NOT required for Neurosciences.',
          slots: [
            { id: 'neuro-c31a', label: 'CHEM 31A or CHEM 31E', type: 'pick-one',
              options: [
                { dept: 'CHEM', number: '31A', name: 'Chemical Principles I' },
                { dept: 'CHEM', number: '31E', name: 'Chemical Foundations (substitutes 31A+31B)' },
              ] },
            { id: 'neuro-c31b', label: 'CHEM 31B', type: 'required',
              options: [{ dept: 'CHEM', number: '31B', name: 'Chemical Principles II' }],
              note: 'Waived if CHEM 31E was taken.' },
            { id: 'neuro-c33', label: 'CHEM 33', type: 'required',
              options: [{ dept: 'CHEM', number: '33', name: 'Structure and Reactivity of Carbon-Based Molecules' }] },
          ],
        },
        {
          id: 'neuro-cs',
          name: 'Computer Science (1 required)',
          slots: [
            { id: 'neuro-cs-c', label: 'CS 106A or CS 106B', type: 'pick-one',
              options: [
                { dept: 'CS', number: '106A', name: 'Programming Methodology' },
                { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
              ] },
          ],
        },
        {
          id: 'neuro-stats',
          name: 'Statistics (≥1 course)',
          slots: [
            { id: 'neuro-stats-c', label: 'Statistics', type: 'pick-one',
              options: [
                { dept: 'BIO', number: '141', name: 'Introduction to Statistics for Biology' },
                { dept: 'CME', number: '106', name: 'Introduction to Probability and Statistics for Engineers' },
                { dept: 'CS', number: '109', name: 'Introduction to Probability for Computer Scientists' },
                { dept: 'STATS', number: '60', name: 'Introduction to Statistical Methods: Precalculus' },
              ] },
          ],
        },
        {
          id: 'neuro-electives',
          name: 'Electives (38 units: BIO 102 + 15 Menu I + 19 additional)',
          minUnits: 38,
          unitOnly: true,
          note: '4 units BIO 102 (required). 15 units from Neuroscience Menu I (cannot double-count toward additional electives). 19 additional units from BIO 100–113, BIO 115–195, or approved out-of-dept STEM courses. Max 7 units BIO 199/199X/199A/199B.',
          slots: [
            { id: 'neuro-bio102', label: 'BIO 102: Introduction to Neuroscience (required, ≥4 units)', type: 'required',
              options: [{ dept: 'BIO', number: '102', name: 'Introduction to Neuroscience' }] },
            { id: 'neuro-menu1', label: 'Neuroscience Menu I (≥15 units)', type: 'any-approved', minUnits: 15,
              options: NEURO_MENU1 },
            { id: 'neuro-elec', label: 'Additional Electives (≥19 units)', type: 'any-approved',
              options: OUT_OF_DEPT_OPTIONS,
              note: 'Also accepts BIO 100-113, BIO 115-195. Menu I courses cannot double-count here.' },
          ],
        },
      ],
    },
  ],

  wimCourses: [
    { dept: 'BIO', number: '47', name: 'Introduction to Research in Ecology and Evolutionary Biology' },
    { dept: 'BIO', number: '127', name: 'Genomic approaches to the study of human disease' },
    { dept: 'BIO', number: '168', name: 'Explorations in Stem Cell Biology' },
    { dept: 'BIO', number: '196A', name: 'Biology Senior Reflection' },
    { dept: 'BIO', number: '199A', name: 'The Independent Capstone in Biology' },
    { dept: 'BIO', number: '199W', name: 'Senior Honors Thesis (also counts for honors)' },
  ],
};
