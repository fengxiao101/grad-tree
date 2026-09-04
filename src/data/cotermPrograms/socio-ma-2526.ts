import type { MajorConfig } from '../majorSchema';

export const SOCIO_MA_2526: MajorConfig = {
  id: 'socio-ma-2526',
  name: 'Sociology MA (Coterm)',
  school: 'School of Humanities and Sciences',
  year: '2025-26',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/SOCIO-MA/',
  category: 'coterm',
  totalMinUnits: 45,
  sections: [
    {
      id: 'core',
      name: 'Core Requirements',
      note: 'Required for all coterminal students. Students who previously completed the 100-level counterparts as a Sociology BA may substitute those equivalents.',
      slots: [
        {
          id: 'soc270',
          label: 'Classics of Modern Social Theory',
          type: 'required',
          options: [{ dept: 'SOC', number: '270' }],
        },
        {
          id: 'soc280a',
          label: 'Foundations of Social Research',
          type: 'required',
          options: [{ dept: 'SOC', number: '280A' }],
        },
      ],
    },
    {
      id: 'program-coursework',
      name: 'Program Coursework',
      minUnits: 37,
      note: 'Remaining units to reach 45 total. All units must be 100-level or above; at least 23 of all 45 units must be 200-level or above. All courses taken for a letter grade; GPA 3.0+ required. Constraints: max 5 units from other Social Sciences departments (Anthropology, Communications, Economics, Political Science, Psychology); max 5 units independent study (SOC290) for standard track, or up to 18 units across SOC290/291/292 for approved research track; max 12 units total across SOC290 series for standard track. Strongly encouraged: SOC202, SOC204, SOC280B. All non-SOC courses require advance advisor approval. Workshops and colloquia do not count toward the degree.',
      slots: [
        {
          id: 'soc-coursework',
          label: 'SOC courses and advisor-approved electives',
          type: 'any-approved',
          minUnits: 37,
          listUrl: 'https://bulletin.stanford.edu/programs/SOCIO-MA/',
          options: [],
        },
      ],
    },
  ],
};
