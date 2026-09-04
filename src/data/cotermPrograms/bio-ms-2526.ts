// Biology MS (Coterm), 2025-26
// Source: https://bulletin.stanford.edu/programs/BIO-MS/
// 45 units at the 100-level or above; at least 23 units primarily graduate-level.

import type { CourseOption, MajorConfig, MajorSection } from '../majorSchema';

const coursePoolSection = (
  id: string,
  name: string,
  options: CourseOption[],
  note?: string,
): MajorSection => ({
  id,
  name,
  note,
  slots: [
    {
      id: `${id}-courses`,
      label: `${name} courses`,
      type: 'pick-from-list',
      optional: true,
      options,
    },
  ],
});

const BIO_COURSES: CourseOption[] = [
  { dept: 'BIO', number: '198' },
  { dept: 'BIO', number: '198X' },
  { dept: 'BIO', number: '290' },
  { dept: 'BIO', number: '291' },
  { dept: 'BIO', number: '300' },
  { dept: 'BIO', number: '300X' },
  { dept: 'OCEANS', number: '198H' },
  { dept: 'OCEANS', number: '290H' },
  { dept: 'OCEANS', number: '300' },
];

const BIOCHEMISTRY: CourseOption[] = [
  { dept: 'BIOC', number: '241' },
];

const BIOENGINEERING: CourseOption[] = [
  { dept: 'BIOE', number: '101' },
  { dept: 'BIOE', number: '103' },
  { dept: 'BIOE', number: '214' },
  { dept: 'BIOE', number: '217' },
  { dept: 'BIOE', number: '220' },
  { dept: 'BIOE', number: '231' },
  { dept: 'BIOE', number: '241' },
  { dept: 'BIOE', number: '279' },
  { dept: 'BIOE', number: '450' },
];

const BIOMEDICAL_INFORMATICS: CourseOption[] = [
  { dept: 'BMDS', number: '210' },
  { dept: 'BMDS', number: '214' },
  { dept: 'BMDS', number: '217' },
  { dept: 'BMDS', number: '173A' },
  { dept: 'BIOMEDIN', number: '273B' },
  { dept: 'BMDS', number: '245' },
];

const BIOPHYSICS: CourseOption[] = [
  { dept: 'BIOPHYS', number: '241' },
  { dept: 'BIOPHYS', number: '279' },
];

const BIOMEDICAL_DATA_SCIENCE: CourseOption[] = [
  { dept: 'BMDS', number: '273' },
];

const CANCER_BIOLOGY: CourseOption[] = [
  { dept: 'CBIO', number: '101' },
  { dept: 'CBIO', number: '240' },
  { dept: 'CBIO', number: '275' },
];

const CHEMICAL_ENGINEERING: CourseOption[] = [
  { dept: 'CHEMENG', number: '450' },
];

const CHEMICAL_SYSTEMS_BIOLOGY: CourseOption[] = [
  { dept: 'CSB', number: '210' },
  { dept: 'CSB', number: '220' },
];

const CHEMISTRY: CourseOption[] = [
  { dept: 'CHEM', number: '141' },
  { dept: 'CHEM', number: '143' },
  { dept: 'CHEM', number: '181' },
  { dept: 'CHEM', number: '183' },
  { dept: 'CHEM', number: '184' },
  { dept: 'CHEM', number: '185' },
];

const CIVIL_ENVIRONMENTAL_ENGINEERING: CourseOption[] = [
  { dept: 'CEE', number: '162I' },
  { dept: 'CEE', number: '177' },
  { dept: 'CEE', number: '274D' },
];

const COMPUTER_SCIENCE: CourseOption[] = [
  { dept: 'CS', number: '109' },
  { dept: 'CS', number: '270' },
  { dept: 'CS', number: '173A' },
  { dept: 'CS', number: '237B' },
  { dept: 'CS', number: '274' },
  { dept: 'CS', number: '275A' },
  { dept: 'CS', number: '279' },
];

const DEVELOPMENTAL_BIOLOGY: CourseOption[] = [
  { dept: 'DBIO', number: '173A' },
  { dept: 'DBIO', number: '201' },
  { dept: 'DBIO', number: '210' },
];

const EARTH_SYSTEMS: CourseOption[] = [
  { dept: 'EARTHSYS', number: '114' },
  { dept: 'EARTHSYS', number: '132' },
  { dept: 'EARTHSYS', number: '141' },
  { dept: 'EARTHSYS', number: '142' },
  { dept: 'EARTHSYS', number: '144' },
  { dept: 'EARTHSYS', number: '146B' },
  { dept: 'EARTHSYS', number: '151' },
  { dept: 'EARTHSYS', number: '152' },
  { dept: 'EARTHSYS', number: '155' },
  { dept: 'EARTHSYS', number: '158' },
  { dept: 'EARTHSYS', number: '240' },
];

