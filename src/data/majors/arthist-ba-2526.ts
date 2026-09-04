// Art History BA, Department of Art & Art History, 2025-2026
// Source: https://bulletin.stanford.edu/programs/ARTHS-BA/
// totalMinUnits: 65 (15 courses × 4-5 units each)
// Core: ARTHIST 5 + Art Practice 100-level + ARTHIST 294 (WIM) + ARTHIST 296 (capstone)
// Survey: ≥3 of 6 courses; Area of Concentration: 3 ARTHIST courses (≥1 seminar, 2 in same field)
// Distribution: ≥2 courses each in 3 temporal periods + 3 geographic regions (6 categories)
//  : one course satisfies ONE temporal + ONE geographic category simultaneously
// FILMEDIA: ≥1 required (FILMEDIA 4 from survey satisfies this)
// WIM: ARTHIST 294; Capstone: ARTHIST 296

import type { MajorConfig, CourseOption } from '../majorSchema';

const SURVEY_COURSES: CourseOption[] = [
  { dept: 'ARTHIST', number: '1A',  name: 'Experiencing Early Global Art and Architecture' },
  { dept: 'ARTHIST', number: '1B',  name: 'How to Look at Art and Why: An Introduction to the History of Western Painting' },
  { dept: 'ARTHIST', number: '2',   name: 'Asian Arts and Cultures' },
  { dept: 'ARTHIST', number: '2B',  name: 'Introduction to Islamic Art' },
  { dept: 'FILMEDIA', number: '4',  name: 'Introduction to Film Study' },
  { dept: 'FILMEDIA', number: '6',  name: 'Media and Mediums' },
];

const DIST_BEFORE_1350: CourseOption[] = [
  { dept: 'ARTHIST', number: '1A',    name: 'Experiencing Early Global Art and Architecture' },
  { dept: 'ARTHIST', number: '2B',    name: 'Introduction to Islamic Art' },
  { dept: 'ARTHIST', number: '100N',  name: 'The Artist in Ancient Greek Society' },
  { dept: 'ARTHIST', number: '101',   name: 'Introduction to Greek Art I: The Archaic Period' },
  { dept: 'ARTHIST', number: '102',   name: 'Introduction to Greek Art II: From the Parthenon to Scopas' },
  { dept: 'ARTHIST', number: '105B',  name: 'Medieval Journeys: Introduction through the Art and Architecture' },
  { dept: 'ARTHIST', number: '106',   name: 'Byzantine Art and Architecture, 300-1453 C.E.' },
  { dept: 'ARTHIST', number: '119',   name: 'Love at First Sight: Visual Desire, Attraction, and the Pleasures of Art' },
  { dept: 'ARTHIST', number: '134',   name: 'Introduction to Early Andean Visual Culture: Interspecies Value and More-than-Human Presence' },
  { dept: 'ARTHIST', number: '139',   name: 'Chinese Buddhist Painting: Visions and Practices' },
  { dept: 'ARTHIST', number: '143A',  name: 'American Architecture' },
  { dept: 'ARTHIST', number: '182B',  name: 'Cultures in Competition: Arts of Song-Era China, 960-1279 CE' },
  { dept: 'ARTHIST', number: '188',   name: 'Imperial Collecting, Patronage, and Taste in China and Japan' },
  { dept: 'ARTHIST', number: '203',   name: 'Artists, Athletes, Courtesans and Crooks' },
  { dept: 'ARTHIST', number: '204',   name: 'Dialogues with the Dead' },
  { dept: 'ARTHIST', number: '205',   name: 'Enchanted Images: Medieval Art and Its Sonic Dimension' },
  { dept: 'ARTHIST', number: '207',   name: 'The Resurrected Body: Animacy in Medieval Art' },
  { dept: 'ARTHIST', number: '208',   name: 'Hagia Sophia' },
  { dept: 'ARTHIST', number: '208A',  name: 'The Dome as an All-Seeing Eye: Theatre of Judgment in Byzantine Art' },
  { dept: 'ARTHIST', number: '208B',  name: 'The Art of Medieval Spain: Muslims, Christians, Jews' },
  { dept: 'ARTHIST', number: '208D',  name: 'Virginity and Power: The Mother of God and Visions of Empire' },
  { dept: 'ARTHIST', number: '209C',  name: 'Medieval Image Theory' },
  { dept: 'ARTHIST', number: '211A',  name: 'Andean Textile Logic: Weaving as Practice and Process in the Precontact Andes' },
  { dept: 'ARTHIST', number: '237',   name: 'The Crusades: A Cultural History' },
  { dept: 'ARTHIST', number: '265A',  name: 'Word and Image' },
  { dept: 'ARTHIST', number: '287A',  name: 'The Japanese Tea Ceremony: The History, Aesthetics, and Politics Behind a National Pastime' },
];

