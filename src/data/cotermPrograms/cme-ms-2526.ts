// Computational and Mathematical Engineering MS (Coterm): ICME, 2025-2026
// Source: https://bulletin.stanford.edu/programs/CME-MS/

import type { MajorConfig, CourseOption } from '../majorSchema';

// ── Shared course lists ────────────────────────────────────────────────────────

// Basic programming (Req 2a): General CME and IS tracks
const BASIC_PROG: CourseOption[] = [
  { dept: 'CME', number: '212', name: 'Advanced Software Development for Scientists and Engineers' },
  { dept: 'CME', number: '310', name: 'Combinatorial Optimization' },
  { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
  { dept: 'CS', number: '161', name: 'Design and Analysis of Algorithms' },
  { dept: 'CS', number: '166', name: 'Advanced Data Structures' },
  { dept: 'CS', number: '168', name: 'The Modern Algorithmic Toolbox' },
  { dept: 'CS', number: '190', name: 'Software Design Studio' },
];

// Basic programming (Req 2a): DS track only (2 options)
const BASIC_PROG_DS: CourseOption[] = [
  { dept: 'CME', number: '212', name: 'Advanced Software Development for Scientists and Engineers' },
  { dept: 'CME', number: '310', name: 'Combinatorial Optimization' },
];

// Basic programming (Req 2a): MCF track (no CME310)
const BASIC_PROG_MCF: CourseOption[] = [
  { dept: 'CME', number: '212', name: 'Advanced Software Development for Scientists and Engineers' },
  { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
  { dept: 'CS', number: '161', name: 'Design and Analysis of Algorithms' },
  { dept: 'CS', number: '166', name: 'Advanced Data Structures' },
  { dept: 'CS', number: '168', name: 'The Modern Algorithmic Toolbox' },
  { dept: 'CS', number: '190', name: 'Software Design Studio' },
];

// Advanced programming (Req 2b): General CME, IS, and MCF tracks
const ADV_PROG: CourseOption[] = [
  { dept: 'CME', number: '213', name: 'Introduction to Parallel Computing using MPI, openMP, and CUDA' },
  { dept: 'CME', number: '323', name: 'Distributed Algorithms and Optimization' },
  { dept: 'CS', number: '149', name: 'Parallel Computing' },
  { dept: 'CS', number: '194', name: 'Software Project' },
  { dept: 'CS', number: '246', name: 'Mining Massive Data Sets' },
  { dept: 'CS', number: '295', name: 'Software Engineering' },
  { dept: 'CS', number: '315B', name: 'Parallel Computing Research Project' },
  { dept: 'GEOPHYS', number: '257', name: 'Introduction to Computational Earth Sciences' },
];

// Advanced programming (Req 2b): DS track (6 units; no CS149/CS194)
const ADV_PROG_DS: CourseOption[] = [
  { dept: 'CME', number: '213', name: 'Introduction to Parallel Computing using MPI, openMP, and CUDA' },
  { dept: 'CME', number: '323', name: 'Distributed Algorithms and Optimization' },
  { dept: 'CS', number: '246', name: 'Mining Massive Data Sets' },
  { dept: 'CS', number: '295', name: 'Software Engineering' },
  { dept: 'CS', number: '315B', name: 'Parallel Computing Research Project' },
  { dept: 'GEOPHYS', number: '257', name: 'Introduction to Computational Earth Sciences' },
];

// Foundational core: General CME track (includes MATH236 as standalone stochastic option)
const FOUNDATIONAL_GENERAL: CourseOption[] = [
  { dept: 'CME', number: '302', name: 'Numerical Linear Algebra' },
  { dept: 'CME', number: '303', name: 'Partial Differential Equations of Applied Mathematics' },
  { dept: 'CME', number: '306', name: 'Computational Methods of Applied Mathematics' },
  { dept: 'CME', number: '307', name: 'Optimization' },
  { dept: 'CME', number: '364A', name: 'Convex Optimization I' },
  { dept: 'CME', number: '310', name: 'Combinatorial Optimization' },
  { dept: 'MATH', number: '236', name: 'Introduction to Stochastic Differential Equations' },
  { dept: 'CME', number: '298', name: 'Probability and Stochastic Differential Equations for Applications' },
  { dept: 'CME', number: '308', name: 'Stochastic Methods in Engineering' },
];

// Foundational core: IS track (stochastic slot is CME308/CME298 only, not MATH236)
const FOUNDATIONAL_IS: CourseOption[] = [
  { dept: 'CME', number: '302', name: 'Numerical Linear Algebra' },
  { dept: 'CME', number: '303', name: 'Partial Differential Equations of Applied Mathematics' },
  { dept: 'CME', number: '306', name: 'Computational Methods of Applied Mathematics' },
  { dept: 'CME', number: '307', name: 'Optimization' },
  { dept: 'CME', number: '364A', name: 'Convex Optimization I' },
  { dept: 'CME', number: '308', name: 'Stochastic Methods in Engineering' },
  { dept: 'CME', number: '298', name: 'Probability and Stochastic Differential Equations for Applications' },
  { dept: 'CME', number: '310', name: 'Combinatorial Optimization' },
];

// General CME breadth electives (Req 3: 73 courses; list expanded regularly by ICME)
const GENERAL_BREADTH: CourseOption[] = [
  { dept: 'BMDS', number: '222', name: 'Cloud Computing for Biology and Healthcare' },

  { dept: 'CEE', number: '281', name: 'Mechanics and Finite Elements' },
  { dept: 'CME', number: '218', name: 'Applied Data Science' },
  { dept: 'CME', number: '241', name: 'Foundations of Reinforcement Learning with Applications in Finance' },
  { dept: 'CME', number: '262', name: 'Imaging with Incomplete Information' },
  { dept: 'CME', number: '263', name: 'Matrix Methods: Singular Value Decomposition' },
  { dept: 'CME', number: '279', name: 'Computational Biology: Structure and Organization of Biomolecules and Cells' },
  { dept: 'CME', number: '290', name: 'Xplore: Impactful Research' },
  { dept: 'CME', number: '291', name: "Master's Research" },
  { dept: 'CME', number: '295', name: 'Transformers and Large Language Models' },
  { dept: 'CME', number: '309', name: 'Randomized Algorithms and Probabilistic Analysis' },
  { dept: 'CME', number: '323', name: 'Distributed Algorithms and Optimization' },
  { dept: 'CME', number: '364A', name: 'Convex Optimization I' },
  { dept: 'CME', number: '371', name: 'Computational Biology in Four Dimensions' },
  { dept: 'CS', number: '204', name: 'Computational Law' },
  { dept: 'CS', number: '221', name: 'Artificial Intelligence: Principles and Techniques' },
  { dept: 'CS', number: '224N', name: 'Natural Language Processing with Deep Learning' },
  { dept: 'CS', number: '224W', name: 'Machine Learning with Graphs' },
  { dept: 'CS', number: '228', name: 'Probabilistic Graphical Models: Principles and Techniques' },
  { dept: 'CS', number: '229', name: 'Machine Learning' },
  { dept: 'CS', number: '230', name: 'Deep Learning' },
  { dept: 'CS', number: '231N', name: 'Deep Learning for Computer Vision' },
  { dept: 'CS', number: '233', name: 'Geometric and Topological Data Analysis' },
  { dept: 'CS', number: '234', name: 'Reinforcement Learning' },
  { dept: 'CS', number: '236', name: 'Deep Generative Models' },
  { dept: 'CS', number: '238', name: 'Decision Making under Uncertainty' },
  { dept: 'CS', number: '239', name: 'Advanced Topics in Sequential Decision Making' },
  { dept: 'CS', number: '244B', name: 'Distributed Systems' },
  { dept: 'CS', number: '246', name: 'Mining Massive Data Sets' },
  { dept: 'CS', number: '255', name: 'Introduction to Cryptography' },
  { dept: 'CS', number: '261', name: 'Combinatorial Optimization' },
  { dept: 'CS', number: '348A', name: 'Computer Graphics: Geometric Modeling & Processing' },
  { dept: 'ECON', number: '293', name: 'Machine Learning and Causal Inference' },
  { dept: 'EE', number: '223', name: 'Applied Quantum Mechanics II' },
  { dept: 'ENGR', number: '209A', name: 'Analysis and Control of Nonlinear Systems' },
  { dept: 'MATH', number: '136', name: 'Stochastic Processes' },
  { dept: 'MATH', number: '171', name: 'Fundamental Concepts of Analysis' },
  { dept: 'MATH', number: '235', name: 'Modern Markov Chains' },
  { dept: 'MATH', number: '236', name: 'Introduction to Stochastic Differential Equations' },
  { dept: 'MATH', number: '238', name: 'Mathematical Finance' },
  { dept: 'MATH', number: '275A', name: 'Topics in Applied Math: Quantum Algorithms for Scientific Computation' },
  { dept: 'ME', number: '335A', name: 'Finite Element Analysis' },
  { dept: 'ME', number: '346B', name: 'Introduction to Molecular Simulations' },
  { dept: 'ME', number: '408', name: 'Spectral Methods in Computational Physics' },
  { dept: 'ME', number: '469', name: 'Computational Methods in Fluid Mechanics' },
  { dept: 'MS&E', number: '220', name: 'Probabilistic Analysis' },
  { dept: 'MS&E', number: '221', name: 'Stochastic Modeling' },
  { dept: 'MS&E', number: '223', name: 'Stochastic Simulation and Monte Carlo Methods' },
  { dept: 'MS&E', number: '226', name: 'Fundamentals of Data Science: Prediction, Inference, Causality' },
  { dept: 'MS&E', number: '228', name: 'Applied Causal Inference with Machine Learning and AI' },
  { dept: 'MS&E', number: '232H', name: 'Introduction to Game Theory (Accelerated)' },
  { dept: 'MS&E', number: '235B', name: 'Reinforcement Learning: Behaviors and Applications' },
  { dept: 'MS&E', number: '236', name: 'Machine Learning for Discrete Optimization' },
  { dept: 'MS&E', number: '237A', name: 'Bandit Learning: Behaviors and Applications' },
  { dept: 'MS&E', number: '310', name: 'Linear Programming' },
  { dept: 'MS&E', number: '314', name: 'Optimization in Data Science and Machine Learning' },
  { dept: 'MS&E', number: '316', name: 'Discrete Mathematics and Algorithms' },
  { dept: 'MS&E', number: '321', name: 'Stochastic Systems' },
  { dept: 'MS&E', number: '322', name: 'Stochastic Calculus and Control' },
  { dept: 'MS&E', number: '323', name: 'Stochastic Simulation' },
  { dept: 'MS&E', number: '328', name: 'Foundations of Causal Machine Learning' },
  { dept: 'STATS', number: '202', name: 'Statistical Learning and Data Science' },
  { dept: 'STATS', number: '207', name: 'Time Series Analysis' },
  { dept: 'STATS', number: '208', name: 'Resampling Methods: Bootstrap, Cross Validation and Beyond' },
  { dept: 'STATS', number: '217', name: 'Introduction to Stochastic Processes I' },
  { dept: 'STATS', number: '218', name: 'Introduction to Stochastic Processes II' },


  { dept: 'STATS', number: '300A', name: 'Theory of Statistics I' },
  { dept: 'STATS', number: '300B', name: 'Theory of Statistics II' },
  { dept: 'STATS', number: '300C', name: 'Theory of Statistics III' },
  { dept: 'STATS', number: '305A', name: 'Applied Statistics I' },
  { dept: 'STATS', number: '310A', name: 'Theory of Probability I' },
  { dept: 'STATS', number: '315A', name: 'Modern Applied Statistics: Learning' },
  { dept: 'STATS', number: '315B', name: 'Modern Applied Statistics: Learning II' },
  { dept: 'STATS', number: '362', name: 'Topic: Monte Carlo' },
];

// IS track electives (Req 3)
const IMAGING_ELECTIVES: CourseOption[] = [
  { dept: 'APPPHYS', number: '232', name: 'Advanced Imaging Lab in Biophysics' },
  { dept: 'BIOE', number: '220', name: 'Introduction to Imaging and Image-based Human Anatomy' },
  { dept: 'CEE', number: '260G', name: 'Imaging with Incomplete Information' },
  { dept: 'CME', number: '279', name: 'Computational Biology: Structure and Organization of Biomolecules and Cells' },
  { dept: 'CME', number: '371', name: 'Computational Biology in Four Dimensions' },
  { dept: 'CS', number: '231N', name: 'Deep Learning for Computer Vision' },
  { dept: 'CS', number: '237A', name: 'Principles of Robot Autonomy I' },
  { dept: 'EARTHSYS', number: '242', name: 'Remote Sensing of Land' },
  { dept: 'EE', number: '236A', name: 'Modern Optics' },
  { dept: 'EE', number: '355', name: 'Imaging Radar and Applications' },
  { dept: 'EE', number: '367', name: 'Computational Imaging' },
  { dept: 'EE', number: '369A', name: 'Medical Imaging Systems I' },
  { dept: 'EE', number: '369B', name: 'Medical Imaging Systems II' },
  { dept: 'EE', number: '369C', name: 'Medical Image Reconstruction' },
  { dept: 'GEOPHYS', number: '210', name: 'Basic Earth Imaging' },
  { dept: 'GEOPHYS', number: '211', name: 'Environmental Soundings Image Estimation' },
  { dept: 'GEOPHYS', number: '280', name: '3-D Seismic Imaging' },
  { dept: 'PSYCH', number: '204A', name: 'Human Neuroimaging Methods' },
];

// DS track courses
const DS_EXPERIMENTATION: CourseOption[] = [
  { dept: 'ECON', number: '271', name: 'Intermediate Econometrics II' },
  { dept: 'ECON', number: '293', name: 'Machine Learning and Causal Inference' },
  { dept: 'MS&E', number: '228', name: 'Applied Causal Inference with Machine Learning and AI' },
  { dept: 'STATS', number: '209', name: 'Introduction to Causal Inference' },
  { dept: 'STATS', number: '263', name: 'Design of Experiments' },
];

const DS_ML_ELECTIVES: CourseOption[] = [
  { dept: 'CME', number: '364A', name: 'Convex Optimization I' },
  { dept: 'CS', number: '221', name: 'Artificial Intelligence: Principles and Techniques' },
  { dept: 'CS', number: '224N', name: 'Natural Language Processing with Deep Learning' },
  { dept: 'CS', number: '224W', name: 'Machine Learning with Graphs' },
  { dept: 'CS', number: '229M', name: 'Machine Learning Theory' },
  { dept: 'CS', number: '230', name: 'Deep Learning' },
  { dept: 'CS', number: '231N', name: 'Deep Learning for Computer Vision' },
  { dept: 'CS', number: '234', name: 'Reinforcement Learning' },
  { dept: 'CS', number: '236', name: 'Deep Generative Models' },
  { dept: 'CS', number: '330', name: 'Deep Multi-task and Meta Learning' },
  { dept: 'STATS', number: '315B', name: 'Modern Applied Statistics: Learning II' },
];

const DS_PRACTICAL: CourseOption[] = [
  { dept: 'CME', number: '218', name: 'Applied Data Science' },
  { dept: 'CME', number: '290', name: 'Xplore: Impactful Research' },
  { dept: 'CME', number: '291', name: "Master's Research" },
  { dept: 'CME', number: '299', name: 'First Year MS Seminar' },
  { dept: 'STATS', number: '390', name: 'Consulting Workshop' },
];

// MCF track courses
const FINANCE_ELECTIVES: CourseOption[] = [
  { dept: 'CME', number: '229', name: 'Applications of Machine Learning to Electronic Markets' },
  { dept: 'CS', number: '251', name: 'Cryptocurrencies and Blockchain Technologies' },
  { dept: 'FINANCE', number: '320', name: 'Debt Markets' },
  { dept: 'FINANCE', number: '620', name: 'Financial Markets I' },
  { dept: 'FINANCE', number: '622', name: 'Dynamic Asset Pricing Theory' },
  { dept: 'MATH', number: '238', name: 'Mathematical Finance' },
  { dept: 'MS&E', number: '232H', name: 'Introduction to Game Theory (Accelerated)' },
  { dept: 'MS&E', number: '242', name: 'Machine Learning for Algorithmic Trading' },
  { dept: 'MS&E', number: '244', name: 'Statistical Arbitrage' },
  { dept: 'MS&E', number: '245A', name: 'Investment Science' },
  { dept: 'MS&E', number: '245B', name: 'Advanced Investment Science' },
  { dept: 'MS&E', number: '247', name: 'Decentralized Finance & Blockchain: Innovation, Applications, and Entrepreneurship' },
  { dept: 'MS&E', number: '339', name: 'Algorithms for Decentralized Finance' },
  { dept: 'MS&E', number: '342', name: 'Stochastic Systems and Learning Theory with Applications in Finance' },
  { dept: 'MS&E', number: '348', name: 'Optimization of Uncertainty and Applications in Finance' },
  { dept: 'MS&E', number: '349', name: 'Financial Statistics' },
];

const MCF_DATA_SCI_ELECTIVES: CourseOption[] = [
  { dept: 'CME', number: '241', name: 'Foundations of Reinforcement Learning with Applications in Finance' },
  { dept: 'CS', number: '224N', name: 'Natural Language Processing with Deep Learning' },
  { dept: 'CS', number: '230', name: 'Deep Learning' },
  { dept: 'CS', number: '236', name: 'Deep Generative Models' },
  { dept: 'CS', number: '246', name: 'Mining Massive Data Sets' },
  { dept: 'EE', number: '277', name: 'Bandit Learning: Behaviors and Applications' },
  { dept: 'MS&E', number: '223', name: 'Stochastic Simulation and Monte Carlo Methods' },
  { dept: 'MS&E', number: '338', name: 'Aligning Superintelligence' },
  { dept: 'MS&E', number: '342', name: 'Stochastic Systems and Learning Theory with Applications in Finance' },
  { dept: 'MS&E', number: '347', name: 'Advanced Topics in Blockchain & DeFi: Research, Market Design, and Microstructure' },
  { dept: 'MS&E', number: '349', name: 'Financial Statistics' },
  { dept: 'STATS', number: '200', name: 'Introduction to Theoretical Statistics' },
  { dept: 'STATS', number: '203', name: 'Regression Models and Analysis of Variance' },
  { dept: 'STATS', number: '205', name: 'Introduction to Nonparametric Statistics' },
  { dept: 'STATS', number: '206', name: 'Applied Multivariate Analysis' },
  { dept: 'STATS', number: '207', name: 'Time Series Analysis' },
  { dept: 'STATS', number: '219', name: 'Stochastic Processes' },
  { dept: 'STATS', number: '270', name: 'Bayesian Statistics' },
  { dept: 'STATS', number: '285', name: 'Massive Computational Experiments, Painlessly' },
  { dept: 'STATS', number: '305A', name: 'Applied Statistics I' },
  { dept: 'STATS', number: '305B', name: 'Applied Statistics II' },
  { dept: 'STATS', number: '305C', name: 'Applied Statistics III' },
  { dept: 'STATS', number: '315A', name: 'Modern Applied Statistics: Learning' },
  { dept: 'STATS', number: '315B', name: 'Modern Applied Statistics: Learning II' },
  { dept: 'STATS', number: '361', name: 'Causal Inference' },
];

const MCF_PRACTICAL: CourseOption[] = [
  { dept: 'CME', number: '229', name: 'Applications of Machine Learning to Electronic Markets' },
  { dept: 'CME', number: '241', name: 'Foundations of Reinforcement Learning with Applications in Finance' },
  { dept: 'CME', number: '290', name: 'Xplore: Impactful Research' },
  { dept: 'CME', number: '291', name: "Master's Research" },
  { dept: 'CME', number: '299', name: 'First Year MS Seminar' },
  { dept: 'CS', number: '349F', name: 'Fabric Architectures For AI Systems' },
  { dept: 'MS&E', number: '242', name: 'Machine Learning for Algorithmic Trading' },
  { dept: 'MS&E', number: '244', name: 'Statistical Arbitrage' },
  { dept: 'MS&E', number: '246', name: 'Financial Risk Analytics' },
  { dept: 'MS&E', number: '247', name: 'Decentralized Finance & Blockchain: Innovation, Applications, and Entrepreneurship' },
  { dept: 'MS&E', number: '339', name: 'Algorithms for Decentralized Finance' },
  { dept: 'MS&E', number: '348', name: 'Optimization of Uncertainty and Applications in Finance' },
  { dept: 'MS&E', number: '446', name: 'Artificial Intelligence in Financial Technology' },
];

// ── Config ─────────────────────────────────────────────────────────────────────

export const CME_MS_2526: MajorConfig = {
  id: 'cme-ms-2526',
  name: 'Computational and Mathematical Engineering MS (Coterm)',
  school: 'Institute for Computational and Mathematical Engineering',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/CME-MS/',
  category: 'coterm',
  totalMinUnits: 45,
  sections: [
    {
      id: 'track-selector',
      name: 'Track',
      trackSelector: true,
      slots: [],
    },
    {
      id: 'policies',
      name: 'Program Policies',
      note: '45 units required, all numbered 200+. Courses below 200 need special program-office approval (pre-approved exceptions appear in each requirement). At least 36 units must be graded; all letter-graded units must earn C- or better; cumulative GPA ≥ 3.0. A course may not satisfy more than one requirement unless repeatable for credit. CME 299 strongly recommended for all tracks.',
      slots: [],
    },
  ],
  tracks: [
    // ── General CME ──────────────────────────────────────────────────────────
    {
      id: 'general-cme',
      name: 'General CME',
      sections: [
        {
          id: 'gen-foundational',
          name: 'Req 1: Foundational (12 units)',
          minUnits: 12,
          note: 'Complete 4 of the 6 core slots for ≥12 letter-graded units. OR alternatives: (4) CME307 or CME364A; (6) MATH236 or CME298 or CME308.',
          slots: [
            {
              id: 'gen-foundational-courses',
              label: '4 core courses (≥12 units, letter grade)',
              type: 'pick-from-list',
              count: 4,
              minUnits: 12,
              options: FOUNDATIONAL_GENERAL,
            },
          ],
        },
        {
          id: 'gen-programming',
          name: 'Req 2: Computing and Programming (6 units)',
          minUnits: 6,
          note: 'All 6 units letter-graded. CME213 strongly recommended.',
          slots: [
            {
              id: 'gen-prog-basic',
              label: 'Req 2a: Basic programming (3 units)',
              type: 'pick-from-list',
              count: 1,
              minUnits: 3,
              options: BASIC_PROG,
            },
            {
              id: 'gen-prog-advanced',
              label: 'Req 2b: Advanced programming (3 units)',
              type: 'pick-from-list',
              count: 1,
              minUnits: 3,
              options: ADV_PROG,
            },
          ],
        },
        {
          id: 'gen-breadth',
          name: 'Req 3: Breadth Electives (15 units)',
          minUnits: 15,
          note: 'Should include offerings from at least two engineering departments and CME coursework. Up to 6 units of CME 291 (independent research) count with prior approval. The approved list is expanded regularly: courses outside it require advisor approval.',
          slots: [
            {
              id: 'gen-breadth-courses',
              label: 'Breadth electives (≥15 units)',
              type: 'pick-from-list',
              minUnits: 15,
              options: GENERAL_BREADTH,
            },
            {
              id: 'gen-breadth-advisor',
              label: 'Advisor-approved breadth elective',
              type: 'any-approved',
              count: 3,
              optional: true,
              minLevel: 200,
              options: [],
              note: 'Courses outside the approved list accepted with program advisor approval.',
            },
          ],
        },
        {
          id: 'gen-specialized',
          name: 'Req 4: Specialized Electives (9 units)',
          minUnits: 9,
          note: 'Focused graduate electives in engineering, mathematics, physical, biological, information, or other quantitative sciences, approved by the program advisor.',
          slots: [
            {
              id: 'gen-specialized-courses',
              label: 'Specialized electives (≥9 units, advisor-approved)',
              type: 'any-approved',
              count: 3,
              minLevel: 200,
              minUnits: 9,
              options: [],
            },
          ],
        },
        {
          id: 'gen-seminar',
          name: 'Req 5: Seminar (3 units)',
          note: 'CME 500 (1 unit) required. Remaining 2 units are the student\'s choice of ICME graduate seminars or other approved seminars. Additional seminar units beyond 3 may NOT count toward the 45-unit requirement.',
          slots: [
            {
              id: 'gen-seminar-required',
              label: 'CME 500: Departmental Seminar (1 unit)',
              type: 'required',
              options: [{ dept: 'CME', number: '500', name: 'Departmental Seminar' }],
            },
            {
              id: 'gen-seminar-elective',
              label: 'ICME graduate seminars (2 units)',
              type: 'any-approved',
              count: 2,
              minUnits: 2,
              options: [],
              note: 'Student\'s choice of ICME graduate seminars or other approved seminars.',
            },
          ],
        },
      ],
    },

    // ── Data Science ─────────────────────────────────────────────────────────
    {
      id: 'data-science',
      name: 'Data Science',
      sections: [
        {
          id: 'ds-foundations',
          name: 'Req 1: Mathematical and Statistical Foundations (15 units)',
          minUnits: 15,
          note: 'All courses in this area must be taken for letter grades. MATH236 strongly recommended for the stochastic slot.',
          slots: [
            {
              id: 'ds-stochastic',
              label: 'Stochastic processes',
              type: 'pick-one',
              options: [
                { dept: 'CME', number: '298', name: 'Probability and Stochastic Differential Equations for Applications' },
                { dept: 'MATH', number: '236', name: 'Introduction to Stochastic Differential Equations' },
              ],
            },
            {
              id: 'ds-linear-algebra',
              label: 'Numerical linear algebra (required)',
              type: 'required',
              options: [{ dept: 'CME', number: '302', name: 'Numerical Linear Algebra' }],
            },
            {
              id: 'ds-theoretical-stats',
              label: 'Theoretical statistics',
              type: 'pick-one',
              options: [
                { dept: 'STATS', number: '200', name: 'Introduction to Theoretical Statistics' },
                { dept: 'STATS', number: '300A', name: 'Theory of Statistics I' },
              ],
            },
            {
              id: 'ds-applied-stats',
              label: 'Applied statistics',
              type: 'pick-one',
              options: [
                { dept: 'STATS', number: '203', name: 'Regression Models and Analysis of Variance' },
                { dept: 'STATS', number: '305A', name: 'Applied Statistics I' },
              ],
            },
            {
              id: 'ds-ml-foundation',
              label: 'Machine learning',
              type: 'pick-one',
              options: [
                { dept: 'STATS', number: '315A', name: 'Modern Applied Statistics: Learning' },
                { dept: 'STATS', number: '229', name: 'Machine Learning' },
              ],
            },
          ],
        },
        {
          id: 'ds-programming',
          name: 'Req 2: Computing and Programming (9 units)',
          minUnits: 9,
          note: 'All 9 units must be letter-graded. CME213, CME310, CS246 strongly recommended. Combined Req 2 + Req 4 rule: take 9 letter-graded from Req 2 + 9 letter-graded from Req 4 + 6 additional from either (may be non-letter-graded) = 24 total units across Req 2 and Req 4.',
          slots: [
            {
              id: 'ds-prog-basic',
              label: 'Req 2a: Basic programming (3 units)',
              type: 'pick-from-list',
              count: 1,
              minUnits: 3,
              options: BASIC_PROG_DS,
            },
            {
              id: 'ds-prog-advanced',
              label: 'Req 2b: Advanced programming (6 units)',
              type: 'pick-from-list',
              minUnits: 6,
              options: ADV_PROG_DS,
            },
          ],
        },
        {
          id: 'ds-experimentation',
          name: 'Req 3: Experimentation (3 units)',
          minUnits: 3,
          note: 'Must be letter-graded. If two courses from this list are taken, the additional 3 units may count toward Req 4.',
          slots: [
            {
              id: 'ds-experiment-courses',
              label: 'Causal inference / experimentation (3 units)',
              type: 'pick-from-list',
              count: 1,
              minUnits: 3,
              options: DS_EXPERIMENTATION,
            },
          ],
        },
        {
          id: 'ds-ml-methods',
          name: 'Req 4: Machine Learning Methods and Applications (9 units)',
          minUnits: 9,
          note: 'Must be letter-graded. See Req 2 note for the 24-unit combined Req 2 + Req 4 rule.',
          slots: [
            {
              id: 'ds-ml-courses',
              label: 'ML methods and applications (≥9 units)',
              type: 'pick-from-list',
              minUnits: 9,
              options: DS_ML_ELECTIVES,
            },
          ],
        },
        {
          id: 'ds-practical',
          name: 'Req 5: Practical Component (3 units)',
          minUnits: 3,
          note: 'STATS390 may only be taken for up to 1 unit toward this requirement. CME299 strongly recommended.',
          slots: [
            {
              id: 'ds-practical-courses',
              label: 'Practical component (≥3 units)',
              type: 'pick-from-list',
              minUnits: 3,
              options: DS_PRACTICAL,
            },
          ],
        },
        {
          id: 'ds-additional',
          name: 'Additional Units (6 units)',
          minUnits: 6,
          note: '6 additional units from the Req 2b Advanced Programming list or the Req 4 ML Methods list (or a mix). These 6 units may be non-letter-graded.',
          slots: [
            {
              id: 'ds-additional-courses',
              label: 'Additional units from Req 2b or Req 4 lists (6 units)',
              type: 'any-approved',
              count: 2,
              minUnits: 6,
              options: [],
              note: 'Eligible courses: see Req 2b (Advanced Programming) and Req 4 (ML Methods) lists above.',
            },
          ],
        },
      ],
    },

    // ── Imaging Science ──────────────────────────────────────────────────────
    {
      id: 'imaging-science',
      name: 'Imaging Science',
      sections: [
        {
          id: 'is-foundational',
          name: 'Req 1: Foundational (12 units)',
          minUnits: 12,
          note: 'Complete 4 of the 6 core slots for ≥12 letter-graded units in residence. OR alternatives: (4) CME307 or CME364A; (5) CME308 or CME298. CME213, CME323, or GEOPHYS257 strongly recommended for Req 2.',
          slots: [
            {
              id: 'is-foundational-courses',
              label: '4 core courses (≥12 units, letter grade, in residence)',
              type: 'pick-from-list',
              count: 4,
              minUnits: 12,
              options: FOUNDATIONAL_IS,
            },
          ],
        },
        {
          id: 'is-programming',
          name: 'Req 2: Computing and Programming (6 units)',
          minUnits: 6,
          note: '3 units basic + 3 units advanced, all letter-graded in residence.',
          slots: [
            {
              id: 'is-prog-basic',
              label: 'Req 2a: Basic programming (3 units)',
              type: 'pick-from-list',
              count: 1,
              minUnits: 3,
              options: BASIC_PROG,
            },
            {
              id: 'is-prog-advanced',
              label: 'Req 2b: Advanced programming (3 units)',
              type: 'pick-from-list',
              count: 1,
              minUnits: 3,
              options: ADV_PROG,
            },
          ],
        },
        {
          id: 'is-imaging-electives',
          name: 'Req 3: Imaging Sciences Electives (18 units)',
          minUnits: 18,
          note: 'Courses outside this list accepted with advisor approval. Up to 6 units of CME291 (independent research) count with prior approval.',
          slots: [
            {
              id: 'is-imaging-courses',
              label: 'Imaging Sciences electives (≥18 units)',
              type: 'pick-from-list',
              minUnits: 18,
              options: IMAGING_ELECTIVES,
            },
            {
              id: 'is-imaging-advisor',
              label: 'Advisor-approved imaging elective',
              type: 'any-approved',
              count: 3,
              optional: true,
              minLevel: 200,
              options: [],
              note: 'Courses outside the approved list require program advisor approval.',
            },
          ],
        },
        {
          id: 'is-specialized',
          name: 'Req 4: Specialized Electives (6 units)',
          minUnits: 6,
          note: 'Focused graduate electives approved by the ICME graduate advisor.',
          slots: [
            {
              id: 'is-specialized-courses',
              label: 'Specialized electives (≥6 units, advisor-approved)',
              type: 'any-approved',
              count: 2,
              minLevel: 200,
              minUnits: 6,
              options: [],
            },
          ],
        },
        {
          id: 'is-seminar',
          name: 'Req 5: Seminar (3 units)',
          note: 'CME500 (1 unit) required. Remaining 2 units from ICME graduate seminars or other approved seminars. Additional seminar units beyond 3 may NOT count toward the 45-unit requirement.',
          slots: [
            {
              id: 'is-seminar-required',
              label: 'CME 500: Departmental Seminar (1 unit)',
              type: 'required',
              options: [{ dept: 'CME', number: '500', name: 'Departmental Seminar' }],
            },
            {
              id: 'is-seminar-elective',
              label: 'ICME graduate seminars (2 units)',
              type: 'any-approved',
              count: 2,
              minUnits: 2,
              options: [],
              note: 'Student\'s choice of ICME graduate seminars or other approved seminars.',
            },
          ],
        },
      ],
    },

    // ── Mathematical and Computational Finance ────────────────────────────────
    {
      id: 'math-computational-finance',
      name: 'Mathematical and Computational Finance',
      sections: [
        {
          id: 'mcf-foundational',
          name: 'Req 1: Foundational (9 units)',
          minUnits: 9,
          note: 'All foundational courses must be letter-graded. Additional courses taken from this list beyond 9 units may be applied toward Req 3 or Req 4.',
          slots: [
            {
              id: 'mcf-numerics',
              label: 'Numerics (3 units)',
              type: 'pick-from-list',
              count: 1,
              minUnits: 3,
              options: [
                { dept: 'CME', number: '302', name: 'Numerical Linear Algebra' },
                { dept: 'CME', number: '303', name: 'Partial Differential Equations of Applied Mathematics' },
                { dept: 'CME', number: '310', name: 'Combinatorial Optimization' },
              ],
            },
            {
              id: 'mcf-optimization',
              label: 'Optimization (3 units)',
              type: 'pick-one',
              options: [
                { dept: 'CME', number: '307', name: 'Optimization' },
                { dept: 'CME', number: '364A', name: 'Convex Optimization I' },
              ],
            },
            {
              id: 'mcf-stochastics',
              label: 'Stochastics (3 units)',
              type: 'pick-one',
              options: [
                { dept: 'CME', number: '308', name: 'Stochastic Methods in Engineering' },
                { dept: 'MATH', number: '236', name: 'Introduction to Stochastic Differential Equations' },
              ],
            },
          ],
        },
        {
          id: 'mcf-programming',
          name: 'Req 2: Computing and Programming (6 units)',
          minUnits: 6,
          note: '3 units basic + 3 units advanced, letter-graded. An additional Req 2 course (letter grade or credit) may fulfill Req 4. CME213, CME323, CS149, CS315B strongly recommended.',
          slots: [
            {
              id: 'mcf-prog-basic',
              label: 'Req 2a: Basic programming (3 units)',
              type: 'pick-from-list',
              count: 1,
              minUnits: 3,
              options: BASIC_PROG_MCF,
            },
            {
              id: 'mcf-prog-advanced',
              label: 'Req 2b: Advanced programming (3 units)',
              type: 'pick-from-list',
              count: 1,
              minUnits: 3,
              options: ADV_PROG,
            },
          ],
        },
        {
          id: 'mcf-finance',
          name: 'Req 3: Finance Electives (12 units)',
          minUnits: 12,
          note: 'Select ≥3 courses (≥12 units). Courses outside this list accepted with program adviser approval.',
          slots: [
            {
              id: 'mcf-finance-courses',
              label: 'Finance electives (≥3 courses, ≥12 units)',
              type: 'pick-from-list',
              count: 3,
              minUnits: 12,
              options: FINANCE_ELECTIVES,
            },
          ],
        },
        {
          id: 'mcf-data-science',
          name: 'Req 4: Data Science Electives (12 units)',
          minUnits: 12,
          note: 'Courses outside this list accepted with program advisor approval.',
          slots: [
            {
              id: 'mcf-ds-courses',
              label: 'Data Science electives (≥12 units)',
              type: 'pick-from-list',
              minUnits: 12,
              options: MCF_DATA_SCI_ELECTIVES,
            },
          ],
        },
        {
          id: 'mcf-practical',
          name: 'Req 5: Practical Component (6 units)',
          minUnits: 6,
          note: 'Take ≥6 units from the approved list ONLY. CME299 strongly recommended.',
          slots: [
            {
              id: 'mcf-practical-courses',
              label: 'Practical and project courses (≥6 units)',
              type: 'pick-from-list',
              minUnits: 6,
              options: MCF_PRACTICAL,
            },
          ],
        },
      ],
    },
  ],
};
