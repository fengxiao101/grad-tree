// English Minor: Department of English, 2025-26
// Source: https://bulletin.stanford.edu/programs/ENGL-MIN/
// totalMinUnits: 25 (5 historical + 5 methodology + 15 electives)
// Only one Creative Writing course may count; only one IntroSem may count.
// One outside-dept course with substantial Anglophone literary content may count by petition.

import type { MajorConfig } from '../majorSchema';

export const ENGLISH_MINOR_2526: MajorConfig = {
  id: 'english-minor-2526',
  name: 'English (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 25,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/ENGL-MIN/',
  sections: [
    {
      id: 'english-historical',
      name: 'Historical Courses (5 units)',
      minUnits: 5,
      slots: [
        { id: 'english-hist', label: 'Historical Course', type: 'pick-from-list', count: 1,
          options: [
            { dept: 'ENGLISH', number: '10A', name: 'Introduction to English I: Encountering the Monstrous in Early Literature, 600-1600' },
            { dept: 'ENGLISH', number: '10B', name: 'Introduction to English I: What Is Literary History?' },
            { dept: 'ENGLISH', number: '10C', name: 'Introduction to English I: Tradition and Individuality, Medieval to Early Modern' },
            { dept: 'ENGLISH', number: '10D', name: 'Introduction to English I: Women, Gender, and Sexuality in Early British Literature' },
            { dept: 'ENGLISH', number: '10E', name: 'Intro to English I: Love and Death from Chaucer to Milton' },
            { dept: 'ENGLISH', number: '10F', name: 'Intro to English I: The Natural World in Early English Literary History' },
            { dept: 'ENGLISH', number: '10G', name: 'Intro to English I: Voice and Style in Medieval and Renaissance Literature' },
            { dept: 'ENGLISH', number: '11A', name: 'Introduction to English II: From Milton to the Romantics' },
            { dept: 'ENGLISH', number: '11B', name: 'Introduction to English II: American Literature and Culture to 1855' },
            { dept: 'ENGLISH', number: '11C', name: 'Introduction to English II: Revolutionary Energies (1640-1820)' },
            { dept: 'ENGLISH', number: '12A', name: 'Introduction to English III: Introduction to African American Literature' },
            { dept: 'ENGLISH', number: '12B', name: 'Introduction to English III: Literature and the Crises of Humanism' },
            { dept: 'ENGLISH', number: '12C', name: 'Introduction to English III: Modern Literature' },
            { dept: 'ENGLISH', number: '12D', name: 'Intro to English III: Latinx Literature' },
            { dept: 'ENGLISH', number: '12E', name: 'Introduction to English III: Introduction to Modern Literature: People, Politics, Place' },
            { dept: 'ENGLISH', number: '12F', name: 'Introduction to English III: Introduction to Asian American Literature: Fantastic Fictions' },
          ] },
      ],
    },
    {
      id: 'english-methodology',
      name: 'Methodology Courses (5 units)',
      minUnits: 5,
      slots: [
        { id: 'english-method', label: 'Methodology Course', type: 'pick-from-list', count: 1,
          options: [
            { dept: 'ENGLISH', number: '160', name: 'Poetry and Poetics' },
            { dept: 'ENGLISH', number: '161', name: 'Narrative and Narrative Theory' },
          ] },
      ],
    },
    {
      id: 'english-electives',
      name: 'Elective Courses (15 units)',
      minUnits: 15,
      unitOnly: true,
      note: 'Any course with an ENGLISH course number. Only one Creative Writing course may count, and only one IntroSem. One outside-dept course with substantial Anglophone literary content may count by petition to the Director of Undergraduate Studies.',
      slots: [
        { id: 'english-elec', label: 'English Electives', type: 'any-approved', options: [], count: 3 },
      ],
    },
  ],
};