const DIST_1350_1850: CourseOption[] = [
  { dept: 'ARTHIST', number: '1B',    name: 'How to Look at Art and Why: An Introduction to the History of Western Painting' },
  { dept: 'ARTHIST', number: '2B',    name: 'Introduction to Islamic Art' },
  { dept: 'ARTHIST', number: '115',   name: 'The Italian Renaissance, or the Art of Success' },
  { dept: 'ARTHIST', number: '119',   name: 'Love at First Sight: Visual Desire, Attraction, and the Pleasures of Art' },
  { dept: 'ARTHIST', number: '129',   name: 'Fashion' },
  { dept: 'ARTHIST', number: '134',   name: 'Introduction to Early Andean Visual Culture: Interspecies Value and More-than-Human Presence' },
  { dept: 'ARTHIST', number: '139',   name: 'Chinese Buddhist Painting: Visions and Practices' },
  { dept: 'ARTHIST', number: '143A',  name: 'American Architecture' },
  { dept: 'ARTHIST', number: '185',   name: 'Arts of China in the Early Modern World, 1550-1800' },
  { dept: 'ARTHIST', number: '188',   name: 'Imperial Collecting, Patronage, and Taste in China and Japan' },
  { dept: 'ARTHIST', number: '211A',  name: 'Andean Textile Logic: Weaving as Practice and Process in the Precontact Andes' },
  { dept: 'ARTHIST', number: '218A',  name: 'Michelangelo: Gateway to Early Modern Italy' },
  { dept: 'ARTHIST', number: '219',   name: 'Caravaggio, Vermeer, and the Life of Paintings' },
  { dept: 'ARTHIST', number: '225',   name: 'Wonder, Curiosity & Collecting: Building a Stanford Cabinet of Curiosities' },
  { dept: 'ARTHIST', number: '231',   name: "Leonardo's World: Science, Technology, and Art" },
  { dept: 'ARTHIST', number: '238C',  name: 'Art and the Market' },
  { dept: 'ARTHIST', number: '250A',  name: 'Printing Protest: The Artist as Social Critic' },
  { dept: 'ARTHIST', number: '265A',  name: 'Word and Image' },
  { dept: 'ARTHIST', number: '287A',  name: 'The Japanese Tea Ceremony: The History, Aesthetics, and Politics Behind a National Pastime' },
];