const ENERGY: CourseOption[] = [
  { dept: 'ENERGY', number: '240' },
];

const EARTH_SYSTEM_SCIENCE: CourseOption[] = [
  { dept: 'ESS', number: '132' },
  { dept: 'ESS', number: '141' },
  { dept: 'ESS', number: '151' },
  { dept: 'ESS', number: '152' },
  { dept: 'ESS', number: '155' },
  { dept: 'ESS', number: '158' },
  { dept: 'ESS', number: '162' },
  { dept: 'ESS', number: '164' },
  { dept: 'ESS', number: '239' },
];

const GENETICS: CourseOption[] = [
  { dept: 'GENE', number: '202' },
  { dept: 'GENE', number: '211' },
  { dept: 'GENE', number: '214' },
  { dept: 'GENE', number: '217' },
  { dept: 'GENE', number: '212' },
  { dept: 'GENE', number: '235' },
  { dept: 'GENE', number: '236' },
];

export const BIO_MS_2526: MajorConfig = {
  id: 'bio-ms-2526',
  name: 'Biology MS (Coterm)',
  school: 'School of Humanities and Sciences',
  year: '2025-26',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/BIO-MS/',
  category: 'coterm',
  totalMinUnits: 45,
  sections: [
    {
      id: 'requirements-overview',
      name: 'Requirements Overview',
      note: 'Complete at least 45 units at the 100-level or above from BIO/Hopkins Marine Station courses, approved out-of-department electives, research, teaching, and foundational breadth courses. At least 23 units must be designated primarily for graduate students. A maximum of 18 units may be a combination of Biology research, directed reading, and teaching. Up to 9 units of other relevant Stanford coursework may count by General Petition. A signed advisor-approved program proposal is required. Maximum 6 units CR/NC; GPA 3.0 or higher; B− or better in every degree course.',
      slots: [],
    },
    coursePoolSection(
      'bio',
      'BIO Courses',
      BIO_COURSES,
      'Biology and Hopkins Marine Station directed reading, teaching, and research. A maximum of 18 combined units of Biology research, directed reading, and teaching may count toward the degree.',
    ),
    {
      id: 'approved-out-of-department-overview',
      name: 'Approved Out-of-Department Electives',
      note: 'The approved elective categories below may be mixed. If a course is offered at both the 100- and 200-level, graduate students must enroll in the 200-level offering. Cross-listed versions represent the same course and may count only once.',
      slots: [],
    },
    coursePoolSection('biochemistry', 'Biochemistry', BIOCHEMISTRY),
    coursePoolSection(
      'bioengineering',
      'Bioengineering',
      BIOENGINEERING,
      'BIOE 450 is cross-listed with CHEMENG 450 and may count only once.',
    ),
    coursePoolSection('biomedical-informatics', 'Biomedical Informatics', BIOMEDICAL_INFORMATICS),
    coursePoolSection('biophysics', 'Biophysics', BIOPHYSICS),
    coursePoolSection('biomedical-data-science', 'Biomedical Data Science', BIOMEDICAL_DATA_SCIENCE),
    coursePoolSection('cancer-biology', 'Cancer Biology', CANCER_BIOLOGY),
    coursePoolSection(
      'chemical-engineering',
      'Chemical Engineering',
      CHEMICAL_ENGINEERING,
      'CHEMENG 450 is cross-listed with BIOE 450 and may count only once.',
    ),
    coursePoolSection('chemical-systems-biology', 'Chemical and Systems Biology', CHEMICAL_SYSTEMS_BIOLOGY),
    coursePoolSection(
      'chemistry',
      'Chemistry',
      CHEMISTRY,
      'CHEM 181 may not count if CHEM 141 and CHEM 143 were also taken.',
    ),
    coursePoolSection('civil-environmental-engineering', 'Civil & Environmental Engineering', CIVIL_ENVIRONMENTAL_ENGINEERING),
    coursePoolSection('computer-science', 'Computer Science', COMPUTER_SCIENCE),
    coursePoolSection('developmental-biology', 'Developmental Biology', DEVELOPMENTAL_BIOLOGY),
    coursePoolSection(
      'earth-systems',
      'Earth Systems',
      EARTH_SYSTEMS,
      'EARTHSYS 151 and EARTHSYS 152 must be taken together. Cross-listed offerings may count only once.',
    ),
    coursePoolSection('energy', 'Energy', ENERGY),
    coursePoolSection(
      'earth-system-science',
      'Earth System Science',
      EARTH_SYSTEM_SCIENCE,
      'ESS 151 and ESS 152 must be taken together. Cross-listed offerings may count only once.',
    ),
    coursePoolSection('genetics', 'Genetics', GENETICS),
  ],
};
