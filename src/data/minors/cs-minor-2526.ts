// CS Minor, 2025-2026
// Source: https://bulletin.stanford.edu/programs/CS-MIN
// 26 units minimum. Min GPA 2.0 in minor courses.
// NO double-counting: CS 103 and CS 109 cannot fulfill math/other requirements in another degree program.
// Students using CS 103, 107, or 109 in their MAJOR may pick an additional elective as replacement.
// AP credit may satisfy CS 106B intro requirement.

import type { MajorConfig } from '../majorSchema';

export const CS_MINOR_2526: MajorConfig = {
  id: 'cs-minor-2526',
  name: 'CS (Minor)',
  school: 'School of Engineering',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/CS-MIN/',
  category: 'minor',
  totalMinUnits: 26,
  sections: [
    {
      id: 'math-prerequisite',
      name: 'Required Mathematics Prerequisite',
      phase: 'pre-major',
      note: 'Required prerequisite for the minor. Prerequisite units do not count toward the 26-unit minor.',
      slots: [
        { id: 'math51-or-cme100', label: 'Linear Algebra and Multivariable Calculus', type: 'pick-one',
          options: [
            { dept: 'MATH', number: '51' },
            { dept: 'CME', number: '100' },
          ] },
      ],
    },
    // ── Introductory Programming ───────────────────────────────────────────────
    {
      id: 'intro-prog',
      name: 'Introductory Programming',
      minCourses: 1,
      note: 'AP credit may be used. Students with no background start with CS 106A then 106B (7 courses total for the minor).',
      slots: [
        { id: 'cs106b', label: 'Programming Abstractions', type: 'required',
          options: [{ dept: 'CS', number: '106B' }] },
      ],
    },

    // ── Core (all 3 required) ──────────────────────────────────────────────────
    {
      id: 'core',
      name: 'Core (all 3 required)',
      note: 'CS 103 and CS 109 may NOT be used to fulfill math or other requirements in another degree program. If a student already uses CS 103, 107, or 109 for their major, they may substitute an additional elective.',
      slots: [
        { id: 'cs103', label: 'CS 103: Mathematical Foundations of Computing', type: 'required',
          options: [{ dept: 'CS', number: '103' }] },
        { id: 'cs107', label: 'CS 107 / 107E: Computer Organization and Systems', type: 'pick-one',
          options: [
            { dept: 'CS', number: '107' },
            { dept: 'CS', number: '107E' },
          ] },
        { id: 'cs109', label: 'CS 109: Probability for Computer Scientists', type: 'required',
          options: [{ dept: 'CS', number: '109' }] },
      ],
    },

    // ── Electives (2 from different areas) ────────────────────────────────────
    {
      id: 'electives',
      name: 'Electives (2 courses from 2 different areas)',
      note: 'Choose 2 courses from different areas. No more than 1 course per area. Areas: AI, HCI, Systems, Theory, Visual Computing, Computational Biology.',
      slots: [],
      pickGroupCount: 2,
      pickOneGroup: [
        { id: 'ai-area', name: 'Artificial Intelligence', slots: [
          { id: 'ai-elective', label: 'Artificial Intelligence Elective', type: 'pick-one', options: [
            { dept: 'CS', number: '129' }, { dept: 'CS', number: '131' },
            { dept: 'CS', number: '221' }, { dept: 'CS', number: '229' },
          ] },
        ] },
        { id: 'hci-area', name: 'Human-Computer Interaction', slots: [
          { id: 'hci-elective', label: 'Human-Computer Interaction Elective', type: 'pick-one', options: [
            { dept: 'CS', number: '147' }, { dept: 'CS', number: '177' },
            { dept: 'CS', number: '247' }, { dept: 'CS', number: '247A' },
            { dept: 'CS', number: '247B' }, { dept: 'CS', number: '247E' },
            { dept: 'CS', number: '247G' }, { dept: 'CS', number: '247I' },
            { dept: 'CS', number: '247S' },
          ] },
        ] },
        { id: 'systems-area', name: 'Systems', slots: [
          { id: 'systems-elective', label: 'Systems Elective', type: 'pick-one', options: [
            { dept: 'CS', number: '111' }, { dept: 'CS', number: '145' },
            { dept: 'CS', number: '155' },
          ] },
        ] },
        { id: 'theory-area', name: 'Theory', slots: [
          { id: 'theory-elective', label: 'Theory Elective', type: 'pick-one', options: [
            { dept: 'CS', number: '154' }, { dept: 'CS', number: '157' },
            { dept: 'CS', number: '161' },
          ] },
        ] },
        { id: 'visual-computing-area', name: 'Visual Computing', slots: [
          { id: 'visual-computing-elective', label: 'Visual Computing Elective', type: 'pick-one', options: [
            { dept: 'CS', number: '148' }, { dept: 'CS', number: '248A' },
            { dept: 'CS', number: '248B' },
          ] },
        ] },
        { id: 'computational-biology-area', name: 'Computational Biology', slots: [
          { id: 'computational-biology-elective', label: 'Computational Biology Elective', type: 'pick-one', options: [
            { dept: 'CS', number: '173A' }, { dept: 'CS', number: '279' },
          ] },
        ] },
      ],
    },
  ],
};