const DIST_1850_PRESENT: CourseOption[] = [
  { dept: 'ARTHIST', number: '116',   name: 'The American Civil War: A Ghost Story' },
  { dept: 'ARTHIST', number: '127',   name: 'Nineteenth-Century Visual Culture in Europe: The Art World en masse' },
  { dept: 'ARTHIST', number: '128',   name: 'Modern Africa' },
  { dept: 'ARTHIST', number: '129',   name: 'Fashion' },
  { dept: 'ARTHIST', number: '133',   name: 'Introduction to Global Modern Art' },
  { dept: 'ARTHIST', number: '142',   name: 'Architecture Since 1900' },
  { dept: 'ARTHIST', number: '143A',  name: 'American Architecture' },
  { dept: 'ARTHIST', number: '147',   name: 'Modernism and Modernity' },
  { dept: 'ARTHIST', number: '153',   name: "Warhol's World" },
  { dept: 'ARTHIST', number: '160',   name: 'Censorship in American Art' },
  { dept: 'ARTHIST', number: '163',   name: 'Queer America: Art, Photography, and Politics' },
  { dept: 'ARTHIST', number: '165',   name: 'Vincent van Gogh and His World' },
  { dept: 'ARTHIST', number: '165B',  name: 'American Style and the Rhetoric of Fashion' },
  { dept: 'ARTHIST', number: '168A',  name: 'Creativity & Culture in the Age of AI' },
  { dept: 'ARTHIST', number: '173N',  name: 'Race, Gender, and Sexuality in Contemporary Art' },
  { dept: 'ARTHIST', number: '186B',  name: 'Asian American Art' },
  { dept: 'ARTHIST', number: '188B',  name: 'From Shanghai Modern to Global Contemporary: Frontiers of Modern Chinese Art' },
  { dept: 'ARTHIST', number: '191',   name: 'African American Art' },
  { dept: 'ARTHIST', number: '194',   name: 'U.S. Latinx Art' },
  { dept: 'ARTHIST', number: '217B',  name: 'Design Theory' },
  { dept: 'ARTHIST', number: '225',   name: 'Wonder, Curiosity & Collecting: Building a Stanford Cabinet of Curiosities' },
  { dept: 'ARTHIST', number: '226',   name: 'New Landscapes of China: Ecologies, Media, Imaginaries' },
  { dept: 'ARTHIST', number: '242B',  name: 'Megacities' },
  { dept: 'ARTHIST', number: '245',   name: 'Art, Business & the Law' },
  { dept: 'ARTHIST', number: '246',   name: 'Duchamp Then and Now' },
  { dept: 'ARTHIST', number: '250',   name: 'Cultural Heritage and Urban Space in Cairo and Istanbul' },
  { dept: 'ARTHIST', number: '261',   name: 'Black Aliveness' },
  { dept: 'ARTHIST', number: '264B',  name: 'Starstuff: Space and the American Imagination' },
  { dept: 'ARTHIST', number: '265A',  name: 'Word and Image' },
  { dept: 'ARTHIST', number: '273',   name: 'Couture Culture' },
  { dept: 'ARTHIST', number: '274',   name: 'Wonder: The Event of Art and Literature' },
  { dept: 'ARTHIST', number: '274A',  name: 'The Art of the Uncanny' },
  { dept: 'ARTHIST', number: '284',   name: 'Material Metonymy: Ceramics and Asian America' },
  { dept: 'ARTHIST', number: '284B',  name: 'Introduction to Museum Practice' },
  { dept: 'ARTHIST', number: '287A',  name: 'The Japanese Tea Ceremony: The History, Aesthetics, and Politics Behind a National Pastime' },
  { dept: 'ARTHIST', number: '291',   name: 'Riot: Visualizing Civil Unrest in the 20th and 21st Centuries' },
  { dept: 'ARTHIST', number: '293A',  name: 'Latin American Art and Literature: 100 Years of Modernisms' },
  { dept: 'FILMEDIA', number: '4',    name: 'Introduction to Film Study' },
  { dept: 'FILMEDIA', number: '4S',   name: 'Language of Film' },
  { dept: 'FILMEDIA', number: '6',    name: 'Media and Mediums' },
  { dept: 'FILMEDIA', number: '50Q',  name: 'The Video Essay: Writing with Video about Media and Culture' },
  { dept: 'FILMEDIA', number: '100A', name: 'History of World Cinema I: Silent Film' },
  { dept: 'FILMEDIA', number: '100B', name: 'History of World Cinema II: Film as Industrial Art' },
  { dept: 'FILMEDIA', number: '100C', name: 'History of World Cinema III: Queer Cinema around the World' },
  { dept: 'FILMEDIA', number: '101',  name: 'Close Cinematic Analysis: Caste, Sexuality, and Religion in Indian Media' },
  { dept: 'FILMEDIA', number: '102',  name: 'Theories of the Moving Image: The Technologically Mediated Image' },
  { dept: 'FILMEDIA', number: '110N', name: 'Coming-of-Age Movies' },
  { dept: 'FILMEDIA', number: '112',  name: 'Women in Contemporary French and Francophone Cinema' },
  { dept: 'FILMEDIA', number: '114',  name: 'Reading Comics' },
  { dept: 'FILMEDIA', number: '120',  name: 'Superhero Theory' },
  { dept: 'FILMEDIA', number: '132A', name: 'Bollywood and Beyond: An Introduction to Indian Cinema' },
  { dept: 'FILMEDIA', number: '132B', name: 'From State Propaganda to COVID-19 Contract-Tracing: Korean Media and Culture' },
  { dept: 'FILMEDIA', number: '135',  name: 'Around the World in Ten Films' },
  { dept: 'FILMEDIA', number: '152',  name: 'Hollywood/Bollywood: The Musical Two Ways' },
  { dept: 'FILMEDIA', number: '173',  name: 'Digital and Interactive Media' },
  { dept: 'FILMEDIA', number: '178',  name: 'Film and History of Latin American Revolutions and Counterrevolutions' },
  { dept: 'FILMEDIA', number: '223',  name: 'How to Watch TV' },
  { dept: 'FILMEDIA', number: '224',  name: 'Films of Stanley Kubrick' },
  { dept: 'FILMEDIA', number: '253',  name: 'Aesthetics and Phenomenology' },
  { dept: 'FILMEDIA', number: '270',  name: 'German Media Theory' },
  { dept: 'FILMEDIA', number: '290',  name: "Movies and Methods: Coming-of-Age & Youth Films" },
];

