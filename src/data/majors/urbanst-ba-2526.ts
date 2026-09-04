// Urban Studies BA, 2025-2026
// Source: https://bulletin.stanford.edu/programs/URBST-BA/
// totalMinUnits: 70 (19 core + ≥9 skills + ≥20 depth + ≥3 community + 10 capstone/WIM)
// Prerequisite: ECON 1 (does NOT count toward 70 units; may be taken S/NC)
// WIM: URBANST 202A + URBANST 203 (also the capstone sequence, 10 units total)
// Capstone: URBANST 202A (Junior Seminar) + URBANST 203 (Senior Seminar)
// All courses toward the 70-unit requirement must be taken for a letter grade, min C
//   Exception: URBANST 100+ courses offered only S/NC (e.g. URBANST 201A)
// Max 3 non-Stanford courses (≤15 units) toward the major; must be pre-approved
// URBANST 196, 199 and prerequisites do NOT count toward 70 units
// Max 5 units of URBANST 197 (Directed Reading) without Director permission
// Max 7 units of internship credit total (URBANST 194 + 201A combined)
// Courses may not be double-counted within the major
// 6 pathways (declared to dept; NOT on Axess, transcript, or diploma)

import type { MajorConfig, CourseOption } from '../majorSchema';

// ── Skills course list ────────────────────────────────────────────────────────

const SKILLS_COURSES: CourseOption[] = [
  { dept: 'ANTHRO',    number: '91',    name: 'Method and Evidence in Anthropology' },
  { dept: 'ANTHRO',    number: '93B',   name: 'Prefield Research Seminar: Non-Majors' },
  { dept: 'ANTHRO',    number: '98C',   name: 'Digital Methods in Anthropology' },
  { dept: 'ARCHLGY',   number: '125',   name: 'Archaeological Field Methods: Excavating Campus Histories at Frenchman\'s Lake' },
  { dept: 'CEE',       number: '31',    name: 'Accessing Architecture Through Drawing' },
  { dept: 'CEE',       number: '31Q',   name: 'Accessing Architecture Through Drawing' },
  { dept: 'CEE',       number: '118X',  name: 'Shaping the Future of the Bay Area' },
  { dept: 'CEE',       number: '118Y',  name: 'Shaping the Future of the Bay Area' },
  { dept: 'CEE',       number: '118Z',  name: 'Shaping the Future of the Bay Area' },
  { dept: 'CEE',       number: '130',   name: 'Architectural Design: 3-D Modeling, Methodology, and Process' },
  { dept: 'CEE',       number: '133F',  name: 'Studio 6: Integrated Design Capstone' },
  { dept: 'CEE',       number: '139',   name: 'Design Portfolio Methods' },
  { dept: 'CEE',       number: '154',   name: 'Data Analytics for Physical Systems' },
  { dept: 'DATASCI',   number: '112',   name: 'Principles of Data Science' },
  { dept: 'DATASCI',   number: '154',   name: 'Data Science for Social Impact' },
  { dept: 'EARTHSYS',  number: '142',   name: 'Remote Sensing of Land' },
  { dept: 'ECON',      number: '102A',  name: 'Introduction to Statistical Methods (Postcalculus) for Social Scientists' },
  { dept: 'EDUC',      number: '123',   name: 'Community-based Research As Tool for Social Change: Discourses of Equity in Communities & Classrooms' },
  { dept: 'ENGR',      number: '150',   name: 'Data Challenge Lab' },
  { dept: 'ESS',       number: '165',   name: 'Advanced Geographic Information Systems' },
  { dept: 'HUMBIO',    number: '82A',   name: 'Qualitative Research Methodology' },
  { dept: 'HUMBIO',    number: '82B',   name: 'Advanced Data Analysis in Qualitative Research' },
  { dept: 'MED',       number: '247',   name: 'Methods in Community Assessment, Evaluation, and Research' },
  { dept: 'MS&E',      number: '125',   name: 'Introduction to Applied Statistics' },
  { dept: 'PEDS',      number: '202C',  name: 'Qualitative Research Methods and Study Design' },
  { dept: 'POLISCI',   number: '150A',  name: 'Data Science for Politics' },
  { dept: 'POLISCI',   number: '150B',  name: 'Machine Learning for Social Scientists' },
  { dept: 'POLISCI',   number: '150C',  name: 'Causal Inference for Social Science' },
  { dept: 'SOC',       number: '180A',  name: 'Foundations of Social Research' },
  { dept: 'SOC',       number: '180B',  name: 'Introduction to Data Analysis' },
  { dept: 'STATS',     number: '60',    name: 'Introduction to Statistical Methods: Precalculus' },
  { dept: 'STATS',     number: '101',   name: 'Data Science 101' },
  { dept: 'URBANST',   number: '123A',  name: 'Designing Research for Social Justice: Creating a Community Engaged Research Project' },
  { dept: 'URBANST',   number: '123B',  name: 'Community Engaged Research - Principles, Ethics, and Design' },
  { dept: 'URBANST',   number: '145',   name: 'Advanced Concepts in Geographic Information Science' },
  { dept: 'URBANST',   number: '149',   name: 'Monitoring the Crisis' },
];

// ── Community engaged learning list ──────────────────────────────────────────

const COMMUNITY_COURSES: CourseOption[] = [
  { dept: 'OSPPARIS',  number: '17',    name: 'Green Urban Planning Internship' },
  { dept: 'SINY',      number: '56',    name: 'Changemakers in Action: Business Innovation and Technology for Social Change' },
  { dept: 'SINY',      number: '101',   name: 'The New York City Seminar' },
  { dept: 'URBANST',   number: '125',   name: 'Shades of Green: Exploring and Expanding Environmental Justice in Practice' },
  { dept: 'URBANST',   number: '141',   name: 'Gentrification' },
  { dept: 'URBANST',   number: '155',   name: 'Just Transitions Policy Lab' },
  { dept: 'URBANST',   number: '164',   name: 'Sustainable Cities' },
  { dept: 'URBANST',   number: '165',   name: 'Sustainable Transportation: Policy and Planning in Practice' },
  { dept: 'URBANST',   number: '201A',  name: 'Capstone Internship in Urban Studies' },
];

// ── Pathway elective lists ────────────────────────────────────────────────────

