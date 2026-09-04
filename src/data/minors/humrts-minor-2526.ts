// Human Rights Minor, 2025-26
// Source: https://bulletin.stanford.edu/programs/HUMRTS-MIN/
// totalMinUnits: 25
// Gateway: HUMRTS101 (4 units required)
// Breadth: at least 1 course each from Foundations, Contemporary Issues, and Practice streams
// Minimum GPA 3.0 in courses counting toward the minor
// At least 10 of 25 units must be completed at Stanford
// All courses must be letter-graded (except where not offered)
// See https://humanrights.stanford.edu/academics/minor for declaration process

import type { MajorConfig } from '../majorSchema';

export const HUMRTS_MINOR_2526: MajorConfig = {
  id: 'humrts-minor-2526',
  name: 'Human Rights (Minor)',
  school: 'School of Humanities & Sciences',
  year: '2025-26',
  category: 'minor',
  totalMinUnits: 25,
  bulletinUrl: 'https://bulletin.stanford.edu/programs/HUMRTS-MIN/',
  sections: [
    {
      id: 'humrts-gateway',
      name: 'Gateway (4 units)',
      note: 'Courses may not be double-counted between a student\'s major and the Human Rights minor. All minor courses must be letter-graded unless a letter grade is not offered; maintain at least a 3.0 GPA across minor courses.',
      slots: [
        {
          id: 'humrts-101',
          label: 'HUMRTS 101: Cross-Disciplinary Perspectives on Human Rights Theory and Practice',
          type: 'required',
          options: [{ dept: 'HUMRTS', number: '101', name: 'Cross-Disciplinary Perspectives on Human Rights Theory and Practice' }],
        },
      ],
    },
    {
      id: 'humrts-foundations',
      name: 'Foundations Stream (≥1 course)',
      note: 'Courses exploring fundamental theoretical or historical foundations of human rights. See https://bulletin.stanford.edu/programs/HUMRTS-MIN/ for the full 60+ course list. GPA ≥3.0 required across all minor courses.',
      slots: [
        {
          id: 'humrts-found-slot',
          label: 'Foundations Course',
          type: 'any-approved',
          count: 1,
          listUrl: 'https://bulletin.stanford.edu/programs/HUMRTS-MIN/',
          note: 'The options shown are examples, not a complete list. Any course in the Bulletin Foundations stream may satisfy this requirement.',
          options: [
            { dept: 'HUMRTS', number: '103', name: 'Transitional Justice, Human Rights, and International Criminal Tribunals' },
            { dept: 'HUMRTS', number: '106', name: 'Human Rights in Comparative and Historical Perspective' },
            { dept: 'HUMRTS', number: '109', name: 'Slavery, Human Trafficking, and the Moral Order: Ancient and Modern' },
            { dept: 'HUMRTS', number: '117', name: 'International Human Rights' },
            { dept: 'HUMRTS', number: '120', name: 'Human Rights in an Age of Great Power Rivalry, War, and Political Transformation' },
            { dept: 'ETHICSOC', number: '136R', name: 'Introduction to Global Justice' },
            { dept: 'ETHICSOC', number: '171', name: 'Justice' },
            { dept: 'INTNLREL', number: '102', name: 'History of the International System since 1914' },
            { dept: 'INTNLREL', number: '114D', name: 'Democracy, Development, and the Rule of Law' },
            { dept: 'INTNLREL', number: '140A', name: 'International Law and International Relations' },
            { dept: 'INTNLREL', number: '145', name: 'Genocide and Humanitarian Intervention' },
            { dept: 'INTNLREL', number: '160', name: 'United Nations Peacekeeping' },
            { dept: 'HISTORY', number: '202S', name: 'The History of Genocide' },
            { dept: 'HISTORY', number: '224C', name: 'Genocide and Humanitarian Intervention' },
            { dept: 'PHIL', number: '174L', name: 'Justice across Borders' },
            { dept: 'PHIL', number: '176', name: 'Political Philosophy: The Social Contract Tradition' },
            { dept: 'SOC', number: '3', name: 'America: Unequal' },
            { dept: 'SOC', number: '136', name: 'Sociology of Law' },
            { dept: 'GLOBAL', number: '101', name: 'Critical Issues in Global Affairs' },
          ],
        },
      ],
    },
    {
      id: 'humrts-contemporary',
      name: 'Contemporary Issues Stream (≥1 course)',
      note: 'Courses offering depth on a particular human rights issue, geography, social group, or context. The full approved list has 80+ courses; see https://bulletin.stanford.edu/programs/HUMRTS-MIN/.',
      slots: [
        {
          id: 'humrts-contemp-slot',
          label: 'Contemporary Issues Course',
          type: 'any-approved',
          count: 1,
          listUrl: 'https://bulletin.stanford.edu/programs/HUMRTS-MIN/',
          note: 'The options shown are examples, not a complete list. Any course in the Bulletin Contemporary Issues stream may satisfy this requirement.',
          options: [
            { dept: 'HUMRTS', number: '103', name: 'Transitional Justice, Human Rights, and International Criminal Tribunals' },
            { dept: 'HUMRTS', number: '108', name: 'Advanced Spanish Service-Learning: Migration, Asylum, and Human Rights at the Border' },
            { dept: 'HUMRTS', number: '109', name: 'Slavery, Human Trafficking, and the Moral Order: Ancient and Modern' },
            { dept: 'HUMRTS', number: '112', name: 'Human Trafficking: Historical, Legal, and Medical Perspectives' },
            { dept: 'HUMRTS', number: '114', name: 'Topics in Human Rights, Development, Rule of Law in SE Asia' },
            { dept: 'HUMRTS', number: '115', name: 'Corporations, Human Rights, and Social Responsibility' },
            { dept: 'HUMRTS', number: '117', name: 'International Human Rights' },
            { dept: 'HUMRTS', number: '122', name: 'Global Human Rights and Local Practices' },
            { dept: 'HUMRTS', number: '123', name: 'Current Issues in Southeast Asia' },
            { dept: 'HUMRTS', number: '125', name: 'Sustainability, Governance, and Economic Development in SE Asia' },
            { dept: 'HUMRTS', number: '224', name: 'Climate Displacement, Migration, and Mobility' },
            { dept: 'EARTHSYS', number: '120', name: 'Environmental Justice in California' },
            { dept: 'INTNLREL', number: '160', name: 'United Nations Peacekeeping' },
            { dept: 'SOC', number: '318', name: 'Social Movements and Collective Action' },
            { dept: 'SOC', number: '152', name: 'The Social Determinants of Health' },
            { dept: 'MED', number: '242', name: 'Human Rights and Health' },
            { dept: 'PEDS', number: '223', name: 'Human Rights and Global Health' },
            { dept: 'CS', number: '181', name: 'Computers, Ethics, and Public Policy' },
          ],
        },
      ],
    },
    {
      id: 'humrts-practice',
      name: 'Practice Stream (≥1 course)',
      note: 'Courses dedicated to practical application of human rights principles through skills development, advocacy, and experiential/community-engaged learning. See https://bulletin.stanford.edu/programs/HUMRTS-MIN/ for the full approved list.',
      slots: [
        {
          id: 'humrts-practice-slot',
          label: 'Practice Course',
          type: 'any-approved',
          count: 1,
          listUrl: 'https://bulletin.stanford.edu/programs/HUMRTS-MIN/',
          note: 'The options shown are examples, not a complete list. Any course in the Bulletin Practice stream may satisfy this requirement.',
          options: [
            { dept: 'HUMRTS', number: '6W', name: 'Community-Engaged Learning Workshop on Human Trafficking - Part I' },
            { dept: 'HUMRTS', number: '7W', name: 'Community-Engaged Learning Workshop on Human Trafficking - Part II' },
            { dept: 'HUMRTS', number: '108', name: 'Advanced Spanish Service-Learning: Migration, Asylum, and Human Rights at the Border' },
            { dept: 'HUMRTS', number: '110', name: 'Advanced Spanish Service-Learning: Campus Workers\' Health and Advocacy Outreach' },
            { dept: 'HUMRTS', number: '112', name: 'Human Trafficking: Historical, Legal, and Medical Perspectives' },
            { dept: 'HUMRTS', number: '114', name: 'Topics in Human Rights, Development, Rule of Law in SE Asia' },
            { dept: 'HUMRTS', number: '115', name: 'Corporations, Human Rights, and Social Responsibility' },
            { dept: 'HUMRTS', number: '117', name: 'International Human Rights' },
            { dept: 'HUMRTS', number: '125', name: 'Sustainability, Governance, and Economic Development in SE Asia' },
            { dept: 'HUMRTS', number: '130', name: 'Spanish Language Legal Support and Community Engagement: CLSEPA Practicum' },
            { dept: 'HUMRTS', number: '194A', name: 'Environmental Justice Colloquium' },
            { dept: 'HUMRTS', number: '195', name: 'Human Rights Special Project: Pro-Se Resource Project with Freedom for Immigrants' },
            { dept: 'HUMRTS', number: '196', name: 'Environmental Justice and Human Rights Lab' },
            { dept: 'HUMRTS', number: '197', name: 'Human Rights Careers Intensive' },
            { dept: 'HUMRTS', number: '224', name: 'Climate Displacement, Migration, and Mobility' },
            { dept: 'SOC', number: '318', name: 'Social Movements and Collective Action' },
            { dept: 'SOC', number: '152', name: 'The Social Determinants of Health' },
            { dept: 'EARTHSYS', number: '120', name: 'Environmental Justice in California' },
            { dept: 'EARTHSYS', number: '125', name: 'Shades of Green: Exploring and Expanding Environmental Justice in Practice' },
            { dept: 'ME', number: '206A', name: 'Design for Extreme Affordability' },
          ],
        },
      ],
    },
    {
      id: 'humrts-additional',
      name: 'Additional Coursework (remaining units to reach 25)',
      note: 'Additional approved courses from any stream to reach 25 total units. At least 10 of 25 units must be completed at Stanford. Use "Search & add" on the capstone or stream slots above, or add courses here.',
      slots: [
        {
          id: 'humrts-add-slot',
          label: 'Additional Human Rights Course (use Search & add)',
          type: 'any-approved',
          count: 10,
          optional: true,
          options: [],
          listUrl: 'https://bulletin.stanford.edu/programs/HUMRTS-MIN/',
        },
      ],
    },
    {
      id: 'humrts-capstone',
      name: 'Capstone (3-5 units)',
      note: 'Choose one pathway: (1) Independent Project: enroll in HUMRTS 199 and complete a 3-5u self-designed capstone under a faculty advisor; or (2) Course Equivalency: submit a proposal to use an existing 3-5u course as the capstone deliverable. Use "Search & add" for the Course Equivalency pathway.',
      slots: [
        {
          id: 'humrts-capstone-slot',
          label: 'Capstone: HUMRTS 199 (Independent Project) or Course Equivalency',
          type: 'any-approved',
          count: 1,
          minUnits: 3,
          options: [
            { dept: 'HUMRTS', number: '199', name: 'Individual Work: Capstone Project' },
          ],
          note: 'Course Equivalency Pathway: submit a proposal to use an existing 3-5u course. Add the course via "Search & add" if not taking HUMRTS 199.',
        },
      ],
    },
  ],
};