const DIST_ASIA_AFRICA_ISLAMIC: CourseOption[] = [
  { dept: 'ARTHIST', number: '1A',    name: 'Experiencing Early Global Art and Architecture' },
  { dept: 'ARTHIST', number: '2',     name: 'Asian Arts and Cultures' },
  { dept: 'ARTHIST', number: '2B',    name: 'Introduction to Islamic Art' },
  { dept: 'ARTHIST', number: '105B',  name: 'Medieval Journeys: Introduction through the Art and Architecture' },
  { dept: 'ARTHIST', number: '128',   name: 'Modern Africa' },
  { dept: 'ARTHIST', number: '133',   name: 'Introduction to Global Modern Art' },
  { dept: 'ARTHIST', number: '139',   name: 'Chinese Buddhist Painting: Visions and Practices' },
  { dept: 'ARTHIST', number: '164',   name: 'History of World Cinema III: Queer Cinema around the World' },
  { dept: 'ARTHIST', number: '182B',  name: 'Cultures in Competition: Arts of Song-Era China, 960-1279 CE' },
  { dept: 'ARTHIST', number: '185',   name: 'Arts of China in the Early Modern World, 1550-1800' },
  { dept: 'ARTHIST', number: '188B',  name: 'From Shanghai Modern to Global Contemporary: Frontiers of Modern Chinese Art' },
  { dept: 'ARTHIST', number: '209C',  name: 'Medieval Image Theory' },
  { dept: 'ARTHIST', number: '226',   name: 'New Landscapes of China: Ecologies, Media, Imaginaries' },
  { dept: 'ARTHIST', number: '230B',  name: 'Image and Text in the Arts in China' },
  { dept: 'ARTHIST', number: '237',   name: 'The Crusades: A Cultural History' },
  { dept: 'ARTHIST', number: '242B',  name: 'Megacities' },
  { dept: 'ARTHIST', number: '250',   name: 'Cultural Heritage and Urban Space in Cairo and Istanbul' },
  { dept: 'ARTHIST', number: '287A',  name: 'The Japanese Tea Ceremony: The History, Aesthetics, and Politics Behind a National Pastime' },
];

