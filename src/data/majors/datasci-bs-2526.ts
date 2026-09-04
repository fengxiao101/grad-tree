// Data Science (BS), 2025-2026
// Source: https://bulletin.stanford.edu/programs/DATSC-BS/
// Interdisciplinary: Statistics, Mathematics, CS, MS&E departments
// 4 required subplans (tracks): Mathematics & Computation, Biology & Medicine,
//   Computational Neuroscience, Quantitative Finance
// WIM: DATASCI 120, DATASCI 192A+B, or DATASCI 199W: all double-count with capstone

import type { MajorConfig, CourseOption } from '../majorSchema';

const PROOF_OPTIONS: CourseOption[] = [
  { dept: 'CS',   number: '103' },
  { dept: 'CS',   number: '154' },
  { dept: 'MATH', number: '56' },
  { dept: 'MATH', number: '61CM' },
  { dept: 'MATH', number: '61DM' },
  { dept: 'MATH', number: '62CM' },
  { dept: 'MATH', number: '62DM' },
  { dept: 'MATH', number: '63CM' },
  { dept: 'MATH', number: '63DM' },
  { dept: 'MATH', number: '113' },
  { dept: 'MATH', number: '115' },
  { dept: 'MATH', number: '136' },
  { dept: 'MATH', number: '171' },
];

const ETHICS_OPTIONS: CourseOption[] = [
  { dept: 'BIOE',  number: '131' },
  { dept: 'COMM',  number: '154' },
  { dept: 'CS',    number: '120' },
  { dept: 'CS',    number: '139' },
  { dept: 'CS',    number: '181' },
  { dept: 'CS',    number: '182' },
  { dept: 'MS&E',  number: '234' },
  { dept: 'NBIO',  number: '101' },
];

// Pre-approved technical electives (same list for both Math&Comp and Quant Finance subplans)
const TECH_ELECTIVE_PREAPPROVED: CourseOption[] = [
  { dept: 'ARCHLGY', number: '198A' },
  { dept: 'COMM',    number: '177I' },
  { dept: 'EARTHSYS',number: '144' },
  { dept: 'ECON',    number: '102C' },
  { dept: 'ECON',    number: '135' },
  { dept: 'ECON',    number: '136' },
  { dept: 'ECON',    number: '137' },
  { dept: 'ECON',    number: '140' },
  { dept: 'ECON',    number: '141' },
  { dept: 'ECON',    number: '157' },
  { dept: 'ECON',    number: '160' },
  { dept: 'ECON',    number: '177' },
  { dept: 'ECON',    number: '179' },
  { dept: 'ECON',    number: '185' },
  { dept: 'ECON',    number: '293' },
  { dept: 'MS&E',    number: '135' },
  { dept: 'MS&E',    number: '145' },
  { dept: 'PHIL',    number: '151' },
  { dept: 'PHIL',    number: '152' },
  { dept: 'POLISCI', number: '150C' },
  { dept: 'STATS',   number: '100' },
];

