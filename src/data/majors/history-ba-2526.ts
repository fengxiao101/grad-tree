// History BA: School of Humanities & Sciences, 2025-2026
// Source: https://bulletin.stanford.edu/programs/HSTRY-BA/
// Min 63 units and 13 courses in the major.
// All courses must be taken for 3-5 units and a letter grade; min 2.0 GPA in History courses.
// At least 11 of 13 courses must carry HISTORY designation (or be officially cross-listed).
// Max 10 units of history-related coursework from outside the dept by petition.
// AP credits do NOT fulfill any major requirements.
// One HISTORY299S Undergraduate Directed Research may count as one of the 13 required courses.
// Concentration is student-designed (no fixed tracks): choose in consultation with advisor.
// Honors thesis and Paper Revision capstone options do NOT contribute units toward the major;
//   students choosing those must take an additional course to reach 13 courses and 63 units.

import type { MajorConfig } from '../majorSchema';

// ── Sources & Methods seminar options (HISTORY 1S–99S) ─────────────────────
const SOURCES_METHODS_OPTIONS = [
  { dept: 'HISTORY', number: '3S', name: 'Growing Up in the World: A Global History of Childhood' },
  { dept: 'HISTORY', number: '4S', name: 'Spies, Statecraft and Society: A Comparative History of Secret Worlds' },
  { dept: 'HISTORY', number: '5S', name: 'The Making of a Global Working Class, 1830-1970' },
  { dept: 'HISTORY', number: '6S', name: 'An Environmental Problem: Energy, Pollution, Catastrophe' },
  { dept: 'HISTORY', number: '7S', name: 'Global Imperial Cities of the Pacific World: 1900-2000' },
  { dept: 'HISTORY', number: '8S', name: 'Whales, Bombs, & the Race to the Bottom: Oceanic Histories of Law, Environmentalism, & Human Rights' },
  { dept: 'HISTORY', number: '9S', name: 'Life Histories of Enslaved Africans around the Globe from the Early Modern Period to the Present' },
  { dept: 'HISTORY', number: '10S', name: 'The Enlightenment and Slavery' },
  { dept: 'HISTORY', number: '11S', name: 'The Root of All Evil? Greed & Capitalism in Early Modern Europe, c.1300-1800' },
  { dept: 'HISTORY', number: '12S', name: 'Multiculturalism in the Middle Ages: Muslims, Christians, and Jews in Medieval Spain' },
  { dept: 'HISTORY', number: '14S', name: 'Conversion in Ancient and Medieval Judaism, Christianity, and Islam' },
  { dept: 'HISTORY', number: '26S', name: 'Building Utopia: Cities, \'Megaprojects\', and Socialism in the USSR' },
  { dept: 'HISTORY', number: '27S', name: 'The Dead: Ten Bodies and Their Legacies in the Making of Modern Europe, 1793-Present Day' },
  { dept: 'HISTORY', number: '33S', name: 'Before We Were Queer: Premodern Gender and Sexuality in Europe and the Mediterranean' },
  { dept: 'HISTORY', number: '38S', name: 'All That Glitters is not Gold: The Country House in Modern Britain' },
  { dept: 'HISTORY', number: '40S', name: 'The Mind\'s Not-So-New Science: Thinking About Thinking in the Modern World' },
  { dept: 'HISTORY', number: '41S', name: 'The Spirit in Motion: Desire in Early Modern Europe' },
  { dept: 'HISTORY', number: '42S', name: 'Cannibalism in Early Modern Europe: The Ultimate Taboo in Historical Context' },
  { dept: 'HISTORY', number: '44S', name: 'Diseases and the Making of West African Cities, 1860 - 2020' },
  { dept: 'HISTORY', number: '46S', name: 'Cape to Cairo: Decolonization and African Urban Life 1940s-1960s' },
  { dept: 'HISTORY', number: '48S', name: 'African Voices: Literature and Arts in 20th Century South Africa' },
  { dept: 'HISTORY', number: '53S', name: 'Black San Francisco' },
  { dept: 'HISTORY', number: '54S', name: 'From Stanford to Stone Mountain: U.S. History, Memory, and Monuments' },
  { dept: 'HISTORY', number: '57S', name: '"Don\'t Tread on Me!": The Spirit of 1776 in U.S. Politics & Culture, From the Constitution to Jan 6' },
  { dept: 'HISTORY', number: '61S', name: 'Gender: A Global History, 1200-1850' },
  { dept: 'HISTORY', number: '73S', name: 'Food Beyond Borders: Mexico, the United States, and 20th Century Food History' },
  { dept: 'HISTORY', number: '75S', name: 'The World in a City: How Mexico City Remade the World and the World Remade Mexico City' },
  { dept: 'HISTORY', number: '77S', name: 'Independence or Death! The Transformation of Latin America in the Age of Revolution (1808-1831)' },
  { dept: 'HISTORY', number: '78S', name: 'The Haitian Revolution: Slavery, Freedom, and the Atlantic World' },
  { dept: 'HISTORY', number: '81S', name: 'Water, Coal & Oil: Environment, Capitalism and the Making of the Modern Middle East & North Africa' },
  { dept: 'HISTORY', number: '83S', name: 'Refugees, Routes, and Risks: How People and Things Moved in the Early Modern Period' },
  { dept: 'HISTORY', number: '88S', name: 'Migrants, Mystics, and Merchants: A History of Sephardi and Mizrahi Jews' },
  { dept: 'HISTORY', number: '92S', name: 'How to Divide a Country: The Making of Two Koreas in the Post-1945 World' },
  { dept: 'HISTORY', number: '93S', name: 'Beyond the Modern Girl: Gender, Sexuality, and Empire in Japan and Korea, 1900-1955' },
  { dept: 'HISTORY', number: '94S', name: 'Savoring Japan: Food and Society in Global Perspective' },
  { dept: 'HISTORY', number: '96S', name: 'The Rhythm of Monsoon: Cultural and Material Worlds of Pre-Modern Indian Ocean' },
  { dept: 'HISTORY', number: '97S', name: 'Between Empires: Modern History of Taiwan' },
  { dept: 'HISTORY', number: '99S', name: 'Nine Chinese Things: Global Technological Encounters in the Modern Age' },
] as const;