const DIST_EUROPE: CourseOption[] = [
  { dept: 'ARTHIST', number: '1A',    name: 'Experiencing Early Global Art and Architecture' },
  { dept: 'ARTHIST', number: '1B',    name: 'How to Look at Art and Why: An Introduction to the History of Western Painting' },
  { dept: 'ARTHIST', number: '100N',  name: 'The Artist in Ancient Greek Society' },
  { dept: 'ARTHIST', number: '101',   name: 'Introduction to Greek Art I: The Archaic Period' },
  { dept: 'ARTHIST', number: '102',   name: 'Introduction to Greek Art II: From the Parthenon to Scopas' },
  { dept: 'ARTHIST', number: '105B',  name: 'Medieval Journeys: Introduction through the Art and Architecture' },
  { dept: 'ARTHIST', number: '106',   name: 'Byzantine Art and Architecture, 300-1453 C.E.' },
  { dept: 'ARTHIST', number: '110',   name: 'French Painting from Watteau to Monet' },
  { dept: 'ARTHIST', number: '115',   name: 'The Italian Renaissance, or the Art of Success' },
  { dept: 'ARTHIST', number: '116N',  name: 'Making Sense of the World: Art, Medicine, and Science in Venice' },
  { dept: 'ARTHIST', number: '119',   name: 'Love at First Sight: Visual Desire, Attraction, and the Pleasures of Art' },
  { dept: 'ARTHIST', number: '127',   name: 'Nineteenth-Century Visual Culture in Europe: The Art World en masse' },
  { dept: 'ARTHIST', number: '129',   name: 'Fashion' },
  { dept: 'ARTHIST', number: '133',   name: 'Introduction to Global Modern Art' },
  { dept: 'ARTHIST', number: '147',   name: 'Modernism and Modernity' },
  { dept: 'ARTHIST', number: '164',   name: 'History of World Cinema III: Queer Cinema around the World' },
  { dept: 'ARTHIST', number: '165',   name: 'Vincent van Gogh and His World' },
  { dept: 'ARTHIST', number: '168A',  name: 'Creativity & Culture in the Age of AI' },
  { dept: 'ARTHIST', number: '203',   name: 'Artists, Athletes, Courtesans and Crooks' },
  { dept: 'ARTHIST', number: '205',   name: 'Enchanted Images: Medieval Art and Its Sonic Dimension' },
  { dept: 'ARTHIST', number: '207',   name: 'The Resurrected Body: Animacy in Medieval Art' },
  { dept: 'ARTHIST', number: '208',   name: 'Hagia Sophia' },
  { dept: 'ARTHIST', number: '208A',  name: 'The Dome as an All-Seeing Eye: Theatre of Judgment in Byzantine Art' },
  { dept: 'ARTHIST', number: '208B',  name: 'The Art of Medieval Spain: Muslims, Christians, Jews' },
  { dept: 'ARTHIST', number: '208D',  name: 'Virginity and Power: The Mother of God and Visions of Empire' },
  { dept: 'ARTHIST', number: '209C',  name: 'Medieval Image Theory' },
  { dept: 'ARTHIST', number: '218A',  name: 'Michelangelo: Gateway to Early Modern Italy' },
  { dept: 'ARTHIST', number: '219',   name: 'Caravaggio, Vermeer, and the Life of Paintings' },
  { dept: 'ARTHIST', number: '231',   name: "Leonardo's World: Science, Technology, and Art" },
  { dept: 'ARTHIST', number: '238C',  name: 'Art and the Market' },
  { dept: 'ARTHIST', number: '242B',  name: 'Megacities' },
  { dept: 'ARTHIST', number: '246',   name: 'Duchamp Then and Now' },
  { dept: 'ARTHIST', number: '250A',  name: 'Printing Protest: The Artist as Social Critic' },
  { dept: 'ARTHIST', number: '265A',  name: 'Word and Image' },
  { dept: 'ARTHIST', number: '273',   name: 'Couture Culture' },
  { dept: 'ARTHIST', number: '274',   name: 'Wonder: The Event of Art and Literature' },
];