const GUCH_ELECTIVES: CourseOption[] = [
  { dept: 'AMSTUD',    number: '58Q',   name: 'American Landscapes of Segregation' },
  { dept: 'AMSTUD',    number: '145',   name: 'Silicon Valley' },
  { dept: 'AMSTUD',    number: '154D',  name: 'American Disaster' },
  { dept: 'ANTHRO',    number: '39',    name: 'Sense of Place' },
  { dept: 'ANTHRO',    number: '42',    name: 'Megacities' },
  { dept: 'ANTHRO',    number: '108B',  name: 'Gender in the Arab and Middle Eastern City' },
  { dept: 'ANTHRO',    number: '167',   name: 'Body and Environment' },
  { dept: 'ARTHIST',   number: '3',     name: 'Introduction to World Architecture' },
  { dept: 'ARTHIST',   number: '142',   name: 'Architecture Since 1900' },
  { dept: 'ARTHIST',   number: '143A',  name: 'American Architecture' },
  { dept: 'ARTHIST',   number: '250',   name: 'Cultural Heritage and Urban Space in Cairo and Istanbul' },
  { dept: 'ARTSTUDI',  number: '11Q',   name: 'Art in the Metropolis' },
  { dept: 'CEE',       number: '32G',   name: 'Architecture Since 1900' },
  { dept: 'CEE',       number: '33B',   name: 'Japanese Modern Architecture' },
  { dept: 'CEE',       number: '32R',   name: 'American Architecture' },
  { dept: 'CEE',       number: '41Q',   name: 'Clean Water Now! Urban Water Conflicts' },
  { dept: 'CLASSICS',  number: '83',    name: 'The Greeks' },
  { dept: 'CLASSICS',  number: '84',    name: 'The Romans' },
  { dept: 'CLASSICS',  number: '156',   name: 'Design of Cities' },
  { dept: 'CSRE',      number: '147D',  name: 'Studies in Music, Media, and Popular Culture: Music and Urban Film' },
  { dept: 'CSRE',      number: '270',   name: 'Introduction to Arab Studies: Memory, Heritage, and Cultural Production' },
  { dept: 'EARTHSYS',  number: '112',   name: 'Human Society and Environmental Change' },
  { dept: 'ENGLISH',   number: '83N',   name: 'City, Space, Literature' },
  { dept: 'FRENCH',    number: '140',   name: 'Paris: Capital of the Modern World' },
  { dept: 'HISTORY',   number: '45B',   name: 'Introduction to African Studies I: Africa in the 20th Century' },
  { dept: 'HISTORY',   number: '62S',   name: 'From Runaway Wives to Dancing Girls: Urban Women in the Long Nineteenth Century' },
  { dept: 'HISTORY',   number: '91B',   name: 'The City in Imperial China' },
  { dept: 'HISTORY',   number: '106A',  name: 'Global Human Geography: Asia and Africa' },
  { dept: 'HISTORY',   number: '106B',  name: 'Global Human Geography: Europe and Americas' },
  { dept: 'HISTORY',   number: '110C',  name: 'Modern Europe\'s Lives' },
  { dept: 'HISTORY',   number: '150C',  name: 'The United States in the Twentieth Century' },
  { dept: 'HISTORY',   number: '232B',  name: 'Heretics, Prostitutes, and Merchants: The Venetian Empire' },
  { dept: 'JAPAN',     number: '125',   name: 'Tokyo, Kyoto, Osaka and Beyond: Place in Modern Japan' },
  { dept: 'LATINAM',   number: '177A',  name: 'Mapping Poverty, Colonialism and Nation Building in Latin America' },
  { dept: 'DESIGN',    number: '101',   name: 'History and Ethics of Design' },
  { dept: 'MUSIC',     number: '11Q',   name: 'Art in the Metropolis' },

  { dept: 'OSPBER',    number: '30',    name: 'Berlin vor Ort: A Field Trip Module' },
  { dept: 'OSPBER',    number: '60',    name: 'Cityscape as History: Architecture and Urban Design in Berlin' },
  { dept: 'OSPCPTWN',  number: '79',    name: 'Engaging Southern Cities: Thinking urbanization, development, and public culture from Cape Town' },
  { dept: 'OSPFLOR',   number: '58',    name: 'Space as History: Social Vision and Urban Change' },
  { dept: 'OSPFLOR',   number: '71',    name: 'A Studio with a View: Drawing, Painting and Informing your Aesthetic in Florence' },
  { dept: 'OSPFLOR',   number: '115Y',  name: 'Building the Cathedral and the Town Hall: Constructing and Deconstructing Symbols of a Civilization' },
  { dept: 'OSPHONGK',  number: '30',    name: 'Investigating Hong Kong Through Multidisciplinary Lens' },
  { dept: 'OSPHONGK',  number: '39',    name: 'Studies of Cities in Comparative Perspective' },
  { dept: 'OSPHONGK',  number: '89',    name: 'Ethnic, Groups, Ethnic Relations and Identities' },
  { dept: 'OSPISTAN',  number: '88',    name: 'History of Istanbul: Ancient to Contemporary' },
  { dept: 'OSPKYOCT',  number: '199',   name: 'The Public Space Potential of Kyoto\'s Urban Cemeteries' },
  { dept: 'OSPMADRD',  number: '8A',    name: 'Cities and Creativity: Cultural and Architectural Interpretations of Madrid' },
  { dept: 'OSPMADRD',  number: '60',    name: 'Internship Seminar: Experiential Learning through Service and Professional Opportunities' },
  { dept: 'OSPPARIS',  number: '92',    name: 'Building Paris: Its History, Architecture, and Urban Design' },
  { dept: 'OSPPARIS',  number: '94',    name: 'Post Colonial Paris' },
  { dept: 'OSPPARIS',  number: '99P',   name: 'Paris: Capital of the Modern World' },
  { dept: 'OSPSANTG',  number: '29',    name: 'Sustainable Cities: Comparative Transportation Systems in Latin America' },
  { dept: 'OSPSANTG',  number: '71',    name: 'Santiago: Urban Planning, Public Policy, and the Built Environment' },
  { dept: 'POLISCI',   number: '110C',  name: 'America and the World Economy' },
  { dept: 'REES',      number: '204',   name: 'Cities of Empire: An Urban Journey through Eastern Europe and the Mediterranean' },
  { dept: 'SINY',      number: '114',   name: 'Writing in the City: Why New York Makes Great Writers' },
  { dept: 'SINY',      number: '116',   name: 'Off the iPhone and Into the City: Creating a Photography Project' },
  { dept: 'SINY',      number: '152',   name: 'Film: The City as Muse' },
  { dept: 'SLAVIC',    number: '36N',   name: 'Get Your Own Toothbrush: Experiments in Communal Housing and their Discontents' },
  { dept: 'URBANST',   number: '27Q',   name: 'The Detective and the City' },
  { dept: 'URBANST',   number: '83N',   name: 'City, Space, Literature' },
  { dept: 'URBANST',   number: '100UR', name: 'Doing (Sub)Urban History' },
  { dept: 'URBANST',   number: '114',   name: 'Urban Culture in Global Perspective' },
  { dept: 'URBANST',   number: '119',   name: 'Ancient Urbanism' },
  { dept: 'URBANST',   number: '140F',  name: 'Casablanca - Algiers - Tunis: Cities on the Edge' },
  { dept: 'URBANST',   number: '141',   name: 'Gentrification' },
  { dept: 'URBANST',   number: '142',   name: 'Megacities' },
  { dept: 'URBANST',   number: '145',   name: 'International Urbanization Seminar: Cross-Cultural Collaboration for Sustainable Urban Development' },
  { dept: 'URBANST',   number: '147',   name: 'Discovering the World of Indus' },
  { dept: 'URBANST',   number: '150',   name: 'From Gold Rush to Google Bus: History of San Francisco' },
  { dept: 'URBANST',   number: '156',   name: 'St. Petersburg: Imagining a City, Building a City' },
  { dept: 'URBANST',   number: '169',   name: 'Race, Ethnicity, and Water in Urban California' },
  { dept: 'URBANST',   number: '169B',  name: 'Race and Ethnicity in Urban California: Research Seminar' },
  { dept: 'URBANST',   number: '174',   name: 'Defining Smart Cities: Visions of Urbanism for the 21st Century' },
  { dept: 'URBANST',   number: '184',   name: 'Paris: Capital of the Modern World' },
];

