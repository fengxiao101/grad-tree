// International Relations Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/INTLR-MIN/
// totalMinUnits: 30
// Structure: 5u core course + 20u specialization (1 of 11 pathways) + 5u additional IR coursework
// All courses must be taken for letter grade with C or better
// Up to 1u of non-letter-graded IR coursework may apply; up to 5u directed reading; up to 10u transfer credit (min B-)
// Students must complete the IR Minor Declaration and Course Proposal form

import type { MajorConfig } from '../majorSchema';

export const INTLR_MINOR_2526: MajorConfig = {
  id: 'intlr-minor-2526',
  name: 'International Relations (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 30,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/INTLR-MIN/',
  sections: [
    {
      id: 'intlr-core',
      name: 'Core Course (5 units)',
      minUnits: 5,
      note: 'Complete one course from one of the three categories below. All courses are 5 units.',
      slots: [
        {
          id: 'intlr-core-slot',
          label: 'IR Core Course',
          type: 'pick-from-list',
          count: 1,
          options: [
            // International Politics
            { dept: 'INTNLREL', number: '101', name: 'Introduction to International Relations' },
            // Comparative Governance
            { dept: 'INTNLREL', number: '102', name: 'History of the International System since 1914' },
            { dept: 'INTNLREL', number: '114D', name: 'Democracy, Development, and the Rule of Law' },
            // American Foreign Policy
            { dept: 'INTNLREL', number: '110C', name: 'America and the World Economy (WIM)' },
            { dept: 'POLISCI', number: '110X', name: 'America and the World Economy (Non-WIM)' },
            { dept: 'INTNLREL', number: '110D', name: 'War and Peace in American Foreign Policy (WIM)' },
            { dept: 'POLISCI', number: '110Y', name: 'War and Peace in American Foreign Policy (Non-WIM)' },
            { dept: 'INTNLREL', number: '154', name: 'The Cold War: An International History' },
            { dept: 'INTNLREL', number: '168', name: 'America as a World Power in the Modern Era' },
            { dept: 'INTNLREL', number: '168A', name: 'American Interventions, 1898-Present' },
            { dept: 'INTNLREL', number: '173', name: 'Presidents and Foreign Policy in Modern History' },
            { dept: 'INTNLREL', number: '174', name: 'Diplomacy on the Ground: Case Studies in the Challenges of Representing Your Country' },
          ],
          note: 'Three categories: (1) International Politics: INTNLREL 101; (2) Comparative Governance: INTNLREL 102 or 114D; (3) American Foreign Policy: remaining options.',
        },
      ],
    },
    { id: 'intlr-track-selector', name: 'Specialization (choose 1)', trackSelector: true, slots: [] },
    {
      id: 'intlr-additional',
      name: 'Additional IR Coursework (5 units)',
      note: 'Any pre-approved IR course or petitioned course. May include any IR specialization course.',
      minUnits: 5,
      unitOnly: true,
      slots: [
        {
          id: 'intlr-add-slot',
          label: 'Additional IR Course',
          type: 'any-approved',
          options: [],
          count: 10,
          optional: true,
        },
      ],
    },
  ],
  tracks: [
    {
      id: 'intlr-africa',
      name: 'Africa',
      minUnits: 20,
      sections: [
        {
          id: 'intlr-africa-courses',
          name: 'Africa Pathway (20 units)',
          minUnits: 20,
          unitOnly: true,
          note: 'Twenty units of approved coursework in the Africa pathway. See https://bulletin.stanford.edu/programs/INTLR-MIN/ for the full list of approved courses covering African politics, history, society, and development.',
          slots: [
            {
              id: 'intlr-africa-slot',
              label: 'Africa Pathway Course',
              type: 'any-approved',
              options: [],
              count: 10,
              optional: true,
            },
          ],
        },
      ],
    },
    {
      id: 'intlr-comp-gov',
      name: 'Comparative International Governance',
      minUnits: 20,
      sections: [
        {
          id: 'intlr-comp-gov-courses',
          name: 'Comparative International Governance Pathway (20 units)',
          minUnits: 20,
          unitOnly: true,
          note: 'Twenty units of approved coursework covering comparative governance, international organizations, EU, democratization, and global governance. See https://bulletin.stanford.edu/programs/INTLR-MIN/ for the full approved course list.',
          slots: [
            {
              id: 'intlr-comp-gov-slot',
              label: 'Comparative Governance Course',
              type: 'any-approved',
              options: [],
              count: 10,
              optional: true,
            },
          ],
        },
      ],
    },
    {
      id: 'intlr-east-south-asia',
      name: 'East and South Asia',
      minUnits: 20,
      sections: [
        {
          id: 'intlr-esa-courses',
          name: 'East and South Asia Pathway (20 units)',
          minUnits: 20,
          unitOnly: true,
          note: 'Twenty units of approved coursework covering Chinese, Japanese, Korean, South and Southeast Asian politics, history, and society. See https://bulletin.stanford.edu/programs/INTLR-MIN/ for the full approved course list.',
          slots: [
            {
              id: 'intlr-esa-slot',
              label: 'East/South Asia Course',
              type: 'any-approved',
              options: [],
              count: 10,
              optional: true,
            },
          ],
        },
      ],
    },
    {
      id: 'intlr-econ-dev',
      name: 'Economic Development / World Economy',
      minUnits: 20,
      sections: [
        {
          id: 'intlr-econ-dev-courses',
          name: 'Economic Development/World Economy Pathway (20 units)',
          minUnits: 20,
          unitOnly: true,
          note: 'Twenty units of approved coursework covering international trade, development economics, global finance, and political economy. See https://bulletin.stanford.edu/programs/INTLR-MIN/ for the full approved course list.',
          slots: [
            {
              id: 'intlr-econ-dev-slot',
              label: 'Economic Development/World Economy Course',
              type: 'any-approved',
              options: [],
              count: 10,
              optional: true,
            },
          ],
        },
      ],
    },
    {
      id: 'intlr-environment',
      name: 'Environment, Energy, and Natural Resources',
      minUnits: 20,
      sections: [
        {
          id: 'intlr-env-courses',
          name: 'Environment, Energy, and Natural Resources Pathway (20 units)',
          minUnits: 20,
          unitOnly: true,
          note: 'Twenty units of approved coursework covering environmental governance, climate policy, energy, and sustainability. See https://bulletin.stanford.edu/programs/INTLR-MIN/ for the full approved course list.',
          slots: [
            {
              id: 'intlr-env-slot',
              label: 'Environment/Energy/Natural Resources Course',
              type: 'any-approved',
              options: [],
              count: 10,
              optional: true,
            },
          ],
        },
      ],
    },
    {
      id: 'intlr-europe-russia',
      name: 'Europe (East and West) & Russia',
      minUnits: 20,
      sections: [
        {
          id: 'intlr-eur-courses',
          name: 'Europe & Russia Pathway (20 units)',
          minUnits: 20,
          unitOnly: true,
          note: 'Twenty units of approved coursework covering European politics, history, society, and culture, including EU studies and Russia. See https://bulletin.stanford.edu/programs/INTLR-MIN/ for the full approved course list.',
          slots: [
            {
              id: 'intlr-eur-slot',
              label: 'Europe/Russia Course',
              type: 'any-approved',
              options: [],
              count: 10,
              optional: true,
            },
          ],
        },
      ],
    },
    {
      id: 'intlr-intl-history',
      name: 'International History and Culture',
      minUnits: 20,
      sections: [
        {
          id: 'intlr-history-courses',
          name: 'International History and Culture Pathway (20 units)',
          minUnits: 20,
          unitOnly: true,
          note: 'Twenty units of approved coursework covering world history, cross-cultural studies, and international cultural topics. See https://bulletin.stanford.edu/programs/INTLR-MIN/ for the full approved course list.',
          slots: [
            {
              id: 'intlr-history-slot',
              label: 'International History/Culture Course',
              type: 'any-approved',
              options: [],
              count: 10,
              optional: true,
            },
          ],
        },
      ],
    },
    {
      id: 'intlr-security',
      name: 'International Security',
      minUnits: 20,
      sections: [
        {
          id: 'intlr-security-courses',
          name: 'International Security Pathway (20 units)',
          minUnits: 20,
          unitOnly: true,
          note: 'Twenty units of approved coursework covering war and peace, military history, intelligence, arms control, and cybersecurity. See https://bulletin.stanford.edu/programs/INTLR-MIN/ for the full approved course list.',
          slots: [
            {
              id: 'intlr-security-slot',
              label: 'International Security Course',
              type: 'any-approved',
              options: [],
              count: 10,
              optional: true,
            },
          ],
        },
      ],
    },
    {
      id: 'intlr-latin-america',
      name: 'Latin America and Iberian Studies',
      minUnits: 20,
      sections: [
        {
          id: 'intlr-latam-courses',
          name: 'Latin America and Iberian Studies Pathway (20 units)',
          minUnits: 20,
          unitOnly: true,
          note: 'Twenty units of approved coursework covering Latin American and Iberian politics, history, and culture. See https://bulletin.stanford.edu/programs/INTLR-MIN/ for the full approved course list.',
          slots: [
            {
              id: 'intlr-latam-slot',
              label: 'Latin America/Iberian Studies Course',
              type: 'any-approved',
              options: [],
              count: 10,
              optional: true,
            },
          ],
        },
      ],
    },
    {
      id: 'intlr-middle-east',
      name: 'Middle East and Central Asia',
      minUnits: 20,
      sections: [
        {
          id: 'intlr-me-courses',
          name: 'Middle East and Central Asia Pathway (20 units)',
          minUnits: 20,
          unitOnly: true,
          note: 'Twenty units of approved coursework covering Middle Eastern and Central Asian politics, history, religion, and society. See https://bulletin.stanford.edu/programs/INTLR-MIN/ for the full approved course list.',
          slots: [
            {
              id: 'intlr-me-slot',
              label: 'Middle East/Central Asia Course',
              type: 'any-approved',
              options: [],
              count: 10,
              optional: true,
            },
          ],
        },
      ],
    },
    {
      id: 'intlr-social-dev',
      name: 'Social Development / Human Well-Being',
      minUnits: 20,
      sections: [
        {
          id: 'intlr-social-courses',
          name: 'Social Development/Human Well-Being Pathway (20 units)',
          minUnits: 20,
          unitOnly: true,
          note: 'Twenty units of approved coursework covering human rights, humanitarian issues, global health, development, and social justice. See https://bulletin.stanford.edu/programs/INTLR-MIN/ for the full approved course list.',
          slots: [
            {
              id: 'intlr-social-slot',
              label: 'Social Development/Human Well-Being Course',
              type: 'any-approved',
              options: [],
              count: 10,
              optional: true,
            },
          ],
        },
      ],
    },
  ],
};