const DIST_AMERICAS: CourseOption[] = [
  { dept: 'ARTHIST', number: '116',   name: 'The American Civil War: A Ghost Story' },
  { dept: 'ARTHIST', number: '129',   name: 'Fashion' },
  { dept: 'ARTHIST', number: '133',   name: 'Introduction to Global Modern Art' },
  { dept: 'ARTHIST', number: '134',   name: 'Introduction to Early Andean Visual Culture: Interspecies Value and More-than-Human Presence' },
  { dept: 'ARTHIST', number: '143A',  name: 'American Architecture' },
  { dept: 'ARTHIST', number: '160',   name: 'Censorship in American Art' },
  { dept: 'ARTHIST', number: '164',   name: 'History of World Cinema III: Queer Cinema around the World' },
  { dept: 'ARTHIST', number: '165B',  name: 'American Style and the Rhetoric of Fashion' },
  { dept: 'ARTHIST', number: '168A',  name: 'Creativity & Culture in the Age of AI' },
  { dept: 'ARTHIST', number: '186B',  name: 'Asian American Art' },
  { dept: 'ARTHIST', number: '191',   name: 'African American Art' },
  { dept: 'ARTHIST', number: '194',   name: 'U.S. Latinx Art' },
  { dept: 'ARTHIST', number: '207E',  name: 'Sacred Play: The Material Culture of Christian Festivals' },
  { dept: 'ARTHIST', number: '211A',  name: 'Andean Textile Logic: Weaving as Practice and Process in the Precontact Andes' },
  { dept: 'ARTHIST', number: '242B',  name: 'Megacities' },
  { dept: 'ARTHIST', number: '245',   name: 'Art, Business & the Law' },
  { dept: 'ARTHIST', number: '246',   name: 'Duchamp Then and Now' },
  { dept: 'ARTHIST', number: '250A',  name: 'Printing Protest: The Artist as Social Critic' },
  { dept: 'ARTHIST', number: '261',   name: 'Black Aliveness' },
  { dept: 'ARTHIST', number: '264B',  name: 'Starstuff: Space and the American Imagination' },
  { dept: 'ARTHIST', number: '273',   name: 'Couture Culture' },
  { dept: 'ARTHIST', number: '284B',  name: 'Introduction to Museum Practice' },
  { dept: 'ARTHIST', number: '291',   name: 'Riot: Visualizing Civil Unrest in the 20th and 21st Centuries' },
  { dept: 'ARTHIST', number: '293',   name: 'Black and Brown: American Artists of Color' },
];