const REUL_ELECTIVES: CourseOption[] = [
  { dept: 'AFRICAAM',  number: '44',    name: 'Post-Civil Right Black America' },
  { dept: 'AFRICAAM',  number: '80Q',   name: 'Race and Gender in Silicon Valley' },
  { dept: 'AFRICAAM',  number: '105',   name: 'Foundations of African American Studies II' },
  { dept: 'AFRICAAM',  number: '180S',  name: 'The Black Music 1980s: Turntables, Beat Machines and DJ Scholarship' },
  { dept: 'AFRICAAM',  number: '204',   name: 'Race, Colonialism, and Climate Justice in the Caribbean' },
  { dept: 'ANTHRO',    number: '31Q',   name: 'The Big Shift' },
  { dept: 'ANTHRO',    number: '107',   name: 'Black Political Struggle Across the Americas' },
  { dept: 'ANTHRO',    number: '111C',  name: 'Muwekma: Landscape Archaeology and the Narratives of California Natives' },
  { dept: 'ANTHRO',    number: '123C',  name: '"Third World Problems?" Environmental Justice Around the World' },
  { dept: 'ANTHRO',    number: '167',   name: 'Body and Environment' },
  { dept: 'ARTHIST',   number: '291',   name: 'Riot: Visualizing Civil Unrest in the 20th and 21st Centuries' },
  { dept: 'ASNAMST',   number: '27SI',  name: 'Revolution and the Pilipinx Diaspora: Exploring Global Activism in Local Communities' },
  { dept: 'ASNAMST',   number: '100',   name: 'Introduction to Asian American Studies' },
  { dept: 'ASNAMST',   number: '110',   name: 'The Development of the Southeast Asian American Communities: A comparative analysis' },
  { dept: 'ASNAMST',   number: '261',   name: 'Introduction to Asian American History' },
  { dept: 'CHILATST',  number: '100',   name: 'Introduction to Latinx Studies' },
  { dept: 'CHILATST',  number: '125S',  name: 'Chicano/Latino Politics' },
  { dept: 'CHILATST',  number: '173',   name: 'Mexican Migration to the United States' },
  { dept: 'CHILATST',  number: '177A',  name: 'Well-Being in Immigrant Children & Youth: A Service Learning Course' },
  { dept: 'CHILATST',  number: '180E',  name: 'Introduction to Chicanx/Latinx Studies' },
  { dept: 'CSRE',      number: '22',    name: 'Lockdown America: Race and Incarceration in the Land of the Free' },
  { dept: 'CSRE',      number: '23',    name: 'Race and the War on Drugs: Long Roots and Other Futures' },
  { dept: 'CSRE',      number: '30Q',   name: 'The Big Shift' },
  { dept: 'CSRE',      number: '95I',   name: 'Space, Public Discourse and Revolutionary Practices' },
  { dept: 'CSRE',      number: '108X',  name: 'The Changing Face of America' },
  { dept: 'CSRE',      number: '147A',  name: 'Race and Ethnicity Around the World' },
  { dept: 'CSRE',      number: '148R',  name: 'Los Angeles: A Cultural History' },
  { dept: 'CSRE',      number: '157P',  name: 'Solidarity and Racial Justice' },
  { dept: 'CSRE',      number: '220',   name: 'Public Policy Institute' },
  { dept: 'EDUC',      number: '103B',  name: 'Race, Ethnicity, and Linguistic Diversity in Classrooms: Sociocultural Theory and Practices' },
  { dept: 'EDUC',      number: '108',   name: 'The Changing Face of America' },
  { dept: 'EDUC',      number: '148',   name: 'Ingles Personal: Coaching Everyday Community English' },
  { dept: 'EDUC',      number: '149',   name: 'Theory and Issues in the Study of Bilingualism' },
  { dept: 'EDUC',      number: '392',   name: 'Education for Liberation: A History of African American Education, 1800 to the Present' },
  { dept: 'HISTORY',   number: '200C',  name: 'Doing the History of Race and Ethnicity' },
  { dept: 'HISTORY',   number: '255D',  name: 'Identity in the American Imagination' },
  { dept: 'HISTORY',   number: '271B',  name: 'Making Latino America' },
  { dept: 'HISTORY',   number: '274C',  name: 'Mexicans in the United States' },
  { dept: 'OSPHONGK',  number: '89',    name: 'Ethnic, Groups, Ethnic Relations and Identities' },
  { dept: 'OSPPARIS',  number: '94',    name: 'Post Colonial Paris' },
  { dept: 'PEDS',      number: '150',   name: 'Advancing Health Equity: Exploring Social Determinants of Health and Multi-sector Solutions' },
  { dept: 'POLISCI',   number: '121L',  name: 'Racial-Ethnic Politics in US' },
  { dept: 'POLISCI',   number: '141A',  name: 'Immigration and Multiculturalism' },
  { dept: 'PWR',       number: '194',   name: 'Topics in Writing and Rhetoric (Advanced Writing in the Disciplines)' },
  { dept: 'SINY',      number: '15',    name: 'Migrant Media in New York City' },
  { dept: 'SINY',      number: '63',    name: 'Languages and Culture of Immigrant New York' },
  { dept: 'SOC',       number: '3',     name: 'America: Unequal' },
  { dept: 'SOC',       number: '45Q',   name: 'Understanding Race and Ethnicity in American Society' },
  { dept: 'SOC',       number: '179A',  name: 'Crime and Punishment in America' },
  { dept: 'SOC',       number: '189',   name: 'Race and Immigration' },
  { dept: 'URBANST',   number: '125',   name: 'Shades of Green: Exploring and Expanding Environmental Justice in Practice' },
  { dept: 'URBANST',   number: '139',   name: 'Black Geographies' },
  { dept: 'URBANST',   number: '140F',  name: 'Casablanca - Algiers - Tunis: Cities on the Edge' },
  { dept: 'URBANST',   number: '141',   name: 'Gentrification' },
  { dept: 'URBANST',   number: '141A',  name: 'Urban Schools, Social Policy, and the Gentrifying City' },
  { dept: 'URBANST',   number: '149',   name: 'Monitoring the Crisis' },
  { dept: 'URBANST',   number: '156A',  name: 'The Changing American City' },
  { dept: 'URBANST',   number: '164',   name: 'Sustainable Cities' },
  { dept: 'URBANST',   number: '168',   name: 'Housing & Community Development--Policy and Practice' },
  { dept: 'URBANST',   number: '169',   name: 'Race, Ethnicity, and Water in Urban California' },
  { dept: 'URBANST',   number: '169B',  name: 'Race and Ethnicity in Urban California: Research Seminar' },
];

