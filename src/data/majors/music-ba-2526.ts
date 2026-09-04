// Music BA, Department of Music, 2025-2026
// Source: https://bulletin.stanford.edu/programs/MUSIC-BA/
// totalMinUnits: 62 (≈42 shared core + 20 concentration)
// 11 subplans; subplan appears on transcript/diploma
// WIM: any MUSIC 141-148 course taken for ≥4 units
// Capstone: MUSIC 198 (details vary by subplan)
// Core breadth courses may NOT double-count toward concentration requirements
// MUSIC 21-23 should be completed no later than autumn of junior year
// Must earn 2.0 GPA overall; all required courses for letter grade

import type { MajorConfig, CourseOption } from '../majorSchema';

// ── Shared course lists ───────────────────────────────────────────────────────

const THEORY_ANALYSIS_UD: CourseOption[] = [
  { dept: 'MUSIC', number: '122A', name: 'Counterpoint' },
  { dept: 'MUSIC', number: '122B', name: 'Analysis of Tonal Music' },
  { dept: 'MUSIC', number: '122C', name: 'Introduction to Post-Tonal Analysis' },
];

const COMP_MST_ORCH: CourseOption[] = [
  { dept: 'MUSIC', number: '20C',  name: 'Jazz Arranging and Composition' },
  { dept: 'MUSIC', number: '101',  name: 'Introduction to Creating Electronic Sounds' },
  { dept: 'MUSIC', number: '112',  name: 'Film Scoring' },
  { dept: 'MUSIC', number: '113',  name: 'Introduction to Instrumental Composition' },
  { dept: 'MUSIC', number: '120E', name: 'Advanced Jazz Improvisation' },
  { dept: 'MUSIC', number: '123A', name: 'Undergraduate Seminar in Composition: Rhythmic Design' },
  { dept: 'MUSIC', number: '123B', name: 'Undergraduate Seminar in Composition: Pitch Design' },
  { dept: 'MUSIC', number: '123C', name: 'Undergraduate Seminar in Composition: World Music' },
  { dept: 'MUSIC', number: '124A', name: 'Songwriters Workshop' },
  { dept: 'MUSIC', number: '124B', name: 'Songwriters Workshop (Advanced)' },
  { dept: 'MUSIC', number: '125',  name: 'First Individual Undergraduate Projects in Composition I' },
  { dept: 'MUSIC', number: '127A', name: 'Instrumentation and Orchestration' },
  { dept: 'MUSIC', number: '127B', name: 'Advanced Orchestration' },
  { dept: 'MUSIC', number: '127C', name: 'Band Arranging' },
  { dept: 'MUSIC', number: '128',  name: 'Stanford Laptop Orchestra: Composition, Coding, and Performance' },
  { dept: 'MUSIC', number: '155',  name: 'Intermedia Workshop' },
  { dept: 'MUSIC', number: '158',  name: 'Musical Acoustics' },
  { dept: 'MUSIC', number: '192A', name: 'Foundations of Sound-Recording Technology' },
  { dept: 'MUSIC', number: '192B', name: 'Advanced Sound Recording Technology' },
  { dept: 'MUSIC', number: '192C', name: 'Session Recording' },
  { dept: 'MUSIC', number: '192F', name: 'Sound Installation' },
  { dept: 'MUSIC', number: '220A', name: 'Fundamentals of Computer-Generated Sound' },
  { dept: 'MUSIC', number: '220B', name: 'Compositional Algorithms, Psychoacoustics, and Computational Music' },
  { dept: 'MUSIC', number: '220C', name: 'Research Seminar in Computer-Generated Music' },
  { dept: 'MUSIC', number: '220D', name: 'Research in Computer-Generated Music' },
  { dept: 'MUSIC', number: '223B', name: 'Sonic Experiments in Composition' },
  { dept: 'MUSIC', number: '250A', name: 'Physical Interaction Design for Music' },
  { dept: 'MUSIC', number: '250C', name: 'Interaction - Intermedia - Immersion' },
  { dept: 'MUSIC', number: '256A', name: 'Music, Computing, Design: The Art of Design' },
];

