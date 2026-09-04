// Film and Media Studies Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/FILM-MIN/
// totalMinUnits: 29 (4 core + 3 electives, 7 courses total)
// Note: up to 2 FILMPROD courses may count as electives; Art Practice courses may NOT count
// Students must enroll under FILMEDIA listing for cross-listed courses
// Minor must be declared ≥3 quarters before degree conferral

import type { MajorConfig } from '../majorSchema';

const FILMEDIA_ELECTIVES = [
  { dept: 'FILMEDIA', number: '50Q', name: 'The Video Essay: Writing with Video about Media and Culture' },
  { dept: 'FILMEDIA', number: '101', name: 'Close Cinematic Analysis: Caste, Sexuality, and Religion in Indian Media' },
  { dept: 'FILMEDIA', number: '107N', name: 'Documentary Film: Telling it Like it Is?' },
  { dept: 'FILMEDIA', number: '110N', name: 'Coming-of-Age Movies' },
  { dept: 'FILMEDIA', number: '114', name: 'Reading Comics' },
  { dept: 'FILMEDIA', number: '115', name: 'Documentary Issues and Traditions' },
  { dept: 'FILMEDIA', number: '119', name: 'Science Fiction: Cyborgs & Human Simulacra in the Cinema' },
  { dept: 'FILMEDIA', number: '120', name: 'Superhero Theory' },
  { dept: 'FILMEDIA', number: '125', name: 'Horror Film' },
  { dept: 'FILMEDIA', number: '129', name: 'Animation and the Animated Film' },
  { dept: 'FILMEDIA', number: '132A', name: 'Bollywood and Beyond: An Introduction to Indian Cinema' },
  { dept: 'FILMEDIA', number: '135', name: 'Around the World in Ten Films' },
  { dept: 'FILMEDIA', number: '210', name: 'Documentary Perspectives I' },
  { dept: 'FILMEDIA', number: '211', name: 'Documentary Perspectives II' },
  { dept: 'FILMEDIA', number: '216', name: 'Media and the Environment' },
  { dept: 'FILMEDIA', number: '233', name: "Let's Make a Monster: Critical Making" },
  { dept: 'FILMEDIA', number: '245B', name: 'Eastern European Cinema' },
  { dept: 'FILMEDIA', number: '256', name: 'Horror Comics' },
  { dept: 'FILMEDIA', number: '259', name: 'Game Studies' },
  { dept: 'FILMEDIA', number: '281', name: 'Contemporary Asian Filmmakers' },
];

const FILMPROD_ELECTIVES = [
  { dept: 'FILMPROD', number: '101', name: 'Screen Writing I: Visual Writing' },
  { dept: 'FILMPROD', number: '101T', name: 'Writing the Television Pilot' },
  { dept: 'FILMPROD', number: '102', name: "Topics in Screenwriting: Inside the Writers' Room" },
  { dept: 'FILMPROD', number: '103', name: 'Adaptation' },
  { dept: 'FILMPROD', number: '104', name: 'Screenwriting II: Intermediate Screenwriting' },
  { dept: 'FILMPROD', number: '105', name: 'Script Analysis' },
  { dept: 'FILMPROD', number: '107', name: 'Industry Immersion: Film and Media' },
  { dept: 'FILMPROD', number: '114', name: 'Introduction to Film and Video Production' },
  { dept: 'FILMPROD', number: '116', name: 'Script to Screen' },
  { dept: 'FILMPROD', number: '118', name: 'Remixing the Moving Image' },
];

const OUTSIDE_ELECTIVES = [
  { dept: 'COMM', number: '1B', name: 'Media, Culture, and Society' },
  { dept: 'MLA', number: '389', name: 'Childish Enthusiasms and Perishable Manias' },
];

