// English BA: School of Humanities & Sciences, 2025-2026
// Source: https://bulletin.stanford.edu/programs/ENGL-BA/
// Min 71 units total (71–80 depending on field of study).
// All required courses must be taken for 5 units; elective literature courses for at least 3 units.
// Grade of C or better required in all courses counting toward the major.
// Courses can only count once (satisfy one requirement).
// Up to 2 elective courses may be taken CR/S at discretion of the Director of Undergraduate Studies.
// Class of 2028+: ENGLISH 10/11/12, 160, and 161 must be completed before senior year.

import type { MajorConfig } from '../majorSchema';

const WIM_COURSES = [
  { dept: 'ENGLISH', number: '5AA', name: 'Queer(ing) Asian American Literature' },
  { dept: 'ENGLISH', number: '5BA', name: 'Reading and Writing in the Digital Age' },
  { dept: 'ENGLISH', number: '5CA', name: 'WISE: Anti-Social Heroes in the Nineteenth Century' },
  { dept: 'ENGLISH', number: '5DA', name: 'WISE: Poetic Intelligences' },
  { dept: 'ENGLISH', number: '5EA', name: 'WISE: Haunted Reading: Intertextuality, Adaptation, and the Gothic' },
  { dept: 'ENGLISH', number: '5FA', name: 'The Romance and its Readers' },
  { dept: 'ENGLISH', number: '5GA', name: 'Shakespeare and His Critics' },
  { dept: 'ENGLISH', number: '5HA', name: 'Haunted Rooms: Gothic and Horror Short Fiction' },
  { dept: 'ENGLISH', number: '5JA', name: 'Women Without Men: Experiments in American Literature, 1890–1940' },
  { dept: 'ENGLISH', number: '5KA', name: 'Migrants, Natives, or Settlers? Asians in South African Literature' },
  { dept: 'ENGLISH', number: '5LA', name: 'A Perfect World? Utopian Satire in Early Modernity' },
  { dept: 'ENGLISH', number: '5MA', name: 'Black Diaspora(s) Old and New' },
  { dept: 'ENGLISH', number: '176', name: 'The Meaning of Newness: Traditions of British Modernism' },
  { dept: 'ENGLISH', number: '5PA', name: 'Resisting English: Multilingualism in American Literature' },
  { dept: 'ENGLISH', number: '5QA', name: '"Dressing Up" in the Eighteenth Century' },
] as const;