const EDUC_ELECTIVES: CourseOption[] = [
  { dept: 'AFRICAAM',  number: '106',   name: 'Race, Ethnicity, and Linguistic Diversity in Classrooms: Sociocultural Theory and Practices' },
  { dept: 'AFRICAAM',  number: '111',   name: 'Education for All? The Global and Local in Public Policy Making in Africa' },
  { dept: 'EDUC',      number: '101',   name: 'Introduction to Teaching and Learning' },
  { dept: 'EDUC',      number: '103A',  name: 'Tutoring: Seeing a Child through Literacy' },
  { dept: 'EDUC',      number: '103B',  name: 'Race, Ethnicity, and Linguistic Diversity in Classrooms: Sociocultural Theory and Practices' },
  { dept: 'EDUC',      number: '107',   name: 'Education and Inequality: Big Data for Large-Scale Problems' },
  { dept: 'EDUC',      number: '123',   name: 'Community-based Research As Tool for Social Change: Discourses of Equity in Communities & Classrooms' },
  { dept: 'EDUC',      number: '131',   name: 'Raza Youth in Urban Schools: Mis-educating Chicana/o/x and Latina/o/x Communities' },
  { dept: 'EDUC',      number: '148',   name: 'Ingles Personal: Coaching Everyday Community English' },
  { dept: 'EDUC',      number: '149',   name: 'Theory and Issues in the Study of Bilingualism' },
  { dept: 'EDUC',      number: '195A',  name: 'Origins and Legacies of Educational Progressivism: A Community Engaged Learning Course' },
  { dept: 'EDUC',      number: '201',   name: 'History of Education in the United States' },
  { dept: 'EDUC',      number: '202',   name: 'Introduction to Global and Comparative Education' },
  { dept: 'EDUC',      number: '204',   name: 'Introduction to Philosophy of Education' },
  { dept: 'EDUC',      number: '220C',  name: 'Education and Society' },
  { dept: 'EDUC',      number: '220D',  name: 'History of School Reform: Origins, Policies, Outcomes, and Explanations' },
  { dept: 'EDUC',      number: '221A',  name: 'Policy Analysis in Education' },
  { dept: 'EDUC',      number: '271',   name: 'Education Policy in the United States' },
  { dept: 'EDUC',      number: '277',   name: 'Education of Immigrant Students: Psychological Perspectives' },
  { dept: 'EDUC',      number: '283',   name: 'Child Development in and Beyond Schools' },
  { dept: 'HUMBIO',    number: '142',   name: 'Adolescent Health and Development' },
  { dept: 'PSYCH',     number: '60',    name: 'Introduction to Developmental Psychology' },
  { dept: 'PWR',       number: '194',   name: 'Topics in Writing and Rhetoric (Advanced Writing in the Disciplines)' },
];