const PERFORMANCE_COURSES: CourseOption[] = [
  { dept: 'MUSIC', number: '126A', name: 'Thoroughbass Accompaniment' },
  { dept: 'MUSIC', number: '128',  name: 'Stanford Laptop Orchestra: Composition, Coding, and Performance' },
  { dept: 'MUSIC', number: '130B', name: 'Elementary Instrumental Conducting' },
  { dept: 'MUSIC', number: '130C', name: 'Elementary Choral Conducting' },
  { dept: 'MUSIC', number: '156',  name: '"sic": Improvisation Collective' },
  { dept: 'MUSIC', number: '157',  name: 'Cardinal Calypso--Steelpan Ensemble' },
  { dept: 'MUSIC', number: '159',  name: 'Early Music Singers' },
  { dept: 'MUSIC', number: '160',  name: 'Stanford Symphony Orchestra' },
  { dept: 'MUSIC', number: '160A', name: 'Stanford Philharmonia' },
  { dept: 'MUSIC', number: '160B', name: 'Stanford New Ensemble' },
  { dept: 'MUSIC', number: '160C', name: 'Stanford Baroque Soloists' },
  { dept: 'MUSIC', number: '161A', name: 'Stanford Wind Symphony' },
  { dept: 'MUSIC', number: '161B', name: 'Jazz Orchestra' },
  { dept: 'MUSIC', number: '161E', name: 'Stanford Afro-Latin Jazz Orchestra' },
  { dept: 'MUSIC', number: '162',  name: 'Symphonic Chorus' },
  { dept: 'MUSIC', number: '163',  name: 'Memorial Church Choir' },
  { dept: 'MUSIC', number: '165',  name: 'Chamber Chorale' },
  { dept: 'MUSIC', number: '167',  name: 'University Singers' },
  { dept: 'MUSIC', number: '170',  name: 'Collaborative Piano' },
  { dept: 'MUSIC', number: '171',  name: 'Chamber Music' },
  { dept: 'MUSIC', number: '172A', name: 'Piano' },
  { dept: 'MUSIC', number: '172B', name: 'Organ' },
  { dept: 'MUSIC', number: '172C', name: 'Harpsichord' },
  { dept: 'MUSIC', number: '172D', name: 'Jazz Piano' },
  { dept: 'MUSIC', number: '172F', name: 'Carillon' },
  { dept: 'MUSIC', number: '172G', name: 'Gu-Zheng' },
  { dept: 'MUSIC', number: '173',  name: 'Voice' },
  { dept: 'MUSIC', number: '174A', name: 'Violin' },
  { dept: 'MUSIC', number: '174B', name: 'Viola' },
  { dept: 'MUSIC', number: '174C', name: 'Violoncello' },
  { dept: 'MUSIC', number: '174D', name: 'Contrabass' },
  { dept: 'MUSIC', number: '174F', name: 'Classical Guitar' },
  { dept: 'MUSIC', number: '174G', name: 'Harp' },
  { dept: 'MUSIC', number: '175A', name: 'Flute' },
  { dept: 'MUSIC', number: '175B', name: 'Oboe' },
  { dept: 'MUSIC', number: '175C', name: 'Clarinet' },
  { dept: 'MUSIC', number: '175D', name: 'Bassoon' },
  { dept: 'MUSIC', number: '175E', name: 'Recorder/Early Winds' },
  { dept: 'MUSIC', number: '175F', name: 'Saxophone' },
  { dept: 'MUSIC', number: '175G', name: 'Baroque Flute' },
  { dept: 'MUSIC', number: '175H', name: 'Jazz Saxophone' },
  { dept: 'MUSIC', number: '176A', name: 'French Horn' },
  { dept: 'MUSIC', number: '176B', name: 'Trumpet' },
  { dept: 'MUSIC', number: '176C', name: 'Trombone' },
  { dept: 'MUSIC', number: '176D', name: 'Tuba' },
  { dept: 'MUSIC', number: '176E', name: 'Jazz Trumpet' },
  { dept: 'MUSIC', number: '177',  name: 'Percussion' },
  { dept: 'MUSIC', number: '177A', name: 'Drum Set Lessons' },
  { dept: 'MUSIC', number: '183A', name: 'German Art Song Interpretation' },
  { dept: 'MUSIC', number: '183B', name: 'French Art Song Interpretation' },
  { dept: 'MUSIC', number: '183C', name: 'Interpretation of Musical Theater Repertoire' },
  { dept: 'MUSIC', number: '183D', name: 'Musical Theater' },
  { dept: 'MUSIC', number: '183E', name: 'Singing for Musicals' },
  { dept: 'MUSIC', number: '184A', name: 'Editing and Performing Early Music' },
  { dept: 'MUSIC', number: '184B', name: 'Topics on the Musical Stage' },
  { dept: 'MUSIC', number: '184C', name: 'Dramatic Vocal Arts: Songs and Scenes Onstage' },
  { dept: 'MUSIC', number: '272A', name: 'Piano for Music Majors/Minors' },
  { dept: 'MUSIC', number: '272B', name: 'Organ for Music Majors/Minors' },
  { dept: 'MUSIC', number: '272C', name: 'Harpsichord for Music Majors/Minors' },
  { dept: 'MUSIC', number: '272F', name: 'Carillon for Music Majors/Minors' },
  { dept: 'MUSIC', number: '272G', name: 'Gu-Zheng for Music Majors/Minors' },
  { dept: 'MUSIC', number: '273',  name: 'Voice for Music Majors/Minors' },
  { dept: 'MUSIC', number: '274A', name: 'Violin for Music Majors/Minors' },
  { dept: 'MUSIC', number: '274B', name: 'Viola for Music Majors/Minors' },
  { dept: 'MUSIC', number: '274C', name: 'Violoncello for Music Majors/Minors' },
  { dept: 'MUSIC', number: '274D', name: 'Contrabass for Music Majors/Minors' },
  { dept: 'MUSIC', number: '274F', name: 'Advanced Classical Guitar' },
  { dept: 'MUSIC', number: '274G', name: 'Advanced Harp' },
  { dept: 'MUSIC', number: '274H', name: 'Advanced Baroque Violin' },
  { dept: 'MUSIC', number: '274I', name: 'Jazz Bass for Music Majors/Minors' },
  { dept: 'MUSIC', number: '274J', name: 'Jazz & Contemporary Guitar for Music Majors/Minors' },
  { dept: 'MUSIC', number: '275A', name: 'Flute for Music Majors/Minors' },
  { dept: 'MUSIC', number: '275B', name: 'Oboe for Music Majors/Minors' },
  { dept: 'MUSIC', number: '275C', name: 'Clarinet for Music Majors/Minors' },
  { dept: 'MUSIC', number: '275D', name: 'Bassoon for Music Majors/Minors' },
  { dept: 'MUSIC', number: '275E', name: 'Recorder/Early Winds for Music Majors/Minors' },
  { dept: 'MUSIC', number: '275F', name: 'Saxophone for Music Majors/Minors' },
  { dept: 'MUSIC', number: '275G', name: 'Baroque Flute for Music Majors/Minors' },
  { dept: 'MUSIC', number: '275H', name: 'Jazz Saxophone for Music Majors/Minors' },
  { dept: 'MUSIC', number: '276A', name: 'French Horn for Music Majors/Minors' },
  { dept: 'MUSIC', number: '276B', name: 'Trumpet for Music Majors/Minors' },
  { dept: 'MUSIC', number: '276C', name: 'Trombone for Music Majors/Minors' },
  { dept: 'MUSIC', number: '276D', name: 'Tuba for Music Majors/Minors' },
  { dept: 'MUSIC', number: '276E', name: 'Jazz Trumpet for Music Majors/Minors' },
  { dept: 'MUSIC', number: '277',  name: 'Percussion for Music Majors/Minors' },
  { dept: 'MUSIC', number: '277A', name: 'Drum Set for Music Majors/Minors' },
];

// Ensemble courses used in Conducting and Musicology/Perf tracks
const LARGE_ENSEMBLES: CourseOption[] = [
  { dept: 'MUSIC', number: '159',  name: 'Early Music Singers' },
  { dept: 'MUSIC', number: '160',  name: 'Stanford Symphony Orchestra' },
  { dept: 'MUSIC', number: '160A', name: 'Stanford Philharmonia' },
  { dept: 'MUSIC', number: '161A', name: 'Stanford Wind Symphony' },
  { dept: 'MUSIC', number: '161B', name: 'Jazz Orchestra' },
  { dept: 'MUSIC', number: '162',  name: 'Symphonic Chorus' },
  { dept: 'MUSIC', number: '163',  name: 'Memorial Church Choir' },
  { dept: 'MUSIC', number: '165',  name: 'Chamber Chorale' },
  { dept: 'MUSIC', number: '167',  name: 'University Singers' },
  { dept: 'MUSIC', number: '171',  name: 'Chamber Music' },
];

// Keyboard private lessons
const KEYBOARD_LESSONS: CourseOption[] = [
  { dept: 'MUSIC', number: '172A', name: 'Piano' },
  { dept: 'MUSIC', number: '172B', name: 'Organ' },
  { dept: 'MUSIC', number: '172C', name: 'Harpsichord' },
  { dept: 'MUSIC', number: '172E', name: 'Fortepiano' },
  { dept: 'MUSIC', number: '272A', name: 'Piano for Music Majors/Minors' },
  { dept: 'MUSIC', number: '272B', name: 'Organ for Music Majors/Minors' },
  { dept: 'MUSIC', number: '272C', name: 'Harpsichord for Music Majors/Minors' },
];

// String private lessons
const STRING_LESSONS: CourseOption[] = [
  { dept: 'MUSIC', number: '174A', name: 'Violin' },
  { dept: 'MUSIC', number: '174B', name: 'Viola' },
  { dept: 'MUSIC', number: '174C', name: 'Violoncello' },
  { dept: 'MUSIC', number: '174D', name: 'Contrabass' },
  { dept: 'MUSIC', number: '174E', name: 'Viola Da Gamba' },
  { dept: 'MUSIC', number: '174F', name: 'Classical Guitar' },
  { dept: 'MUSIC', number: '174G', name: 'Harp' },
  { dept: 'MUSIC', number: '174H', name: 'Baroque Violin' },
  { dept: 'MUSIC', number: '174I', name: 'Jazz Bass' },
  { dept: 'MUSIC', number: '174J', name: 'Jazz & Contemporary Guitar' },
  { dept: 'MUSIC', number: '274A', name: 'Violin for Music Majors/Minors' },
  { dept: 'MUSIC', number: '274B', name: 'Viola for Music Majors/Minors' },
  { dept: 'MUSIC', number: '274C', name: 'Violoncello for Music Majors/Minors' },
  { dept: 'MUSIC', number: '274D', name: 'Contrabass for Music Majors/Minors' },
  { dept: 'MUSIC', number: '274E', name: 'Advanced Viola da Gamba' },
  { dept: 'MUSIC', number: '274F', name: 'Advanced Classical Guitar' },
  { dept: 'MUSIC', number: '274G', name: 'Advanced Harp' },
  { dept: 'MUSIC', number: '274H', name: 'Advanced Baroque Violin' },
  { dept: 'MUSIC', number: '274I', name: 'Jazz Bass for Music Majors/Minors' },
  { dept: 'MUSIC', number: '274J', name: 'Jazz & Contemporary Guitar for Music Majors/Minors' },
];

