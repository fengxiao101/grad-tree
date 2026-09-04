// Symbolic Systems Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/SYMBO-MIN/
// totalMinUnits: 18
// Two options: Option 1 (one course each in 6 areas) or Option 2 (SYMSYS1 + approved concentration)
// SYMSYS1 may not count for both Cognition and Logic & Computation in Option 1

import type { MajorConfig } from '../majorSchema';

export const SYMBO_MINOR_2526: MajorConfig = {
  id: 'symbo-minor-2526',
  name: 'Symbolic Systems (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 18,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/SYMBO-MIN/',
  sections: [
    { id: 'symbo-track-selector', name: 'Option (choose 1)', trackSelector: true, slots: [] },
  ],
  tracks: [
    {
      id: 'symbo-option1',
      name: 'Option 1: Six Core Areas',
      sections: [
        {
          id: 'symbo-cognition',
          name: 'Cognition',
          note: 'SYMSYS 1 may NOT be counted for both Cognition and Logic & Computation.',
          slots: [
            {
              id: 'symbo-cog',
              label: 'Cognition Course',
              type: 'pick-one',
              options: [
                { dept: 'SYMSYS', number: '1', name: 'Minds and Machines' },
                { dept: 'PSYCH', number: '45', name: 'Introduction to Learning and Memory' },
                { dept: 'PSYCH', number: '50', name: 'Introduction to Cognitive Neuroscience' },
              ],
            },
          ],
        },
        {
          id: 'symbo-logic',
          name: 'Logic and Computation',
          slots: [
            {
              id: 'symbo-logic-slot',
              label: 'Logic and Computation Course',
              type: 'pick-one',
              options: [
                { dept: 'CS', number: '103', name: 'Mathematical Foundations of Computing' },
                { dept: 'PHIL', number: '150', name: 'Mathematical Logic' },
                { dept: 'PHIL', number: '151', name: 'Metalogic' },
              ],
            },
          ],
        },
        {
          id: 'symbo-programming',
          name: 'Computer Programming',
          slots: [
            {
              id: 'symbo-prog',
              label: 'Computer Programming Course',
              type: 'pick-one',
              options: [
                { dept: 'CS', number: '106B', name: 'Programming Abstractions' },
                { dept: 'CS', number: '106X', name: 'Programming Abstractions (Accelerated)' },
                { dept: 'CS', number: '107', name: 'Computer Organization and Systems' },
              ],
            },
          ],
        },
        {
          id: 'symbo-phil',
          name: 'Philosophical Foundations',
          slots: [
            {
              id: 'symbo-phil-slot',
              label: 'Philosophical Foundations Course',
              type: 'pick-one',
              options: [
                { dept: 'PHIL', number: '80', name: 'Mind, Matter, and Meaning' },
                { dept: 'SYMSYS', number: '1', name: 'Minds and Machines' },
              ],
            },
          ],
        },
        {
          id: 'symbo-ling',
          name: 'Linguistic Theory',
          slots: [
            {
              id: 'symbo-ling-slot',
              label: 'Linguistic Theory Course',
              type: 'pick-one',
              options: [
                { dept: 'LINGUIST', number: '105', name: 'Phonetics' },
                { dept: 'LINGUIST', number: '110', name: 'Introduction to Phonology' },
                { dept: 'LINGUIST', number: '121A', name: 'The Syntax of English' },
                { dept: 'LINGUIST', number: '121B', name: 'Crosslinguistic Syntax' },
                { dept: 'LINGUIST', number: '130B', name: 'Introduction to Lexical Semantics' },
              ],
            },
          ],
        },
        {
          id: 'symbo-compcog',
          name: 'Computation and Cognition',
          slots: [
            {
              id: 'symbo-compcog-slot',
              label: 'Computation and Cognition Course',
              type: 'pick-from-list',
              count: 1,
              options: [
                { dept: 'CS', number: '124', name: 'From Languages to Information' },
                { dept: 'CS', number: '131', name: 'Computer Vision: Foundations and Applications' },
                { dept: 'CS', number: '221', name: 'Artificial Intelligence: Principles and Techniques' },
                { dept: 'CS', number: '228', name: 'Probabilistic Graphical Models: Principles and Techniques' },
                { dept: 'CS', number: '229', name: 'Machine Learning' },
                { dept: 'CS', number: '234', name: 'Reinforcement Learning' },
                { dept: 'CS', number: '375', name: 'Large-Scale Neural Network Modeling for Neuroscience' },
                { dept: 'CS', number: '379C', name: 'Computational Models of the Neocortex' },
                { dept: 'EE', number: '104', name: 'Introduction to Machine Learning' },

                { dept: 'LINGUIST', number: '182', name: 'Computational Theories of Syntax' },
                { dept: 'NENS', number: '220', name: 'Computational Neuroscience' },
                { dept: 'PHIL', number: '356C', name: 'Logic and Artificial Intelligence' },
                { dept: 'PSYCH', number: '164', name: 'Brain Decoding' },
                { dept: 'PSYCH', number: '204', name: 'Computation and Cognition: The Probabilistic Approach' },
                { dept: 'PSYCH', number: '209', name: 'Neural Network Models of Cognition' },
                { dept: 'PSYCH', number: '240A', name: 'Curiosity in Artificial Intelligence' },
                { dept: 'PSYCH', number: '242', name: 'A Modern Explainable AI Approach to Theoretical Neuroscience' },

                { dept: 'PSYCH', number: '263', name: 'Neuroscience of Visual Intelligence' },

                { dept: 'SYMSYS', number: '195M', name: 'Measuring Learning in the Brain' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'symbo-option2',
      name: 'Option 2: Interdisciplinary Concentration',
      sections: [
        {
          id: 'symbo-intro',
          name: 'Introduction',
          slots: [
            {
              id: 'symbo-intro-slot',
              label: 'SYMSYS 1: Minds and Machines',
              type: 'required',
              options: [{ dept: 'SYMSYS', number: '1', name: 'Minds and Machines' }],
            },
          ],
        },
        {
          id: 'symbo-conc',
          name: 'Interdisciplinary SSP Concentration (5 courses)',
          note: 'Courses from an approved SSP concentration at symsys.stanford.edu. Must span at least 3 departments, or have more than 1 course from each of 2 departments. The Individually Designed SSP Concentration is not available for the minor. See https://bulletin.stanford.edu/programs/SYMBO-MIN/ for the list of approved concentrations.',
          slots: [
            {
              id: 'symbo-conc-slot',
              label: 'SSP Concentration Course',
              type: 'any-approved',
              options: [],
              count: 5,
            },
          ],
        },
      ],
    },
  ],
};
