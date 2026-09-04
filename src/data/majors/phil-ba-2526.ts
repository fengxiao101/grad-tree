// Philosophy BA, 2025-2026
// Source: https://bulletin.stanford.edu/programs/PHILO-BA/
// totalMinUnits: 60 (standard); 61 (HPS subplan); 65 (Philosophy & Literary Thought subplan)
// Three paths: Standard, History & Philosophy of Science (HPS), Philosophy & Literary Thought
// WIM: PHIL 80 (Mind, Matter, and Meaning)
// Capstone: PHIL 194 series
// All breadth courses must be taken for ≥3 units, grade C- or higher
// Depth electives: any PHIL 10+, excluding 196-199; ≥9 units must be PHIL 99+

import type { MajorConfig, CourseOption } from '../majorSchema';

const LOGIC_COURSES: CourseOption[] = [
  { dept: 'PHIL', number: '49',  name: 'Survey of Formal Methods' },
  { dept: 'PHIL', number: '150', name: 'Mathematical Logic' },
  { dept: 'PHIL', number: '151', name: 'Metalogic' },
  { dept: 'PHIL', number: '154', name: 'Modal Logic' },
];

export const PHIL_BA_2526: MajorConfig = {
  id: 'phil-ba-2526',
  name: 'Philosophy (BA)',
  school: 'Department of Philosophy',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/PHILO-BA/',
  category: 'major',
  totalMinUnits: 60,

  wimCourses: [
    { dept: 'PHIL', number: '80', name: 'Mind, Matter, and Meaning' },
  ],

  sections: [
    // ── Shared across all paths ───────────────────────────────────────────────
    {
      id: 'intro',
      name: 'Introductory Course',
      note: 'Complete at least one introductory philosophy course (PHIL 1–99) before declaring. This requirement is separate from the WIM course.',
      slots: [
        {
          id: 'intro-slot',
          label: 'Introductory Philosophy Course (PHIL 1–99)',
          type: 'any-approved',
          options: [],
          note: 'Any course in the PHIL 1–99 range satisfies this requirement.',
        },
      ],
    },
    {
      id: 'wim',
      name: 'Writing in the Major (WIM): PHIL 80',
      note: 'PHIL 80 "Mind, Matter, and Meaning" is the WIM course for the Philosophy major. Take as soon as possible after the introductory course; it prepares students for advanced philosophy courses. Must be completed with a grade of C- or higher.',
      slots: [
        {
          id: 'phil80',
          label: 'PHIL 80: Mind, Matter, and Meaning',
          type: 'required',
          options: [{ dept: 'PHIL', number: '80', name: 'Mind, Matter, and Meaning' }],
        },
      ],
    },

    // ── Subplan / Path selector ───────────────────────────────────────────────
    {
      id: 'path-selector',
      name: 'Program Path (Standard or Optional Subplan)',
      trackSelector: true,
      note: 'Choose the Standard Philosophy program or one of two optional subplans. Both subplans appear on the transcript. Standard = 60 min units; HPS subplan = 61 min units; Philosophy & Literary Thought subplan = 65 min units.',
      slots: [],
    },

  ],

  tracks: [
    // ── 1. Standard Philosophy ────────────────────────────────────────────────
    {
      id: 'standard',
      name: 'Standard Philosophy',
      minUnits: 60,
      sections: [
        {
          id: 'std-logic',
          name: 'Logic (pick one)',
          note: 'More advanced logic courses may count by petition. All breadth courses must be taken for ≥3 units, grade C- or higher.',
          slots: [
            {
              id: 'std-logic-slot',
              label: 'Logic Course (pick one)',
              type: 'pick-one',
              options: LOGIC_COURSES,
            },
          ],
        },
        {
          id: 'std-history',
          name: 'History of Philosophy (both required)',
          note: 'Both courses required; taken for ≥3 units each, C- or higher.',
          slots: [
            {
              id: 'std-phil100',
              label: 'PHIL 100: The History of Ancient Greek Philosophy',
              type: 'required',
              options: [{ dept: 'PHIL', number: '100', name: 'The History of Ancient Greek Philosophy' }],
            },
            {
              id: 'std-phil102',
              label: 'PHIL 102: Modern Philosophy, Descartes to Kant',
              type: 'required',
              options: [{ dept: 'PHIL', number: '102', name: 'Modern Philosophy, Descartes to Kant' }],
            },
          ],
        },
        {
          id: 'std-contemp',
          name: 'Contemporary Theoretical Philosophy (one PHIL 180–189 course)',
          slots: [
            {
              id: 'std-contemp-slot',
              label: 'Contemporary Theoretical Philosophy (PHIL 180–189)',
              type: 'any-approved',
              options: [],
              note: 'Any course in the PHIL 180–189 range. Take for ≥3 units, C- or higher.',
            },
          ],
        },
        {
          id: 'std-philsci',
          name: 'Philosophy of Science (one PHIL 160–169 course)',
          slots: [
            {
              id: 'std-philsci-slot',
              label: 'Philosophy of Science (PHIL 160–169)',
              type: 'any-approved',
              options: [],
              note: 'Any course in the PHIL 160–169 range. Take for ≥3 units, C- or higher.',
            },
          ],
        },
        {
          id: 'std-ethics',
          name: 'Moral and Political Philosophy (PHIL 2 or one PHIL 170–175 course)',
          slots: [
            {
              id: 'std-ethics-slot',
              label: 'Moral & Political Philosophy',
              type: 'any-approved',
              options: [
                { dept: 'PHIL', number: '2', name: 'Introduction to Moral Philosophy' }
              ],
              note: 'PHIL 2 OR any one course from the PHIL 170–175 range (letter suffixes vary by year: search to add).',
            },
          ],
        },
        {
          id: 'std-depth',
          name: 'Depth / Electives',
          note: 'Any PHIL course numbered 10 and above, excluding PHIL 196–199. At least 9 of these units must come from courses numbered PHIL 99 or above.',
          slots: [
            {
              id: 'std-depth-slot',
              label: 'PHIL Electives (PHIL 10+, excluding 196–199; ≥9 units from PHIL 99+)',
              type: 'any-approved',
              options: [],
            },
          ],
        },
        {
          id: 'std-capstone',
          name: 'Capstone Experience: PHIL 194 Series',
          note: 'Special undergraduate capstone seminars. Fosters integration of capacities and skills and demonstrates capacity for independent philosophical work.',
          slots: [
            {
              id: 'std-cap-slot',
              label: 'Capstone: PHIL 194 Seminar',
              type: 'any-approved',
              options: [],
              note: 'Any course in the PHIL 194 Capstone Series.',
            },
          ],
        },
      ],
    },

    // ── 2. History and Philosophy of Science (HPS) Subplan ───────────────────
    {
      id: 'hps',
      name: 'History and Philosophy of Science (HPS)',
      minUnits: 61,
      sections: [
        {
          id: 'hps-note',
          name: 'HPS Subplan Overview',
          note: 'Minimum 61 units (not 60). PHIL 196–199 do not count. Max 10 units of S/CR grades. Max 2 transfer courses (combined ≤10 units); transfer courses generally cannot substitute for required courses. Declare on Axess: appears on transcript. Consult the HPS Advisor for depth course approval.',
          slots: [],
        },
        {
          id: 'hps-logic',
          name: 'Logic (pick one)',
          note: 'Must be completed for a letter grade. More advanced logic courses may count by petition.',
          slots: [
            {
              id: 'hps-logic-slot',
              label: 'Logic Course (pick one)',
              type: 'pick-one',
              options: LOGIC_COURSES,
            },
          ],
        },
        {
          id: 'hps-philsci',
          name: 'Philosophy of Science (PHIL 160 required + 2 from PHIL 161–169)',
          note: 'All must be completed for a letter grade. Total: 3 courses in Philosophy of Science.',
          slots: [
            {
              id: 'hps-phil160',
              label: 'PHIL 160: Philosophy of Science (required)',
              type: 'required',
              options: [{ dept: 'PHIL', number: '160', name: 'Philosophy of Science' }],
            },
            {
              id: 'hps-philsci-add',
              label: 'Additional Philosophy of Science (PHIL 161–169): 2 courses',
              type: 'any-approved',
              count: 2,
              options: [],
              note: 'Any 2 courses in the PHIL 161–169 range.',
            },
          ],
        },
        {
          id: 'hps-science',
          name: 'Science Courses (3 courses, ≥12 units)',
          note: 'Three science courses totaling at least 12 units.',
          slots: [
            {
              id: 'hps-sci',
              label: 'Science Course',
              type: 'any-approved',
              count: 3,
              options: [],
            },
          ],
        },
        {
          id: 'hps-history',
          name: 'History of Science (3 courses)',
          note: 'Three history of science courses, approved with the HPS Advisor.',
          slots: [
            {
              id: 'hps-hist',
              label: 'History of Science Course',
              type: 'any-approved',
              count: 3,
              options: [],
            },
          ],
        },
        {
          id: 'hps-depth',
          name: 'Depth in Subplan (3 additional courses in philosophy or history)',
          note: 'Three additional courses related to the subplan, to be agreed on with the HPS Advisor.',
          slots: [
            {
              id: 'hps-depth',
              label: 'HPS Depth Course (advisor-approved)',
              type: 'any-approved',
              count: 3,
              options: [],
            },
          ],
        },
        {
          id: 'hps-electives',
          name: 'Electives',
          slots: [
            {
              id: 'hps-elec-slot',
              label: 'Electives (any PHIL 10+, excluding 196–199)',
              type: 'any-approved',
              options: [],
            },
          ],
        },
        {
          id: 'hps-capstone',
          name: 'Capstone Experience: PHIL 194 Series',
          slots: [
            {
              id: 'hps-cap-slot',
              label: 'Capstone: PHIL 194 Seminar',
              type: 'any-approved',
              options: [],
              note: 'Any course in the PHIL 194 Capstone Series.',
            },
          ],
        },
      ],
    },

    // ── 3. Philosophy and Literary Thought Subplan ────────────────────────────
    {
      id: 'phil-lit',
      name: 'Philosophy and Literary Thought',
      minUnits: 65,
      sections: [
        {
          id: 'plt-note',
          name: 'Phil & Literary Thought Subplan Overview',
          note: 'Minimum 65 units. PHIL 196–199 do not count. Max 10 units of S/CR grades. Max 15 transfer units total (at most 10 substituting PHIL courses); transfer credits may not substitute for PHIL 80 or PHIL 81. SLE students: up to 2 SLE units may count toward depth electives (not toward intro requirement). Declare on Axess: appears on transcript. Consult the Philosophy and Literary Thought Advisor for course approvals and the approved advanced course list at https://philit.stanford.edu/.',
          slots: [],
        },
        {
          id: 'plt-logic',
          name: 'Logic (pick one)',
          note: 'C- or higher.',
          slots: [
            {
              id: 'plt-logic-slot',
              label: 'Logic Course (pick one)',
              type: 'pick-one',
              options: LOGIC_COURSES,
            },
          ],
        },
        {
          id: 'plt-history',
          name: 'History of Philosophy (both required)',
          note: 'Both courses required; C- or higher each.',
          slots: [
            {
              id: 'plt-phil100',
              label: 'PHIL 100: The History of Ancient Greek Philosophy',
              type: 'required',
              options: [{ dept: 'PHIL', number: '100', name: 'The History of Ancient Greek Philosophy' }],
            },
            {
              id: 'plt-phil102',
              label: 'PHIL 102: Modern Philosophy, Descartes to Kant',
              type: 'required',
              options: [{ dept: 'PHIL', number: '102', name: 'Modern Philosophy, Descartes to Kant' }],
            },
          ],
        },
        {
          id: 'plt-contemp',
          name: 'Contemporary Theoretical Philosophy (PHIL 180–189)',
          slots: [
            {
              id: 'plt-contemp-slot',
              label: 'Contemporary Theoretical Philosophy (PHIL 180–189)',
              type: 'any-approved',
              options: [],
              note: 'Any PHIL 180–189 course; C- or higher.',
            },
          ],
        },
        {
          id: 'plt-philsci',
          name: 'Philosophy of Science (PHIL 160–169)',
          slots: [
            {
              id: 'plt-philsci-slot',
              label: 'Philosophy of Science (PHIL 160–169)',
              type: 'any-approved',
              options: [],
              note: 'Any PHIL 160–169 course; C- or higher.',
            },
          ],
        },
        {
          id: 'plt-ethics',
          name: 'Moral and Political Philosophy (PHIL 2 or PHIL 170–175)',
          slots: [
            {
              id: 'plt-ethics-slot',
              label: 'Moral & Political Philosophy',
              type: 'any-approved',
              options: [
                { dept: 'PHIL', number: '2', name: 'Introduction to Moral Philosophy' }
              ],
              note: 'PHIL 2 OR any one course from PHIL 170–175 (letter suffixes vary by year: search to add). C- or higher.',
            },
          ],
        },
        {
          id: 'plt-gateway',
          name: 'Gateway Course: PHIL 81: Philosophy and Literature',
          note: 'Take as early as possible, generally sophomore year. C- or higher. Transfer credits may not substitute for PHIL 81.',
          slots: [
            {
              id: 'plt-phil81',
              label: 'PHIL 81: Philosophy and Literature',
              type: 'required',
              options: [{ dept: 'PHIL', number: '81', name: 'Philosophy and Literature' }],
            },
          ],
        },
        {
          id: 'plt-national-lit',
          name: 'National Literature (3 courses in a single national literature)',
          note: 'Three courses in one national literature, chosen in consultation with the student\'s subplan advisor and the Phil & Lit Advisor. Normally requires meeting the language proficiency requirements of the relevant literature program; language course units do NOT count toward subplan unit requirements.',
          slots: [
            {
              id: 'plt-lit',
              label: 'National Literature Course',
              type: 'any-approved',
              count: 3,
              options: [],
            },
          ],
        },
        {
          id: 'plt-depth-phil',
          name: 'Depth in Philosophy (≥5 units from PHIL 100+)',
          slots: [
            {
              id: 'plt-depth-slot',
              label: 'Philosophy Depth Electives (≥5 units, PHIL 100+)',
              type: 'any-approved',
              options: [],
            },
          ],
        },
        {
          id: 'plt-advanced',
          name: 'Advanced Depth in Philosophy and Literature (2 upper-division courses)',
          note: 'Two upper-division courses of special relevance to philosophy and literature, from the approved course list at https://philit.stanford.edu/. Approved by the Philosophy and Literary Thought Advisor.',
          slots: [
            {
              id: 'plt-adv',
              label: 'Advanced Phil & Lit Course (approved list)',
              type: 'any-approved',
              count: 2,
              options: [],
            },
          ],
        },
        {
          id: 'plt-cap-phil',
          name: 'Philosophy Capstone: PHIL 194 Series',
          slots: [
            {
              id: 'plt-cap-phil-slot',
              label: 'Philosophy Capstone: PHIL 194 Seminar',
              type: 'any-approved',
              options: [],
              note: 'Any course in the PHIL 194 Capstone Series. In some cases the same course may satisfy both capstone requirements.',
            },
          ],
        },
        {
          id: 'plt-cap-lit',
          name: 'Philosophy and Literature Capstone',
          slots: [
            {
              id: 'plt-cap-lit-slot',
              label: 'Phil & Lit Capstone Seminar (advisor-approved)',
              type: 'any-approved',
              options: [],
              note: 'A capstone seminar of relevance to philosophy and literature, approved by the Philosophy and Literary Thought Advisor. May be the same course as the Philosophy Capstone in some cases.',
            },
          ],
        },
      ],
    },
  ],
};