// ── Doing History colloquia (HISTORY 200x) ─────────────────────────────────
const DOING_HISTORY_OPTIONS = [
  { dept: 'HISTORY', number: '200A', name: 'Doing Legal History' },
  { dept: 'HISTORY', number: '200B', name: 'Doing Environmental History: Water Justice' },
  { dept: 'HISTORY', number: '200BG', name: 'Doing History: Biography as History' },
  { dept: 'HISTORY', number: '200C', name: 'Doing the History of Race and Ethnicity' },
  { dept: 'HISTORY', number: '200D', name: 'Doing the History of Science and Technology' },
  { dept: 'HISTORY', number: '200DE', name: 'Doing the History of Death and Disease' },
  { dept: 'HISTORY', number: '200E', name: 'Doing Economic History' },
  { dept: 'HISTORY', number: '200F', name: 'Doing Microhistory' },
  { dept: 'HISTORY', number: '200G', name: 'Doing Intellectual History' },
  { dept: 'HISTORY', number: '200GH', name: 'Doing Gender History' },
  { dept: 'HISTORY', number: '200J', name: 'Doing Oral History' },
  { dept: 'HISTORY', number: '200K', name: 'Doing Literary History: Orwell in the World' },
  { dept: 'HISTORY', number: '200L', name: 'Doing Public History' },
  { dept: 'HISTORY', number: '200LB', name: 'Doing Labor History' },
  { dept: 'HISTORY', number: '200M', name: 'Doing Digital History' },
  { dept: 'HISTORY', number: '200MM', name: 'Doing Historical Memory' },
  { dept: 'HISTORY', number: '200P', name: 'Doing Religious History' },
  { dept: 'HISTORY', number: '200R', name: 'Doing Community History: Asian Americans and the Pandemic' },
  { dept: 'HISTORY', number: '200T', name: 'Doing the History of Gender and Sexuality: African Perspectives' },
  { dept: 'HISTORY', number: '200U', name: 'Doing History: Beyond the Book' },
  { dept: 'HISTORY', number: '200UR', name: 'Doing (Sub)Urban History' },
  { dept: 'HISTORY', number: '200Y', name: 'Doing Colonial History' },
] as const;