const SOCSOCCH_ELECTIVES: CourseOption[] = [
  { dept: 'AFRICAAM',  number: '111',   name: 'Education for All? The Global and Local in Public Policy Making in Africa' },
  { dept: 'AMSTUD',    number: '58Q',   name: 'American Landscapes of Segregation' },
  { dept: 'AMSTUD',    number: '154D',  name: 'American Disaster' },
  { dept: 'ANTHRO',    number: '32',    name: 'Theories in Race and Ethnicity: A Comparative Perspective' },
  { dept: 'CEE',       number: '32A',   name: 'Psychology of Architecture' },
  { dept: 'CEE',       number: '32B',   name: 'Design Theory' },
  { dept: 'CEE',       number: '124S',  name: 'Sustainable Urban Systems Seminar' },
  { dept: 'CEE',       number: '131A',  name: 'Professional Practice: Mixed-Use Design in an Urban Setting' },
  { dept: 'CEE',       number: '141A',  name: 'Infrastructure Project Development' },
  { dept: 'CEE',       number: '141B',  name: 'Infrastructure Project Delivery' },
  { dept: 'CEE',       number: '177L',  name: 'Smart Cities & Communities: Sustainability Design Thinking' },
  { dept: 'CEE',       number: '246',   name: 'Venture Creation for the Real Economy' },
  { dept: 'CSRE',      number: '12',    name: 'Community Organizing: People, Power, and Change' },
  { dept: 'CSRE',      number: '100',   name: 'Introduction to Comparative Studies in Race and Ethnicity' },
  { dept: 'CSRE',      number: '107',   name: 'Community Organizing: People, Power and Change' },
  { dept: 'CSRE',      number: '157P',  name: 'Solidarity and Racial Justice' },
  { dept: 'EARTHSYS',  number: '105',   name: 'Food and Community: Food Security, Resilience and Equity' },
  { dept: 'EARTHSYS',  number: '181',   name: 'Urban Agroecology' },
  { dept: 'ECON',      number: '150',   name: 'Economic Policy Analysis' },
  { dept: 'ECON',      number: '155',   name: 'Climate change and global inequality' },
  { dept: 'EDUC',      number: '107',   name: 'Education and Inequality: Big Data for Large-Scale Problems' },
  { dept: 'ENGR',      number: '150',   name: 'Data Challenge Lab' },
  { dept: 'ENVRES',    number: '223',   name: 'Introduction to Environmental Justice: Race, Class, Gender and Place' },
  { dept: 'HISTORY',   number: '106A',  name: 'Global Human Geography: Asia and Africa' },
  { dept: 'HISTORY',   number: '106B',  name: 'Global Human Geography: Europe and Americas' },
  { dept: 'HUMBIO',    number: '122S',  name: 'Social Class, Race, Ethnicity, and Health' },
  { dept: 'HUMBIO',    number: '128',   name: 'Community Health Psychology' },
  { dept: 'INTNLREL',  number: '142',   name: 'Challenging the Status Quo: Innovation in the Public Sector' },
  { dept: 'LAW',       number: '2505',  name: 'Land Use Law' },
  { dept: 'LAW',       number: '7003',  name: 'Cities in Distress' },
  { dept: 'LINGUIST',  number: '55N',   name: 'Language in the City' },
  { dept: 'ME',        number: '267',   name: 'Ethics and Equity in Transportation Systems' },
  { dept: 'MS&E',      number: '180',   name: 'Organizations: Theory and Management' },
  { dept: 'OSPCPTWN',  number: '79',    name: 'Engaging Southern Cities: Thinking urbanization, development, and public culture from Cape Town' },
  { dept: 'OSPSANTG',  number: '29',    name: 'Sustainable Cities: Comparative Transportation Systems in Latin America' },
  { dept: 'OSPSANTG',  number: '71',    name: 'Santiago: Urban Planning, Public Policy, and the Built Environment' },
  { dept: 'PEDS',      number: '150',   name: 'Advancing Health Equity: Exploring Social Determinants of Health and Multi-sector Solutions' },
  { dept: 'POLISCI',   number: '31Q',   name: 'Justice and Cities' },
  { dept: 'POLISCI',   number: '121L',  name: 'Racial-Ethnic Politics in US' },
  { dept: 'POLISCI',   number: '147P',  name: 'The Politics of Inequality' },
  { dept: 'POLISCI',   number: '220',   name: 'Urban Policy Research Lab' },
  { dept: 'POLISCI',   number: '236',   name: 'Philanthropy for Sustainable Development' },
  { dept: 'PUBLPOL',   number: '135',   name: 'Regional Politics and Decision Making in Silicon Valley and the Greater Bay Area' },
  { dept: 'SINY',      number: '101',   name: 'The New York City Seminar' },
  { dept: 'SINY',      number: '134',   name: 'The Urban Home Project' },
  { dept: 'SINY',      number: '162',   name: 'Sustainable and Resilient Urban Systems in NYC' },
  { dept: 'SOC',       number: '3',     name: 'America: Unequal' },
  { dept: 'SOC',       number: '14N',   name: 'Inequality in American Society' },
  { dept: 'SOC',       number: '45Q',   name: 'Understanding Race and Ethnicity in American Society' },
  { dept: 'SOC',       number: '318',   name: 'Social Movements and Collective Action' },
  { dept: 'SOC',       number: '135',   name: 'Poverty, Inequality, and Social Policy in the United States' },
  { dept: 'SOC',       number: '145',   name: 'Race and Ethnic Relations in the USA' },
  { dept: 'SOC',       number: '146',   name: 'Introduction to Comparative Studies in Race and Ethnicity' },
  { dept: 'SOC',       number: '157',   name: 'Ending Poverty with Technology' },
  { dept: 'SOC',       number: '160',   name: 'Formal Organizations' },
  { dept: 'SOC',       number: '179A',  name: 'Crime and Punishment in America' },
  { dept: 'URBANST',   number: '33',    name: 'Architectural Theory of the American City' },
  { dept: 'URBANST',   number: '103C',  name: 'Housing Visions' },
  { dept: 'URBANST',   number: '108H',  name: 'Housing Affordability Crisis in California: Causes, Impacts, and Solutions' },
  { dept: 'URBANST',   number: '109',   name: 'Physics of Cities' },
  { dept: 'URBANST',   number: '115',   name: 'Urban Education' },
  { dept: 'URBANST',   number: '123A',  name: 'Designing Research for Social Justice: Creating a Community Engaged Research Project' },
  { dept: 'URBANST',   number: '125',   name: 'Shades of Green: Exploring and Expanding Environmental Justice in Practice' },
  { dept: 'URBANST',   number: '126',   name: 'Spirituality and Nonviolent Urban and Social Transformation' },
  { dept: 'URBANST',   number: '126A',  name: 'Ethics and Leadership in Public Service' },
  { dept: 'URBANST',   number: '127A',  name: 'Community Organizing: People, Power & Change' },
  { dept: 'URBANST',   number: '127B',  name: 'Leadership, Organizing and Action: Intensive' },
  { dept: 'URBANST',   number: '127C',  name: 'Leadership, Organizing and Action: Campaign Coaching' },
  { dept: 'URBANST',   number: '130',   name: 'Planning Calif: the Intersection of Climate, Land Use, Transportation & the Economy' },
  { dept: 'URBANST',   number: '131',   name: 'Very Impactful People (V.I.P.): Social Innovation & the Impact Entrepreneur' },
  { dept: 'URBANST',   number: '132',   name: 'Concepts and Analytic Skills for the Social Sector' },
  { dept: 'URBANST',   number: '133',   name: 'Social Enterprise Workshop' },
  { dept: 'URBANST',   number: '134',   name: 'Justice and Cities' },
  { dept: 'URBANST',   number: '138',   name: 'Smart Cities & Communities' },
  { dept: 'URBANST',   number: '141',   name: 'Gentrification' },
  { dept: 'URBANST',   number: '145',   name: 'International Urbanization Seminar: Cross-Cultural Collaboration for Sustainable Urban Development' },
  { dept: 'URBANST',   number: '148',   name: 'Who Owns Your City?: Institutional Real Estate Seminar' },
  { dept: 'URBANST',   number: '155',   name: 'Just Transitions Policy Lab' },
  { dept: 'URBANST',   number: '163',   name: 'Introduction to Land Use Policy and Planning' },
  { dept: 'URBANST',   number: '164',   name: 'Sustainable Cities' },
  { dept: 'URBANST',   number: '168',   name: 'Race, Nature, and the City' },
  { dept: 'URBANST',   number: '169',   name: 'Race, Ethnicity, and Water in Urban California' },
  { dept: 'URBANST',   number: '169B',  name: 'Race and Ethnicity in Urban California: Research Seminar' },
  { dept: 'URBANST',   number: '170',   name: 'Urban Policy Research Lab' },
  { dept: 'URBANST',   number: '171',   name: 'Urban Design Studio' },
  { dept: 'URBANST',   number: '172A',  name: 'Introduction to Urban, Rural, and Regional Planning' },
  { dept: 'URBANST',   number: '173',   name: 'The Urban Economy' },
  { dept: 'URBANST',   number: '174',   name: 'Defining Smart Cities: Visions of Urbanism for the 21st Century' },
  { dept: 'URBANST',   number: '178',   name: 'The Science and Practice of Effective Advocacy' },
  { dept: 'URBANST',   number: '179',   name: 'The Social Life of Neighborhoods' },
  { dept: 'URBANST',   number: '183',   name: 'Team Urban Design Studio' },
  { dept: 'URBANST',   number: '190A',  name: 'Public Service for Social Impact: Pathways to Purposeful Careers' },
];