export const FILM_MINOR_2526: MajorConfig = {
  id: 'film-minor-2526',
  name: 'Film and Media Studies (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 29,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/FILM-MIN/',
  sections: [
    {
      id: 'film-required',
      name: 'Required Core Courses (4 courses)',
      note: 'All courses must be taken for a letter grade. FMS minors should enroll under the FILMEDIA course listing for cross-listed courses. Students must attend an Art & Architecture Library orientation session after declaring the minor.',
      slots: [
        {
          id: 'film-4',
          label: 'FILMEDIA 4: Introduction to Film Study',
          type: 'required',
          options: [{ dept: 'FILMEDIA', number: '4', name: 'Introduction to Film Study' }],
        },
        {
          id: 'film-6',
          label: 'FILMEDIA 6: Media and Mediums',
          type: 'required',
          options: [{ dept: 'FILMEDIA', number: '6', name: 'Media and Mediums' }],
        },
        {
          id: 'film-102',
          label: 'FILMEDIA 102: Theories of the Moving Image',
          type: 'required',
          options: [{ dept: 'FILMEDIA', number: '102', name: 'Theories of the Moving Image: The Technologically Mediated Image' }],
        },
        {
          id: 'film-history',
          label: 'History of World Cinema (pick one)',
          type: 'pick-one',
          options: [
            { dept: 'FILMEDIA', number: '100A', name: 'History of World Cinema I: Silent Film' },
            { dept: 'FILMEDIA', number: '100B', name: 'History of World Cinema II: Film as Industrial Art' },
            { dept: 'FILMEDIA', number: '100C', name: 'History of World Cinema III: Queer Cinema around the World' },
          ],
        },
      ],
    },
    {
      id: 'film-electives',
      name: 'Elective Courses (3 courses)',
      note: 'No more than one elective may come from another department (minor advisor must approve for its stress on film analysis methods). Up to two Film Production (FILMPROD) courses may count. Art Practice courses may NOT be used.',
      slots: [],
      pickOneGroup: [
        {
          id: 'film-electives-all-filmmedia',
          name: '3 Film and Media Studies electives',
          slots: [{ id: 'film-elec-fm3', label: 'FILMEDIA Elective', type: 'pick-from-list', count: 3, options: FILMEDIA_ELECTIVES }],
        },
        {
          id: 'film-electives-one-production',
          name: '2 Film and Media Studies + 1 Film Production',
          slots: [
            { id: 'film-elec-fm2p', label: 'FILMEDIA Elective', type: 'pick-from-list', count: 2, options: FILMEDIA_ELECTIVES },
            { id: 'film-elec-p1', label: 'FILMPROD Elective', type: 'pick-one', options: FILMPROD_ELECTIVES },
          ],
        },
        {
          id: 'film-electives-two-production',
          name: '1 Film and Media Studies + 2 Film Production',
          slots: [
            { id: 'film-elec-fm1p2', label: 'FILMEDIA Elective', type: 'pick-one', options: FILMEDIA_ELECTIVES },
            { id: 'film-elec-p2', label: 'FILMPROD Elective', type: 'pick-from-list', count: 2, options: FILMPROD_ELECTIVES },
          ],
        },
        {
          id: 'film-electives-one-outside',
          name: '2 Film and Media Studies + 1 approved outside elective',
          slots: [
            { id: 'film-elec-fm2o', label: 'FILMEDIA Elective', type: 'pick-from-list', count: 2, options: FILMEDIA_ELECTIVES },
            { id: 'film-elec-o1', label: 'Approved Outside-Department Elective', type: 'pick-one', options: OUTSIDE_ELECTIVES },
          ],
        },
        {
          id: 'film-electives-production-outside',
          name: '1 Film and Media Studies + 1 Film Production + 1 approved outside elective',
          slots: [
            { id: 'film-elec-fm1po', label: 'FILMEDIA Elective', type: 'pick-one', options: FILMEDIA_ELECTIVES },
            { id: 'film-elec-p1o', label: 'FILMPROD Elective', type: 'pick-one', options: FILMPROD_ELECTIVES },
            { id: 'film-elec-o1p', label: 'Approved Outside-Department Elective', type: 'pick-one', options: OUTSIDE_ELECTIVES },
          ],
        },
        {
          id: 'film-electives-two-production-outside',
          name: '2 Film Production + 1 approved outside elective',
          slots: [
            { id: 'film-elec-p2o', label: 'FILMPROD Elective', type: 'pick-from-list', count: 2, options: FILMPROD_ELECTIVES },
            { id: 'film-elec-o1p2', label: 'Approved Outside-Department Elective', type: 'pick-one', options: OUTSIDE_ELECTIVES },
          ],
        },
      ],
    },
  ],
};