// ── Pre-1700 history courses ─────────────────────────────────────────────────
// Dual-numbered courses (e.g. HISTORY110B / HISTORY10B) are listed once each;
// either number qualifies: enroll under whichever ExploreCourses lists it.
const PRE_1700_OPTIONS = [
  { dept: 'HISTORY', number: '1A', name: 'Global History: The World\'s Foundations' },
  { dept: 'HISTORY', number: '1B', name: 'Global History: The Early Modern World, 1300 to 1800' },
  { dept: 'HISTORY', number: '10N', name: 'Thinking About War' },
  { dept: 'HISTORY', number: '11S', name: 'The Root of All Evil? Greed & Capitalism in Early Modern Europe, c.1300-1800' },
  { dept: 'HISTORY', number: '12N', name: 'Income and wealth inequality from the Stone Age to the present' },
  { dept: 'HISTORY', number: '12S', name: 'Multiculturalism in the Middle Ages: Muslims, Christians, and Jews in Medieval Spain' },
  { dept: 'HISTORY', number: '14S', name: 'Conversion in Ancient and Medieval Judaism, Christianity, and Islam' },
  { dept: 'HISTORY', number: '20N', name: 'Russia in the Early Modern European Imagination' },
  { dept: 'HISTORY', number: '33S', name: 'Before We Were Queer: Premodern Gender and Sexuality in Europe and the Mediterranean' },
  { dept: 'HISTORY', number: '41S', name: 'The Spirit in Motion: Desire in Early Modern Europe' },
  { dept: 'HISTORY', number: '42S', name: 'Cannibalism in Early Modern Europe: The Ultimate Taboo in Historical Context' },
  { dept: 'HISTORY', number: '83S', name: 'Refugees, Routes, and Risks: How People and Things Moved in the Early Modern Period' },
  { dept: 'HISTORY', number: '86Q', name: 'Blood and Money: The Origins of Antisemitism' },
  { dept: 'HISTORY', number: '96S', name: 'The Rhythm of Monsoon: Cultural and Material Worlds of Pre-Modern Indian Ocean' },
  { dept: 'HISTORY', number: '101', name: 'The Greeks' },
  { dept: 'HISTORY', number: '102A', name: 'The Romans' },
  { dept: 'HISTORY', number: '110B', name: 'Renaissance to Revolution: Early Modern Europe' },
  { dept: 'HISTORY', number: '10B', name: 'Renaissance to Revolution: Early Modern Europe (alt. number)' },
  { dept: 'HISTORY', number: '113P', name: 'Media and Communication from the Middle Ages to the Printing Press' },
  { dept: 'HISTORY', number: '13P', name: 'Media and Communication from the Middle Ages to the Printing Press (alt. number)' },
  { dept: 'HISTORY', number: '114B', name: 'The Crusades: A Global History' },
  { dept: 'HISTORY', number: '14B', name: 'The Crusades: A Global History (alt. number)' },
  { dept: 'HISTORY', number: '115D', name: 'Europe in the Middle Ages, 300-1500' },
  { dept: 'HISTORY', number: '15D', name: 'Europe in the Middle Ages, 300-1500 (alt. number)' },
  { dept: 'HISTORY', number: '116', name: 'Traders and Crusaders in the Medieval Mediterranean' },
  { dept: 'HISTORY', number: '16', name: 'Traders and Crusaders in the Medieval Mediterranean (alt. number)' },
  { dept: 'HISTORY', number: '117', name: 'Ancient Empires: Near East' },
  { dept: 'HISTORY', number: '120A', name: 'The Russian Empire, 1450-1800' },
  { dept: 'HISTORY', number: '20A', name: 'The Russian Empire, 1450-1800 (alt. number)' },
  { dept: 'HISTORY', number: '133A', name: 'Blood and Roses: The Age of the Tudors' },
  { dept: 'HISTORY', number: '33A', name: 'Blood and Roses: The Age of the Tudors (alt. number)' },
  { dept: 'HISTORY', number: '133B', name: 'Empire and Revolution: 17th Century England' },
  { dept: 'HISTORY', number: '33B', name: 'Empire and Revolution: 17th Century England (alt. number)' },
  { dept: 'HISTORY', number: '140', name: 'World History of Science: From Prehistory through the Scientific Revolution' },
  { dept: 'HISTORY', number: '40', name: 'World History of Science: From Prehistory through the Scientific Revolution (alt. number)' },
  { dept: 'HISTORY', number: '140A', name: 'The Scientific Revolution' },
  { dept: 'HISTORY', number: '40A', name: 'The Scientific Revolution (alt. number)' },
  { dept: 'HISTORY', number: '150A', name: 'Colonial and Revolutionary America' },
  { dept: 'HISTORY', number: '50A', name: 'Colonial and Revolutionary America (alt. number)' },
  { dept: 'HISTORY', number: '191B', name: 'The City in Imperial China' },
  { dept: 'HISTORY', number: '91B', name: 'The City in Imperial China (alt. number)' },
  { dept: 'HISTORY', number: '193', name: 'The Chinese Empire from the Mongol Invasion to the Boxer Uprising' },
  { dept: 'HISTORY', number: '93', name: 'The Chinese Empire from the Mongol Invasion to the Boxer Uprising (alt. number)' },
  { dept: 'HISTORY', number: '194B', name: 'Japan in the Age of the Samurai' },
  { dept: 'HISTORY', number: '94B', name: 'Japan in the Age of the Samurai (alt. number)' },
  { dept: 'HISTORY', number: '200F', name: 'Doing Microhistory' },
  { dept: 'HISTORY', number: '202B', name: 'Coffee, Sugar, and Chocolate: Commodities and Consumption in World History, 1200-1800' },
  { dept: 'HISTORY', number: '207C', name: 'The Global Early Modern' },
  { dept: 'HISTORY', number: '209F', name: 'Maps in the Early Modern World' },
  { dept: 'HISTORY', number: '211', name: 'Out of Eden: Deportation, Exile, and Expulsion from Antiquity to the Renaissance' },
  { dept: 'HISTORY', number: '212D', name: 'Dante\'s World: A Medieval and Renaissance Journey' },
  { dept: 'HISTORY', number: '213F', name: 'Medieval Germany, 900-1250' },
  { dept: 'HISTORY', number: '215B', name: 'Race and Ethnicity in Premodern Europe' },
  { dept: 'HISTORY', number: '217D', name: 'Love, Death and the Afterlife in the Medieval West' },
  { dept: 'HISTORY', number: '218', name: 'The Holy Dead: Saints and Spiritual Power in Medieval Europe' },
  { dept: 'HISTORY', number: '222', name: 'Crime and Punishment in Early Modern Europe and Russia' },
  { dept: 'HISTORY', number: '223G', name: 'Russia and Ukraine: Empire, Nation, Myth' },
  { dept: 'HISTORY', number: '231', name: 'Leonardo\'s World: Science, Technology, and Art' },
  { dept: 'HISTORY', number: '231D', name: 'Disasters: Environment, Disease, and War in Early Modern Europe' },
  { dept: 'HISTORY', number: '231G', name: 'European Reformations, 1500-1650' },
  { dept: 'HISTORY', number: '233', name: 'Reformation to Civil War: England under the Tudors and Stuarts' },
  { dept: 'HISTORY', number: '233C', name: 'Two British Revolutions' },
  { dept: 'HISTORY', number: '233F', name: 'Political Thought in Early Modern Britain' },
  { dept: 'HISTORY', number: '234P', name: 'The Age of Plague: Medicine and Society, 1300-1750' },
  { dept: 'HISTORY', number: '235C', name: 'Witchcraft, Magic, and Demonology' },
  { dept: 'HISTORY', number: '235D', name: 'The Trial of Galileo: Science, Politics, and Religion' },
  { dept: 'HISTORY', number: '242', name: 'Science in the Making: Nature, Knowledge, and Experience, 1500-1800' },
  { dept: 'HISTORY', number: '282', name: 'Ottoman Palestine' },
  { dept: 'HISTORY', number: '283B', name: 'The Ottoman Empire and Iran: An Intertwined History of Islamic Eurasia' },
  { dept: 'HISTORY', number: '295J', name: 'Chinese Women\'s History' },
  { dept: 'HISTORY', number: '296B', name: 'Mughal India: Power, Culture, Ecologies, 1500 to 1800 CE' },
] as const;