export const DATASCI_BS_2526: MajorConfig = {
  id: 'datasci-bs-2526',
  name: 'Data Science (BS)',
  school: 'School of Engineering / School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/DATSC-BS/',
  category: 'major',
  totalMinUnits: 64,

  wimCourses: [
    { dept: 'DATASCI', number: '120' },
    { dept: 'DATASCI', number: '192A' },
    { dept: 'DATASCI', number: '192B' },
    { dept: 'DATASCI', number: '199W' },
  ],

  sections: [
    // ── Mathematics Sequence ───────────────────────────────────────────────
    {
      id: 'math',
      name: 'Mathematics Sequence',
      note: 'Standard path: MATH 51 + MATH 52. Honors alternatives use the Modern Mathematics sequence (CM or DM track). Proof-writing course may double-count with other major requirements. To declare: complete 2 of {MATH 51, DATASCI 112, STATS 117/118} and be enrolled in the third.',
      slots: [
        {
          id: 'mv-math-1',
          label: 'Multivariable Mathematics Part 1',
          type: 'pick-one',
          options: [
            { dept: 'MATH', number: '51',   name: 'Linear Algebra, Multivariable Calculus, and Modern Applications' },
            { dept: 'MATH', number: '61CM',  name: 'Modern Mathematics: Continuous Methods' },
            { dept: 'MATH', number: '61DM',  name: 'Modern Mathematics: Discrete Methods' },
          ],
        },
        {
          id: 'mv-math-2',
          label: 'Multivariable Mathematics Part 2',
          type: 'pick-one',
          options: [
            { dept: 'MATH', number: '52',   name: 'Integral Calculus of Several Variables' },
            { dept: 'MATH', number: '62CM',  name: 'Modern Mathematics: Continuous Methods' },
            { dept: 'MATH', number: '62DM',  name: 'Modern Mathematics: Discrete Methods' },
          ],
        },
        {
          id: 'proof-writing',
          label: 'Proof-Writing',
          type: 'pick-from-list',
          count: 1,
          options: PROOF_OPTIONS,
          note: 'May double-count with other requirements within the major (e.g. MATH 113 can also fill Mathematical Modeling; MATH 61CM/61DM can also fill Multivariable Part 1).',
        },
      ],
    },

    // ── Computation Sequence ───────────────────────────────────────────────
    {
      id: 'computation',
      name: 'Computation Sequence',
      note: 'Most students take CS 106A. CS 193Q may substitute for students with Python experience but no general programming background. Students who pass DATASCI 112 without CS 106A may waive it.',
      slots: [
        {
          id: 'cs106a',
          label: 'Programming I',
          type: 'pick-one',
          options: [
            { dept: 'CS',  number: '106A', name: 'Programming Methodology' },
            { dept: 'CS',  number: '193Q', name: 'Introduction to Python Programming' },
          ],
        },
        {
          id: 'cs106b',
          label: 'CS 106B: Programming Abstractions',
          type: 'required',
          options: [{ dept: 'CS', number: '106B' }],
        },
      ],
    },

    // ── Gateway Course ─────────────────────────────────────────────────────
    {
      id: 'gateway',
      name: 'Gateway Course',
      slots: [
        {
          id: 'datasci112',
          label: 'DATASCI 112: Principles of Data Science',
          type: 'required',
          options: [{ dept: 'DATASCI', number: '112' }],
        },
      ],
    },

    // ── Theory of Probability and Statistics ───────────────────────────────
    {
      id: 'prob-theory',
      name: 'Theory of Probability and Statistics',
      note: 'Complete one of the 5 sequences below. All courses must be taken for a letter grade.',
      slots: [],
      pickOneGroup: [
        {
          id: 'seq-1',
          name: 'Sequence 1 (Recommended): STATS 117 + STATS 118 + STATS 200',
          slots: [
            { id: 'seq1-117', label: 'STATS 117: Introduction to Probability Theory', type: 'required', options: [{ dept: 'STATS', number: '117' }] },
            { id: 'seq1-118', label: 'STATS 118: Probability Theory for Statistical Inference', type: 'required', options: [{ dept: 'STATS', number: '118' }] },
            { id: 'seq1-200', label: 'STATS 200: Introduction to Theoretical Statistics', type: 'pick-one', options: [{ dept: 'STATS', number: '200' }, { dept: 'STATS', number: '200Q' }] },
          ],
        },
        {
          id: 'seq-2',
          name: 'Sequence 2: CS 109 + STATS 118 + STATS 200',
          slots: [
            { id: 'seq2-109', label: 'CS 109: Introduction to Probability for Computer Scientists', type: 'required', options: [{ dept: 'CS', number: '109' }] },
            { id: 'seq2-118', label: 'STATS 118: Probability Theory for Statistical Inference', type: 'required', options: [{ dept: 'STATS', number: '118' }] },
            { id: 'seq2-200', label: 'STATS 200: Introduction to Theoretical Statistics', type: 'pick-one', options: [{ dept: 'STATS', number: '200' }, { dept: 'STATS', number: '200Q' }] },
          ],
        },
        {
          id: 'seq-3',
          name: 'Sequence 3: EE 178 + STATS 118 + STATS 200',
          slots: [
            { id: 'seq3-178', label: 'EE 178: Probabilistic Systems Analysis', type: 'required', options: [{ dept: 'EE', number: '178' }] },
            { id: 'seq3-118', label: 'STATS 118: Probability Theory for Statistical Inference', type: 'required', options: [{ dept: 'STATS', number: '118' }] },
            { id: 'seq3-200', label: 'STATS 200: Introduction to Theoretical Statistics', type: 'pick-one', options: [{ dept: 'STATS', number: '200' }, { dept: 'STATS', number: '200Q' }] },
          ],
        },
        {
          id: 'seq-4',
          name: 'Sequence 4: MS&E 120 + STATS 118 + STATS 200',
          slots: [
            { id: 'seq4-120', label: 'MS&E 120: Introduction to Probability', type: 'required', options: [{ dept: 'MS&E', number: '120' }] },
            { id: 'seq4-118', label: 'STATS 118: Probability Theory for Statistical Inference', type: 'required', options: [{ dept: 'STATS', number: '118' }] },
            { id: 'seq4-200', label: 'STATS 200: Introduction to Theoretical Statistics', type: 'pick-one', options: [{ dept: 'STATS', number: '200' }, { dept: 'STATS', number: '200Q' }] },
          ],
        },
        {
          id: 'seq-5',
          name: 'Sequence 5: MATH 151 + STATS 200',
          note: 'MATH 151 replaces both STATS 117 and STATS 118.',
          slots: [
            { id: 'seq5-151', label: 'MATH 151: Introduction to Probability Theory', type: 'required', options: [{ dept: 'MATH', number: '151' }] },
            { id: 'seq5-200', label: 'STATS 200: Introduction to Theoretical Statistics', type: 'pick-one', options: [{ dept: 'STATS', number: '200' }, { dept: 'STATS', number: '200Q' }] },
          ],
        },
      ],
    },

    // ── Applications of Probability and Statistics ─────────────────────────
    {
      id: 'prob-apps',
      name: 'Applications of Probability and Statistics',
      slots: [
        {
          id: 'stochastic',
          label: 'Stochastic Modeling',
          type: 'pick-one',
          options: [
            { dept: 'MS&E',  number: '221', name: 'Stochastic Modeling' },
            { dept: 'STATS', number: '217', name: 'Introduction to Stochastic Processes I' },
          ],
        },
        {
          id: 'applied-stats',
          label: 'Applied Statistics',
          type: 'pick-one',
          options: [
            { dept: 'STATS', number: '191',  name: 'Introduction to Applied Statistics' },
            { dept: 'STATS', number: '203',  name: 'Regression Models and Analysis of Variance' },
            { dept: 'STATS', number: '305A', name: 'Applied Statistics I' },
          ],
        },
      ],
    },

    // ── Mathematical Modeling ──────────────────────────────────────────────
    {
      id: 'math-modeling',
      name: 'Mathematical Modeling',
      slots: [
        {
          id: 'linear-alg',
          label: 'Linear Algebra',
          type: 'pick-one',
          options: [
            { dept: 'MATH', number: '104', name: 'Applied Matrix Theory' },
            { dept: 'MATH', number: '113', name: 'Linear Algebra and Matrix Theory' },
          ],
          note: 'MATH 113 may also satisfy the Proof-Writing requirement.',
        },
        {
          id: 'optimization',
          label: 'Optimization',
          type: 'pick-one',
          options: [
            { dept: 'EE',   number: '364A',  name: 'Convex Optimization I' },
            { dept: 'MS&E', number: '111',   name: 'Introduction to Optimization' },
            { dept: 'MS&E', number: '111DS', name: 'Introduction to Optimization: Data Science' },
            { dept: 'MS&E', number: '111X',  name: 'Introduction to Optimization (Accelerated)' },
          ],
        },
      ],
    },

    // ── Ethics ─────────────────────────────────────────────────────────────
    {
      id: 'ethics',
      name: 'Ethics',
      note: 'Complete 1 course exploring the intersection of data, technology, and ethics. Other courses may be petitioned with Program Director approval.',
      slots: [
        {
          id: 'ethics-course',
          label: 'Data, Technology, and Ethics Course',
          type: 'pick-from-list',
          count: 1,
          options: ETHICS_OPTIONS,
        },
      ],
    },

    // ── Subplan Selector ───────────────────────────────────────────────────
    {
      id: 'subplan-selector',
      name: 'Subplan',
      trackSelector: true,
      note: 'All students must choose one subplan: Mathematics and Computation, Biology and Medicine, Computational Neuroscience, or Quantitative Finance.',
      slots: [],
    },

    // ── Capstone Experience (includes WIM) ─────────────────────────────────
    {
      id: 'capstone',
      name: 'Capstone Experience & WIM',
      note: 'Choose 1 of 6 capstone options. DATASCI 120 (Data Narratives, WIM) is required for options 1, 3, 4, 6 and is tracked above in the WIM section. Options 2 and 5 satisfy WIM through their own courses.',
      slots: [],
      pickOneGroup: [
        {
          id: 'cap1',
          name: 'Option 1: The Data Science Experience',
          note: 'DATASCI 120 (WIM, tracked above) + DATASCI 190.',
          slots: [
            { id: 'cap1-190', label: 'DATASCI 190: The Data Science Experience', type: 'required', options: [{ dept: 'DATASCI', number: '190', name: 'The Data Science Experience' }] },
          ],
        },
        {
          id: 'cap2',
          name: 'Option 2: Practicum',
          note: 'Both DATASCI 192A and DATASCI 192B satisfy WIM. No DATASCI 120 needed.',
          slots: [
            { id: 'cap2-192a', label: 'DATASCI 192A: Practicum I', type: 'required', options: [{ dept: 'DATASCI', number: '192A', name: 'Data Science Practicum I' }] },
            { id: 'cap2-192b', label: 'DATASCI 192B: Practicum II', type: 'required', options: [{ dept: 'DATASCI', number: '192B', name: 'Data Science Practicum II' }] },
          ],
        },
        {
          id: 'cap3',
          name: 'Option 3: Applications',
          note: 'DATASCI 120 (WIM, tracked above) + one domain application course.',
          slots: [
            {
              id: 'cap3-app',
              label: 'DATASCI 194B/D/L/N/W: Domain Application',
              type: 'pick-one',
              options: [
                { dept: 'DATASCI', number: '194B', name: 'DS for Computational Molecular Biology' },
                { dept: 'DATASCI', number: '194D', name: 'The Data Science of Disinformation' },
                { dept: 'DATASCI', number: '194L', name: 'Data Science and the Science of Learning' },
                { dept: 'DATASCI', number: '194N', name: 'Data Science for Neuroscience' },
                { dept: 'DATASCI', number: '194W', name: 'Surfing the Waves of Data' },
              ],
            },
          ],
        },
        {
          id: 'cap4',
          name: 'Option 4: Independent Research',
          note: 'DATASCI 120 (WIM, tracked above) + pre-approved research project. Petition required.',
          slots: [
            { id: 'cap4-research', label: 'Pre-Approved Independent Research Project', type: 'any-approved', options: [] },
          ],
        },
        {
          id: 'cap5',
          name: 'Option 5: Honors Thesis',
          note: 'Honors Program students only. DATASCI 199W satisfies WIM. No DATASCI 120 needed.',
          slots: [
            { id: 'cap5-199w', label: 'DATASCI 199W: Honors Capstone Thesis (WIM)', type: 'required', options: [{ dept: 'DATASCI', number: '199W', name: 'Honors Capstone Thesis' }] },
          ],
        },
        {
          id: 'cap6',
          name: 'Option 6: Science Communication (NSC)',
          note: 'DATASCI 120 (WIM, tracked above) + PWR 99ANSC + PWR 99BNSC. Must fulfill all NSC program requirements.',
          slots: [
            { id: 'cap6-99ansc', label: 'PWR 99ANSC: NSC Portfolio Preparation I', type: 'required', options: [{ dept: 'PWR', number: '99ANSC', name: 'NSC Portfolio Preparation I' }] },
            { id: 'cap6-99bnsc', label: 'PWR 99BNSC: NSC Portfolio Preparation II', type: 'required', options: [{ dept: 'PWR', number: '99BNSC', name: 'NSC Portfolio Preparation II' }] },
          ],
        },
      ],
    },
  ],

  tracks: [
    // ── Subplan: Mathematics and Computation ───────────────────────────────
    {
      id: 'math-comp',
      name: 'Mathematics and Computation',
      sections: [
        {
          id: 'mc-math',
          name: 'Additional Math Course',
          note: 'Take MATH 53, MATH 63CM, or MATH 62DM; OR any MATH course numbered 100+. Only substitutions permitted in this subplan are technical electives (with advisor approval).',
          slots: [
            {
              id: 'mc-math-course',
              label: 'Additional Math Course',
              type: 'any-approved',
              options: [
                { dept: 'MATH', number: '53',   name: 'Differential Equations with Linear Algebra, Fourier Methods, and Modern Applications' },
                { dept: 'MATH', number: '63CM',  name: 'Modern Mathematics: Continuous Methods' },
                { dept: 'MATH', number: '62DM',  name: 'Modern Mathematics: Discrete Methods' },
              ],
              note: 'MATH 53, MATH 63CM, and MATH 62DM are the listed options. Any MATH course numbered 100+ is also accepted.',
            },
          ],
        },
        {
          id: 'mc-computation',
          name: 'Additional Computation Courses',
          slots: [
            {
              id: 'mc-comp-courses',
              label: 'Additional Computation Courses (pick 2)',
              type: 'pick-from-list',
              count: 2,
              options: [
                { dept: 'CME', number: '108', name: 'Introduction to Scientific Computing' },
                { dept: 'CS',  number: '107', name: 'Computer Organization and Systems' },
                { dept: 'CS',  number: '145', name: 'Introduction to Big Data Systems' },
                { dept: 'CS',  number: '154', name: 'Introduction to the Theory of Computation' },
                { dept: 'CS',  number: '161', name: 'Design and Analysis of Algorithms' },
              ],
            },
          ],
        },
        {
          id: 'mc-stat-learning',
          name: 'Statistical Learning or Causality',
          slots: [
            {
              id: 'mc-stat-course',
              label: 'Statistical Learning or Causality Course',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'STATS', number: '202',  name: 'Statistical Learning and Data Science' },
                { dept: 'STATS', number: '202F', name: 'Statistical Learning and Data Science [Flipped]' },
                { dept: 'STATS', number: '202V', name: 'Statistical Learning and Data Science [Virtual]' },
                { dept: 'STATS', number: '216',  name: 'Introduction to Statistical Learning' },
                { dept: 'STATS', number: '216V', name: 'Introduction to Statistical Learning [Virtual]' },
                { dept: 'STATS', number: '315A', name: 'Modern Applied Statistics: Learning' },
                { dept: 'STATS', number: '209',  name: 'Introduction to Causal Inference' },
                { dept: 'STATS', number: '361',  name: 'Causal Inference' },
                { dept: 'STATS', number: '263',  name: 'Design of Experiments' },
              ],
            },
          ],
        },
        {
          id: 'mc-electives',
          name: 'Technical Electives (min 2 courses, 6+ units)',
          minUnits: 6,
          note: 'Complete 2 electives (each ≥ 3 units). Accepted: CME 200+, CS 110+, DATASCI 100+, EE 200+, MATH 100+, MS&E 200+, STATS (any), or pre-approved courses listed. Max 1 independent study/research course (3 units). ECON 102A/B and POLISCI 150A/B are NOT accepted.',
          slots: [
            {
              id: 'mc-elective-courses',
              label: 'Technical Electives (pick 2)',
              type: 'pick-from-list',
              count: 2,
              options: TECH_ELECTIVE_PREAPPROVED,
              note: 'Other courses from CME 200+, CS 110+, DATASCI 100+, EE 200+, MATH 100+, MS&E 200+, or STATS may also be used: contact program for approval.',
            },
          ],
        },
      ],
    },

    // ── Subplan: Biology and Medicine ──────────────────────────────────────
    {
      id: 'bio-med',
      name: 'Biology and Medicine',
      sections: [
        {
          id: 'bm-compbio',
          name: 'Computation and Biology Course',
          slots: [
            {
              id: 'bm-compbio-course',
              label: 'Course at Intersection of Computation and Biology',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'CME', number: '108',  name: 'Introduction to Scientific Computing' },
                { dept: 'CME', number: '209',  name: 'Mathematical Modeling of Biological Systems' },
                { dept: 'CS',  number: '161',  name: 'Design and Analysis of Algorithms' },
                { dept: 'CS',  number: '173A', name: 'Foundations of Computational Human Genomics' },
                { dept: 'CS',  number: '270',  name: 'Modeling Biomedical Systems' },
                { dept: 'CS',  number: '274',  name: 'Representations and Algorithms for Computational Molecular Biology' },
                { dept: 'CS',  number: '279',  name: 'Computational Biology: Structure and Organization of Biomolecules and Cells' },
              ],
            },
          ],
        },
        {
          id: 'bm-bio',
          name: 'Biology Course Set',
          note: 'Complete ONE full sequence: BIO 82+83+84+86, OR HUMBIO 2A+3A+4A. Do not mix sequences. Slot 4 (BIO 86) is only required for the BIO sequence.',
          slots: [
            {
              id: 'bm-bio-1',
              label: 'Biology Sequence Course 1',
              type: 'pick-one',
              options: [
                { dept: 'BIO',    number: '82',  name: 'Genetics (BIO sequence)' },
                { dept: 'HUMBIO', number: '2A',  name: 'Genetics, Molecular Biology and Evolution (HUMBIO sequence)' },
              ],
              note: 'Choose one complete sequence and take all courses from it.',
            },
            {
              id: 'bm-bio-2',
              label: 'Biology Sequence Course 2',
              type: 'pick-one',
              options: [
                { dept: 'BIO',    number: '83',  name: 'Biochemistry & Molecular Biology (BIO sequence)' },
                { dept: 'HUMBIO', number: '3A',  name: 'Cell and Developmental Biology (HUMBIO sequence)' },
              ],
            },
            {
              id: 'bm-bio-3',
              label: 'Biology Sequence Course 3',
              type: 'pick-one',
              options: [
                { dept: 'BIO',    number: '84',  name: 'Physiology (BIO sequence)' },
                { dept: 'HUMBIO', number: '4A',  name: 'The Human Organism (HUMBIO sequence)' },
              ],
            },
            {
              id: 'bm-bio-4',
              label: 'BIO 86: Cell Biology (BIO sequence only)',
              type: 'required',
              options: [{ dept: 'BIO', number: '86', name: 'Cell Biology' }],
              optional: true,
              note: 'Required only for BIO sequence students. Skip if using HUMBIO 2A+3A+4A.',
            },
          ],
        },
      ],
    },

    // ── Subplan: Computational Neuroscience ────────────────────────────────
    {
      id: 'comp-neuro',
      name: 'Computational Neuroscience',
      sections: [
        {
          id: 'cn-math',
          name: 'Mathematical Preparation',
          slots: [
            {
              id: 'cn-math-course',
              label: 'Differential Equations or Matrix Methods Course',
              type: 'pick-one',
              options: [
                { dept: 'MATH', number: '53',   name: 'Differential Equations with Linear Algebra, Fourier Methods...' },
                { dept: 'MATH', number: '63CM',  name: 'Modern Mathematics: Continuous Methods' },
                { dept: 'MATH', number: '131P',  name: 'Partial Differential Equations' },
                { dept: 'EE',   number: '263',   name: 'Matrix Methods: Singular Value Decomposition' },
              ],
            },
          ],
        },
        {
          id: 'cn-intro-neuro',
          name: 'Introduction to Neuroscience',
          note: 'BIO 154 title/content has changed; still technically accepted but no longer recommended as an introductory neuroscience course.',
          slots: [
            {
              id: 'cn-neuro-course',
              label: 'Intro Neuroscience Course',
              type: 'pick-one',
              options: [
                { dept: 'BIO',   number: '102', name: 'Introduction to Neuroscience' },
                { dept: 'BIO',   number: '154', name: 'Advanced Neurobiology (no longer recommended)' },
                { dept: 'PSYCH', number: '50',  name: 'Introduction to Cognitive Neuroscience' },
                { dept: 'PSYCH', number: '202', name: 'Cognitive Neuroscience' },
              ],
            },
          ],
        },
        {
          id: 'cn-cog-psych',
          name: 'Introduction to Cognitive Psychology',
          slots: [
            {
              id: 'cn-cog-course',
              label: 'Intro Cognitive Psychology Course',
              type: 'pick-one',
              options: [
                { dept: 'PSYCH', number: '30', name: 'Introduction to Perception' },
                { dept: 'PSYCH', number: '35', name: 'Minds and Machines' },
                { dept: 'PSYCH', number: '45', name: 'Introduction to Learning and Memory' },
              ],
            },
          ],
        },
        {
          id: 'cn-ml-neuro',
          name: 'Machine Learning for Neuroscience',
          slots: [
            {
              id: 'cn-ml-course',
              label: 'ML for Neuroscience Course',
              type: 'pick-one',
              options: [
                { dept: 'STATS', number: '220', name: 'Machine Learning Methods for Neural Data Analysis' },
                { dept: 'BMDS',  number: '274', name: 'Machine Learning for Neuroimaging' },
                { dept: 'PSYCH', number: '249', name: 'Large-Scale Neural Network Modeling for Neuroscience' },
              ],
            },
          ],
        },
        {
          id: 'cn-adv-neuro',
          name: 'Advanced Neuroscience Electives',
          note: 'Complete at least 2. A second course from the ML for Neuroscience category above (STATS 220, BMDS 274, PSYCH 249) may count as one of the 2.',
          slots: [
            {
              id: 'cn-adv-courses',
              label: 'Advanced Neuroscience Electives (pick 2)',
              type: 'pick-from-list',
              count: 2,
              options: [
                { dept: 'CS',    number: '428A',  name: 'Probabilistic Models of Cognition: Reasoning and Learning' },
                { dept: 'CS',    number: '428B',  name: 'Probabilistic Models of Cognition: Language' },
                { dept: 'DATASCI',number: '194N', name: 'Data Science for Neuroscience' },
                { dept: 'EDUC',  number: '464',   name: 'Measuring Learning in the Brain' },
                { dept: 'EDUC',  number: '486',   name: 'Educational Neuroscience' },
                { dept: 'MUSIC', number: '251',   name: 'Psychophysics and Music Cognition' },
                { dept: 'MUSIC', number: '451A',  name: 'Basics in Auditory and Music Neuroscience' },
                { dept: 'PHIL',  number: '167D',  name: 'Philosophy of Neuroscience' },
                { dept: 'PSYCH', number: '154',   name: 'Judgment and Decision-Making' },
                { dept: 'PSYCH', number: '164',   name: 'Brain Decoding' },
                { dept: 'PSYCH', number: '169',   name: 'Advanced Seminar on Memory' },
                { dept: 'PSYCH', number: '209',   name: 'Neural Network Models of Cognition' },
                { dept: 'PSYCH', number: '236',   name: 'Mind Reading with Movies and Neuroimaging' },
                { dept: 'PSYCH', number: '242',   name: 'A Modern Explainable AI Approach to Theoretical Neuroscience' },
                { dept: 'PSYCH', number: '263',   name: 'Neuroscience of Visual Intelligence' },
                // Second ML-for-Neuro course may count as one elective
                { dept: 'STATS', number: '220',   name: 'Machine Learning Methods for Neural Data Analysis (as 2nd ML elective)' },
                { dept: 'BMDS',  number: '274',   name: 'Machine Learning for Neuroimaging (as 2nd ML elective)' },
                { dept: 'PSYCH', number: '249',   name: 'Large-Scale Neural Network Modeling for Neuroscience (as 2nd ML elective)' },
              ],
            },
          ],
        },
      ],
    },

    // ── Subplan: Quantitative Finance ──────────────────────────────────────
    {
      id: 'quant-finance',
      name: 'Quantitative Finance',
      sections: [
        {
          id: 'qf-econ',
          name: 'Economics Preparation',
          slots: [
            {
              id: 'econ50',
              label: 'ECON 50: Economic Analysis I',
              type: 'required',
              options: [{ dept: 'ECON', number: '50' }],
            },
          ],
        },
        {
          id: 'qf-timeseries',
          name: 'Time Series',
          slots: [
            {
              id: 'qf-ts-course',
              label: 'Time Series Course',
              type: 'pick-one',
              options: [
                { dept: 'STATS', number: '207', name: 'Time Series Analysis' },
                { dept: 'STATS', number: '218', name: 'Introduction to Stochastic Processes II' },
                { dept: 'STATS', number: '232', name: 'Machine Learning for Sequence Modeling' },
                { dept: 'MS&E',  number: '349', name: 'Financial Statistics' },
              ],
            },
          ],
        },
        {
          id: 'qf-finance',
          name: 'Finance Electives (pick 2)',
          note: 'MS&E 145, MS&E 245A, and MS&E 245B are alternatives: only one of the three counts.',
          slots: [
            {
              id: 'qf-finance-courses',
              label: 'Finance Electives (pick 2)',
              type: 'pick-from-list',
              count: 2,
              options: [
                { dept: 'CS',      number: '251',  name: 'Cryptocurrencies and Blockchain Technologies' },
                { dept: 'ECON',    number: '135',  name: 'Foundations of Finance' },
                { dept: 'ECON',    number: '141',  name: 'Financial Markets' },
                { dept: 'FINANCE', number: '320',  name: 'Debt Markets' },
                { dept: 'FINANCE', number: '620',  name: 'Financial Markets I' },
                { dept: 'MATH',    number: '237A', name: 'Topics in Financial Math: Market Microstructure and Trading Algorithms' },
                { dept: 'MATH',    number: '238',  name: 'Mathematical Finance' },
                { dept: 'MS&E',    number: '145',  name: 'Introduction to Finance and Investment' },
                { dept: 'MS&E',    number: '245A', name: 'Investment Science (alt to MS&E 145)' },
                { dept: 'MS&E',    number: '245B', name: 'Advanced Investment Science (alt to MS&E 145)' },
                { dept: 'MS&E',    number: '146',  name: 'Corporate Financial Management' },
                { dept: 'MS&E',    number: '246',  name: 'Financial Risk Analytics' },
                { dept: 'MS&E',    number: '248',  name: 'Blockchain and Crypto Currencies' },
                { dept: 'MS&E',    number: '339',  name: 'Algorithms for Decentralized Finance' },
                { dept: 'MS&E',    number: '349',  name: 'Financial Statistics' },
              ],
            },
          ],
        },
        {
          id: 'qf-electives',
          name: 'Technical Elective (min 1 course, 3+ units)',
          minUnits: 3,
          note: 'Complete 1 additional technical elective (≥ 3 units). Accepted: CME 200+, CS 110+, DATASCI 100+, EE 200+, MATH 100+, MS&E 200+, STATS (any), or pre-approved courses listed. Max 1 independent study/research (3 units). ECON 102A/B and POLISCI 150A/B are NOT accepted.',
          slots: [
            {
              id: 'qf-elective-course',
              label: 'Technical Elective',
              type: 'pick-from-list',
              count: 1,
              options: TECH_ELECTIVE_PREAPPROVED,
              note: 'Other courses from CME 200+, CS 110+, DATASCI 100+, EE 200+, MATH 100+, MS&E 200+, or STATS may also be used: contact program for approval.',
            },
          ],
        },
      ],
    },
  ],
};
