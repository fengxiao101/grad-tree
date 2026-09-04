// ME MS (Coterminal): School of Engineering, 2025-2026
// 45-unit master's. Math fundamentals (2 areas) + depth (one of 12 areas, min 9 units)
// + breadth (2 courses from other areas) + lab requirement + electives.
// Source: https://bulletin.stanford.edu/programs/ME-MS/

import type { MajorConfig } from '../majorSchema';

const MATH_LINEAR_ALGEBRA = [
  { dept: 'ME', number: '300A', name: 'Linear Algebra with Application to Engineering Computations' },

  { dept: 'CME', number: '302', name: 'Numerical Linear Algebra' },
  { dept: 'CS', number: '205L', name: 'Continuous Mathematical Methods with an Emphasis on Machine Learning' },
  { dept: 'EE', number: '263', name: 'Matrix Methods: Singular Value Decomposition' },

  { dept: 'EE', number: '363', name: 'Linear Dynamical Systems' },
];

const MATH_PDES = [
  { dept: 'CME', number: '303', name: 'Partial Differential Equations of Applied Mathematics' },

  { dept: 'ME', number: '300B', name: 'Partial Differential Equations in Engineering' },

];

const MATH_NUMERICAL_ANALYSIS = [
  { dept: 'CME', number: '306', name: 'Computational Methods of Applied Mathematics' },
  { dept: 'ME', number: '300C', name: 'Introduction to Numerical Methods for Engineering' },

  { dept: 'ME', number: '408', name: 'Spectral Methods in Computational Physics' },
  { dept: 'CME', number: '322', name: 'Spectral Methods in Computational Physics' },
];

const MATH_STATISTICS = [
  { dept: 'CME', number: '106', name: 'Introduction to Probability and Statistics for Engineers' },

  { dept: 'STATS', number: '117', name: 'Introduction to Probability Theory' },
  { dept: 'STATS', number: '118', name: 'Probability Theory for Statistical Inference' },
  { dept: 'STATS', number: '200', name: 'Introduction to Theoretical Statistics' },
];

const LAB_COURSES = [
  { dept: 'AA', number: '274B', name: 'Principles of Robot Autonomy II' },
  { dept: 'CS', number: '237B', name: 'Principles of Robot Autonomy II' },
  { dept: 'EE', number: '260B', name: 'Principles of Robot Autonomy II' },
  { dept: 'ME', number: '274B', name: 'Principles of Robot Autonomy II' },
  { dept: 'ME', number: '203', name: 'Design and Manufacturing' },
  { dept: 'ME', number: '210', name: 'Introduction to Mechatronics' },
  { dept: 'ME', number: '218A', name: 'Smart Product Design Fundamentals' },
  { dept: 'ME', number: '218B', name: 'Smart Product Design Applications' },
  { dept: 'ME', number: '218C', name: 'Smart Product Design Practice' },
  { dept: 'ME', number: '218D', name: 'Smart Product Design: Projects' },
  { dept: 'ME', number: '220', name: 'Introduction to Sensors' },
  { dept: 'ME', number: '287', name: 'Mechanics of Biological Tissues' },
  { dept: 'ME', number: '310A', name: 'Global Engineering Design Thinking, Innovation, and Entrepreneurship' },
  { dept: 'ME', number: '310B', name: 'Global Engineering Design Thinking, Innovation, and Entrepreneurship' },
  { dept: 'ME', number: '310C', name: 'Global Engineering Design Thinking, Innovation, and Entrepreneurship' },
  { dept: 'ME', number: '318', name: 'Computer-Aided Product Creation' },
  { dept: 'ME', number: '324', name: 'Precision Engineering' },
  { dept: 'ME', number: '326', name: 'Collaborative Robotics' },
  { dept: 'ME', number: '327', name: 'Design and Control of Haptic Systems' },
  { dept: 'ME', number: '354', name: 'Experimental Methods in Fluid Mechanics' },
  { dept: 'ME', number: '367', name: 'Optical Diagnostics and Spectroscopy Laboratory' },
  { dept: 'ME', number: '391', name: 'Engineering Problems' },
  { dept: 'ME', number: '392', name: 'Experimental Investigation of Engineering Problems' },
  { dept: 'ME', number: '398', name: 'Ph.D. Research Rotation' },
];

