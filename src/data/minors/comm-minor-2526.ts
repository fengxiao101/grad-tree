// Communication Minor: Department of Communication, 2025-26
// Source: https://bulletin.stanford.edu/programs/COMMU-MIN/
// totalMinUnits: 35. The detailed requirements twice specify 35 required units;
// the Bulletin's 30-unit header is inconsistent with its curriculum text.
// Must complete STATS 60 concurrently with COMM 106 (stats course does NOT count toward minor units).
// ≥C- in all COMM courses; GPA ≥2.0 in courses toward minor. No more than 5 units from outside COMM.

import type { MajorConfig } from '../majorSchema';

export const COMM_MINOR_2526: MajorConfig = {
  id: 'comm-minor-2526',
  name: 'Communication (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 35,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/COMMU-MIN/',
  sections: [
    {
      id: 'comm-core',
      name: 'Core',
      note: 'Must complete STATS 60 (Introduction to Statistical Methods) concurrently with COMM 106. STATS 60 does NOT count toward minor units.',
      slots: [
        { id: 'comm-intro', label: 'Introduction to Communication', type: 'pick-one',
          options: [
            { dept: 'COMM', number: '1', name: 'Introduction to Communication' },
            { dept: 'COMM', number: '1B', name: 'Media, Culture, and Society' },
          ] },
        { id: 'comm-106', label: 'COMM 106: Communication Research Methods', type: 'required',
          options: [{ dept: 'COMM', number: '106', name: 'Communication Research Methods' }] },
        { id: 'comm-108', label: 'COMM 108: Media Processes and Effects', type: 'required',
          options: [{ dept: 'COMM', number: '108', name: 'Media Processes and Effects' }] },
      ],
    },
    {
      id: 'comm-area-i',
      name: 'Area I: Communication Processes and Effects',
      slots: [
        { id: 'comm-area-i-pick', label: 'Area I Course', type: 'pick-one',
          options: [
            { dept: 'COMM', number: '124', name: 'Truth, Trust, and Tech' },
            { dept: 'COMM', number: '135W', name: 'Deliberative Democracy and its Critics' },
            { dept: 'COMM', number: '137W', name: 'The Dialogue of Democracy' },
            { dept: 'COMM', number: '162', name: 'Campaigns, Voting, Media, and Elections' },
            { dept: 'COMM', number: '164', name: 'The Psychology of Communication About Politics in America' },
            { dept: 'COMM', number: '166', name: 'Virtual People' },
            { dept: 'COMM', number: '172', name: 'Media Psychology' },
            { dept: 'COMM', number: '326', name: 'Advanced Topics in Human Virtual Representation' },
          ] },
      ],
    },
    {
      id: 'comm-area-ii',
      name: 'Area II: Communication Systems / Institutions',
      slots: [
        { id: 'comm-area-ii-pick', label: 'Area II Course', type: 'pick-one',
          options: [
            { dept: 'COMM', number: '104W', name: 'Reporting, Writing, and Understanding the News' },
            { dept: 'COMM', number: '116', name: 'Journalism Law' },
            { dept: 'COMM', number: '120W', name: 'The Rise of Digital Culture' },
            { dept: 'COMM', number: '125', name: 'Perspectives on American Journalism' },
            { dept: 'COMM', number: '151', name: 'The First Amendment: Freedom of Speech and Press' },
            { dept: 'COMM', number: '152A', name: 'Governing Artificial Intelligence: Law, Policy, and Institutions' },
            { dept: 'COMM', number: '154', name: 'The Politics of Algorithms' },
            { dept: 'COMM', number: '158', name: 'Censorship and Propaganda' },
            { dept: 'COMM', number: '177A', name: 'News Frontiers' },
            { dept: 'COMM', number: '177B', name: 'Big Local Journalism' },
            { dept: 'COMM', number: '177C', name: 'Science and Environmental Journalism' },
            { dept: 'COMM', number: '177D', name: 'Specialized Writing and Reporting: Narrative Journalism' },
            { dept: 'COMM', number: '177E', name: 'Specialized Writing and Reporting: Telling True Stories' },
            { dept: 'COMM', number: '177I', name: 'Investigative Watchdog Reporting' },
            { dept: 'COMM', number: '177M', name: 'Environmental Storytelling' },
            { dept: 'COMM', number: '177SW', name: 'Specialized Writing and Reporting: Sports Journalism' },
            { dept: 'COMM', number: '177T', name: 'Building News Applications' },
            { dept: 'COMM', number: '177Y', name: 'Specialized Writing and Reporting: Foreign Correspondence' },
            { dept: 'COMM', number: '178A', name: 'Artificial Intelligence (AI) and Journalism' },
            { dept: 'COMM', number: '184', name: 'Race and Media' },
            { dept: 'COMM', number: '186W', name: 'Media, Technology, and the Body' },
          ] },
      ],
    },
    {
      id: 'comm-electives',
      name: 'Electives',
      note: 'Any COMM courses, or up to 5 units from pre-approved courses in other departments (see department website). Minors may petition to count unapproved courses. All courses must be taken for letter grade (unless only S/NC offered).',
      slots: [
        { id: 'comm-elec', label: 'Communication Electives', type: 'any-approved', options: [] },
      ],
    },
  ],
};