// WBP private lessons
const WBP_LESSONS: CourseOption[] = [
  { dept: 'MUSIC', number: '175A', name: 'Flute' },
  { dept: 'MUSIC', number: '175B', name: 'Oboe' },
  { dept: 'MUSIC', number: '175C', name: 'Clarinet' },
  { dept: 'MUSIC', number: '175D', name: 'Bassoon' },
  { dept: 'MUSIC', number: '175E', name: 'Recorder/Early Winds' },
  { dept: 'MUSIC', number: '175F', name: 'Saxophone' },
  { dept: 'MUSIC', number: '175G', name: 'Baroque Flute' },
  { dept: 'MUSIC', number: '175H', name: 'Jazz Saxophone' },
  { dept: 'MUSIC', number: '176A', name: 'French Horn' },
  { dept: 'MUSIC', number: '176B', name: 'Trumpet' },
  { dept: 'MUSIC', number: '176C', name: 'Trombone' },
  { dept: 'MUSIC', number: '176D', name: 'Tuba' },
  { dept: 'MUSIC', number: '176E', name: 'Jazz Trumpet' },
  { dept: 'MUSIC', number: '177',  name: 'Percussion' },
  { dept: 'MUSIC', number: '177A', name: 'Drum Set Lessons' },
  { dept: 'MUSIC', number: '275A', name: 'Flute for Music Majors/Minors' },
  { dept: 'MUSIC', number: '275B', name: 'Oboe for Music Majors/Minors' },
  { dept: 'MUSIC', number: '275C', name: 'Clarinet for Music Majors/Minors' },
  { dept: 'MUSIC', number: '275D', name: 'Bassoon for Music Majors/Minors' },
  { dept: 'MUSIC', number: '275E', name: 'Recorder/Early Winds for Music Majors/Minors' },
  { dept: 'MUSIC', number: '275F', name: 'Saxophone for Music Majors/Minors' },
  { dept: 'MUSIC', number: '275G', name: 'Baroque Flute for Music Majors/Minors' },
  { dept: 'MUSIC', number: '276A', name: 'French Horn for Music Majors/Minors' },
  { dept: 'MUSIC', number: '276B', name: 'Trumpet for Music Majors/Minors' },
  { dept: 'MUSIC', number: '276C', name: 'Trombone for Music Majors/Minors' },
  { dept: 'MUSIC', number: '276D', name: 'Tuba for Music Majors/Minors' },
  { dept: 'MUSIC', number: '276E', name: 'Jazz Trumpet for Music Majors/Minors' },
  { dept: 'MUSIC', number: '277',  name: 'Percussion for Music Majors/Minors' },
  { dept: 'MUSIC', number: '277A', name: 'Drum Set for Music Majors/Minors' },
];

// Musicology/Ethnomusicology + Performance: extended performance list
const MUSETHNO_PERF_COURSES: CourseOption[] = [
  { dept: 'MUSIC', number: '156',  name: '"sic": Improvisation Collective' },
  { dept: 'MUSIC', number: '159',  name: 'Early Music Singers' },
  { dept: 'MUSIC', number: '160',  name: 'Stanford Symphony Orchestra' },
  { dept: 'MUSIC', number: '160A', name: 'Stanford Philharmonia' },
  { dept: 'MUSIC', number: '160B', name: 'Stanford New Ensemble' },
  { dept: 'MUSIC', number: '160C', name: 'Stanford Baroque Soloists' },
  { dept: 'MUSIC', number: '160S', name: 'Stanford Summer Symphony' },
  { dept: 'MUSIC', number: '161A', name: 'Stanford Wind Symphony' },
  { dept: 'MUSIC', number: '161B', name: 'Jazz Orchestra' },
  { dept: 'MUSIC', number: '161D', name: 'Stanford Brass Ensemble' },
  { dept: 'MUSIC', number: '161E', name: 'Stanford Afro-Latin Jazz Orchestra' },
  { dept: 'MUSIC', number: '161F', name: 'Ottoman Music Ensemble' },
  { dept: 'MUSIC', number: '162',  name: 'Symphonic Chorus' },
  { dept: 'MUSIC', number: '163',  name: 'Memorial Church Choir' },
  { dept: 'MUSIC', number: '165',  name: 'Chamber Chorale' },
  { dept: 'MUSIC', number: '167S', name: 'Summer Chorus' },
  { dept: 'MUSIC', number: '169',  name: 'Stanford Taiko' },
  { dept: 'MUSIC', number: '171',  name: 'Chamber Music' },
  { dept: 'MUSIC', number: '172A', name: 'Piano' },
  { dept: 'MUSIC', number: '182',  name: 'Diction for Singers' },
  { dept: 'MUSIC', number: '183A', name: 'German Art Song Interpretation' },
  { dept: 'MUSIC', number: '183B', name: 'French Art Song Interpretation' },
  { dept: 'MUSIC', number: '183C', name: 'Interpretation of Musical Theater Repertoire' },
  { dept: 'MUSIC', number: '183D', name: 'Musical Theater' },
  { dept: 'MUSIC', number: '183E', name: 'Singing for Musicals' },
  { dept: 'MUSIC', number: '184A', name: 'Editing and Performing Early Music' },
  { dept: 'MUSIC', number: '184B', name: 'Topics on the Musical Stage' },
  { dept: 'MUSIC', number: '184C', name: 'Dramatic Vocal Arts: Songs and Scenes Onstage' },
  { dept: 'MUSIC', number: '272A', name: 'Piano for Music Majors/Minors' },
];

const CAPSTONE_198: CourseOption = { dept: 'MUSIC', number: '198', name: 'Concentrations Project' };

// ── Main export ───────────────────────────────────────────────────────────────