const uniqueCourses = <T extends { dept: string; number: string }>(courses: T[]): T[] =>
  [...new Map(courses.map(course => [`${course.dept} ${course.number}`, course])).values()];

const BREADTH_COURSES = uniqueCourses([
  // Automatic Controls
  ...[['AA','203'],['AA','212'],['AA','228'],['AA','274A'],['CS','327A'],['AA','274B'],['CS','237B'],['EE','260B'],['AA','277'],['ENGR','105'],['ENGR','205'],['ENGR','209A'],['ME','327']],
  // Biomechanical Engineering
  ...[['ME','234'],['ME','235'],['ME','244'],['ME','249'],['ME','281'],['ME','283'],['ME','285'],['ME','287'],['ME','303'],['ME','305'],['ME','381'],['ME','485']],
  // Design Methodology and Dynamics
  ...[['ME','318'],['ME','324'],['AA','242A'],['AA','279A'],['CS','225A'],['CS','327A'],['ME','323'],['ME','331A'],['ME','331B'],['ME','334']],
  // Energy/Transport and Fluid Mechanics
  ...[['ME','352B'],['ME','352C'],['ME','352D'],['ME','362A'],['ME','370A'],['ME','371'],['ME','457'],['ME','351A'],['ME','351B'],['ME','354'],['ME','355'],['ME','361'],['ME','451A'],['ME','451B'],['ME','451C'],['ME','461']],
  // Manufacturing, Materials, and Stress Analysis
  ...[['MATSCI','251'],['ME','203'],['ME','204'],['ME','206B'],['ME','217'],['ME','219'],['ME','225'],['ME','227'],['ME','318'],['ME','324'],['ME','325'],['ME','258'],['ME','303'],['ME','329'],['ME','340']],
  // Mechatronics and MEMS
  ...[['AA','274A'],['AA','274B'],['CS','237B'],['EE','260B'],['ME','210'],['ME','220'],['ENGR','240'],['ENGR','241']],
  // Reactive Gas Dynamics, Robotics/Kinematics, and Solid Mechanics
  ...[['ME','362A'],['ME','362B'],['ME','363'],['ME','364'],['ME','366'],['ME','371'],['ME','372'],['ME','374'],['ME','463'],['AA','277'],['CS','225A'],['CS','326'],['CS','327A'],['ME','323'],['CS','229'],['CS','333'],['ME','320'],['ME','326'],['ME','327'],['ME','335A'],['ME','338'],['ME','339'],['ME','346A'],['ME','346B']],
  // Data Science (breadth only)
  ...[['AA','222'],['CS','230'],['CS','131'],['CS','234'],['CS','236'],['EE','364A'],['EE','364B'],['ME','233'],['ME','343'],['ME','470']],
].map(([dept, number]) => ({ dept, number })));