export const ENGLISH_BA_2526: MajorConfig = {
  id: 'english-ba-2526',
  name: 'English (BA)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/ENGL-BA/',
  category: 'major',
  totalMinUnits: 71,

  sections: [
    // ── Literary Historical Sequence ───────────────────────────────────────────
    {
      id: 'hist-seq',
      name: 'Literary Historical Sequence',
      minCourses: 3,
      note: 'One course from each of the three historical sequences is required of all English majors. Class of 2028+: must be completed before senior year.',
      slots: [
        {
          id: 'english10',
          label: 'ENGLISH 10: Introduction to English I (pre-1600)',
          type: 'pick-one',
          options: [
            { dept: 'ENGLISH', number: '10A', name: 'Encountering the Monstrous in Early Literature, 600–1600' },
            { dept: 'ENGLISH', number: '10B', name: 'What Is Literary History?' },
            { dept: 'ENGLISH', number: '10C', name: 'Tradition and Individuality, Medieval to Early Modern' },
            { dept: 'ENGLISH', number: '10D', name: 'Women, Gender, and Sexuality in Early British Literature' },
            { dept: 'ENGLISH', number: '10E', name: 'Love and Death from Chaucer to Milton' },
            { dept: 'ENGLISH', number: '10F', name: 'The Natural World in Early English Literary History' },
            { dept: 'ENGLISH', number: '10G', name: 'Voice and Style in Medieval and Renaissance Literature' },
          ],
        },
        {
          id: 'english11',
          label: 'ENGLISH 11: Introduction to English II (c. 1640–1855)',
          type: 'pick-one',
          options: [
            { dept: 'ENGLISH', number: '11A', name: 'From Milton to the Romantics' },
            { dept: 'ENGLISH', number: '11B', name: 'American Literature and Culture to 1855' },
            { dept: 'ENGLISH', number: '11C', name: 'Revolutionary Energies (1640–1820)' },
          ],
        },
        {
          id: 'english12',
          label: 'ENGLISH 12: Introduction to English III (modern)',
          type: 'pick-one',
          options: [
            { dept: 'ENGLISH', number: '12A', name: 'Introduction to African American Literature' },
            { dept: 'ENGLISH', number: '12B', name: 'Literature and the Crises of Humanism' },
            { dept: 'ENGLISH', number: '12C', name: 'Modern Literature' },
            { dept: 'ENGLISH', number: '12D', name: 'Latinx Literature' },
            { dept: 'ENGLISH', number: '12E', name: 'Introduction to Modern Literature: People, Politics, Place' },
            { dept: 'ENGLISH', number: '12F', name: 'Introduction to Asian American Literature: Fantastic Fictions' },
          ],
        },
      ],
    },

    // ── Methodology Courses ────────────────────────────────────────────────────
    {
      id: 'methodology',
      name: 'Methodology Courses',
      minCourses: 2,
      note: 'Both courses are required of all English majors. Class of 2028+: must be completed before senior year.',
      slots: [
        {
          id: 'english160',
          label: 'ENGLISH 160: Poetry and Poetics',
          type: 'required',
          options: [{ dept: 'ENGLISH', number: '160', name: 'Poetry and Poetics' }],
        },
        {
          id: 'english161',
          label: 'ENGLISH 161: Narrative and Narrative Theory',
          type: 'required',
          options: [{ dept: 'ENGLISH', number: '161', name: 'Narrative and Narrative Theory' }],
        },
      ],
    },

    // ── Pre-1800 Historical Course ─────────────────────────────────────────────
    {
      id: 'pre1800',
      name: 'Pre-1800 Historical Course',
      minCourses: 1,
      note: 'All English majors must complete at least one pre-1800 historical course.',
      slots: [
        {
          id: 'pre1800-course',
          label: 'Pre-1800 Historical Course',
          type: 'pick-from-list',
          count: 1,
          options: [
            { dept: 'ENGLISH', number: '57', name: 'Meaning and Medieval Manuscripts: a community of learning' },
            { dept: 'ENGLISH', number: '104C', name: 'Medieval Violence' },
            { dept: 'ENGLISH', number: '104D', name: 'Stories from the Viking Age' },
            { dept: 'ENGLISH', number: '107B', name: 'Literature of the English Revolution' },
            { dept: 'ENGLISH', number: '114B', name: 'Paradise Lost' },
            { dept: 'ENGLISH', number: '114C', name: '"Books Promiscuously Read": Varieties of Renaissance Experience' },
            { dept: 'ENGLISH', number: '115C', name: 'Hamlet and the Critics' },
            { dept: 'ENGLISH', number: '115G', name: 'Shakespeare: Five Tragedies' },
            { dept: 'ENGLISH', number: '117', name: "Shakespeare's Globes: Race and Place" },
            { dept: 'ENGLISH', number: '122C', name: 'Medieval Fantasy Literature' },
            { dept: 'ENGLISH', number: '131', name: "Chaucer's Troilus and Criseyde: Love and War in the Middle Ages" },
            { dept: 'ENGLISH', number: '140C', name: 'Sex and Violence in Jacobean Tragedy' },
            { dept: 'ENGLISH', number: '175', name: "Chaucer's Canterbury Tales" },
            { dept: 'ENGLISH', number: '180A', name: 'Velocity and Suspension: The Sense of Time in Early Modern Writing' },
            { dept: 'ENGLISH', number: '200C', name: 'Introduction to Manuscript Studies' },
            { dept: 'ENGLISH', number: '201', name: 'The Bible and Literature' },
            { dept: 'ENGLISH', number: '215E', name: 'Shakespeare and His Contexts: Race, Religion, Sexuality, Gender' },
            { dept: 'ENGLISH', number: '237', name: 'Before Novels' },
            { dept: 'ENGLISH', number: '251B', name: 'Paradise Lost' },
            { dept: 'ENGLISH', number: '303', name: 'Blake and the Bible' },
            { dept: 'ENGLISH', number: '344', name: 'Premodern Aesthetics' },
          ],
        },
      ],
    },

    // ── Field of Study (track selector) ───────────────────────────────────────
    {
      id: 'field-of-study',
      name: 'Field of Study (choose 1 of 5)',
      trackSelector: true,
      note: 'Each student must choose one of five fields of study (35–50 additional units). The Interdisciplinary Studies, Creative Writing, Literature and Philosophy, and Computational Cultural Analytics subplans are printed on the transcript and diploma.',
      slots: [],
    },

    // ── Capstone Experience ────────────────────────────────────────────────────
    {
      id: 'capstone',
      name: 'Capstone Experience (choose 1 of 5 options)',
      note: 'All English majors must complete a capstone before graduation. Choose one option appropriate to your field of study.',
      slots: [],
      pickOneGroup: [
        {
          id: 'cap-seminar',
          name: 'Option A: Capstone Seminar: ENGLISH 199',
          note: '3-unit seminar co-taught by literature and creative writing instructors. Students produce a commonplace book and final creative nonfiction project. Primary capstone for Literature and most subplan students.',
          slots: [
            { id: 'cap-a-199', label: 'ENGLISH 199: Capstone: Why Literature Matters (To Me)', type: 'required', options: [{ dept: 'ENGLISH', number: '199', name: 'Capstone: Why Literature Matters (To Me)' }] },
          ],
        },
        {
          id: 'cap-honors',
          name: 'Option B: Honors Program: ENGLISH 196A + 197',
          note: 'Three-quarter sequence (15 units total): ENGLISH 196A "Honors Seminar: Critical Approaches to Literature" (autumn, 5 units) + ENGLISH 197 "Seniors Honors Essay" (winter+spring, 10 units). Apply by April 19 of junior year. Essays receiving A- or above earn honors.',
          slots: [
            { id: 'cap-b-196a', label: 'ENGLISH 196A: Honors Seminar: Critical Approaches to Literature', type: 'required', options: [{ dept: 'ENGLISH', number: '196A', name: 'Honors Seminar: Critical Approaches to Literature' }] },
            { id: 'cap-b-197', label: 'ENGLISH 197: Senior Honors Essay', type: 'required', options: [{ dept: 'ENGLISH', number: '197', name: 'Senior Honors Essay' }] },
          ],
        },
        {
          id: 'cap-cw',
          name: 'Option C: Creative Writing Capstone',
          note: 'For Creative Writing subplan students. One 5-unit advanced workshop in area of specialty. Alternatively, petition the Director of the Creative Writing Program for an individual project.',
          slots: [
            {
              id: 'cap-c-workshop',
              label: 'ENGLISH 290, 291, or 292: Advanced Workshop',
              type: 'pick-one',
              options: [
                { dept: 'ENGLISH', number: '290', name: 'Advanced Fiction' },
                { dept: 'ENGLISH', number: '291', name: 'Advanced Nonfiction' },
                { dept: 'ENGLISH', number: '292', name: 'Advanced Poetry' },
              ],
            },
          ],
        },
        {
          id: 'cap-interdisciplinary',
          name: 'Option D: Interdisciplinary Studies Capstone',
          note: 'For Interdisciplinary Studies subplan students. Senior-year individual study project. Unit count varies. Proposal must be approved by Director of Undergraduate Studies before start of senior year.',
          slots: [
            { id: 'cap-d-project', label: 'Individual Study Project (advisor-approved)', type: 'any-approved', options: [] },
          ],
        },
        {
          id: 'cap-cca',
          name: 'Option E: Computational Cultural Analytics Capstone (Literary Lab)',
          note: 'For Computational Cultural Analytics subplan students. Take a Literary Lab course; seniors must attend all Lab meetings and join or lead a research project during that quarter.',
          slots: [
            { id: 'cap-e-lab', label: 'Literary Lab Course + Research Project', type: 'any-approved', options: [] },
          ],
        },
      ],
    },

    // ── Writing in the Major (WIM) ─────────────────────────────────────────────
    {
      id: 'wim',
      name: 'Writing in the Major (WIM)',
      minCourses: 1,
      note: 'All English majors must complete at least one WIM course from the designated ENGLISH 5XX WISE seminar series.',
      slots: [
        {
          id: 'wim-course',
          label: 'WIM Course (ENGLISH 5XX WISE seminar)',
          type: 'pick-one',
          options: [...WIM_COURSES],
        },
      ],
    },
  ],

  tracks: [
    // ── 1. Literature (Depth in Discipline) ───────────────────────────────────
    {
      id: 'literature',
      name: 'Literature (Depth in Discipline)',
      minUnits: 35,
      sections: [
        {
          id: 'lit-electives',
          name: 'Literature Elective Courses (35 units)',
          minUnits: 35,
          note: '35 units of elective courses from the Department of English. Only one elective may be a creative writing course. In place of one elective, students may take one upper-division course in a foreign literature read in the original language. Elective courses may be taken for at least 3 units.',
          slots: [
            {
              id: 'lit-elective-courses',
              label: 'English Department Elective Courses',
              type: 'any-approved',
              options: [],
              note: 'At least 3 units each; total must reach 35 units. Only 1 creative writing course allowed. May substitute one elective with an upper-division foreign literature course (read in original language). Does not appear on the transcript or diploma.',
            },
          ],
        },
      ],
    },

    // ── 2. Creative Writing: Prose Concentration ──────────────────────────────
    {
      id: 'cw-prose',
      name: 'Creative Writing: Prose Concentration',
      minUnits: 40,
      sections: [
        {
          id: 'cw-prose-req',
          name: 'Prose Concentration Required Sequence',
          minCourses: 4,
          note: 'Four required courses for the Prose Concentration, plus 20 units of electives.',
          slots: [
            {
              id: 'cw-prose-intro',
              label: 'Introductory Fiction or Nonfiction',
              type: 'pick-one',
              options: [
                { dept: 'ENGLISH', number: '90', name: 'Fiction Writing' },
                { dept: 'ENGLISH', number: '91', name: 'Creative Nonfiction' },
              ],
            },
            {
              id: 'cw-prose-poetry92',
              label: 'ENGLISH 92: Reading and Writing Poetry',
              type: 'required',
              options: [{ dept: 'ENGLISH', number: '92', name: 'Reading and Writing Poetry' }],
            },
            {
              id: 'cw-prose-intermediate',
              label: 'Intermediate Fiction or Nonfiction',
              type: 'pick-one',
              options: [
                { dept: 'ENGLISH', number: '190', name: 'Intermediate Fiction Writing' },
                { dept: 'ENGLISH', number: '191', name: 'Intermediate Creative Nonfiction' },
              ],
            },
            {
              id: 'cw-prose-craft',
              label: 'Fiction/Short Story Craft Elective',
              type: 'pick-one',
              options: [
                { dept: 'ENGLISH', number: '133B', name: 'Storytelling and Mythmaking: Modern Odysseys' },
                { dept: 'ENGLISH', number: '146F', name: 'Fiction Intensive: Crafting a Short Story Collection' },
                { dept: 'ENGLISH', number: '146W', name: 'Iconic Short Stories' },
                { dept: 'ENGLISH', number: '169D', name: 'Contemporary Asian American Stories' },
                { dept: 'ENGLISH', number: '177B', name: 'Contemporary American Short Stories' },
                { dept: 'ENGLISH', number: '190S', name: 'Short Story Salon' },
              ],
            },
          ],
        },
        {
          id: 'cw-prose-electives',
          name: 'Prose Elective Courses (20 units)',
          minUnits: 20,
          note: 'Additional English Department elective courses totaling 20 units (at least 3 units each). One may be a creative writing workshop.',
          slots: [
            {
              id: 'cw-prose-elective-courses',
              label: 'English Department Elective Courses',
              type: 'any-approved',
              options: [],
              note: 'At least 3 units each; total must reach 20 units. One course may be a creative writing workshop.',
            },
          ],
        },
      ],
    },

    // ── 3. Creative Writing: Poetry Concentration ─────────────────────────────
    {
      id: 'cw-poetry',
      name: 'Creative Writing: Poetry Concentration',
      minUnits: 40,
      sections: [
        {
          id: 'cw-poetry-req',
          name: 'Poetry Concentration Required Sequence',
          minCourses: 4,
          note: 'Four required courses for the Poetry Concentration, plus 20 units of electives.',
          slots: [
            {
              id: 'cw-poetry-intro',
              label: 'Introductory Fiction or Nonfiction',
              type: 'pick-one',
              options: [
                { dept: 'ENGLISH', number: '90', name: 'Fiction Writing' },
                { dept: 'ENGLISH', number: '91', name: 'Creative Nonfiction' },
              ],
            },
            {
              id: 'cw-poetry-poetry92',
              label: 'ENGLISH 92: Reading and Writing Poetry',
              type: 'required',
              options: [{ dept: 'ENGLISH', number: '92', name: 'Reading and Writing Poetry' }],
            },
            {
              id: 'cw-poetry-intermediate',
              label: 'ENGLISH 192: Intermediate Poetry Writing',
              type: 'required',
              options: [{ dept: 'ENGLISH', number: '192', name: 'Intermediate Poetry Writing' }],
            },
            {
              id: 'cw-poetry-text',
              label: 'Paradise Lost or Poetry of Migration',
              type: 'pick-one',
              options: [
                { dept: 'ENGLISH', number: '114B', name: 'Paradise Lost' },
                { dept: 'ENGLISH', number: '150L', name: 'Poetry of Migration' },
              ],
            },
          ],
        },
        {
          id: 'cw-poetry-electives',
          name: 'Poetry Elective Courses (20 units)',
          minUnits: 20,
          note: 'Additional English Department elective courses totaling 20 units (at least 3 units each). One may be a creative writing workshop.',
          slots: [
            {
              id: 'cw-poetry-elective-courses',
              label: 'English Department Elective Courses',
              type: 'any-approved',
              options: [],
              note: 'At least 3 units each; total must reach 20 units. One course may be a creative writing workshop.',
            },
          ],
        },
      ],
    },

    // ── 4. Interdisciplinary Studies ───────────────────────────────────────────
    {
      id: 'interdisciplinary',
      name: 'Interdisciplinary Studies',
      minUnits: 40,
      sections: [
        {
          id: 'interdis-english',
          name: 'English Literature Electives (25 units)',
          minUnits: 25,
          note: '25 units of elective literature courses from the English Department. At least 2 of these courses must be related to the student\'s interdisciplinary focus. Elective courses may be taken for at least 3 units.',
          slots: [
            {
              id: 'interdis-english-courses',
              label: 'English Department Elective Courses (2 must relate to focus area)',
              type: 'any-approved',
              options: [],
              note: 'At least 2 of these 25 units must be in the area of interdisciplinary focus.',
            },
          ],
        },
        {
          id: 'interdis-related',
          name: 'Related Interdisciplinary Courses (15 units)',
          minUnits: 15,
          note: '15 units from another department or interdisciplinary program within H&S (e.g., African American Studies, Anthropology, Art and Art History, Classics, Comparative Literature, CSRE, Feminist Studies, Human Biology, Music, Philosophy, Political Science, Psychology, Religious Studies, STS, Sociology). Courses must form a coherent program relevant to the focus; each must be approved by the interdisciplinary program director. Final course plan and project must be approved by English faculty advisor, external faculty advisor, and Director of Undergraduate Studies before applying to graduate.',
          slots: [
            {
              id: 'interdis-related-courses',
              label: 'Related Courses from Another H&S Dept/Program',
              type: 'any-approved',
              options: [],
              note: 'Each course must be pre-approved by the interdisciplinary program director.',
            },
          ],
        },
      ],
    },

    // ── 5. Literature and Philosophy ───────────────────────────────────────────
    {
      id: 'lit-philosophy',
      name: 'Literature and Philosophy',
      minUnits: 40,
      sections: [
        {
          id: 'lit-phil-req',
          name: 'Literature and Philosophy Required Courses',
          note: 'Meet with the undergraduate director before declaring this subplan. 40–50 additional units beyond the core.',
          slots: [
            {
              id: 'litphil-phil80',
              label: 'PHIL 80: Mind, Matter, and Meaning',
              type: 'required',
              options: [{ dept: 'PHIL', number: '80', name: 'Mind, Matter, and Meaning' }],
              note: 'Prerequisite: an introductory philosophy course.',
            },
            {
              id: 'litphil-eng81',
              label: 'ENGLISH 81: Philosophy and Literature',
              type: 'required',
              options: [{ dept: 'ENGLISH', number: '81', name: 'Philosophy and Literature' }],
              note: 'Take as early as possible, normally in the sophomore year.',
            },
            {
              id: 'litphil-ethics',
              label: 'Aesthetics/Ethics/Political Philosophy (PHIL 170 series: choose 1)',
              type: 'pick-one',
              options: [
                { dept: 'PHIL', number: '170', name: 'Ethical Theory' },
                { dept: 'PHIL', number: '171', name: 'Justice' },
                { dept: 'PHIL', number: '172', name: 'History of Modern Moral Philosophy' },
                { dept: 'PHIL', number: '174', name: 'Ethics Beyond Consequences' },
                { dept: 'PHIL', number: '175', name: 'Philosophy of Law' },
                { dept: 'PHIL', number: '176', name: 'Political Philosophy: The Social Contract Tradition' },
              ],
              note: 'One course from the PHIL 170 Ethical Theory series.',
            },
            {
              id: 'litphil-metaphysics',
              label: 'Language/Mind/Metaphysics/Epistemology (PHIL 180–189: choose 1)',
              type: 'any-approved',
              options: [],
              note: 'One course from the PHIL 180–189 Metaphysics series. See department for approved list.',
            },
            {
              id: 'litphil-hist-phil',
              label: 'History of Philosophy (choose 1)',
              type: 'pick-one',
              options: [
                { dept: 'PHIL', number: '100', name: 'The History of Ancient Greek Philosophy' },
                { dept: 'PHIL', number: '102', name: 'Modern Philosophy, Descartes to Kant' },
              ],
            },
            {
              id: 'litphil-upper-eng',
              label: 'Two Upper-Division English Courses (Lit & Phil focus area)',
              type: 'any-approved',
              count: 2,
              options: [],
              note: 'Two upper-division English Dept courses of special relevance to Philosophy and Literature. Approved list on the Philosophy and Literature website.',
            },
            {
              id: 'litphil-eng-electives',
              label: 'Two Additional English Elective Courses',
              type: 'any-approved',
              count: 2,
              options: [],
              note: 'Two additional elective courses in the English Department.',
            },
            {
              id: 'litphil-capstone-seminar',
              label: 'Capstone Seminar (Lit & Phil focus)',
              type: 'any-approved',
              options: [],
              note: 'One capstone seminar of relevance to Philosophy and Literature. Approved list on the Philosophy and Literature website.',
            },
          ],
        },
      ],
    },

    // ── 6. Computational Cultural Analytics ────────────────────────────────────
    {
      id: 'cca',
      name: 'Computational Cultural Analytics',
      minUnits: 41,
      sections: [
        {
          id: 'cca-req',
          name: 'Computational Cultural Analytics Required Courses',
          note: 'Required courses for this subplan. Leverages the unique resources of the Stanford Literary Lab.',
          slots: [
            {
              id: 'cca-184e',
              label: 'ENGLISH 184E: Literary Text Mining',
              type: 'required',
              options: [{ dept: 'ENGLISH', number: '184E', name: 'Literary Text Mining' }],
            },
            {
              id: 'cca-184f-or-cs124',
              label: 'ENGLISH 184F or CS 124',
              type: 'pick-one',
              options: [
                { dept: 'ENGLISH', number: '184F', name: 'Literary Text Mining 2: Studies in Cultural Analytics' },
                { dept: 'CS', number: '124', name: 'From Languages to Information' },
              ],
            },
            {
              id: 'cca-cs106a',
              label: 'CS 106A: Programming Methodology',
              type: 'required',
              options: [{ dept: 'CS', number: '106A', name: 'Programming Methodology' }],
            },
            {
              id: 'cca-cs106b',
              label: 'CS 106B: Programming Abstractions',
              type: 'required',
              options: [{ dept: 'CS', number: '106B', name: 'Programming Abstractions' }],
            },
            {
              id: 'cca-stats',
              label: 'Statistics (choose 1)',
              type: 'pick-one',
              options: [
                { dept: 'STATS', number: '116', name: 'Theory of Probability' },
                { dept: 'MATH', number: '151', name: 'Introduction to Probability Theory' },
              ],
            },
            {
              id: 'cca-ethics',
              label: 'Ethics Course (choose 1)',
              type: 'pick-one',
              options: [
                { dept: 'CS', number: '182', name: 'Ethics, Public Policy, and Technological Change' },
                { dept: 'COMM', number: '154', name: 'The Politics of Algorithms' },
                { dept: 'MS&E', number: '234', name: 'Data Privacy and Ethics' },
              ],
            },
          ],
        },
        {
          id: 'cca-electives',
          name: 'English Department Electives (18–20 units)',
          minUnits: 18,
          note: '18–20 units of English Department electives (Literature or Creative Writing), at least 3 units each. One course may be substituted for a relevant class elsewhere at Stanford, in consultation with your advisor.',
          slots: [
            {
              id: 'cca-elective-courses',
              label: 'English Department Elective Courses',
              type: 'any-approved',
              options: [],
              note: 'At least 3 units each; total 18–20 units. One may be a relevant course outside the English Dept with advisor approval.',
            },
          ],
        },
      ],
    },
  ],

  wimCourses: [...WIM_COURSES],
};