export const MUSIC_BA_2526: MajorConfig = {
  id: 'music-ba-2526',
  name: 'Music (BA)',
  school: 'Department of Music',
  year: '2025–2026',
  bulletinUrl: 'https://bulletin.stanford.edu/programs/MUSIC-BA/',
  category: 'major',
  totalMinUnits: 62,

  // Any MUSIC 141-148 course taken for ≥4 units satisfies WIM
  wimCourses: [
    { dept: 'MUSIC', number: '144J', name: 'Studies in Music of the Romantic Period' },
    { dept: 'MUSIC', number: '147T', name: 'This Must Be The Place: American Music and American Geography' },
    { dept: 'MUSIC', number: '147U', name: 'Identity, Difference, Sound' },
    { dept: 'CSRE',  number: '147U', name: 'Identity, Difference, Sound (cross-listed MUSIC 147U)' },
  ],

  sections: [
    // ── Lower Division Theory & Ear Training (all 6 required, ≥12 units) ─────
    {
      id: 'theory-ld',
      name: 'Lower Division Theory / Ear Training (all 6 required, ≥12 units)',
      note: 'Complete all 6 courses for at least 12 units. MUSIC 21–23 should be completed no later than autumn of junior year. MUSIC 21 includes the piano proficiency exam in its first two weeks.',
      slots: [
        {
          id: 'music21',
          label: 'MUSIC 21: Introduction to Tonal Theory',
          type: 'required',
          options: [{ dept: 'MUSIC', number: '21', name: 'Introduction to Tonal Theory' }],
        },
        {
          id: 'music22',
          label: 'MUSIC 22: Intermediate Tonal Theory',
          type: 'required',
          options: [{ dept: 'MUSIC', number: '22', name: 'Intermediate Tonal Theory' }],
        },
        {
          id: 'music23',
          label: 'MUSIC 23: Advanced Tonal Theory',
          type: 'required',
          options: [{ dept: 'MUSIC', number: '23', name: 'Advanced Tonal Theory' }],
        },
        {
          id: 'music24a',
          label: 'MUSIC 24A: Ear Training I',
          type: 'required',
          options: [{ dept: 'MUSIC', number: '24A', name: 'Ear Training I' }],
        },
        {
          id: 'music24b',
          label: 'MUSIC 24B: Ear Training II',
          type: 'required',
          options: [{ dept: 'MUSIC', number: '24B', name: 'Ear Training II' }],
        },
        {
          id: 'music24c',
          label: 'MUSIC 24C: Ear Training III',
          type: 'required',
          options: [{ dept: 'MUSIC', number: '24C', name: 'Ear Training III' }],
        },
      ],
    },

    // ── Lower Division History (all 3 required) ───────────────────────────────
    {
      id: 'history-ld',
      name: 'Lower Division Music History (all 3 required)',
      slots: [
        {
          id: 'music40',
          label: 'MUSIC 40: Music History to 1600',
          type: 'required',
          options: [{ dept: 'MUSIC', number: '40', name: 'Music History to 1600' }],
        },
        {
          id: 'music41',
          label: 'MUSIC 41: Music History 1600–1830',
          type: 'required',
          options: [{ dept: 'MUSIC', number: '41', name: 'Music History 1600-1830' }],
        },
        {
          id: 'music42',
          label: 'MUSIC 42: Music History Since 1830',
          type: 'required',
          options: [{ dept: 'MUSIC', number: '42', name: 'Music History Since 1830' }],
        },
      ],
    },

    // ── Upper Division History & Analysis (3 courses: 1 analysis + 1 history + 1 of either) ──
    {
      id: 'history-ud',
      name: 'Upper Division History & Analysis (3 courses)',
      note: 'Take 3 courses: one Analysis (122A/B/C), one History (MUSIC 141-148), plus one more of either. Any MUSIC 141-148 course taken for ≥4 units satisfies WIM. Courses in the 141-148 range vary by year: search and add the specific section you enroll in.',
      slots: [
        {
          id: 'ud-analysis',
          label: 'Analysis: MUSIC 122A, 122B, or 122C',
          type: 'pick-one',
          options: THEORY_ANALYSIS_UD,
        },
        {
          id: 'ud-history',
          label: 'Upper Division History: any MUSIC 141-148 (WIM-eligible at ≥4 units)',
          type: 'any-approved',
          note: 'Any MUSIC 141-148 course counts. Take for ≥4 units to satisfy WIM. 2025-26 offerings listed; search to add other sections.',
          options: [
            { dept: 'MUSIC', number: '144J', name: 'Studies in Music of the Romantic Period' },
            { dept: 'MUSIC', number: '147T', name: 'This Must Be The Place: American Music and American Geography' },
            { dept: 'MUSIC', number: '147U', name: 'Identity, Difference, Sound' },
            { dept: 'CSRE',  number: '147U', name: 'Identity, Difference, Sound (cross-listed MUSIC 147U)' },
          ],
        },
        {
          id: 'ud-choice',
          label: 'Third Course: Analysis (122A/B/C) or History (141-148)',
          type: 'any-approved',
          note: 'One additional course from either the analysis group (MUSIC 122A/B/C) or any MUSIC 141-148 history course. 2025-26 history offerings listed; search to add others.',
          options: [
            ...THEORY_ANALYSIS_UD,
            { dept: 'MUSIC', number: '144J', name: 'Studies in Music of the Romantic Period' },
            { dept: 'MUSIC', number: '147T', name: 'This Must Be The Place: American Music and American Geography' },
            { dept: 'MUSIC', number: '147U', name: 'Identity, Difference, Sound' },
            { dept: 'CSRE',  number: '147U', name: 'Identity, Difference, Sound (cross-listed MUSIC 147U)' },
          ],
        },
      ],
    },

    // ── Performance (≥3 units) ────────────────────────────────────────────────
    {
      id: 'perf-core',
      name: 'Performance (≥3 units from approved list)',
      unitOnly: true,
      minUnits: 3,
      note: 'Earn at least 3 units (credits) from the performance course list. Many of these are 1-unit repeatable courses (ensembles, private lessons); count enrollment quarters toward the unit total.',
      slots: [
        {
          id: 'perf-slot',
          label: 'Performance Courses',
          type: 'any-approved',
          options: PERFORMANCE_COURSES,
        },
      ],
    },

    // ── Composition / MST / Orchestration (≥3 units) ─────────────────────────
    {
      id: 'comp-mst-core',
      name: 'Composition / MST / Orchestration (≥3 units from approved list)',
      unitOnly: true,
      minUnits: 3,
      note: 'Earn at least 3 units from the Composition/MST/Orchestration course list.',
      slots: [
        {
          id: 'comp-mst-slot',
          label: 'Composition/MST/Orchestration Courses',
          type: 'any-approved',
          options: COMP_MST_ORCH,
        },
      ],
    },

    // ── Proficiency Exams ─────────────────────────────────────────────────────
    {
      id: 'proficiency',
      name: 'Proficiency Examinations',
      note: 'Both exams required for graduation. They are not courses but milestone gates.',
      slots: [
        {
          id: 'piano-prof',
          label: 'Piano Proficiency Examination',
          type: 'manual',
          options: [],
          note: 'Administered in the first two weeks of MUSIC 21. Covers scales/arpeggios, sight-reading, and prepared pieces. Students who do not pass must enroll in MUSIC 12A/B/C concurrently with the theory core until passed.',
        },
        {
          id: 'ear-exit',
          label: 'Ear Training Exit Examination',
          type: 'manual',
          options: [],
          note: 'Administered once annually in spring quarter; must be passed before June of the senior year. Assesses transcription, representation, and vocal/keyboard reproduction. Schedule with the ear training advisor.',
        },
      ],
    },

    // ── Concentration Subplan (20 units, trackSelector) ───────────────────────
    {
      id: 'concentration-selector',
      name: 'Concentration Subplan (20 units)',
      trackSelector: true,
      note: 'Declare one (or more) of eleven subplans in Axess: appears on transcript and diploma. Core breadth courses may NOT double-count toward concentration requirements. Students pursuing multiple concentrations must fulfill all requirements of each.',
      slots: [],
    },
  ],

  tracks: [
    // ── 1. Composition ────────────────────────────────────────────────────────
    {
      id: 'composition',
      name: 'Composition',
      sections: [
        {
          id: 'comp-conc',
          name: 'Composition Concentration Requirements',
          note: 'Requirements for the Composition subplan were not separately detailed in the 2025-26 bulletin text. Check the bulletin at https://bulletin.stanford.edu/programs/MUSIC-BA/ for the full Composition subplan requirements. The capstone is typically MUSIC 198.',
          slots: [
            {
              id: 'comp-reqs',
              label: 'Composition Concentration Courses (≥20 units; see bulletin)',
              type: 'any-approved',
              options: [],
              note: 'Consult the department and bulletin for the current Composition subplan course requirements.',
            },
            {
              id: 'comp-capstone',
              label: 'Capstone: MUSIC 198: Concentrations Project',
              type: 'required',
              options: [CAPSTONE_198],
              note: 'Enroll for a minimum of two units.',
            },
          ],
        },
      ],
    },

    // ── 2. Conducting ─────────────────────────────────────────────────────────
    {
      id: 'conducting',
      name: 'Conducting',
      sections: [
        {
          id: 'cond-courses',
          name: 'Conducting Courses (≥10 units from Groups A + B)',
          note: 'Group A: pick one of 130B/130C/136. Group B: both MUSIC 230 and 231 are required. Instrumental focus: MUSIC 230 ×2 + MUSIC 231 ×1 (6 total units). Choral focus: MUSIC 231 ×2 + MUSIC 230 ×1. Total must be ≥10 units from the combined two groups.',
          slots: [
            {
              id: 'cond-elem',
              label: 'Group A: Elementary/Intermediate Conducting (pick one)',
              type: 'pick-one',
              options: [
                { dept: 'MUSIC', number: '130B', name: 'Elementary Instrumental Conducting' },
                { dept: 'MUSIC', number: '130C', name: 'Elementary Choral Conducting' },
                { dept: 'MUSIC', number: '136',  name: 'Intermediate Conducting: Music Since 1900' },
              ],
            },
            {
              id: 'cond-adv-orch',
              label: 'Group B: MUSIC 230 (Advanced Orchestral Conducting)',
              type: 'required',
              options: [{ dept: 'MUSIC', number: '230', name: 'Advanced Orchestral Conducting' }],
              note: 'Instrumental focus: take MUSIC 230 twice (2×3u). Choral focus: take once (1×3u).',
            },
            {
              id: 'cond-adv-choral',
              label: 'Group B: MUSIC 231 (Advanced Choral Conducting)',
              type: 'required',
              options: [{ dept: 'MUSIC', number: '231', name: 'Advanced Choral Conducting' }],
              note: 'Choral focus: take MUSIC 231 twice (2×3u). Instrumental focus: take once (1×3u).',
            },
            {
              id: 'cond-focus',
              label: 'Group B: Focus Unit (additional 230 or 231 per focus)',
              type: 'pick-one',
              options: [
                { dept: 'MUSIC', number: '230', name: 'Advanced Orchestral Conducting (2nd enrollment: instrumental focus)' },
                { dept: 'MUSIC', number: '231', name: 'Advanced Choral Conducting (2nd enrollment: choral focus)' },
              ],
              note: 'Take the course matching your focus area a second time. Total 230+231 unit count = 6 units.',
            },
          ],
        },
        {
          id: 'cond-theory',
          name: 'Theory/Analysis & Ear Training (≥5 units from Groups C + D)',
          note: 'Group C: pick one 122A/B/C that was NOT used for Core Breadth. Group D: MUSIC 129 for ≥1 unit (strongly encouraged to take for 2 units). Total ≥5 units from both groups.',
          slots: [
            {
              id: 'cond-analysis',
              label: 'Group C: Analysis (pick one; not already used for Core)',
              type: 'pick-one',
              options: THEORY_ANALYSIS_UD,
            },
            {
              id: 'cond-ear',
              label: 'Group D: MUSIC 129 (Advanced Ear-Training/Musicianship)',
              type: 'required',
              options: [{ dept: 'MUSIC', number: '129', name: 'Advanced Ear-Training/Musicianship' }],
              note: 'MUSIC 129 offered for 1 or 2 units. Must take for ≥1 unit; strongly urged to take for 2 units.',
            },
          ],
        },
        {
          id: 'cond-perf',
          name: 'Additional Performance Ensemble (3 additional quarters, ≥3 units)',
          unitOnly: true,
          minUnits: 3,
          note: 'These 3 units are IN ADDITION to the 3 units that satisfy the Core Breadth Performance requirement. Enroll one unit per quarter for three quarters in any qualifying ensemble. Advisor permission required for ensembles not on the list.',
          slots: [
            {
              id: 'cond-ens',
              label: 'Additional Ensemble Quarters',
              type: 'any-approved',
              options: LARGE_ENSEMBLES,
            },
          ],
        },
        {
          id: 'cond-capstone',
          name: 'Capstone: Recital',
          slots: [
            {
              id: 'cond-198',
              label: 'MUSIC 198: Concentrations Project (≥2 units)',
              type: 'required',
              options: [CAPSTONE_198],
              note: 'Enroll for a minimum of two units.',
            },
          ],
        },
      ],
    },

    // ── 3. Music, Science, and Technology (MST) ───────────────────────────────
    {
      id: 'mst',
      name: 'Music, Science, and Technology (MST)',
      sections: [
        {
          id: 'mst-core',
          name: 'MST Core (4 required courses)',
          note: 'Enroll in MUSIC 220A, 220B, 220C for ≥3 units each; MUSIC 251 for ≥4 units. Recommend completing the 220 series by junior year and using the MUSIC 220C project as the basis for the capstone.',
          slots: [
            {
              id: 'mst-220a',
              label: 'MUSIC 220A: Fundamentals of Computer-Generated Sound (≥3 units)',
              type: 'required',
              options: [{ dept: 'MUSIC', number: '220A', name: 'Fundamentals of Computer-Generated Sound' }],
            },
            {
              id: 'mst-220b',
              label: 'MUSIC 220B: Compositional Algorithms, Psychoacoustics, and Computational Music (≥3 units)',
              type: 'required',
              options: [{ dept: 'MUSIC', number: '220B', name: 'Compositional Algorithms, Psychoacoustics, and Computational Music' }],
            },
            {
              id: 'mst-220c',
              label: 'MUSIC 220C: Research Seminar in Computer-Generated Music (≥3 units)',
              type: 'required',
              options: [{ dept: 'MUSIC', number: '220C', name: 'Research Seminar in Computer-Generated Music' }],
            },
            {
              id: 'mst-251',
              label: 'MUSIC 251: Psychophysics and Music Cognition (≥4 units)',
              type: 'required',
              options: [{ dept: 'MUSIC', number: '251', name: 'Psychophysics and Music Cognition' }],
            },
          ],
        },
        {
          id: 'mst-elective',
          name: 'MST Elective (pick one, ≥4 units)',
          slots: [
            {
              id: 'mst-elec',
              label: 'MST Elective (pick one)',
              type: 'pick-one',
              options: [
                { dept: 'MUSIC', number: '250C', name: 'Interaction - Intermedia - Immersion' },
                { dept: 'MUSIC', number: '256A', name: 'Music, Computing, Design: The Art of Design' },
                { dept: 'MUSIC', number: '264',  name: 'Musical Engagement' },
                { dept: 'MUSIC', number: '320',  name: 'Introduction to Audio Signal Processing' },
              ],
              note: 'Take for a minimum of 4 units.',
            },
          ],
        },
        {
          id: 'mst-capstone',
          name: 'Capstone Project',
          slots: [
            {
              id: 'mst-198',
              label: 'MUSIC 198: Concentrations Project (≥3 units), or equivalent',
              type: 'required',
              options: [CAPSTONE_198],
              note: 'Enroll for ≥3 units; may spread over 2-3 quarters. Instead of 198, may count units from MUSIC 125, 199, and/or 220D. Capstone may be research, creative, or hybrid; final format may be text, presentation, demo, performance, or combination.',
            },
          ],
        },
      ],
    },

    // ── 4. Musicology and Ethnomusicology ─────────────────────────────────────
    {
      id: 'musethno',
      name: 'Musicology and Ethnomusicology',
      sections: [
        {
          id: 'musethno-writing',
          name: 'Upper-Level Writing-Intensive Courses (≥10 units)',
          note: 'Minimum 10 units of any upper-level, writing-intensive course. These courses must cover at least two historical periods; at least one must be in the Department of Music. Relevant courses outside the department are possible in consultation with the advisor.',
          slots: [
            {
              id: 'musethno-write-slot',
              label: 'Upper-Level Writing-Intensive Courses (≥10 units)',
              type: 'any-approved',
              options: [],
              note: 'Consult advisor; must cover ≥2 historical periods; ≥1 in the Music department.',
            },
          ],
        },
        {
          id: 'musethno-electives',
          name: 'Concentration Electives (≥6 units)',
          note: '6 units of concentration electives in any music-related course. Language courses may count in consultation with the advisor. Students strongly encouraged to attain proficiency in at least one language relevant to their research interests.',
          slots: [
            {
              id: 'musethno-elec',
              label: 'Concentration Electives (≥6 units, music-related)',
              type: 'any-approved',
              options: [],
            },
          ],
        },
        {
          id: 'musethno-capstone',
          name: 'Capstone: Thesis',
          slots: [
            {
              id: 'musethno-198',
              label: 'MUSIC 198: Concentrations Project (≥4 units)',
              type: 'required',
              options: [CAPSTONE_198],
              note: 'Enroll for ≥4 units for the thesis capstone.',
            },
          ],
        },
      ],
    },

    // ── 5. Musicology/Ethnomusicology and Performance ─────────────────────────
    {
      id: 'musethno-perf',
      name: 'Musicology/Ethnomusicology and Performance',
      sections: [
        {
          id: 'mep-writing',
          name: 'Upper-Level Writing-Intensive Courses (≥10 units)',
          note: 'Minimum 10 units of upper-level, writing-intensive courses covering ≥2 historical periods; ≥1 in the Music department. Advisor consultation for outside-department courses.',
          slots: [
            {
              id: 'mep-write-slot',
              label: 'Upper-Level Writing-Intensive Courses (≥10 units)',
              type: 'any-approved',
              options: [],
              note: 'Must cover ≥2 historical periods; ≥1 in Music department.',
            },
          ],
        },
        {
          id: 'mep-perf',
          name: 'Performance Courses (≥6 units)',
          unitOnly: true,
          minUnits: 6,
          note: 'At least 6 units from the listed performance courses. Chosen in consultation with advisor. From September 2024 onward, all private music lessons are cataloged with 100-level numbers. Students strongly encouraged to attain language proficiency relevant to their research.',
          slots: [
            {
              id: 'mep-perf-slot',
              label: 'Performance Courses (≥6 units)',
              type: 'any-approved',
              options: MUSETHNO_PERF_COURSES,
            },
          ],
        },
        {
          id: 'mep-capstone',
          name: 'Capstone: Thesis',
          slots: [
            {
              id: 'mep-198',
              label: 'MUSIC 198: Concentrations Project (≥4 units)',
              type: 'required',
              options: [CAPSTONE_198],
            },
          ],
        },
      ],
    },

    // ── 6. Performance in Keyboard Studies ────────────────────────────────────
    {
      id: 'keyboard',
      name: 'Performance in Keyboard Studies',
      sections: [
        {
          id: 'kbd-lessons',
          name: 'Private Lessons (6 quarters, ≥6 units)',
          unitOnly: true,
          minUnits: 6,
          note: 'Complete 6 quarters for at least 1 unit per quarter. Must enroll in sections taught by Stanford Department of Music faculty. From September 2024 onward, all private music lessons are cataloged with 100-level numbers.',
          slots: [
            {
              id: 'kbd-lesson-slot',
              label: 'Keyboard Lessons (6 quarters × ≥1 unit)',
              type: 'any-approved',
              options: KEYBOARD_LESSONS,
            },
          ],
        },
        {
          id: 'kbd-chamber',
          name: 'Chamber Music (MUSIC 171, 3 quarters, ≥3 units)',
          note: 'Enroll in MUSIC 171 a minimum of 3 times (small, unconducted ensemble).',
          slots: [
            {
              id: 'kbd-chamber-slot',
              label: 'MUSIC 171: Chamber Music (×3 quarters)',
              type: 'required',
              times: 3,
              options: [{ dept: 'MUSIC', number: '171', name: 'Chamber Music' }],
            },
          ],
        },
        {
          id: 'kbd-thoroughbass',
          name: 'Thoroughbass',
          slots: [
            {
              id: 'kbd-tb',
              label: 'MUSIC 126A: Thoroughbass Accompaniment',
              type: 'required',
              options: [{ dept: 'MUSIC', number: '126A', name: 'Thoroughbass Accompaniment' }],
            },
          ],
        },
        {
          id: 'kbd-ensemble',
          name: 'Solo and Ensemble Elective (pick one)',
          slots: [
            {
              id: 'kbd-ens',
              label: 'Solo/Ensemble Elective (pick one)',
              type: 'pick-one',
              options: [
                { dept: 'MUSIC', number: '160C', name: 'Stanford Baroque Soloists' },
                { dept: 'MUSIC', number: '170',  name: 'Collaborative Piano' },
                { dept: 'MUSIC', number: '183A', name: 'German Art Song Interpretation' },
                { dept: 'MUSIC', number: '183B', name: 'French Art Song Interpretation' },
              ],
            },
          ],
        },
        {
          id: 'kbd-analysis',
          name: 'Analysis and Keyboard Musicianship (both required)',
          slots: [
            {
              id: 'kbd-122d',
              label: 'MUSIC 122D: Analysis for Performance',
              type: 'required',
              options: [{ dept: 'MUSIC', number: '122D', name: 'Analysis for Performance' }],
            },
            {
              id: 'kbd-129k',
              label: 'MUSIC 129K: Advanced Keyboard Musicianship',
              type: 'required',
              options: [{ dept: 'MUSIC', number: '129K', name: 'Advanced Keyboard Musicianship' }],
            },
          ],
        },
        {
          id: 'kbd-lit',
          name: 'Piano Literature (3 quarters, ≥3 units)',
          note: 'Enroll in MUSIC 155A a minimum of 3 times.',
          slots: [
            {
              id: 'kbd-lit-slot',
              label: 'MUSIC 155A: Piano Literature (×3 quarters)',
              type: 'required',
              times: 3,
              options: [{ dept: 'MUSIC', number: '155A', name: 'Piano Literature' }],
            },
          ],
        },
        {
          id: 'kbd-capstone',
          name: 'Capstone: Senior Keyboard Recital',
          slots: [
            {
              id: 'kbd-198',
              label: 'MUSIC 198: Concentrations Project (≥2 units)',
              type: 'required',
              options: [CAPSTONE_198],
              note: 'Solo adjudicated recital with program notes (supervised by musicology faculty) and dress rehearsal. Must enroll in 3 consecutive quarters of private lessons, the last concurrent with the project. Additional MUSIC 198 enrollment is encouraged one full quarter prior to the capstone presentation.',
            },
          ],
        },
      ],
    },

    // ── 7. Performance in String Studies ──────────────────────────────────────
    {
      id: 'strings',
      name: 'Performance in String Studies',
      sections: [
        {
          id: 'str-lessons',
          name: 'Private Lessons (6 quarters, ≥6 units)',
          unitOnly: true,
          minUnits: 6,
          note: 'Complete 6 quarters for ≥1 unit per quarter. Must enroll in sections taught by Stanford Department of Music faculty. From September 2024 onward, all private music lessons use 100-level numbers.',
          slots: [
            {
              id: 'str-lesson-slot',
              label: 'String Lessons (6 quarters × ≥1 unit)',
              type: 'any-approved',
              options: STRING_LESSONS,
            },
          ],
        },
        {
          id: 'str-chamber',
          name: 'Chamber Music (6 quarters, ≥6 units)',
          unitOnly: true,
          minUnits: 6,
          note: 'Complete 6 quarters in MUSIC 171 (small, unconducted ensemble). Up to 2 units in MUSIC 160B or 160C may apply toward this requirement.',
          slots: [
            {
              id: 'str-chamber-slot',
              label: 'MUSIC 171: Chamber Music (6 quarters)',
              type: 'any-approved',
              options: [
                { dept: 'MUSIC', number: '171',  name: 'Chamber Music' },
                { dept: 'MUSIC', number: '160B', name: 'Stanford New Ensemble (up to 2u may substitute)' },
                { dept: 'MUSIC', number: '160C', name: 'Stanford Baroque Soloists (up to 2u may substitute)' },
              ],
            },
          ],
        },
        {
          id: 'str-analysis',
          name: 'Analysis & Ear Training (both required)',
          slots: [
            {
              id: 'str-122d',
              label: 'MUSIC 122D: Analysis for Performance',
              type: 'required',
              options: [{ dept: 'MUSIC', number: '122D', name: 'Analysis for Performance' }],
            },
            {
              id: 'str-129',
              label: 'MUSIC 129: Advanced Ear-Training/Musicianship',
              type: 'required',
              options: [{ dept: 'MUSIC', number: '129', name: 'Advanced Ear-Training/Musicianship' }],
            },
          ],
        },
        {
          id: 'str-ensemble',
          name: 'Large Conducted Ensemble (≥2 units)',
          slots: [
            {
              id: 'str-ens',
              label: 'Large Ensemble: MUSIC 160 or 160A',
              type: 'pick-one',
              options: [
                { dept: 'MUSIC', number: '160',  name: 'Stanford Symphony Orchestra' },
                { dept: 'MUSIC', number: '160A', name: 'Stanford Philharmonia' },
              ],
              note: 'Earn at least 2 units from these ensembles.',
            },
          ],
        },
        {
          id: 'str-capstone',
          name: 'Capstone: Senior String Recital',
          slots: [
            {
              id: 'str-198',
              label: 'MUSIC 198: Concentrations Project (≥2 units)',
              type: 'required',
              options: [CAPSTONE_198],
              note: 'Adjudicated solo recital with program notes and dress rehearsal. Must enroll in 3 consecutive quarters of private lessons, the last concurrent with the project. Additional MUSIC 198 enrollment encouraged one full quarter prior.',
            },
          ],
        },
      ],
    },

    // ── 8. Performance in Vocal Studies ───────────────────────────────────────
    {
      id: 'vocal',
      name: 'Performance in Vocal Studies',
      sections: [
        {
          id: 'voc-lessons',
          name: 'Voice Lessons (6 quarters, ≥12 units)',
          unitOnly: true,
          minUnits: 12,
          note: 'Complete 6 quarters for at least 2 units per quarter (≥12 units total). Must enroll in sections taught by Stanford Department of Music faculty.',
          slots: [
            {
              id: 'voc-lesson-slot',
              label: 'Voice Lessons (6 quarters × ≥2 units)',
              type: 'any-approved',
              options: [
                { dept: 'MUSIC', number: '173', name: 'Voice' },
                { dept: 'MUSIC', number: '273', name: 'Voice for Music Majors/Minors' },
              ],
            },
          ],
        },
        {
          id: 'voc-diction',
          name: 'Diction / Repertoire Courses (2 courses, ≥2 units)',
          note: 'Complete 2 courses for at least 1 unit each from the diction/art song interpretation courses.',
          slots: [
            {
              id: 'voc-dict-slot',
              label: 'Diction/Repertoire Courses (pick 2)',
              type: 'pick-from-list',
              count: 2,
              options: [
                { dept: 'MUSIC', number: '182',  name: 'Diction for Singers' },
                { dept: 'MUSIC', number: '183A', name: 'German Art Song Interpretation' },
                { dept: 'MUSIC', number: '183B', name: 'French Art Song Interpretation' },
                { dept: 'MUSIC', number: '183C', name: 'Interpretation of Musical Theater Repertoire' },
              ],
            },
          ],
        },
        {
          id: 'voc-pedagogy',
          name: 'Voice Pedagogy (required)',
          slots: [
            {
              id: 'voc-183h',
              label: 'MUSIC 183H: Vocal Pedagogy',
              type: 'required',
              options: [{ dept: 'MUSIC', number: '183H', name: 'Vocal Pedagogy' }],
            },
          ],
        },
        {
          id: 'voc-stage',
          name: 'Vocal Stage Performance (pick one, ≥2 units)',
          slots: [
            {
              id: 'voc-stage-slot',
              label: 'Stage Performance (pick one, ≥2 units)',
              type: 'pick-one',
              options: [
                { dept: 'MUSIC', number: '184A', name: 'Editing and Performing Early Music' },
                { dept: 'MUSIC', number: '184B', name: 'Topics on the Musical Stage' },
                { dept: 'MUSIC', number: '184C', name: 'Dramatic Vocal Arts: Songs and Scenes Onstage' },
              ],
              note: 'Take for at least 2 units.',
            },
          ],
        },
        {
          id: 'voc-capstone',
          name: 'Capstone',
          slots: [
            {
              id: 'voc-198',
              label: 'MUSIC 198: Concentrations Project (≥2 units)',
              type: 'required',
              options: [CAPSTONE_198],
              note: 'Must enroll in 3 consecutive quarters of private lessons, the last concurrent with the project. Additional MUSIC 198 enrollment encouraged one full quarter prior.',
            },
          ],
        },
      ],
    },

    // ── 9. Performance in Woodwind, Brass, and Percussion Studies ─────────────
    {
      id: 'wbp',
      name: 'Performance in Woodwind, Brass, and Percussion Studies',
      sections: [
        {
          id: 'wbp-lessons',
          name: 'Private Lessons (6 quarters, ≥6 units)',
          unitOnly: true,
          minUnits: 6,
          note: 'Complete 6 quarters for 1 unit per quarter. Must enroll in sections taught by Stanford Department of Music faculty. From September 2024 onward, all private lessons use 100-level numbers.',
          slots: [
            {
              id: 'wbp-lesson-slot',
              label: 'WBP Lessons (6 quarters × 1 unit)',
              type: 'any-approved',
              options: WBP_LESSONS,
            },
          ],
        },
        {
          id: 'wbp-large-ens',
          name: 'Large Conducted Ensemble (≥6 units)',
          unitOnly: true,
          minUnits: 6,
          slots: [
            {
              id: 'wbp-ens-slot',
              label: 'Large Ensemble (≥6 units)',
              type: 'any-approved',
              options: [
                { dept: 'MUSIC', number: '160',  name: 'Stanford Symphony Orchestra' },
                { dept: 'MUSIC', number: '160A', name: 'Stanford Philharmonia' },
                { dept: 'MUSIC', number: '160B', name: 'Stanford New Ensemble' },
                { dept: 'MUSIC', number: '161A', name: 'Stanford Wind Symphony' },
                { dept: 'MUSIC', number: '161B', name: 'Jazz Orchestra' },
                { dept: 'MUSIC', number: '161D', name: 'Stanford Brass Ensemble' },
              ],
            },
          ],
        },
        {
          id: 'wbp-chamber',
          name: 'Chamber Music (≥3 units)',
          note: 'Enroll in MUSIC 171 a minimum of 3 times.',
          slots: [
            {
              id: 'wbp-chamber-slot',
              label: 'MUSIC 171: Chamber Music (×3 quarters)',
              type: 'required',
              times: 3,
              options: [{ dept: 'MUSIC', number: '171', name: 'Chamber Music' }],
            },
          ],
        },
        {
          id: 'wbp-analysis',
          name: 'Professional Development and Analysis (both required)',
          slots: [
            {
              id: 'wbp-6fg',
              label: 'MUSIC 6F or 6G: Professional/Entrepreneurial Development',
              type: 'pick-one',
              options: [
                { dept: 'MUSIC', number: '6F', name: 'Professional Development in Music' },
                { dept: 'MUSIC', number: '6G', name: 'Entrepreneurial Development for Classical Musicians' },
              ],
            },
            {
              id: 'wbp-122d',
              label: 'MUSIC 122D: Analysis for Performance',
              type: 'required',
              options: [{ dept: 'MUSIC', number: '122D', name: 'Analysis for Performance' }],
            },
          ],
        },
        {
          id: 'wbp-capstone',
          name: 'Capstone',
          slots: [
            {
              id: 'wbp-198',
              label: 'MUSIC 198: Concentrations Project (≥2 units)',
              type: 'required',
              options: [CAPSTONE_198],
              note: 'Must enroll in 3 consecutive quarters of private lessons, the last concurrent with the project.',
            },
          ],
        },
      ],
    },

    // ── 10. Theory ────────────────────────────────────────────────────────────
    {
      id: 'theory',
      name: 'Theory',
      sections: [
        {
          id: 'theory-analysis',
          name: 'Advanced Analysis (pick one, not already used for Core)',
          slots: [
            {
              id: 'theory-122',
              label: 'Advanced Analysis (pick one; concentration-specific use)',
              type: 'pick-one',
              options: THEORY_ANALYSIS_UD,
              note: 'Must be taken specifically for the Theory concentration; not already used toward the Core Breadth "Upper Division History & Analysis" requirement.',
            },
          ],
        },
        {
          id: 'theory-skills',
          name: 'Music Skills (pick one)',
          slots: [
            {
              id: 'theory-skills-slot',
              label: 'Music Skills (pick one)',
              type: 'pick-one',
              options: [
                { dept: 'MUSIC', number: '126A', name: 'Thoroughbass Accompaniment' },
                { dept: 'MUSIC', number: '127A', name: 'Instrumentation and Orchestration' },
                { dept: 'MUSIC', number: '129',  name: 'Advanced Ear-Training/Musicianship' },
                { dept: 'MUSIC', number: '129K', name: 'Advanced Keyboard Musicianship' },
              ],
            },
          ],
        },
        {
          id: 'theory-inquiry',
          name: 'Music Inquiry (pick one, ≥3 units)',
          slots: [
            {
              id: 'theory-inq-slot',
              label: 'Music Inquiry (pick one, ≥3 units)',
              type: 'pick-one',
              options: [
                { dept: 'MUSIC', number: '184A', name: 'Editing and Performing Early Music' },
                { dept: 'MUSIC', number: '251',  name: 'Psychophysics and Music Cognition' },
                { dept: 'MUSIC', number: '269',  name: 'Research in Performance Practices' },
              ],
              note: 'Take for at least 3 units.',
            },
          ],
        },
        {
          id: 'theory-jazz',
          name: 'Jazz History (pick one)',
          slots: [
            {
              id: 'theory-jazz-slot',
              label: 'Jazz History (pick one)',
              type: 'pick-one',
              options: [
                { dept: 'MUSIC', number: '18A', name: 'Introduction to Jazz History and Appreciation' },
                { dept: 'MUSIC', number: '18B', name: 'Jazz History and Appreciation: Advanced Level' },
              ],
            },
          ],
        },
        {
          id: 'theory-elec',
          name: 'Concentration Electives (≥2 units)',
          slots: [
            {
              id: 'theory-elec-slot',
              label: 'Music-Related Electives (≥2 units)',
              type: 'any-approved',
              options: [],
              note: 'Any 2 units in a music-related course, in consultation with your advisor.',
            },
          ],
        },
        {
          id: 'theory-capstone',
          name: 'Capstone: Thesis',
          slots: [
            {
              id: 'theory-198',
              label: 'MUSIC 198: Concentrations Project',
              type: 'required',
              options: [CAPSTONE_198],
            },
          ],
        },
      ],
    },

    // ── 11. Self-Designed ─────────────────────────────────────────────────────
    {
      id: 'self-designed',
      name: 'Self-Designed',
      sections: [
        {
          id: 'sd-focus',
          name: 'Focal Area Coursework (≥16 units)',
          note: 'Develop a focus area in consultation with the Program Advisor. 16 units toward courses in this focus area; remaining 4 units reserved for capstone. Up to 3 of the 16 units may be taken outside the Music Department with advisor permission. Focus areas may center on established areas (jazz, musical theater) or move across programs (creative, critical, or blended emphasis). The 16 units should ground and motivate the capstone project.',
          slots: [
            {
              id: 'sd-courses',
              label: 'Focal Area Courses (≥16 units, advisor-approved)',
              type: 'any-approved',
              options: [],
              note: 'Submit concentration form to undergraduate student services officer. Up to 3 units may be outside the Music Department.',
            },
          ],
        },
        {
          id: 'sd-capstone',
          name: 'Capstone Project (≥4 units)',
          note: 'Begin ideally in junior year. Choose 1-2 capstone advisors; one may be outside the Music Department. Allocate 1-2 units per quarter to independent studies; meet with advisor ≥2×/quarter (≥3×/quarter in the last two quarters before graduation). Capstone may take the form of creative work, academic paper, recital/lecture-recital, or mix.',
          slots: [
            {
              id: 'sd-198',
              label: 'MUSIC 198 or MUSIC 199: Capstone (≥4 units)',
              type: 'pick-one',
              options: [
                CAPSTONE_198,
                { dept: 'MUSIC', number: '199', name: 'Independent Study' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
