// Physics Minor, 2025-2026
// Source: https://bulletin.stanford.edu/programs/PHYS-MIN/
// 23 units minimum (intro physics sequence = exactly 23 units).
// Minor declaration deadline: 3 quarters before graduation.
// Students may place out of PHYSICS 41 and/or 43 via Physics Placement Diagnostic.
// PHYSICS 79L was offered as PHYSICS 89L prior to AY 2025-26 (89L credit satisfied by 79L).
// PHYSICS 81L is new AY 2025-26 (replaces 71L; 71L credit satisfied by 81L).
// Lab substitution: students with sufficient lab prep may substitute 1 extra advanced lab
//   (PHYSICS 100, 104/105, 106/107, or 108) for ALL 3 required intro labs: requires petition.

import type { MajorConfig } from '../majorSchema';

export const PHYS_MINOR_2526: MajorConfig = {
  id: 'phys-minor-2526',
  name: 'Physics (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/PHYS-MIN/',
  category: 'minor',
  totalMinUnits: 23,
  sections: [
    // ── Introductory Physics Lectures ─────────────────────────────────────────
    {
      id: 'intro-physics',
      name: 'Introductory Physics Lectures (all required)',
      note: 'Students may place out of PHYSICS 41 and/or 43 via the Physics Placement Diagnostic.',
      slots: [
        { id: 'phys41', label: 'PHYSICS 41: Mechanics', type: 'required',
          options: [{ dept: 'PHYSICS', number: '41' }] },
        { id: 'phys43', label: 'PHYSICS 43: Electricity and Magnetism', type: 'required',
          options: [{ dept: 'PHYSICS', number: '43' }] },
        { id: 'phys61', label: 'PHYSICS 61: Mechanics and Special Relativity', type: 'required',
          options: [{ dept: 'PHYSICS', number: '61' }] },
        { id: 'phys71', label: 'PHYSICS 71: Quantum and Thermal Physics', type: 'required',
          options: [{ dept: 'PHYSICS', number: '71' }] },
        { id: 'phys81', label: 'PHYSICS 81: Electricity and Magnetism Using Special Relativity and Vector Calculus',
          type: 'required',
          options: [{ dept: 'PHYSICS', number: '81' }] },
      ],
    },
    {
      id: 'intro-labs',
      name: 'Laboratory Requirement (choose standard labs or petitioned substitution)',
      slots: [],
      pickOneGroup: [
        {
          id: 'intro-labs-standard',
          name: 'Standard: all 3 introductory labs',
          slots: [
            { id: 'phys61l', label: 'PHYSICS 61L: Mechanics Laboratory', type: 'required',
              options: [{ dept: 'PHYSICS', number: '61L' }] },
            { id: 'phys79l', label: 'PHYSICS 79L / 89L: Introduction to Data Analysis, with Python and Jupyter',
              type: 'pick-one',
              note: 'PHYSICS 89L is the prior-year course number; 89L credit satisfies this requirement.',
              options: [
                { dept: 'PHYSICS', number: '79L' },
                { dept: 'PHYSICS', number: '89L' },
              ] },
            { id: 'phys81l', label: 'PHYSICS 81L / 71L: Experimental Practice / Modern Physics Laboratory',
              type: 'pick-one',
              note: 'PHYSICS 81L is new for AY 2025-26. 71L credit satisfies this requirement.',
              options: [
                { dept: 'PHYSICS', number: '81L' },
                { dept: 'PHYSICS', number: '71L' },
              ] },
          ],
        },
        {
          id: 'intro-labs-advanced-substitution',
          name: 'Petitioned substitution: 1 extra advanced lab replaces all 3 introductory labs',
          note: 'For students with sufficient lab preparation. Requires the Physics course substitution form. Taking one or two introductory labs does not reduce this extra advanced-lab requirement.',
          slots: [
            {
              id: 'phys-extra-advanced-lab',
              label: 'Extra Advanced Laboratory Course',
              type: 'pick-one',
              options: [
                { dept: 'PHYSICS', number: '100', name: 'Introduction to Observational Astrophysics' },
                { dept: 'PHYSICS', number: '104', name: 'Introduction to Electronic Techniques for Physics Research Instrumentation' },
                { dept: 'PHYSICS', number: '105', name: 'Former number for PHYSICS 104' },
                { dept: 'PHYSICS', number: '106', name: 'Experimental Methods in Quantum Physics' },
                { dept: 'PHYSICS', number: '107', name: 'Former number for PHYSICS 106' },
                { dept: 'PHYSICS', number: '108', name: 'Advanced Physics Laboratory: Project' },
              ],
            },
          ],
        },
      ],
    },

    // ── Math Prerequisite Series ───────────────────────────────────────────────
    {
      id: 'math-series',
      name: 'Math Prerequisite Series',
      phase: 'pre-major',
      allowDoubleCount: true,
      note: 'Complete one of the two math series: standard (MATH 51, 52, 53) or honors (MATH 61CM, 62CM, 63CM). These prerequisites do NOT count toward minor units and may overlap with major requirements.',
      slots: [],
      pickGroupCount: 1,
      pickOneGroup: [
        { id: 'math-50-series',
          name: 'MATH 51 + 52 + 53',
          slots: [
            { id: 'math51', label: 'MATH 51', type: 'required', options: [{ dept: 'MATH', number: '51', name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' }] },
            { id: 'math52', label: 'MATH 52', type: 'required', options: [{ dept: 'MATH', number: '52', name: 'Integral Calculus of Several Variables' }] },
            { id: 'math53', label: 'MATH 53', type: 'required', options: [{ dept: 'MATH', number: '53', name: 'Differential Equations with Linear Algebra, Fourier Methods, and Modern Applications' }] },
          ]
        },
        {
          id: 'math-60cm-series',
          name: 'MATH 61CM + 62CM + 63CM',
          slots: [
            { id: 'math61cm', label: 'MATH 61CM', type: 'required', options: [{ dept: 'MATH', number: '61CM', name: 'Modern Mathematics: Continuous Methods' }] },
            { id: 'math62cm', label: 'MATH 62CM', type: 'required', options: [{ dept: 'MATH', number: '62CM', name: 'Modern Mathematics: Continuous Methods' }] },
            { id: 'math63cm', label: 'MATH 63CM', type: 'required', options: [{ dept: 'MATH', number: '63CM', name: 'Modern Mathematics: Continuous Methods' }] },
          ],
        },
      ],
    },

    // ── Advanced Courses (at least 2) ─────────────────────────────────────────
    {
      id: 'advanced',
      name: 'Advanced Courses (choose 2)',
      note: 'Complete at least 2 courses from this list. Each Bulletin equivalence group may satisfy only one advanced-course requirement: PHYSICS 104/formerly 105, PHYSICS 106/formerly 107, and PHYSICS 111/MATH 131P. PHYSICS 111 or MATH 131P is required for many PHYSICS courses numbered 110 and above. Lab substitution policy: students with sufficient lab prep may substitute 1 extra advanced lab (PHYSICS 100, 104/105, 106/107, or 108) for all three introductory labs: requires course substitution form.',
      slots: [
        { id: 'adv-courses', label: 'Advanced Physics Courses (choose 2)', type: 'pick-from-list', count: 2,
          options: [
            { dept: 'PHYSICS', number: '100', name: 'Introduction to Observational Astrophysics' },
            { dept: 'PHYSICS', number: '104', name: 'Introduction to Electronic Techniques for Physics Research Instrumentation' },
            { dept: 'PHYSICS', number: '105', name: 'Intermediate Physics Laboratory I: Analog Electronics' },
            { dept: 'PHYSICS', number: '106', name: 'Experimental Methods in Quantum Physics' },
            { dept: 'PHYSICS', number: '107', name: 'Intermediate Physics Laboratory II: Experimental Techniques and Data Analysis' },
            { dept: 'PHYSICS', number: '108', name: 'Advanced Physics Laboratory: Project' },
            { dept: 'PHYSICS', number: '110', name: 'Advanced Mechanics' },
            { dept: 'PHYSICS', number: '111', name: 'Partial Differential Equations of Mathematical Physics' },
            { dept: 'MATH', number: '131P', name: 'Partial Differential Equations' },
            { dept: 'PHYSICS', number: '113', name: 'Computational Physics' },
            { dept: 'PHYSICS', number: '120', name: 'Electromagnetism' },
            { dept: 'PHYSICS', number: '121', name: 'Electrodynamics' },
            { dept: 'PHYSICS', number: '130', name: 'Quantum Mechanics I' },
            { dept: 'PHYSICS', number: '131', name: 'Quantum Mechanics II' },
            { dept: 'PHYSICS', number: '160', name: 'Introduction to Stellar and Galactic Astrophysics' },
            { dept: 'PHYSICS', number: '161', name: 'Introduction to Cosmology and Extragalactic Astrophysics' },
            { dept: 'PHYSICS', number: '170', name: 'Thermodynamics, Kinetic Theory, and Statistical Mechanics I' },
            { dept: 'PHYSICS', number: '171', name: 'Thermodynamics, Kinetic Theory, and Statistical Mechanics II' },
          ] },
      ],
    },
  ],
};