export const ARTHIST_BA_2526: MajorConfig = {
  id: 'arthist-ba-2526',
  name: 'Art History (BA)',
  school: 'Department of Art & Art History',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/ARTHS-BA/',
  category: 'major',
  totalMinUnits: 65,

  wimCourses: [
    { dept: 'ARTHIST', number: '294', name: 'Writing and the Visual: The Art of Art Writing' },
  ],

  sections: [
    // ── Core Required Courses ─────────────────────────────────────────────────
    {
      id: 'core',
      name: 'Core Required Courses',
      note: 'All courses must be taken for a letter grade. ARTHIST 294 satisfies WIM. ARTHIST 296 is the capstone junior seminar (offered annually, typically autumn). Completing a full year of ITALIC or SLE counts as one Art History elective.',
      slots: [
        {
          id: 'arthist5',
          label: 'ARTHIST 5: Art and Power (Cornerstone, 5 units)',
          type: 'required',
          options: [{ dept: 'ARTHIST', number: '5', name: 'Art and Power' }],
        },
        {
          id: 'art-practice',
          label: 'Art Practice Course: Any 4-unit introductory (100-level) Art Practice course',
          type: 'any-approved',
          options: [],
          note: 'Any 4-unit, 100-level Art Practice course satisfies this requirement. Check with your advisor for the current list of qualifying courses.',
        },
        {
          id: 'arthist294',
          label: 'ARTHIST 294: Writing and the Visual: The Art of Art Writing (WIM, 5 units)',
          type: 'required',
          note: 'Designed for Art History majors in their junior year. Satisfies Writing in the Major (WIM).',
          options: [{ dept: 'ARTHIST', number: '294', name: 'Writing and the Visual: The Art of Art Writing' }],
        },
        {
          id: 'arthist296',
          label: 'ARTHIST 296: Junior Seminar: Methods & Historiography of Art History (Capstone, 5 units)',
          type: 'required',
          note: 'Introduces majors to methods and theories underlying art history. Offered annually, typically autumn quarter.',
          options: [{ dept: 'ARTHIST', number: '296', name: 'Junior Seminar: Methods & Historiography of Art History' }],
        },
        {
          id: 'library-orient',
          label: 'Art and Architecture Library Orientation',
          type: 'manual',
          options: [],
          note: 'Required before the quarter following major declaration. Introduced by professional staff of the Art and Architecture Library: introduces tools of research and reference on campus and online.',
        },
      ],
    },

    // ── Survey Courses (≥3) ───────────────────────────────────────────────────
    {
      id: 'survey',
      name: 'Survey Courses (choose ≥3)',
      minCourses: 3,
      note: 'Take at least 3 survey courses. One FILMEDIA course is required for the major: FILMEDIA 4 here satisfies that requirement. Survey courses may also count toward Distribution Categories below.',
      slots: [
        {
          id: 'survey-courses',
          label: 'Survey Courses',
          type: 'pick-from-list',
          count: 3,
          options: SURVEY_COURSES,
        },
      ],
    },

    // ── Area of Concentration ─────────────────────────────────────────────────
    {
      id: 'concentration',
      name: 'Area of Concentration (3 ARTHIST courses)',
      minCourses: 3,
      note: 'Design an advisor-approved concentration: 3 ARTHIST courses: at least 1 must be a seminar (200-level), and 2 of the 3 must be in a single coherent field/concentration. Submit concentration form (signed by faculty advisor, approved by Director of UGS) by winter quarter of junior year. Concentration does NOT appear on transcript or diploma. Examples of concentrations: historical (ancient/medieval, early modern, modern/contemporary); topical (art & gender, art & race, environmental art history); genre (painting, sculpture, architecture); geographic (Asia, Africa, Europe, Americas); interdisciplinary (art & literature, art & religion).',
      slots: [
        {
          id: 'conc-seminar',
          label: 'Concentration Seminar (200-level ARTHIST)',
          type: 'any-approved',
          options: [],
          note: 'At least one concentration course must be a seminar (typically 200-level). Approved by faculty advisor.',
        },
        {
          id: 'conc-course2',
          label: 'Concentration Course 2 (ARTHIST)',
          type: 'any-approved',
          options: [],
          note: 'Must be in the same field/concentration as one other concentration course.',
        },
        {
          id: 'conc-course3',
          label: 'Concentration Course 3 (ARTHIST)',
          type: 'any-approved',
          options: [],
          note: '2 of your 3 concentration courses must be in the same concentration field.',
        },
      ],
    },

    // ── Temporal Distribution: Before 1350 (≥2) ─────────────────────────────
    {
      id: 'dist-before-1350',
      name: 'Temporal Distribution: Before 1350 (≥2 courses)',
      minCourses: 2,
      doubleCountGroup: 'temporal',
      note: 'Take ≥2 courses in this temporal category. Each course simultaneously satisfies ONE temporal and ONE geographic category: a single course cannot satisfy multiple temporal or multiple geographic requirements. Survey and concentration courses may count here.',
      slots: [
        {
          id: 'dist-pre1350',
          label: 'Before 1350 Courses',
          type: 'pick-from-list',
          count: 2,
          options: DIST_BEFORE_1350,
        },
      ],
    },

    // ── Temporal Distribution: 1350-1850 (≥2) ───────────────────────────────
    {
      id: 'dist-1350-1850',
      name: 'Temporal Distribution: 1350–1850 (≥2 courses)',
      minCourses: 2,
      doubleCountGroup: 'temporal',
      note: 'Take ≥2 courses in this temporal period. Survey and concentration courses may count here.',
      slots: [
        {
          id: 'dist-1350',
          label: '1350–1850 Courses',
          type: 'pick-from-list',
          count: 2,
          options: DIST_1350_1850,
        },
      ],
    },

    // ── Temporal Distribution: 1850 to Present (≥2) ─────────────────────────
    {
      id: 'dist-1850-present',
      name: 'Temporal Distribution: 1850 to Present (≥2 courses)',
      minCourses: 2,
      doubleCountGroup: 'temporal',
      note: 'Take ≥2 courses in this temporal period. Includes FILMEDIA courses. One FILMEDIA course is required for the major: any FILMEDIA course listed here satisfies it. Survey and concentration courses may count here.',
      slots: [
        {
          id: 'dist-1850',
          label: '1850-to-Present Courses',
          type: 'pick-from-list',
          count: 2,
          options: DIST_1850_PRESENT,
        },
      ],
    },

    // ── Geographic Distribution: Asia/Africa/Islamic (≥2) ───────────────────
    {
      id: 'dist-asia-africa',
      name: 'Geographic Distribution: Asia/Africa/Islamic (≥2 courses)',
      minCourses: 2,
      doubleCountGroup: 'geographic',
      note: 'Take ≥2 courses in this geographic category. A course satisfies ONE temporal + ONE geographic requirement simultaneously. Survey and concentration courses may count here.',
      slots: [
        {
          id: 'dist-asia',
          label: 'Asia/Africa/Islamic Courses',
          type: 'pick-from-list',
          count: 2,
          options: DIST_ASIA_AFRICA_ISLAMIC,
        },
      ],
    },

    // ── Geographic Distribution: Europe (≥2) ────────────────────────────────
    {
      id: 'dist-europe',
      name: 'Geographic Distribution: Europe (≥2 courses)',
      minCourses: 2,
      doubleCountGroup: 'geographic',
      note: 'Take ≥2 courses covering European art and architecture. Survey and concentration courses may count here.',
      slots: [
        {
          id: 'dist-eur',
          label: 'Europe Courses',
          type: 'pick-from-list',
          count: 2,
          options: DIST_EUROPE,
        },
      ],
    },

    // ── Geographic Distribution: The Americas (≥2) ───────────────────────────
    {
      id: 'dist-americas',
      name: 'Geographic Distribution: The Americas (≥2 courses)',
      minCourses: 2,
      doubleCountGroup: 'geographic',
      note: 'Take ≥2 courses covering the Americas. Survey and concentration courses may count here.',
      slots: [
        {
          id: 'dist-amer',
          label: 'The Americas Courses',
          type: 'pick-from-list',
          count: 2,
          options: DIST_AMERICAS,
        },
      ],
    },

    // ── Additional Electives (to reach 15 courses / 65 units) ─────────────────
    {
      id: 'electives',
      name: 'Additional Electives (to reach 15 courses / 65 units)',
      note: 'After fulfilling all named requirements, take additional ARTHIST or FILMEDIA courses to reach 15 total courses and 65 units. A full year of ITALIC or SLE counts as one Art History elective. ARTHIST 1A–2B, FILMEDIA 4/6 (survey courses) and distribution courses that have not yet been used may count here. All courses must be taken for a letter grade.',
      slots: [
        {
          id: 'elec-courses',
          label: 'Additional ARTHIST/FILMEDIA Electives',
          type: 'any-approved',
          options: [],
        },
      ],
    },
  ],
};