const SUSTAIN_ENV: CourseOption[] = [
  { dept: 'BIO',       number: '81',    name: 'Introduction to Ecology' },
  { dept: 'CEE',       number: '41Q',   name: 'Clean Water Now! Urban Water Conflicts' },
  { dept: 'CEE',       number: '64',    name: 'Air Pollution and Global Warming: History, Science, and Solutions' },
  { dept: 'CEE',       number: '100',   name: 'Managing Sustainable Building Projects' },
  { dept: 'CEE',       number: '107A',  name: 'Understand Energy' },
  { dept: 'CEE',       number: '124S',  name: 'Sustainable Urban Systems Seminar' },
  { dept: 'CEE',       number: '165C',  name: 'Water Resources Management' },
  { dept: 'CEE',       number: '172',   name: 'Air Quality Management' },
  { dept: 'CEE',       number: '173',   name: 'Urban Water' },
  { dept: 'CEE',       number: '176A',  name: 'Energy Efficient Buildings' },
  { dept: 'CEE',       number: '178',   name: 'Introduction to Human Exposure Analysis' },
  { dept: 'CEE',       number: '243',   name: 'Intro to Urban Sys Engrg' },
  { dept: 'CEE',       number: '265F',  name: 'Environmental Governance and Climate Resilience' },
  { dept: 'CEE',       number: '308',   name: 'Topics in Disaster and Climate Risk and Resilience Research' },
  { dept: 'CHEMENG',   number: '60Q',   name: 'Environmental Regulation and Policy' },
  { dept: 'EARTHSYS',  number: '10',    name: 'Introduction to Earth Systems' },
  { dept: 'EARTHSYS',  number: '41N',   name: 'The Global Warming Paradox' },
  { dept: 'EARTHSYS',  number: '101',   name: 'Energy and the Environment' },
  { dept: 'EARTHSYS',  number: '104',   name: 'The Water Course' },
  { dept: 'ECON',      number: '17N',   name: 'Energy, the Environment, and the Economy' },
  { dept: 'ECON',      number: '155',   name: 'Climate change and global inequality' },
  { dept: 'ENGR',      number: '90',    name: 'Environmental Science and Technology' },
  { dept: 'OSPSANTG',  number: '29',    name: 'Sustainable Cities: Comparative Transportation Systems in Latin America' },
  { dept: 'SINY',      number: '162',   name: 'Sustainable and Resilient Urban Systems in NYC' },
  { dept: 'URBANST',   number: '174',   name: 'Defining Smart Cities: Visions of Urbanism for the 21st Century' },
];

const SUSTAIN_SOC: CourseOption[] = [
  { dept: 'AMSTUD',    number: '154D',  name: 'American Disaster' },
  { dept: 'ANTHRO',    number: '167',   name: 'Body and Environment' },
  { dept: 'ENVRES',    number: '221',   name: 'New Frontiers and Opportunities in Sustainability' },
  { dept: 'ENVRES',    number: '223',   name: 'Introduction to Environmental Justice: Race, Class, Gender and Place' },
  { dept: 'HISTORY',   number: '200B',  name: 'Doing Environmental History: Water Justice' },
  { dept: 'ME',        number: '267',   name: 'Ethics and Equity in Transportation Systems' },
  { dept: 'PEDS',      number: '150',   name: 'Advancing Health Equity: Exploring Social Determinants of Health and Multi-sector Solutions' },
  { dept: 'POLISCI',   number: '31Q',   name: 'Justice and Cities' },
  { dept: 'PUBLPOL',   number: '153',   name: 'Energy, Clean Innovation & Sustainability' },
  { dept: 'SINY',      number: '122',   name: 'The Agile City' },
  { dept: 'SOC',       number: '3',     name: 'America: Unequal' },
  { dept: 'SOC',       number: '135',   name: 'Poverty, Inequality, and Social Policy in the United States' },
  { dept: 'URBANST',   number: '103C',  name: 'Housing Visions' },
  { dept: 'URBANST',   number: '108H',  name: 'Housing Affordability Crisis in California: Causes, Impacts, and Solutions' },
  { dept: 'URBANST',   number: '125',   name: 'Shades of Green: Exploring and Expanding Environmental Justice in Practice' },
  { dept: 'URBANST',   number: '130',   name: 'Planning Calif: the Intersection of Climate, Land Use, Transportation & the Economy' },
  { dept: 'URBANST',   number: '138',   name: 'Smart Cities & Communities' },
  { dept: 'URBANST',   number: '147',   name: 'Archaeology of Human Rights' },
  { dept: 'URBANST',   number: '155',   name: 'Just Transitions Policy Lab' },
  { dept: 'URBANST',   number: '155A',  name: 'Environmental Justice Colloquium' },
  { dept: 'URBANST',   number: '156A',  name: 'The Changing American City' },
  { dept: 'URBANST',   number: '163',   name: 'Introduction to Land Use Policy and Planning' },
  { dept: 'URBANST',   number: '165',   name: 'Sustainable Transportation: Policy and Planning in Practice' },
  { dept: 'URBANST',   number: '169',   name: 'Race, Ethnicity, and Water in Urban California' },
  { dept: 'URBANST',   number: '170',   name: 'Urban Policy Research Lab' },
  { dept: 'URBANST',   number: '174',   name: 'Defining Smart Cities: Visions of Urbanism for the 21st Century' },
];

const SUSTAIN_PROJ: CourseOption[] = [
  { dept: 'CEE',       number: '124',   name: 'Sustainable Development Studio' },
  { dept: 'URBANST',   number: '125',   name: 'Shades of Green: Exploring and Expanding Environmental Justice in Practice' },
  { dept: 'URBANST',   number: '164',   name: 'Sustainable Cities' },
  { dept: 'URBANST',   number: '165',   name: 'Sustainable Transportation: Policy and Planning in Practice' },
  { dept: 'URBANST',   number: '171',   name: 'Urban Design Studio' },
  { dept: 'URBANST',   number: '172A',  name: 'Introduction to Urban, Rural, and Regional Planning' },
  { dept: 'URBANST',   number: '181',   name: 'Urban Agroecology' },
  { dept: 'URBANST',   number: '183',   name: 'Team Urban Design Studio' },
];

// ── Main export ───────────────────────────────────────────────────────────────