export const ME_MS_2526: MajorConfig = {
  id: 'me-ms-2526',
  name: 'Mechanical Engineering MS (Coterm)',
  school: 'School of Engineering',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/ME-MS/',
  category: 'coterm',
  totalMinUnits: 45,
  sections: [
    {
      id: 'program-policies',
      name: 'Important Program Policies',
      note: 'An individual course may satisfy only ONE MS requirement, except that the laboratory requirement may double-count with another requirement. Candidates must earn at least a 3.0 GPA in the 45 units counted toward the degree and should develop and update the course plan with their advisor.',
      slots: [],
    },
    {
      id: 'math-fundamentals',
      name: 'Mathematical Fundamentals (2 courses, 2 different areas)',
      note: 'Complete 2 courses covering 2 DIFFERENT areas from: (1) Linear Algebra, (2) Partial Differential Equations, (3) Numerical Analysis, (4) Statistics. Petitions for advanced math or math-applications courses may be submitted to ME Student Services before taking the course.',
      slots: [],
      pickGroupCount: 2,
      pickOneGroup: [
        {
          id: 'math-area-linear-algebra',
          name: 'Linear Algebra',
          slots: [
            {
              id: 'math-linear-algebra',
              label: 'Linear Algebra course',
              type: 'pick-one',
              options: MATH_LINEAR_ALGEBRA,
            },
          ],
        },
        {
          id: 'math-area-pdes',
          name: 'Partial Differential Equations',
          slots: [
            {
              id: 'math-pdes',
              label: 'Partial Differential Equations course',
              type: 'pick-one',
              options: MATH_PDES,
            },
          ],
        },
        {
          id: 'math-area-numerical-analysis',
          name: 'Numerical Analysis',
          slots: [
            {
              id: 'math-numerical-analysis',
              label: 'Numerical Analysis course',
              type: 'pick-one',
              options: MATH_NUMERICAL_ANALYSIS,
            },
          ],
        },
        {
          id: 'math-area-statistics',
          name: 'Statistics',
          slots: [
            {
              id: 'math-statistics',
              label: 'Statistics course',
              type: 'pick-one',
              options: MATH_STATISTICS,
            },
          ],
        },
      ],
    },

    {
      id: 'depth-selector',
      name: 'Depth in Mechanical Engineering',
      trackSelector: true,
      note: 'Select ONE depth area (2–3 courses, min 9 units). All depth courses must be for letter grade.',
      slots: [],
    },

    {
      id: 'breadth',
      name: 'Breadth in Mechanical Engineering (2 courses)',
      note: 'Complete 2 courses from the breadth area course lists, from area(s) OUTSIDE your chosen depth. The two breadth courses may come from the same area or two different areas. All breadth courses must be for letter grade.',
      slots: [
        {
          id: 'breadth-courses',
          label: 'ME Breadth Courses (2 courses from areas outside your depth)',
          type: 'pick-from-list',
          count: 2,
          options: BREADTH_COURSES,
          note: 'Both courses must be outside the selected depth area and letter-graded. They may come from the same breadth area or two different areas. MEMS and Data Science are breadth-only. If both are Data Science courses, at least one must have an ME course number. Mechatronics breadth courses count only when the offering includes a laboratory component. If Fluid Mechanics is the depth, ME 352C is specifically excluded from breadth.',
        },
      ],
    },

    {
      id: 'sufficient-me-coursework',
      name: 'Sufficient ME Coursework (min 15 units)',
      minUnits: 15,
      note: 'Minimum 15 units from courses with a 200+ ME course number and LEC designation. ENGR 105 also counts. Research (ME 391/392) and seminar units do NOT count toward this 15-unit minimum.',
      slots: [
        {
          id: 'me-200-lec',
          label: 'ME 200+ Lecture Courses (min 15 units)',
          type: 'any-approved',
          options: [{ dept: 'ENGR', number: '105', name: 'Feedback Control Design' }],
          note: 'Open-ended ME 200+ LEC pool. ENGR 105 is the only explicitly listed non-ME exception and is selectable here; other non-ME courses do not satisfy this minimum.',
        },
      ],
    },

    {
      id: 'approved-electives',
      name: 'Approved Electives (to reach 39 units)',
      note: 'Graduate (200+) engineering, math, and science courses bring the total to at least 39 units; the advisor must approve ALL units. Eligible 100-level CS courses may count, and CS 106A, 106B, 106X, and 107 are pre-approved without petition. Max 6 units from ME 391/392 independent study (CR/NC only) and max 3 seminar units. ME 491 and ME 299A/B may NOT be included. Approved electives must be letter-graded unless the course offers only optional grading. Independent study in another department must be CR/NC.',
      slots: [
        {
          id: 'approved-elective-courses',
          label: 'Approved Electives (reaching 39 total units)',
          type: 'any-approved',
          options: [
            { dept: 'CS', number: '106A', name: 'Programming Methodology' },
            { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
            { dept: 'CS', number: '106X', name: 'Programming Abstractions (Accelerated)' },
            { dept: 'CS', number: '107', name: 'Computer Organization and Systems' },
            { dept: 'ME', number: '391', name: 'Engineering Problems' },
            { dept: 'ME', number: '392', name: 'Experimental Investigation of Engineering Problems' },
          ],
          note: 'Graduate engineering, math, science courses approved by advisor. ME391/ME392 are CR/NC only and count toward the max 6 unit independent study limit.',
        },
      ],
    },

    {
      id: 'unrestricted-electives',
      name: 'Unrestricted Electives (to reach 45 units)',
      note: 'Units bringing the program total to 45. Must be 100-level or above. Strongly encouraged to be outside engineering, math, and sciences. May be CR/NC. IntroSems (courses appended with N and Q) and ME 299A/299B (CPT) cannot fulfill MS requirements.',
      slots: [
        {
          id: 'unrestricted-elective-courses',
          label: 'Unrestricted Electives (reaching 45 total units)',
          type: 'any-approved',
          count: 3,
          options: [],
          note: 'Any 100+ course. CR/NC grading allowed. IntroSems and ME 299A/B do not count.',
        },
      ],
    },

    {
      id: 'lab-requirement',
      name: 'Laboratory Requirement',
      allowDoubleCount: true,
      note: 'At least one graduate-level course WITH a lab component must appear somewhere in the program. This can be a course from the list below, or a directed study/research course with significant lab work (≥3 units). A lab course can simultaneously satisfy both this requirement AND another program requirement.',
      slots: [
        {
          id: 'lab-course',
          label: 'Lab Component Course',
          type: 'any-approved',
          count: 1,
          options: LAB_COURSES,
          note: 'Choose a listed lab course, or manually record an approved directed study/research course in another department involving significant laboratory experiments (minimum 3 units).',
        },
      ],
    },
  ],

  tracks: [
    // ── A. Automatic Controls ─────────────────────────────────────────────────
    {
      id: 'automatic-controls',
      name: 'Automatic Controls',
      minUnits: 9,
      sections: [
        {
          id: 'A-courses',
          name: 'Automatic Controls Depth (min 3 courses)',
          note: 'At least one of ENGR 105, ENGR 205, or ENGR 209A is recommended.',
          slots: [
            {
              id: 'A-slot',
              label: 'Automatic Controls course',
              type: 'pick-from-list',
              count: 3,
              options: [
                { dept: 'AA', number: '203', name: 'Optimal and Learning-based Control' },
                { dept: 'AA', number: '212', name: 'Advanced Feedback Control Design' },
                { dept: 'AA', number: '228', name: 'Decision Making under Uncertainty' },

                { dept: 'AA', number: '274A', name: 'Principles of Robot Autonomy I' },


                { dept: 'AA', number: '274B', name: 'Principles of Robot Autonomy II' },
                { dept: 'CS', number: '237B', name: 'Principles of Robot Autonomy II' },
                { dept: 'EE', number: '260B', name: 'Principles of Robot Autonomy II' },
                { dept: 'AA', number: '277', name: 'Multi-Robot Control and Distributed Optimization' },
                { dept: 'ENGR', number: '105', name: 'Feedback Control Design' },
                { dept: 'ENGR', number: '205', name: 'Introduction to Control Design Techniques' },
                { dept: 'ENGR', number: '209A', name: 'Analysis and Control of Nonlinear Systems' },
                { dept: 'ME', number: '327', name: 'Design and Control of Haptic Systems' },
              ],
            },
          ],
        },
      ],
    },

    // ── B. Biomechanical Engineering ─────────────────────────────────────────
    {
      id: 'biomechanical-engineering',
      name: 'Biomechanical Engineering',
      minUnits: 9,
      sections: [
        {
          id: 'B-foundational',
          name: 'Foundational (min 2)',
          slots: [
            {
              id: 'B-foundational-slot',
              label: 'Biomechanical foundational course',
              type: 'pick-from-list',
              count: 2,
              options: [
                { dept: 'ME', number: '235', name: 'Biotransport Phenomena' },
                { dept: 'ME', number: '244', name: 'Mechanotransduction in Cells and Tissues' },
                { dept: 'ME', number: '249', name: 'Designing Biomaterials' },
                { dept: 'ME', number: '281', name: 'Biomechanics of Movement' },
                { dept: 'ME', number: '283', name: 'Introduction to Biomechanics and Mechanobiology' },
                { dept: 'ME', number: '287', name: 'Mechanics of Biological Tissues' },
                { dept: 'ME', number: '305', name: 'Dynamics and Feedback Control of Living Systems' },

              ],
            },
          ],
        },
        {
          id: 'B-system-specific',
          name: 'System-Specific (min 1)',
          slots: [
            {
              id: 'B-system-slot',
              label: 'Biomechanical system-specific course',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'ME', number: '234', name: 'Introduction to Neuromechanics' },
                { dept: 'ME', number: '285', name: 'Computational Modeling in the Cardiovascular System' },
                { dept: 'ME', number: '303', name: 'Soft Composites and Soft Robotics' },

                { dept: 'ME', number: '381', name: 'Orthopaedic Bioengineering' },
                { dept: 'ME', number: '485', name: 'Modeling and Simulation of Human Movement' },
              ],
            },
          ],
        },
      ],
    },

    // ── C. Design Methodology ─────────────────────────────────────────────────
    {
      id: 'design-methodology',
      name: 'Design Methodology',
      minUnits: 9,
      sections: [
        {
          id: 'C-courses',
          name: 'Design Methodology (all 3 required)',
          slots: [
            {
              id: 'me-310a',
              label: 'ME 310A – Global Engineering Design Thinking, Innovation, and Entrepreneurship',
              type: 'required',
              options: [{ dept: 'ME', number: '310A', name: 'Global Engineering Design Thinking, Innovation, and Entrepreneurship' }],
            },
            {
              id: 'me-310b',
              label: 'ME 310B – Global Engineering Design Thinking, Innovation, and Entrepreneurship',
              type: 'required',
              options: [{ dept: 'ME', number: '310B', name: 'Global Engineering Design Thinking, Innovation, and Entrepreneurship' }],
            },
            {
              id: 'me-310c',
              label: 'ME 310C – Global Engineering Design Thinking, Innovation, and Entrepreneurship',
              type: 'required',
              options: [{ dept: 'ME', number: '310C', name: 'Global Engineering Design Thinking, Innovation, and Entrepreneurship' }],
            },
          ],
        },
      ],
    },

    // ── D. Dynamics ───────────────────────────────────────────────────────────
    {
      id: 'dynamics',
      name: 'Dynamics',
      minUnits: 9,
      sections: [
        {
          id: 'D-courses',
          name: 'Dynamics Depth (min 3)',
          slots: [
            {
              id: 'D-slot',
              label: 'Dynamics course',
              type: 'pick-from-list',
              count: 3,
              options: [
                { dept: 'AA', number: '242A', name: 'Classical Dynamics' },
                { dept: 'AA', number: '279A', name: 'Space Mechanics' },
                { dept: 'CS', number: '225A', name: 'Experimental Robotics' },
                { dept: 'CS', number: '327A', name: 'Advanced Robotic Manipulation' },
                { dept: 'ME', number: '323', name: 'Advanced Robotic Manipulation' },
                { dept: 'ME', number: '331A', name: 'Advanced Dynamics & Computation' },
                { dept: 'ME', number: '331B', name: 'Advanced Dynamics, Simulation & Control' },
                { dept: 'ME', number: '334', name: 'Advanced Dynamics, Modeling and Analysis' },
              ],
            },
          ],
        },
      ],
    },

    // ── E. Energy and Transport Sciences ──────────────────────────────────────
    {
      id: 'energy-transport',
      name: 'Energy and Transport Sciences',
      minUnits: 9,
      sections: [
        {
          id: 'E-required',
          name: 'Required Courses (both required)',
          slots: [
            {
              id: 'me-352b',
              label: 'ME 352B – Fundamentals of Heat Conduction',
              type: 'required',
              options: [{ dept: 'ME', number: '352B', name: 'Fundamentals of Heat Conduction' }],
            },
            {
              id: 'me-370a',
              label: 'ME 370A – Energy Systems I: Thermodynamics',
              type: 'required',
              options: [{ dept: 'ME', number: '370A', name: 'Energy Systems I: Thermodynamics' }],
            },
          ],
        },
        {
          id: 'E-additional',
          name: 'Additional Course (min 1)',
          note: 'ME 352D is not taught frequently.',
          slots: [
            {
              id: 'E-add-slot',
              label: 'Energy & Transport additional course',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'ME', number: '352C', name: 'Convective Heat Transfer' },
                { dept: 'ME', number: '352D', name: 'Nanoscale heat, mass and charge transport' },
                { dept: 'ME', number: '362A', name: 'Physical Gas Dynamics' },
                { dept: 'ME', number: '371', name: 'Combustion Fundamentals' },
                { dept: 'ME', number: '457', name: 'Fluid Flow in Microdevices' },
              ],
            },
          ],
        },
      ],
    },

    // ── F. Fluid Mechanics ────────────────────────────────────────────────────
    {
      id: 'fluid-mechanics',
      name: 'Fluid Mechanics',
      minUnits: 9,
      sections: [
        {
          id: 'F-required',
          name: 'Fluid Mechanics Depth (3 courses)',
          minUnits: 9,
          note: 'ME 351A and ME 351B are normally required, plus one additional course. Students with exceptionally strong fluid mechanics backgrounds may substitute for ME 351A and/or ME 351B with other courses in this depth area, but only with advisor consent.',
          slots: [
            {
              id: 'F-depth-slot',
              label: 'Fluid Mechanics depth course',
              type: 'pick-from-list',
              count: 3,
              options: [
                { dept: 'ME', number: '351A', name: 'Fluid Mechanics' },
                { dept: 'ME', number: '351B', name: 'Fluid Mechanics' },
                { dept: 'ME', number: '354', name: 'Experimental Methods in Fluid Mechanics' },
                { dept: 'ME', number: '355', name: 'Compressible Flow' },
                { dept: 'ME', number: '361', name: 'Turbulence' },
                { dept: 'ME', number: '451A', name: 'Advanced Fluid Mechanics Multiphase Flows' },
                { dept: 'ME', number: '451B', name: 'Advanced Fluid Mechanics - Flow Instabilities' },
                { dept: 'ME', number: '451C', name: 'Advanced Fluid Mechanics - Low-Order Modeling for Turbulent Flow' },
                { dept: 'ME', number: '461', name: 'Advanced Topics in Turbulence' },
              ],
              note: 'Choose ME 351A, ME 351B, and one additional option unless the advisor approves substituting for one or both required courses.',
            },
          ],
        },
      ],
    },

    // ── G. Manufacturing and Product Realization ───────────────────────────────
    {
      id: 'manufacturing',
      name: 'Manufacturing and Product Realization',
      minUnits: 9,
      sections: [
        {
          id: 'G-required',
          name: 'Manufacturing Depth (3 courses total)',
          minUnits: 9,
          note: 'ME 203 plus two additional courses is the normal route. A student who previously completed ME 103/ME 203 as an undergraduate may substitute a third course from the additional list for ME 203. Three courses total are always required.',
          slots: [
            {
              id: 'G-depth-slot',
              label: 'Manufacturing and Product Realization course',
              type: 'pick-from-list',
              count: 3,
              options: [
                { dept: 'ME', number: '203', name: 'Design and Manufacturing' },
                { dept: 'ME', number: '204', name: 'Advanced Mechanical Systems Design' },
                { dept: 'ME', number: '217', name: 'Engineering Design Analytics for Product Realization' },
                { dept: 'ME', number: '219', name: 'The Magic of Materials and Manufacturing' },
                { dept: 'ME', number: '225', name: 'Scaling Up' },
                { dept: 'ME', number: '227', name: 'Design for Additive Manufacturing' },
                { dept: 'ME', number: '318', name: 'Computer-Aided Product Creation' },
                { dept: 'ME', number: '324', name: 'Precision Engineering' },
                { dept: 'ME', number: '325', name: 'Making Multiples: Injection Molding' },
              ],
              note: 'ME 203 is required unless the undergraduate ME 103/203 substitution rule applies.',
            },
          ],
        },
      ],
    },

    // ── H. Materials and Stress Analysis ──────────────────────────────────────
    {
      id: 'materials-stress',
      name: 'Materials and Stress Analysis',
      minUnits: 9,
      sections: [
        {
          id: 'H-courses',
          name: 'Materials and Stress Analysis Depth (min 3)',
          slots: [
            {
              id: 'H-slot',
              label: 'Materials and Stress Analysis course',
              type: 'pick-from-list',
              count: 3,
              options: [
                { dept: 'ME', number: '219', name: 'The Magic of Materials and Manufacturing' },
                { dept: 'ME', number: '258', name: 'Fracture and Fatigue of Materials and Thin Film Structures' },

                { dept: 'ME', number: '303', name: 'Soft Composites and Soft Robotics' },

                { dept: 'ME', number: '329', name: 'Mechanical Analysis in Design' },
                { dept: 'ME', number: '340', name: 'Mechanics - Elasticity and Inelasticity' },
              ],
            },
          ],
        },
      ],
    },

    // ── I. Mechatronics ────────────────────────────────────────────────────────
    {
      id: 'mechatronics',
      name: 'Mechatronics',
      minUnits: 9,
      sections: [
        {
          id: 'I-courses',
          name: 'Mechatronics Depth (min 2 courses)',
          slots: [
            {
              id: 'I-slot',
              label: 'Mechatronics course',
              type: 'pick-from-list',
              count: 2,
              options: [
                { dept: 'ME', number: '218A', name: 'Smart Product Design Fundamentals' },
                { dept: 'ME', number: '218B', name: 'Smart Product Design Applications' },
                { dept: 'ME', number: '218C', name: 'Smart Product Design Practice' },
              ],
            },
          ],
        },
      ],
    },

    // ── J. Reactive Gas Dynamics ───────────────────────────────────────────────
    {
      id: 'reactive-gas-dynamics',
      name: 'Reactive Gas Dynamics',
      minUnits: 9,
      sections: [
        {
          id: 'J-required',
          name: 'Required Course',
          slots: [
            {
              id: 'me-362a',
              label: 'ME 362A – Physical Gas Dynamics',
              type: 'required',
              options: [{ dept: 'ME', number: '362A', name: 'Physical Gas Dynamics' }],
            },
          ],
        },
        {
          id: 'J-additional',
          name: 'Additional Courses (min 2)',
          slots: [
            {
              id: 'J-add-slot',
              label: 'Reactive Gas Dynamics additional course',
              type: 'pick-from-list',
              count: 2,
              options: [
                { dept: 'ME', number: '362B', name: 'Nonequilibrium Processes in High-Temperature Gases' },
                { dept: 'ME', number: '363', name: 'Partially Ionized Plasmas and Gas Discharges' },
                { dept: 'ME', number: '364', name: 'Optical Diagnostics and Spectroscopy' },
                { dept: 'ME', number: '366', name: 'Light and Plasma' },
                { dept: 'ME', number: '371', name: 'Combustion Fundamentals' },
                { dept: 'ME', number: '372', name: 'Combustion Applications' },
                { dept: 'ME', number: '374', name: 'Fundamentals of Aerosols and Nanoparticle Science' },
                { dept: 'ME', number: '463', name: 'Advanced Topics in Plasma Science and Engineering' },
              ],
            },
          ],
        },
      ],
    },

    // ── K. Robotics and Kinematics ─────────────────────────────────────────────
    {
      id: 'robotics-kinematics',
      name: 'Robotics and Kinematics',
      minUnits: 9,
      sections: [
        {
          id: 'K-courses',
          name: 'Robotics and Kinematics Depth (min 3)',
          slots: [
            {
              id: 'K-slot',
              label: 'Robotics and Kinematics course',
              type: 'pick-from-list',
              count: 3,
              options: [
                { dept: 'AA', number: '274A', name: 'Principles of Robot Autonomy I' },


                { dept: 'AA', number: '274B', name: 'Principles of Robot Autonomy II' },
                { dept: 'CS', number: '237B', name: 'Principles of Robot Autonomy II' },
                { dept: 'EE', number: '260B', name: 'Principles of Robot Autonomy II' },
                { dept: 'AA', number: '277', name: 'Multi-Robot Control and Distributed Optimization' },
                { dept: 'CS', number: '225A', name: 'Experimental Robotics' },
                { dept: 'CS', number: '229', name: 'Machine Learning' },

                { dept: 'CS', number: '326', name: 'Topics in Advanced Robotic Manipulation' },
                { dept: 'CS', number: '327A', name: 'Advanced Robotic Manipulation' },
                { dept: 'ME', number: '323', name: 'Advanced Robotic Manipulation' },
                { dept: 'ME', number: '303', name: 'Soft Composites and Soft Robotics' },

                { dept: 'ME', number: '320', name: 'Introduction to Robotics' },

                { dept: 'ME', number: '322', name: 'Kinematic Synthesis of Mechanisms' },
                { dept: 'ME', number: '326', name: 'Collaborative Robotics' },

                { dept: 'ME', number: '327', name: 'Design and Control of Haptic Systems' },
              ],
            },
          ],
        },
      ],
    },

    // ── L. Solid Mechanics ─────────────────────────────────────────────────────
    {
      id: 'solid-mechanics',
      name: 'Solid Mechanics',
      minUnits: 9,
      sections: [
        {
          id: 'L-courses',
          name: 'Solid Mechanics Depth (min 3)',
          slots: [
            {
              id: 'L-slot',
              label: 'Solid Mechanics course',
              type: 'pick-from-list',
              count: 3,
              options: [
                { dept: 'ME', number: '335A', name: 'Finite Element Analysis' },
                { dept: 'ME', number: '338', name: 'Continuum Mechanics' },
                { dept: 'ME', number: '340', name: 'Mechanics - Elasticity and Inelasticity' },
                { dept: 'ME', number: '346A', name: 'Introduction to Statistical Mechanics' },
                { dept: 'ME', number: '346B', name: 'Introduction to Molecular Simulations' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Breadth is track-relative: the same union list cannot safely mark a course
// complete when that course belongs to the selected depth. Materialize a
// filtered breadth section inside every depth track.
const globalBreadth = ME_MS_2526.sections.find(section => section.id === 'breadth');
ME_MS_2526.sections = ME_MS_2526.sections.filter(section => section.id !== 'breadth');
if (globalBreadth) {
  for (const track of ME_MS_2526.tracks ?? []) {
    const depthKeys = new Set(
      track.sections.flatMap(section => section.slots).flatMap(slot => slot.options)
        .map(option => `${option.dept} ${option.number}`),
    );
    if (track.id === 'fluid-mechanics') depthKeys.add('ME 352C');
    track.sections.push({
      ...globalBreadth,
      id: `${track.id}-breadth`,
      slots: globalBreadth.slots.map(slot => ({
        ...slot,
        id: `${track.id}-${slot.id}`,
        options: slot.options.filter(option => !depthKeys.has(`${option.dept} ${option.number}`)),
      })),
    });
  }
}
