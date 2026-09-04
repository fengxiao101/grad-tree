// Ethics in Society Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/ETHSO-MIN/
// totalMinUnits: 25 (6 courses)
// NO double-counting between Ethics in Society minors and other academic programs
// Students cannot both earn this minor AND enroll in the Ethics in Society Honors Program
// Two tracks: General Track and Ethics & Technology Subplan

import type { MajorConfig } from '../majorSchema';

export const ETHSO_MINOR_2526: MajorConfig = {
  id: 'ethso-minor-2526',
  name: 'Ethics in Society (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 25,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/ETHSO-MIN/',
  sections: [
    { id: 'ethso-track-selector', name: 'Subplan (choose 1)', trackSelector: true, slots: [] },
  ],
  tracks: [
    {
      id: 'ethso-general',
      name: 'General Track',
      sections: [
        {
          id: 'ethso-pol-phil',
          name: 'Political Philosophy (1 course, 4-5 units)',
          minUnits: 4,
          slots: [
            {
              id: 'ethso-pol',
              label: 'Political Philosophy',
              type: 'pick-one',
              minUnits: 4,
              options: [
                { dept: 'ETHICSOC', number: '171', name: 'Justice' },
                { dept: 'ETHICSOC', number: '174L', name: 'Justice Across Borders' },
              ],
            },
          ],
        },
        {
          id: 'ethso-moral-phil',
          name: 'Moral Philosophy (1 course, 4-5 units)',
          minUnits: 4,
          slots: [
            {
              id: 'ethso-moral',
              label: 'Moral Philosophy',
              type: 'pick-one',
              minUnits: 4,
              options: [
                { dept: 'ETHICSOC', number: '20', name: 'Introduction to Moral Philosophy' },
                { dept: 'ETHICSOC', number: '170', name: 'Ethical Theory' },
                { dept: 'ETHICSOC', number: '178M', name: 'Introduction to Environmental Ethics' },
                { dept: 'ETHICSOC', number: '185M', name: 'Contemporary Moral Problems' },
              ],
            },
          ],
        },
        {
          id: 'ethso-gen-ethicsoc',
          name: 'ETHICSOC Electives (2-3 courses, ≥8 units)',
          note: 'Two or three ETHICSOC courses at the 100-level or above, minimum 3 units each, totaling ≥8 units. Must be taken for a letter grade. Organize coursework around a central theme (e.g., environmental ethics, ethics and technology, ethics and health care).',
          minUnits: 8,
          slots: [
            {
              id: 'ethso-gen-ethicsoc-slot',
              label: 'ETHICSOC Elective (100+)',
              type: 'any-approved',
              options: [],
              count: 2,
              minLevel: 100,
              minUnits: 6,
            },
            {
              id: 'ethso-gen-ethicsoc-third',
              label: 'Optional Third ETHICSOC Elective (100+)',
              type: 'any-approved',
              options: [],
              minLevel: 100,
              minUnits: 3,
              optional: true,
              note: 'Use when a third ETHICSOC elective is needed or desired to reach the 8-unit section minimum.',
            },
          ],
        },
        {
          id: 'ethso-gen-univ',
          name: 'University-Wide Electives (2-3 courses, ≥8 units)',
          note: 'Two or three courses at the 100-level or above addressing moral or political problems in theory or practice, totaling ≥8 units. May be other ETHICSOC offerings or courses with substantial ethical content in any department. Must be pre-approved by the Student Services Specialist. Ethical Reasoning courses fitting the student\'s thematic focus may count.',
          minUnits: 8,
          slots: [
            {
              id: 'ethso-gen-univ-slot',
              label: 'University-Wide Elective (100+)',
              type: 'any-approved',
              options: [],
              count: 2,
              minLevel: 100,
              minUnits: 6,
            },
            {
              id: 'ethso-gen-univ-third',
              label: 'Optional Third University-Wide Elective (100+)',
              type: 'any-approved',
              options: [],
              minLevel: 100,
              minUnits: 3,
              optional: true,
              note: 'Use when a third approved elective is needed or desired to reach the 8-unit section minimum.',
            },
          ],
        },
      ],
    },
    {
      id: 'ethso-tech',
      name: 'Ethics and Technology Subplan',
      sections: [
        {
          id: 'ethso-tech-phil',
          name: 'Moral/Political Philosophy (1 course, 4-5 units)',
          minUnits: 4,
          slots: [
            {
              id: 'ethso-tech-moral',
              label: 'Moral/Political Philosophy',
              type: 'pick-one',
              minUnits: 4,
              options: [
                { dept: 'ETHICSOC', number: '20', name: 'Introduction to Moral Philosophy' },
                { dept: 'ETHICSOC', number: '170', name: 'Ethical Theory' },
                { dept: 'ETHICSOC', number: '171', name: 'Justice' },
                { dept: 'ETHICSOC', number: '174L', name: 'Justice Across Borders' },
                { dept: 'ETHICSOC', number: '178M', name: 'Introduction to Environmental Ethics' },
                { dept: 'ETHICSOC', number: '185M', name: 'Contemporary Moral Problems' },
              ],
            },
          ],
        },
        {
          id: 'ethso-tech-course',
          name: 'Ethics and Technology Course (1 course, 4-5 units)',
          minUnits: 4,
          slots: [
            {
              id: 'ethso-tech-et',
              label: 'Ethics and Technology',
              type: 'pick-one',
              minUnits: 4,
              options: [
                { dept: 'ETHICSOC', number: '131X', name: 'Ethics in Bioengineering' },
                { dept: 'ETHICSOC', number: '151C', name: 'Ethical STEM: Race, Justice, and Embodied Practice' },
                { dept: 'ETHICSOC', number: '182', name: 'Ethics, Public Policy, and Technological Change' },
              ],
            },
          ],
        },
        {
          id: 'ethso-tech-ethicsoc-elec',
          name: 'ETHICSOC Elective (1 course, 4-5 units, 100-level+)',
          minUnits: 4,
          slots: [
            {
              id: 'ethso-tech-ethicsoc',
              label: 'ETHICSOC Elective (100+)',
              type: 'any-approved',
              options: [],
              count: 1,
              minLevel: 100,
              minUnits: 4,
            },
          ],
        },
        {
          id: 'ethso-tech-et-elecs',
          name: 'Ethics & Technology Electives (3 courses, ≥8 units)',
          note: 'Three electives covering technology, human values, and social impact. Must total ≥8 units, each ≥3 units, taken for a letter grade. Other courses may be submitted to the Student Services Specialist for approval.',
          minUnits: 8,
          slots: [
            {
              id: 'ethso-tech-et-slot',
              label: 'Ethics & Technology Elective',
              type: 'pick-from-list',
              count: 3,
              minUnits: 9,
              options: [
                { dept: 'BIO', number: '4N', name: 'The Science and Ethics of Personalized Genomic Medicine' },
                { dept: 'BIOE', number: '122', name: 'BioSecurity and Pandemic Resilience' },
                { dept: 'BIOE', number: '177', name: 'Inventing the Future' },
                { dept: 'COMM', number: '124', name: 'Truth, Trust, and Tech' },
                { dept: 'COMM', number: '154', name: 'The Politics of Algorithms' },
                { dept: 'CS', number: '152', name: 'Trust and Safety' },
                { dept: 'CS', number: '181', name: 'Computers, Ethics, and Public Policy' },
                { dept: 'ENGR', number: '110', name: 'Perspectives in Assistive Technology' },
                { dept: 'ENGR', number: '148', name: 'Principled Entrepreneurial Decisions' },
                { dept: 'GENE', number: '104Q', name: 'Law and the Biosciences' },
                { dept: 'HUMBIO', number: '174', name: 'Foundations of Bioethics' },
                { dept: 'INTLPOL', number: '268', name: 'Hack Lab: Introduction to Cybersecurity' },
                { dept: 'INTLPOL', number: '256', name: 'Technology and National Security' },
                { dept: 'MED', number: '73N', name: 'Scientific Method and Bias' },
                { dept: 'MS&E', number: '296', name: 'Technology, Innovation and Great Power Competition' },
                { dept: 'MS&E', number: '254', name: 'The Ethical Analyst' },
                { dept: 'NBIO', number: '101', name: 'Social and Ethical Issues in the Neurosciences' },
                { dept: 'PHIL', number: '20N', name: 'Philosophy of Artificial Intelligence' },
                { dept: 'PHIL', number: '60', name: 'Introduction to Philosophy of Science' },
                { dept: 'POLISCI', number: '114S', name: 'International Security in a Changing World' },
                { dept: 'PUBLPOL', number: '103F', name: 'Ethics of Truth in a Post-Truth World' },
                { dept: 'PUBLPOL', number: '134', name: 'Ethics on the Edge: Business, Non-Profit Organizations, Government, and Individuals' },
                { dept: 'STS', number: '1', name: 'Introduction to Science, Technology & Society' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