export const URBANST_BA_2526: MajorConfig = {
  id: 'urbanst-ba-2526',
  name: 'Urban Studies (BA)',
  school: 'Program on Urban Studies',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/URBST-BA/',
  category: 'major',
  totalMinUnits: 70,

  wimCourses: [
    { dept: 'URBANST', number: '202A', name: 'Junior Seminar: Preparation for Research' },
    { dept: 'URBANST', number: '203',  name: 'Senior Seminar' },
  ],
  wimMinCount: 2,

  sections: [
    // ── Prerequisite (does not count toward 70 units) ─────────────────────────
    {
      id: 'prereq',
      name: 'Prerequisite (does NOT count toward 70 units)',
      phase: 'pre-major',
      note: 'ECON 1 may be taken S/NC since its units do not count toward the major. Complete before declaring.',
      slots: [
        {
          id: 'econ1',
          label: 'ECON 1: Principles of Economics',
          type: 'required',
          options: [{ dept: 'ECON', number: '1', name: 'Principles of Economics' }],
          note: 'Does NOT count toward the 70-unit minimum. May be taken S/NC.',
        },
      ],
    },

    // ── Core (19 units) ───────────────────────────────────────────────────────
    {
      id: 'core',
      name: 'Urban Studies Core (19 units)',
      note: 'Complete URBANST 110 before spring quarter of junior year. All 4 courses required (URBANST 114 and 142 are equivalents; pick one).',
      slots: [
        {
          id: 'urbanst110',
          label: 'URBANST 110: Introduction to Urban Studies',
          type: 'required',
          options: [{ dept: 'URBANST', number: '110', name: 'Introduction to Urban Studies' }],
        },
        {
          id: 'urbanst112',
          label: 'URBANST 112: The Urban Underclass',
          type: 'required',
          options: [{ dept: 'URBANST', number: '112', name: 'The Urban Underclass' }],
        },
        {
          id: 'urbanst113',
          label: 'URBANST 113: Introduction to Urban Design',
          type: 'required',
          options: [{ dept: 'URBANST', number: '113', name: 'Introduction to Urban Design: Contemporary Urban Design in Theory and Practice' }],
        },
        {
          id: 'urbanst114-142',
          label: 'URBANST 114 or 142: Urban Culture or Megacities',
          type: 'pick-one',
          options: [
            { dept: 'URBANST', number: '114', name: 'Urban Culture in Global Perspective' },
            { dept: 'URBANST', number: '142', name: 'Megacities' },
          ],
        },
      ],
    },

    // ── Skills Courses (≥9 units, ≥3 courses of ≥3 units each) ───────────────
    {
      id: 'skills',
      name: 'Skills Courses (≥9 units, ≥3 courses)',
      note: 'Minimum 9 units in at least 3 courses of at least 3 units each. Complete before end of junior year. EARTHSYS 144 and SOC 180A are recommended for most students; the third course is chosen with an advisor.',
      slots: [
        {
          id: 'skills-gis',
          label: 'EARTHSYS 144: Fundamentals of Geographic Information Science (GIS)',
          type: 'required',
          options: [{ dept: 'EARTHSYS', number: '144', name: 'Fundamentals of Geographic Information Science (GIS)' }],
        },
        {
          id: 'skills-soc180a',
          label: 'SOC 180A: Foundations of Social Research',
          type: 'required',
          options: [{ dept: 'SOC', number: '180A', name: 'Foundations of Social Research' }],
        },
        {
          id: 'skills-add',
          label: 'Additional Skills Course',
          type: 'pick-from-list',
          count: 1,
          options: SKILLS_COURSES,
          note: 'Students consult with an advisor to determine the best choice. SOC 180A is also in this list if used as the additional course.',
        },
      ],
    },

    // ── Community Engaged Learning (≥3 units) ─────────────────────────────────
    {
      id: 'community',
      name: 'Community Engaged Learning (≥3 units)',
      note: 'Fulfill in one of four ways: (1) enroll in an approved course from the list; (2) complete an independent internship via URBANST 201A (before autumn of senior year); (3) conduct faculty-mentored research; (4) complete Haas Center Cardinal Service notation requirements. Consult the Co-Director no later than winter of junior year if planning an internship. Students who intern for a private-sector org may enroll in URBANST 194 but NOT use URBANST 201A for the capstone. Max 7 units of internship credit total (URBANST 194 + 201A). Not all Haas Center fellowships or Cardinal Courses automatically qualify: use the course substitution petition.',
      slots: [
        {
          id: 'community-slot',
          label: 'Community Engaged Learning (approved course or internship)',
          type: 'pick-from-list',
          count: 1,
          options: COMMUNITY_COURSES,
          note: 'If fulfilling through independent internship, faculty research, or Cardinal Service, mark this slot manually.',
        },
      ],
    },

    // ── Pathway / Depth (≥20 units, trackSelector) ────────────────────────────
    {
      id: 'pathway-selector',
      name: 'Pathway / Depth (≥20 units in one pathway)',
      trackSelector: true,
      note: 'Choose one of six pathways. Pathways are declared to the department: they do NOT appear on Axess, transcript, or diploma. Courses may not be double-counted within the major. Relevant courses not listed may count with prior advisor consent.',
      slots: [],
    },

    // ── Electives (units to reach ≥70 total) ─────────────────────────────────
    {
      id: 'electives',
      name: 'Electives (to reach ≥70 total units)',
      note: 'If core + skills + community + depth total less than 70, remaining units from: other pathway course lists, or URBANST 100+ courses (excluding URBANST 196 and 199). All must be letter-graded at C or higher.',
      slots: [
        {
          id: 'elec-slot',
          label: 'Urban Studies Electives',
          type: 'any-approved',
          options: [],
        },
      ],
    },

    // ── Capstone / WIM (10 units: same courses satisfy both) ─────────────────
    {
      id: 'capstone',
      name: 'Capstone Sequence / WIM (10 units)',
      note: 'Both seminars are required and together satisfy the WIM requirement. URBANST 202A should be taken in the junior year (or winter of sophomore year if away winter junior year). URBANST 203 is taken in the senior year.',
      slots: [
        {
          id: 'urbanst202a',
          label: 'URBANST 202A: Junior Seminar: Preparation for Research',
          type: 'required',
          options: [{ dept: 'URBANST', number: '202A', name: 'Junior Seminar: Preparation for Research' }],
        },
        {
          id: 'urbanst203',
          label: 'URBANST 203: Senior Seminar',
          type: 'required',
          options: [{ dept: 'URBANST', number: '203', name: 'Senior Seminar' }],
        },
      ],
    },
  ],

  tracks: [
    // ── 1. Global Urban Culture and History ───────────────────────────────────
    {
      id: 'guch',
      name: 'Global Urban Culture and History',
      minUnits: 20,
      sections: [
        {
          id: 'guch-req',
          name: 'Required Course',
          slots: [
            {
              id: 'dlcl100',
              label: 'DLCL 100: CAPITALS: How Cities Shape Cultures, States, and People',
              type: 'required',
              options: [{ dept: 'DLCL', number: '100', name: 'CAPITALS: How Cities Shape Cultures, States, and People' }],
            },
          ],
        },
        {
          id: 'guch-elec',
          name: 'Pathway Electives (to reach ≥20 units with required course)',
          note: 'Students in this pathway are encouraged to study off-campus (preferably overseas) for at least one quarter. Many Overseas Studies courses count toward the pathway.',
          slots: [
            {
              id: 'guch-elec-slot',
              label: 'Global Urban Culture and History Electives',
              type: 'pick-from-list',
              count: 4,
              options: GUCH_ELECTIVES,
            },
          ],
        },
      ],
    },

    // ── 2. Race, Ethnicity, and Urban Life ────────────────────────────────────
    {
      id: 'reul',
      name: 'Race, Ethnicity, and Urban Life',
      minUnits: 20,
      sections: [
        {
          id: 'reul-req',
          name: 'Required Course',
          note: 'CSRE 100 was formerly CSRE 196C.',
          slots: [
            {
              id: 'csre100',
              label: 'CSRE 100: Introduction to Comparative Studies in Race and Ethnicity',
              type: 'required',
              options: [{ dept: 'CSRE', number: '100', name: 'Introduction to Comparative Studies in Race and Ethnicity' }],
            },
          ],
        },
        {
          id: 'reul-elec',
          name: 'Pathway Electives (to reach ≥20 units with required course)',
          slots: [
            {
              id: 'reul-elec-slot',
              label: 'Race, Ethnicity, and Urban Life Electives',
              type: 'pick-from-list',
              count: 4,
              options: REUL_ELECTIVES,
            },
          ],
        },
      ],
    },

    // ── 3. Urban Education ────────────────────────────────────────────────────
    {
      id: 'urban-ed',
      name: 'Urban Education',
      minUnits: 20,
      sections: [
        {
          id: 'ued-req',
          name: 'Required Course (pick one)',
          note: 'Urban Education pathway prepares students for STEP or POLS coterminal programs. Stanford undergraduates can apply to STEP in their junior or senior year.',
          slots: [
            {
              id: 'ued-req-slot',
              label: 'URBANST 115 or 141A (pick one)',
              type: 'pick-one',
              options: [
                { dept: 'URBANST', number: '115',  name: 'Urban Education' },
                { dept: 'URBANST', number: '141A', name: 'Urban Schools, Social Policy, and the Gentrifying City' },
              ],
            },
          ],
        },
        {
          id: 'ued-elec',
          name: 'Pathway Electives (to reach ≥20 units with required course)',
          slots: [
            {
              id: 'ued-elec-slot',
              label: 'Urban Education Electives',
              type: 'pick-from-list',
              count: 4,
              options: EDUC_ELECTIVES,
            },
          ],
        },
      ],
    },

    // ── 4. Urban Society and Social Change ────────────────────────────────────
    {
      id: 'socsocch',
      name: 'Urban Society and Social Change',
      minUnits: 20,
      sections: [
        {
          id: 'socsocch-req',
          name: 'Required Course',
          slots: [
            {
              id: 'urbanst156a',
              label: 'URBANST 156A: The Changing American City',
              type: 'required',
              options: [{ dept: 'URBANST', number: '156A', name: 'The Changing American City' }],
            },
          ],
        },
        {
          id: 'socsocch-elec',
          name: 'Pathway Electives (to reach ≥20 units with required course)',
          slots: [
            {
              id: 'socsocch-elec-slot',
              label: 'Urban Society and Social Change Electives',
              type: 'pick-from-list',
              count: 4,
              options: SOCSOCCH_ELECTIVES,
            },
          ],
        },
      ],
    },

    // ── 5. Urban Sustainability ───────────────────────────────────────────────
    {
      id: 'sustainability',
      name: 'Urban Sustainability',
      minUnits: 20,
      sections: [
        {
          id: 'sustain-req',
          name: 'Required Course',
          slots: [
            {
              id: 'earthsys112',
              label: 'EARTHSYS 112: Human Society and Environmental Change',
              type: 'required',
              options: [{ dept: 'EARTHSYS', number: '112', name: 'Human Society and Environmental Change' }],
            },
          ],
        },
        {
          id: 'sustain-env',
          name: 'Environmental Sustainability (pick ≥1)',
          note: 'Environmental sustainability = biosphere, environmental planning/policy, natural resource planning, sustainable building design, urban infrastructure systems.',
          slots: [
            {
              id: 'sustain-env-slot',
              label: 'Environmental Sustainability course (≥1)',
              type: 'pick-from-list',
              count: 1,
              options: SUSTAIN_ENV,
            },
          ],
        },
        {
          id: 'sustain-soc',
          name: 'Social Sustainability (pick ≥1)',
          note: 'Social sustainability = land use planning and human impacts, distribution of public goods, human-centered design, human/community development, citizen participation, social equity.',
          slots: [
            {
              id: 'sustain-soc-slot',
              label: 'Social Sustainability course (≥1)',
              type: 'pick-from-list',
              count: 1,
              options: SUSTAIN_SOC,
            },
          ],
        },
        {
          id: 'sustain-proj',
          name: 'Project-Based Course (pick ≥1)',
          note: 'Project-based courses enable students to work on a real-life urban sustainability issue with community partners: sustainability concepts, community engagement, cross-cultural collaboration, human-centered design thinking.',
          slots: [
            {
              id: 'sustain-proj-slot',
              label: 'Project-Based course (≥1)',
              type: 'pick-from-list',
              count: 1,
              options: SUSTAIN_PROJ,
            },
          ],
        },
        {
          id: 'sustain-elec',
          name: 'Additional Electives (to reach ≥20 units)',
          note: 'Additional courses from any of the three category lists to reach the 20-unit minimum. Consult an advisor.',
          slots: [
            {
              id: 'sustain-elec-slot',
              label: 'Urban Sustainability Electives (any category)',
              type: 'any-approved',
              options: [],
            },
          ],
        },
      ],
    },

    // ── 6. Self-Designed ──────────────────────────────────────────────────────
    {
      id: 'self-designed',
      name: 'Self-Designed',
      minUnits: 20,
      sections: [
        {
          id: 'sd-courses',
          name: 'Self-Designed Pathway Courses (≥20 units, advisor-approved)',
          note: 'Must concentrate on a particular area of urban study (e.g., urban health care, urban technologies). Requires approval by the Director of Urban Studies AND an Academic Council advisor with expertise in the area. Submit a written proposal (course list + educational objective descriptions + advisor approval letter) to the Director by the beginning of the third quarter of the student\'s sophomore year. Late proposals are not considered. Meet with the Director before end of autumn quarter of sophomore year.',
          slots: [
            {
              id: 'sd-slot',
              label: 'Self-Designed Pathway Courses (≥20 units)',
              type: 'any-approved',
              options: [],
            },
          ],
        },
      ],
    },
  ],
};