export const HISTORY_BA_2526: MajorConfig = {
  id: 'history-ba-2526',
  name: 'History (BA)',
  school: 'School of Humanities & Sciences',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/HSTRY-BA/',
  category: 'major',
  totalMinUnits: 63,

  sections: [
    // ── Sources & Methods Seminar ─────────────────────────────────────────────
    {
      id: 'sources-methods',
      name: 'Sources and Methods Seminar (1 course)',
      minCourses: 1,
      note: 'Complete at least 1 Sources and Methods seminar (HISTORY 1S–99S). Take as early as possible: ideally before the Doing History colloquium and before HISTORY209S. Seminars teach analysis of primary sources, historians in conflict, and argument-based research papers.',
      slots: [
        {
          id: 'sources-methods-course',
          label: 'Sources and Methods Seminar (HISTORY 1S–99S)',
          type: 'pick-one',
          options: [...SOURCES_METHODS_OPTIONS],
        },
      ],
    },

    // ── Doing History Colloquium ──────────────────────────────────────────────
    {
      id: 'doing-history',
      name: 'Doing History Colloquium (1 course)',
      minCourses: 1,
      note: 'Complete at least 1 Doing History colloquium (HISTORY 200A–200Y). Ideally taken after Sources & Methods and before HISTORY209S. Encourage completion by end of sophomore year. Additional Doing History colloquia beyond the first may count toward the 200-Level Undergraduate Colloquia requirement below.',
      slots: [
        {
          id: 'doing-history-course',
          label: 'Doing History Colloquium (HISTORY 200x)',
          type: 'pick-one',
          options: [...DOING_HISTORY_OPTIONS],
        },
      ],
    },

    // ── 200-Level Undergraduate Colloquia ─────────────────────────────────────
    {
      id: 'colloquia-200',
      name: '200-Level Undergraduate Colloquia (2 courses)',
      minCourses: 2,
      note: 'Complete 2 additional 200-level undergraduate colloquia (HISTORY 201–298), each for a minimum of 3 units. The required Doing History colloquium (above) does NOT count here, but additional Doing History colloquia may. The full approved list is the HISTORY 200-Level Colloquia course set; see bulletin for current offerings.',
      slots: [
        {
          id: 'colloquium',
          label: '200-Level Colloquia (HISTORY 201–298, min 3 units each)',
          type: 'any-approved',
          count: 2,
          options: [],
          note: 'Any HISTORY 201–298 colloquium, minimum 3 units each. Additional Doing History (200x) sections may qualify. Must be two different courses.',
        },
      ],
    },

    // ── Pre-1700 History ──────────────────────────────────────────────────────
    {
      id: 'pre-1700',
      name: 'Courses in pre-1700 History (2 courses)',
      minCourses: 2,
      note: 'Complete at least 2 courses covering pre-1700 history. Many courses carry dual numbers (e.g. HISTORY110B and HISTORY10B are the same course); enroll under whichever number is offered and mark that option. Contact Kai Dowding (kdowding@stanford.edu) with questions about courses that fulfill this requirement.',
      slots: [
        {
          id: 'pre-1700',
          label: 'Pre-1700 History Courses',
          type: 'pick-from-list',
          count: 2,
          options: [...PRE_1700_OPTIONS],
          note: 'Must be two different courses. Contact Kai Dowding (kdowding@stanford.edu) with questions about courses that fulfill this requirement.',
        },
      ],
    },

    // ── Concentration ─────────────────────────────────────────────────────────
    {
      id: 'concentration',
      name: 'Concentration (4 courses, student-designed)',
      minCourses: 4,
      note: 'Complete 4 courses in a geographical, chronological, or thematic concentration of your own choosing, in consultation with your faculty advisor. Concentration is fully student-designed: there are no fixed tracks or subfields. See the History Department website for suggested course coherence.',
      slots: [
        {
          id: 'conc-courses',
          label: 'Concentration Courses',
          type: 'any-approved',
          count: 4,
          options: [],
        },
      ],
    },

    // ── Capstone Experience ───────────────────────────────────────────────────
    {
      id: 'capstone',
      name: 'Capstone Experience (choose 1 of 3 options)',
      note: 'Required for students matriculating as first-year AY 2021-22 or later. Choose one: (A) Honors Thesis, (B) Capstone Course + Creative Capstone Workshop, or (C) Paper Revision/Expansion (petition required). IMPORTANT: Options A and C do not contribute units toward the major: students who choose them must take one additional HISTORY course to reach the 13 course and 63-unit minimum.',
      slots: [],
      pickOneGroup: [
        {
          id: 'cap-honors',
          name: 'Option A: Honors Thesis',
          note: 'Year-long honors thesis. Requires overall GPA ≥ 3.3 and History GPA ≥ 3.5. Complete HISTORY299H Junior Honors Colloquium (winter junior year), then HISTORY299A/B/C Senior Research (11–15 units, does NOT count toward 13-course/63-unit major minimum). Apply at History Dept office. Thesis must receive B+ or higher for Departmental Honors.',
          slots: [
            { id: 'cap-honors-thesis', label: 'Complete HISTORY 299H + 299A/B/C honors thesis sequence', type: 'manual', options: [] },
          ],
        },
        {
          id: 'cap-course',
          name: 'Option B: Capstone Course + Creative Capstone Workshop',
          note: 'Take one capstone course in Autumn or Winter (HISTORY299CAP1 or HISTORY299CAP2), then HISTORY299CAP101 Creative Capstone Workshop in Spring. Must also present project at spring Creative Capstone Showcase. Additional options may be added: see bulletin.',
          slots: [
            {
              id: 'cap-course-select',
              label: 'Capstone Course: HISTORY 299CAP1 or 299CAP2',
              type: 'pick-one',
              options: [
                { dept: 'HISTORY', number: '299CAP1', name: 'Reimagining History: A Workshop' },
                { dept: 'HISTORY', number: '299CAP2', name: 'Crafting Digital Stories' },
              ],
            },
            { id: 'cap-workshop', label: 'HISTORY 299CAP101: Creative Capstone Workshop (Spring)', type: 'required', note: 'Taken in Spring Quarter. Must present at Creative Capstone Showcase.', options: [{ dept: 'HISTORY', number: '299CAP101', name: 'Creative Capstone Workshop' }] },
          ],
        },
        {
          id: 'cap-revision',
          name: 'Option C: Paper Revision/Expansion (petition required)',
          note: 'For students who cannot enroll in 299CAP1 or 299CAP2 and whose petition is approved by the Director of Undergraduate Studies. Revise or expand prior coursework (≥ 20-25 pages or equivalent). Must enroll in HISTORY299REV + HISTORY299CAP101. Does NOT contribute units toward the major: take one additional course to reach 13 courses and 63 units.',
          slots: [
            { id: 'cap-revision-work', label: 'Complete approved HISTORY 299REV + 299CAP101 paper revision', type: 'manual', options: [] },
          ],
        },
      ],
    },

    // ── Writing in the Major (WIM) ────────────────────────────────────────────
    {
      id: 'wim',
      name: 'Writing in the Major (WIM)',
      minCourses: 1,
      note: 'HISTORY209S Research Seminar for Majors is the WIM course. Must be taken in junior or senior year, after completing both Sources & Methods and Doing History. Students write a ca. 20-page essay based on original research with at least two drafts. HISTORY209S fulfills WIM only: it does NOT fulfill geographical or small-group colloquium requirements. Students planning an honors thesis should take HISTORY209S in junior year.',
      slots: [
        {
          id: 'wim-course',
          label: 'HISTORY 209S: Research Seminar for Majors (WIM)',
          type: 'required',
          options: [{ dept: 'HISTORY', number: '209S', name: 'Research Seminar for Majors' }],
        },
      ],
    },

    // ── Additional Coursework ─────────────────────────────────────────────────
    {
      id: 'additional',
      name: 'Additional Coursework (to reach 13 courses / 63 units)',
      note: 'After fulfilling all named requirements, any additional HISTORY courses (or up to 10 units of petitioned history-related coursework from outside the dept) count here. One HISTORY299S Undergraduate Directed Research and Writing (3-5 units, letter grade) may count as one of the 13 required courses. Students choosing the Honors Thesis or Paper Revision capstone must take at least one course here to compensate for those capstone options not counting toward units.',
      slots: [
        {
          id: 'addl-courses',
          label: 'Additional HISTORY Coursework',
          type: 'any-approved',
          options: [],
          note: 'All courses must be taken for 3-5 units and a letter grade. At least 11 of 13 total major courses must carry HISTORY designation or be officially cross-listed. Max 10 units from outside the History dept by petition.',
        },
      ],
    },
  ],

  wimCourses: [
    { dept: 'HISTORY', number: '209S', name: 'Research Seminar for Majors' },
  ],
};
