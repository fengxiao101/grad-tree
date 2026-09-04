#!/usr/bin/env python3
"""
Apply manual AI-reviewed corrections to prereqGroups in courses-core-2627.json.
Run after build_prereq_groups.py.

Populate CORRECTIONS with AI-reviewed fixes from flagged_prereqs.json.
See CLAUDE.md "Prereq parsing pipeline" for known edge-case patterns.
"""
import json
from pathlib import Path

# Keyed by "DEPT NUMBER" (primary code, e.g. "CS 106A")
# Only entries that DIFFER from the parsed output are listed.
# Format: list of OR-groups (each group is a list of course codes that satisfy it).
CORRECTIONS = {
    # ── ANES clerkships ──────────────────────────────────────────────────────────
    # "strongly recommended" = not required; PERIODS AVAILABLE text generates spurious codes
    "ANES 300A": [],
    "ANES 300B": [],
    "ANES 300C": [],
    "ANES 300E": [],
    "ANES 300P": [["ANES 300A"]],
    "ANES 302A": [],  # "preferably including" = soft prereq
    "ANES 304A": [],  # "Clinical experience" = not a course code
    "ANES 306A": [["MED 300A"], ["SURG 300A"]],
    "ANES 306P": [["PEDS 300A"], ["SURG 300A"]],
    # "Anesthesia 300A, 300B, 300C, or 300D" - dept normalization + spurious PLUS 6
    "ANES 307A": [["ANES 300A", "ANES 300B", "ANES 300C", "ANES 300D"]],
    "ANES 311A": [["ANES 300A", "ANES 300B", "ANES 300C", "ANES 300D", "ANES 300E"]],
    "ANES 340A": [["ANES 306A"]],  # visiting-student alternative not encodeable
    "ANES 398A": [],  # "Consent of faculty preceptor" = not a course

    # ── BIOE ─────────────────────────────────────────────────────────────────────
    # "(formerly 188)" parsed as FORMERLY 188 - annotation, not a prereq
    "BIOE 355": [["CHEMENG 181", "BIOSCI 41"]],

    # ── BMDS ─────────────────────────────────────────────────────────────────────
    # HIPAA training / compliance - not course codes
    "BMDS 304": [],

    # ── CEE ──────────────────────────────────────────────────────────────────────
    # "E14, Physics 41, Math 51, or CME 100" - all four are OR (E14 = ENGR 14)
    "CEE 101B": [["ENGR 14", "PHYSICS 41", "MATH 51", "CME 100"]],
    # "MATH 19 or 20 or approved equivalent" - split as AND, should be OR
    "CEE 146S": [["MATH 19", "MATH 20"]],
    # "CS106A, CME 100/Math51, Stats110/101" - 100/51 and 110/101 are OR pairs
    "CEE 154": [["CS 106A"], ["CME 100", "MATH 51"], ["STATS 110", "STATS 101"]],
    # "ESS 220 / CEE 260A" - slash = OR, split as AND
    "CEE 260C": [["ESS 220", "CEE 260A"]],
    # "CEE 262A, CME 206, or equivalent" - split as AND, should be OR
    "CEE 262C": [["CEE 262A", "CME 206"]],
    # "280 and an advanced course (e.g., 285A, 285B)" - 285A/285B are examples (OR)
    "CEE 282": [["CEE 280"], ["CEE 285A", "CEE 285B"]],
    # "CEE 203/CEE 254, CEE 283, CS 106A/X" - slashes = OR pairs
    "CEE 286": [["CEE 203", "CEE 254"], ["CEE 283"], ["CS 106A", "CS 106X"]],
    # "CEE 281, CEE 291, or equivalent" - split as AND, should be OR
    "CEE 310": [["CEE 281", "CEE 291"]],

    # ── CHEM ─────────────────────────────────────────────────────────────────────
    # CHEM 171 appears twice due to dedup bug in equivalence sentence
    "CHEM 273": [["CHEM 173", "CHEM 171"]],

    # ── CHPR ─────────────────────────────────────────────────────────────────────
    # "3 of HumBio Core (2A,2B,3A,3B,4A,4B) or 2 of BIO 82,83,84,86" - flat OR
    "CHPR 130": [["HUMBIO 2A", "HUMBIO 2B", "HUMBIO 3A", "HUMBIO 3B",
                  "HUMBIO 4A", "HUMBIO 4B", "BIO 82", "BIO 83", "BIO 84", "BIO 86"]],
    # "CHPR 201 or HUMBIO 126/CHPR 226" - all three are OR
    "CHPR 250": [["CHPR 201", "HUMBIO 126", "CHPR 226"]],

    # ── CME ──────────────────────────────────────────────────────────────────────
    # "CME100/ENGR154 or Math 51 or 52" - all four are OR (slashes = OR)
    "CME 106": [["CME 100", "ENGR 154", "MATH 51", "MATH 52"]],
    # "Recommended Prerequisite" - entire section is recommended only
    "CME 215": [],
    # "335A,B, CME 200, CME 204, or consent" - CME 335 doesn't exist; rest are OR
    "CME 356": [["CME 200", "CME 204"]],

    # ── CS ───────────────────────────────────────────────────────────────────────
    # "one of LINGUIST 180/280, CS 124, CS 224N, CS 224S, or CS 224U" - all OR
    "CS 224V": [["LINGUIST 180", "LINGUIST 280", "CS 124", "CS 224N", "CS 224S", "CS 224U"]],
    # "strongly encouraged" - not a formal prereq
    "CS 193P": [],
    # "AA 171/274" - slash = OR; rest are separate AND requirements
    "CS 237B": [["CS 106A"], ["CME 100"], ["CME 106"], ["AA 171", "AA 274"]],
    # "At least one of the following; CS229, CS230, CS231N, CS224N" - all OR
    "CS 329S": [["CS 229", "CS 230", "CS 231N", "CS 224N"]],
    # "CS 107 or equivalent. Highly recommended: ..." - rest are recommended only
    "CS 348K": [["CS 107"]],
    # "CS 161 or equivalent. CS 254 recommended but not required."
    "CS 354": [["CS 161"]],
    # "CS 147, 193A/193P" - 147 required AND (193A OR 193P)
    "CS 377U": [["CS 147"], ["CS 193A", "CS 193P"]],
    # "CS229, CS231N, CS234 (or equivalent)" - all are OR
    "CS 422": [["CS 229", "CS 231N", "CS 234"]],

    # ── CTS clerkships ───────────────────────────────────────────────────────────
    "CTS 300A": [["SURG 300A"]],
    "CTS 301B": [["SURG 300A"]],
    "CTS 303A": [["SURG 300A"]],
    "CTS 398A": [["CTS 300A"]],

    # ── DATASCI ──────────────────────────────────────────────────────────────────
    # CS 193Q is the Python-catch-up bridge course - OR alternative to CS 106A
    "DATASCI 112": [["CS 106A", "CS 193Q"]],

    # ── DERM clerkships ──────────────────────────────────────────────────────────
    "DERM 300A": [],
    "DERM 310B": [["DERM 300A"]],
    "DERM 311A": [["DERM 300A"]],

    # ── ECON ─────────────────────────────────────────────────────────────────────
    # "Econ 202, 203, 204, 210 or equivalent" - all four are OR
    "ECON 242": [["ECON 202", "ECON 203", "ECON 204", "ECON 210"]],

    # ── EE ───────────────────────────────────────────────────────────────────────
    # "Pre-requisite: Physics 41. Pre- or co-requisite: Math 53 or CME 102."
    # Math 53 / CME 102 are co-reqs, not prereqs
    "EE 65": [["PHYSICS 41"]],

    # ── EMED clerkships ──────────────────────────────────────────────────────────
    "EMED 301A": [],
    "EMED 312A": [],
    "EMED 398A": [],

    # ── FAMMED clerkships ────────────────────────────────────────────────────────
    "FAMMED 364E": [["FAMMED 301A"], ["MED 300A"], ["PEDS 300A"]],
    "FAMMED 398A": [],

    # ── HORSE ────────────────────────────────────────────────────────────────────
    # "Over 20 hours of riding time or completion of PE 66" - PE 67 is where
    # underqualified riders are redirected, not a prereq
    "HORSE 14": [["PE 66"]],

    # ── HUMBIO ───────────────────────────────────────────────────────────────────
    # "3 of HumBio Core (2A,2B,3A,3B,4A,4B) or 2 of BIO 82,83,84,86" - flat OR
    "HUMBIO 131": [["HUMBIO 2A", "HUMBIO 2B", "HUMBIO 3A", "HUMBIO 3B",
                    "HUMBIO 4A", "HUMBIO 4B", "BIO 82", "BIO 83", "BIO 84", "BIO 86"]],

    # ── LAW ──────────────────────────────────────────────────────────────────────
    # "limited to 20 students, 16 from SLS" - enrollment numbers, not course codes
    "LAW 7825": [],

    # ── LINGUIST ─────────────────────────────────────────────────────────────────
    # "One of Linguist 1, 20N, 110, 121A, 121B, 130A, or 130B" - all OR, split as AND
    "LINGUIST 116A": [["LINGUIST 1", "LINGUIST 20N", "LINGUIST 110",
                       "LINGUIST 121A", "LINGUIST 121B", "LINGUIST 130A", "LINGUIST 130B"]],
    # "Prerequisites: none (can be taken before or after Linguistics 121B)"
    "LINGUIST 121A": [],
    # "SYMSYS1, LINGUIST1, LINGUIST35, or equivalent. LINGUIST 130A is NOT a prereq."
    "LINGUIST 130B": [["SYMSYS 1", "LINGUIST 1", "LINGUIST 35"]],
    # "Linguist 130A, Linguist 130B, or permission" - split as AND
    "LINGUIST 232A": [["LINGUIST 130A", "LINGUIST 130B"]],
    # "Linguist 222A or 232A" - split as AND
    "LINGUIST 232B": [["LINGUIST 222A", "LINGUIST 232A"]],
    # "LINGUIST 250, 258, 255F, 257, or 234" - all OR, split as AND
    "LINGUIST 255J": [["LINGUIST 250", "LINGUIST 258", "LINGUIST 255F",
                       "LINGUIST 257", "LINGUIST 234"]],
    # "LINGUIST 134A/234 and LINGUIST 258" - 134A/234 OR, then AND 258
    "LINGUIST 255K": [["LINGUIST 134A", "LINGUIST 234"], ["LINGUIST 258"]],
    # "LING 250 and 110" - LING dept doesn't exist, should be LINGUIST
    "LINGUIST 256": [["LINGUIST 250"], ["LINGUIST 110"]],
    # "Linguist 250, Linguist 258, or Linguist 258A" - split as AND
    "LINGUIST 257L": [["LINGUIST 250", "LINGUIST 258", "LINGUIST 258A"]],
    # "274A or consent" - spurious BOTH 274A from "commit to both 274A and 274B"
    "LINGUIST 274B": [["LINGUIST 274A"]],

    # ── MATH ─────────────────────────────────────────────────────────────────────
    # "Math 61CM, or Math 52 and either Math 56 or Math 115" - can't fully encode;
    # simplify to just the entry-point requirement
    "MATH 151": [["MATH 61CM", "MATH 52"]],

    # ── MATSCI ───────────────────────────────────────────────────────────────────
    # MATSCI 131 is a co-requisite (listed under Corequisites:), not a prereq
    "MATSCI 162": [["MATSCI 143"]],
    "MATSCI 165": [["MATSCI 145"]],

    # ── ME ───────────────────────────────────────────────────────────────────────
    # "AA 242A or equivalent (recommended but not required)"
    "ME 242B": [],

    # ── MED clerkships ───────────────────────────────────────────────────────────
    "MED 302A": [["MED 300A"]],
    "MED 302B": [["MED 300A"]],
    "MED 303A": [["MED 300A"]],  # dept normalization: MEDICINE 300A → MED 300A
    "MED 303C": [["MED 300A"]],
    "MED 304A": [["MED 300A"]],
    "MED 307A": [["MED 300A"]],
    "MED 308A": [],  # "Completion of a full Medicine clerkship" - not specific
    "MED 311D": [["MED 300A"]],
    "MED 312C": [["MED 300A"]],
    "MED 313A": [],
    "MED 321A": [["MED 300A"]],
    "MED 322A": [["MED 300A"]],
    "MED 323A": [],  # "Any core clerkship" - not specific
    "MED 325A": [["MED 300A"]],
    "MED 326A": [],
    "MED 334A": [],  # "preferred but not required"
    "MED 334C": [["MED 300A"]],
    "MED 339B": [["MED 300A"]],
    "MED 343B": [],  # "requires written approval by Clerkship Director"
    "MED 344A": [],
    "MED 397A": [],  # spurious codes from date strings (P11A 5/5/25 etc.)

    # ── MUSIC ────────────────────────────────────────────────────────────────────
    # "MUSIC 65A/AZ or equivalent" - 65A and 65AZ are OR
    "MUSIC 65B":  [["MUSIC 65A", "MUSIC 65AZ"]],
    "MUSIC 65BZ": [["MUSIC 65A", "MUSIC 65AZ"]],
    # room number (111) and phone (650-723-...) generate spurious ROOM 111, MUSIC 650, MUSIC 723
    "MUSIC 72A": [["MUSIC 12C"]],

    # ── NSUR clerkships ──────────────────────────────────────────────────────────
    "NSUR 304A": [],
    "NSUR 318A": [["SURG 300A"]],
    "NSUR 398A": [],

    # ── OB ───────────────────────────────────────────────────────────────────────
    # "Enrollment in a PhD program" + cross-listing note - no course prereq
    "OB 672": [],

    # ── OCEANS ───────────────────────────────────────────────────────────────────
    # "introductory biology" - not a specific course; BIO 173HA is the cross-listed self
    "OCEANS 173H": [],

    # ── OPHT ─────────────────────────────────────────────────────────────────────
    "OPHT 300E": [],  # "One core clerkship" - not specific

    # ── ORTHO clerkships ─────────────────────────────────────────────────────────
    "ORTHO 303C": [["MED 300A"]],
    "ORTHO 304A": [],
    "ORTHO 306A": [["SURG 300A"]],
    "ORTHO 310A": [["SURG 300A"]],  # dept normalization: SURGERY 300A → SURG 300A
    "ORTHO 318A": [["ORTHO 306A"]],
    "ORTHO 398A": [],

    # ── OSPKYOTO ─────────────────────────────────────────────────────────────────
    # Date strings "2012-13" generate spurious OSPKYOTO 12/13 codes
    "OSPKYOTO 2K":  [["JAPANLNG 1", "JAPANLNG 7"]],
    "OSPKYOTO 3K":  [["JAPANLNG 2", "OSPKYOTO 2K", "JAPANLNG 8"]],
    "OSPKYOTO 21K": [["JAPANLNG 3", "JAPANLNG 7"]],

    # ── OSPMADRD ─────────────────────────────────────────────────────────────────
    # "11 or 21B ... or 12 or 22B" - all four are OR alternatives
    "OSPMADRD 13M": [["OSPMADRD 11", "OSPMADRD 21B", "OSPMADRD 12", "OSPMADRD 22B"]],
    "OSPMADRD 60":  [["SPANLANG 11", "SPANLANG 21B", "OSPMADRD 12", "OSPMADRD 22B"]],
    "OSPMADRD 92":  [["SPANLANG 11", "SPANLANG 21B", "OSPMADRD 12", "OSPMADRD 22B"]],

    # ── OSPPARIS ─────────────────────────────────────────────────────────────────
    # "PHYSICS 21 or 21S" - split as AND, should be OR
    "OSPPARIS 53": [["PHYSICS 21", "PHYSICS 21S"]],

    # ── OTOHNS clerkships ────────────────────────────────────────────────────────
    "OTOHNS 307A": [],  # "All scrub course/training needs to be completed" - not courses
    "OTOHNS 336A": [["SURG 300A"], ["OTOHNS 307A"]],
    "OTOHNS 398A": [],

    # ── OUTDOOR ──────────────────────────────────────────────────────────────────
    # "Rock Climbing 1" = OUTDOOR 10; "at least 3 months experience" not encodeable
    "OUTDOOR 11": [["OUTDOOR 10"]],

    # ── PATH clerkships ──────────────────────────────────────────────────────────
    "PATH 302A": [],
    "PATH 398A": [],

    # ── PEDS clerkships ──────────────────────────────────────────────────────────
    "PEDS 301A": [["PEDS 300A"]],
    "PEDS 302A": [["PEDS 300A"]],
    "PEDS 303A": [["PEDS 300A"]],  # visiting-student equiv note stripped
    "PEDS 304A": [["PEDS 300A"]],
    "PEDS 305A": [["PEDS 300A"]],
    "PEDS 306A": [["PEDS 300A"]],
    "PEDS 308A": [["PEDS 300A"]],
    "PEDS 312A": [["PEDS 300A"], ["MED 300A"]],
    "PEDS 315A": [["PEDS 300A"]],
    "PEDS 335A": [["PEDS 300A"]],
    "PEDS 336E": [["PEDS 300A"]],
    "PEDS 338A": [["PEDS 300A"]],  # dept normalization: PEDIATRICS 300A → PEDS 300A
    "PEDS 340D": [["PEDS 300A"]],
    "PEDS 398A": [["PEDS 300A"]],

    # ── PHIL ─────────────────────────────────────────────────────────────────────
    # "Psychology 1" - PSYCHOLOGY dept doesn't exist; Stanford undergrad dept is PSYCH
    "PHIL 124P": [["PSYCH 1"]],
    # "150 or preferably 151" - PREFERABLY 151 is spurious; both 150 and 151 are OR
    "PHIL 154": [["PHIL 150", "PHIL 151"]],

    # ── PHYSICS ──────────────────────────────────────────────────────────────────
    # "Physics 152/252 or equivalent" - slash = OR, split as AND
    "PHYSICS 253": [["PHYSICS 152", "PHYSICS 252"]],
    # "25 units of college physics" - spuriously parsed as PHYSICS 25
    "PHYSICS 293": [],

    # ── PHYSWELL ─────────────────────────────────────────────────────────────────
    # "play a par 5 using multiple clubs while performing 4 different types of shots"
    # PAR 5 and PERFORMING 4 are spurious from ability description
    "PHYSWELL 35": [],

    # ── PSYC clerkships ──────────────────────────────────────────────────────────
    "PSYC 300A": [],
    "PSYC 321A": [],
    "PSYC 326A": [["PSYC 300A"]],  # dept normalization: PSYCHIATRY 300A → PSYC 300A
    "PSYC 328B": [],
    "PSYC 353A": [["PSYC 300A"]],
    "PSYC 355A": [["PSYC 300A"]],
    "PSYC 358A": [["PSYC 300A"]],
    "PSYC 362B": [["PSYC 300A"]],
    "PSYC 398A": [["PSYC 300A"], ["MED 300A"]],

    # ── PUBLPOL ──────────────────────────────────────────────────────────────────
    # "Economics 50 or equivalent" - ECONOMICS dept normalization → ECON
    "PUBLPOL 325": [["ECON 50"]],

    # ── RAD clerkships ───────────────────────────────────────────────────────────
    # "Medicine 300A, Pediatrics 300A, or Surgery 300A strongly advised" - listed as prereq
    "RAD 301A": [["MED 300A", "PEDS 300A", "SURG 300A"]],
    "RAD 302A": [["MED 300A"]],  # dept normalization: MEDICINE 300A → MED 300A
    "RAD 304A": [["RAD 301A"]],  # dept normalization: RADIOLOGY 301A → RAD 301A
    "RAD 305A": [],  # "recommended but not required"
    "RAD 398A": [],  # conditional on specialty - too complex to encode

    # ── RUSSLANG ─────────────────────────────────────────────────────────────────
    # "RUSSLANG 2A, 3, 21, 22, or 23" - all OR, split as AND
    "RUSSLANG 55": [["RUSSLANG 2A", "RUSSLANG 3", "RUSSLANG 21",
                     "RUSSLANG 22", "RUSSLANG 23"]],

    # ── SPANLANG ─────────────────────────────────────────────────────────────────
    # "SPANLANG 13, 23B, or placement test equivalent to SPANLANG 100" - all OR
    # "SPANLANG 108SL is a requirement for HUMRTS 108" is reversed relationship, not a prereq
    "SPANLANG 108SL": [["SPANLANG 13", "SPANLANG 23B", "SPANLANG 100"]],

    # ── STATS ────────────────────────────────────────────────────────────────────
    # "STATS 60, STATS 110, STATS 141, or STATS 118" - all OR, split as AND
    "STATS 191": [["STATS 60", "STATS 110", "STATS 141", "STATS 118"]],
    # "STATS 191/203 and STATS 200" - 191/203 are OR, then AND 200
    "STATS 205": [["STATS 191", "STATS 203"], ["STATS 200"]],
    # "STATS 116/118, STATS 191/203" - two OR pairs, each AND
    "STATS 263": [["STATS 116", "STATS 118"], ["STATS 191", "STATS 203"]],

    # ── SURG clerkships ──────────────────────────────────────────────────────────
    "SURG 102":  [["SURG 101"]],  # dept normalization: SURGERY 101 → SURG 101
    "SURG 301A": [],  # "Dental or medical school student in 3rd/4th year" - not courses
    "SURG 310E": [["SURG 300A"]],  # dept normalization + spurious period/phone codes
    "SURG 314A": [],
    "SURG 317A": [["SURG 300A"]],
    "SURG 334A": [["SURG 300A"]],
    "SURG 339A": [["SURG 300A"]],
    "SURG 340A": [["ANES 306A"]],  # dept normalization: ANESTHESIA 306A → ANES 306A

    # ── UROL clerkships ──────────────────────────────────────────────────────────
    "UROL 308C": [],
    # "SURG 300A or Urology 308B" - dept normalization: UROLOGY → UROL; OR group
    "UROL 310B": [["SURG 300A", "UROL 308B"]],
    # "UROL 308A, UROL 308B, UROL 308C or SURG 300A" - spurious period/facility codes stripped
    "UROL 338C": [["UROL 308A"], ["UROL 308B"], ["UROL 308C", "SURG 300A"]],

    # ════════════════════════════════════════════════════════════════════════════
    # ── BATCH 2: AI pass - OR-split-as-AND, spurious codes, slash notation ────
    # ════════════════════════════════════════════════════════════════════════════

    # ── AA ───────────────────────────────────────────────────────────────────────
    # "AA 228/CS 238 or CS 221" - slash = OR; all three are OR alternatives
    "AA 229": [["AA 228", "CS 238", "CS 221"]],

    # ── ANES (additional) ────────────────────────────────────────────────────────
    # "ANES 300A. PERIODS AVAILABLE: 3A-12B" - 12B and 30 are spurious period codes
    "ANES 312A": [["ANES 300A"]],

    # ── BMDS ─────────────────────────────────────────────────────────────────────
    # "two of BIO 41, 42, 43, 44X, 44Y" - all are OR options; split as AND
    "BMDS 224": [["BIO 41", "BIO 42", "BIO 43", "BIO 44X", "BIO 44Y"]],
    # "CS 229, 231N, or 224N" - all OR; CS 224N missing from parsed groups
    "BMDS 271": [["CS 229", "CS 231N", "CS 224N"]],

    # ── CEE (additional) ─────────────────────────────────────────────────────────
    # "283 and either 285A or 285B" - EITHER is spurious dept; real: 283 AND (285A OR 285B)
    "CEE 287": [["CEE 283"], ["CEE 285A", "CEE 285B"]],

    # ── CHEM ─────────────────────────────────────────────────────────────────────
    # "superior work in CHEM 31A, 31B, 31M, or 33" - all OR; split as AND + dup 31M
    "CHEM 90": [["CHEM 31A", "CHEM 31B", "CHEM 31M", "CHEM 33"]],
    # "CHEM 181 or CHEM 141 or CHEMENG 181/281" - slash = OR; 281 split off as AND
    "CHEM 183": [["CHEM 181", "CHEM 141", "CHEMENG 181", "CHEMENG 281"]],
    # "CHEM 151 and either CHEM 173 or CHEM 171" - CHEM 171 deduped into second group
    "CHEM 253": [["CHEM 151"], ["CHEM 173", "CHEM 171"]],

    # ── CHEMENG ──────────────────────────────────────────────────────────────────
    # "CME 102/ENGR 155A and CME 104/ENGR 155B, or equivalents" - two slash-OR pairs
    "CHEMENG 300": [["CME 102", "ENGR 155A"], ["CME 104", "ENGR 155B"]],

    # ── CHPR (additional) ────────────────────────────────────────────────────────
    # "HUMBIO 2A, 3A, 4A or Biology Foundations" - all OR; split as AND
    "CHPR 113": [["HUMBIO 2A", "HUMBIO 3A", "HUMBIO 4A"]],

    # ── CME (additional) ─────────────────────────────────────────────────────────
    # "CME 108/Math 114 and one of Math 104 or Math 113" - slash pair, then OR pair
    "CME 302": [["CME 108", "MATH 114"], ["MATH 104", "MATH 113"]],

    # ── CS ───────────────────────────────────────────────────────────────────────
    # "CS 107 ... Familiarity with CS 45/CS 104" - 45/104 are familiarity, not hard prereqs
    "CS 40": [["CS 107"]],
    # "CS106B or CS106X; CS103. Soft prereqs: CS161 or CS111" - soft group dropped
    "CS 145": [["CS 106B", "CS 106X"], ["CS 103"]],
    # "CS 103 or 103B" - OR; split as AND
    "CS 154": [["CS 103", "CS 103B"]],
    # "Completion of at least 135 units" - unit count, not a course code
    "CS 191": [],
    "CS 191W": [],
    # "CS124, CS221, or CS229" - all OR; CS124 split as AND from the pair
    "CS 224N": [["CS 124", "CS 221", "CS 229"]],
    # "knowledge of ... CS106A/B/X, CS109, MATH 51/STATS 116, MATH 51" - all knowledge reqs;
    # simplify to the practical programming + probability + math prereqs
    "CS 229": [["CS 106B", "CS 106X"], ["CS 109", "STATS 116"], ["MATH 51"]],
    # "CS106B, plus a graduate AI course such as CS230, CS229, CS129, or CS221"
    "CS 236G": [["CS 106B"], ["CS 230", "CS 229", "CS 129", "CS 221"]],
    # "CS106B/X and CS161" - slash = OR for 106B/X; CS 106X missing from parsed groups
    "CS 269I": [["CS 106B", "CS 106X"], ["CS 161"]],
    # "CS229; knowledge of deep learning such as CS230, CS231N" - "such as" = soft
    "CS 329T": [["CS 229"]],
    # "CS107 or CS107E (required) and EE180 (recommended)" - EE180 explicitly recommended
    "CS 349H": [["CS 107", "CS 107E"]],

    # ── ECON (additional) ────────────────────────────────────────────────────────
    # "Econ 202, 203, 204, 270, 271, or consent" - all OR alternatives; split as AND
    "ECON 243": [["ECON 202", "ECON 203", "ECON 204", "ECON 270", "ECON 271"]],
    # "must complete 204 and 271" - COMPLETE is spurious dept from "must complete"
    "ECON 280": [["ECON 204"], ["ECON 271"]],

    # ── EDUC ─────────────────────────────────────────────────────────────────────
    # "263A. Sum, 263B. Aut, 263C. Win" is schedule info parsed as prereqs
    "EDUC 263B": [["EDUC 263A"]],
    "EDUC 263C": [["EDUC 263B"]],

    # ── FAMMED (additional) ──────────────────────────────────────────────────────
    # "FAMMED 301A, MED 300A/313A, OBGYN 300A or PEDS 300A. PERIODS AVAILABLE: 1-12"
    # slash = OR for MED pair; FAMMED 12 / LEAST 8 are spurious period codes
    "FAMMED 310A": [["FAMMED 301A"], ["MED 300A", "MED 313A"], ["OBGYN 300A", "PEDS 300A"]],
    # "Approval of coordinator and director 6 weeks before" - admin text, all spurious
    "FAMMED 345E": [],

    # ── FILMPROD ─────────────────────────────────────────────────────────────────
    # "FP101, FP101T or ENGL190F" - all OR; FP101 split as AND from the OR pair
    "FILMPROD 104": [["FP 101", "FP 101T", "ENGL 190F"]],

    # ── HORSE (additional) ───────────────────────────────────────────────────────
    # "Over 15 hours of riding time or completion of PE 65" - OVER 15 is spurious
    "HORSE 12": [["PE 65"]],

    # ── HUMBIO ───────────────────────────────────────────────────────────────────
    # "one of: HUMBIO 2A, BIO 81, 82, 85" - all OR; HUMBIO 85 is spurious (no such course)
    "HUMBIO 113": [["HUMBIO 2A", "BIO 81", "BIO 82", "BIO 85"]],
    # "HUMBIO 2A, 3A, 4A or BIO 83, 84, 86" - all OR alternatives; split as AND + wrong grouping
    "HUMBIO 132": [["HUMBIO 2A", "HUMBIO 3A", "HUMBIO 4A", "BIO 83", "BIO 84", "BIO 86"]],
    # "(HUMBIO 2A and 3A) or (BIO 82 and 83)" - AND-within-OR; cross-pair encoding
    "HUMBIO 151R": [["HUMBIO 2A", "BIO 82"], ["HUMBIO 3A", "BIO 83"]],
    # "HUMBIO 4A or PSYC 183 ... killing 115 people per day" - KILLING 115 spurious
    "HUMBIO 163": [["HUMBIO 4A", "PSYC 183"]],
    # "BIO 82 and BIO 84 ... about 1 in 68" - ABOUT 1 / HUMBIO 268B spurious from "1 in 68"
    "HUMBIO 164": [["BIO 82"], ["BIO 84"]],

    # ── ITALLANG ─────────────────────────────────────────────────────────────────
    # "ITALLANG 1, OSPFLOR 1F, or Placement Test" - both course codes are OR
    "ITALLANG 2": [["ITALLANG 1", "OSPFLOR 1F"]],
    # "ITALLANG 1Aor OSPFLOR 1A" - "1AOR" is a concatenation artifact; should be 1A OR
    "ITALLANG 2A": [["ITALLANG 1A", "OSPFLOR 1A"]],

    # ── MATH ─────────────────────────────────────────────────────────────────────
    # "Math 61DM or 61CM" - OR; split as AND
    "MATH 62DM": [["MATH 61DM", "MATH 61CM"]],
    "MATH 63DM": [["MATH 61DM", "MATH 61CM"]],
    # "Math 61CM or both Math 113 and Math 171" - 61CM alone OR (113 AND 171)
    "MATH 144": [["MATH 61CM", "MATH 113"], ["MATH 61CM", "MATH 171"]],
    # "Math 115 or 171" - OR; split as AND
    "MATH 175": [["MATH 115", "MATH 171"]],

    # ── MATSCI ───────────────────────────────────────────────────────────────────
    # "MATSCI 152 or 199" - OR; WEEK 1 / MATSCI 131 are spurious (lab-schedule text)
    "MATSCI 164": [["MATSCI 152", "MATSCI 199"]],
    # "MATSCI 181/211" - slash = OR; SECTION 182 / 02 / 212 spurious from enrollment note
    "MATSCI 182": [["MATSCI 181", "MATSCI 211"]],
    # "MATSCI 193/203" - slash = OR; split as AND
    "MATSCI 195": [["MATSCI 193", "MATSCI 203"]],
    # grad section of MATSCI 182; same prereq, same spurious codes
    "MATSCI 212": [["MATSCI 181", "MATSCI 211"]],
    # "MATSCI 152, 158, 164, 190 or equivalents are recommended but not required"
    "MATSCI 384": [],

    # ── ME ───────────────────────────────────────────────────────────────────────
    # "ENGR 40, CS 106, or equivalents" - "or equivalents" means each is required;
    # CS 106 is not a real code - expand to CS 106A/CS 106B
    "ME 210": [["ENGR 40"], ["CS 106A", "CS 106B"]],
    # "ME128/318 or consent; ME325 for students interested" - 325 is optional context
    "ME 213": [["ME 128", "ME 318S"]],
    # "ME103/203" - slash = OR; split as AND
    "ME 263": [["ME 103", "ME 203"]],

    # ── MED (additional) ─────────────────────────────────────────────────────────
    # "PREREQUISITES: None. PERIODS AVAILABLE: 1-12" - all groups are spurious period codes
    "MED 303B": [],
    # "ANES 306A or MED 300A. PERIODS AVAILABLE: 1-12" - MED 12 is spurious period code
    "MED 317C": [["ANES 306A", "MED 300A"]],

    # ── OBGYN ────────────────────────────────────────────────────────────────────
    # "PREREQUISITES: None. PERIODS AVAILABLE: 1-12" - all groups are spurious
    "OBGYN 300A": [],

    # ── OPHT (additional) ────────────────────────────────────────────────────────
    # "PREREQUISITES: None. PERIODS AVAILABLE: Period 1 only" - PERIOD 1 / OPHT 30 spurious
    "OPHT 302A": [],

    # ── OSPBER ───────────────────────────────────────────────────────────────────
    # "GERLANG 1, GERLANG 1A or Placement Test" - both course codes are OR
    "OSPBER 2Z": [["GERLANG 1", "GERLANG 1A"]],

    # ── OSPFLOR ──────────────────────────────────────────────────────────────────
    # "ITALLANG 21 ... or ITALLANG 21A or OSPFLOR 21F" - all three are OR
    "OSPFLOR 22F": [["ITALLANG 21", "ITALLANG 21A", "OSPFLOR 21F"]],
    # "ITALLANG 22A, 23 or placement" - both course codes are OR; split as AND
    "OSPFLOR 31F": [["ITALLANG 22A", "ITALLANG 23"]],

    # ── PHIL (additional) ────────────────────────────────────────────────────────
    # "Phil 125/225" - same course cross-listed; slash = OR
    "PHIL 127A": [["PHIL 125", "PHIL 225"]],
    # "OR one of: PHI 132, 134, 134A, 134B" - PHI is wrong dept (PHIL); all OR
    "PHIL 131": [["PHIL 132", "PHIL 134", "PHIL 134A", "PHIL 134B"]],
    # "Phil 80 and two more above 100" - ABOVE 100 / ATTEND 287 are spurious
    "PHIL 187": [["PHIL 80"]],

    # ── PHYSWELL (additional) ────────────────────────────────────────────────────
    # "Successfully complete swim skills assessment (front float, back float...)"
    # PHYSWELL 12 / PHYSWELL 50 are spurious; no course prereq, only skill assessment
    "PHYSWELL 51": [],

    # ── SPANLANG (additional) ────────────────────────────────────────────────────
    # "SPANLANG 11C, 11R, 11SL, or 21B" - all OR; split as AND + dup 11SL
    "SPANLANG 12C": [["SPANLANG 11C", "SPANLANG 11R", "SPANLANG 11SL", "SPANLANG 21B"]],

    # ════════════════════════════════════════════════════════════════════════════
    # ── BATCH 3: comprehensive AI pass - additional spurious + OR errors ───────
    # ════════════════════════════════════════════════════════════════════════════

    # ── ARABLANG ─────────────────────────────────────────────────────────────────
    # "ARABLANG 2A or 3" - OR; split as AND
    "ARABLANG 21A": [["ARABLANG 2A", "ARABLANG 3"]],

    # ── ARTHIST / ARTSTUDI / FILMEDIA ────────────────────────────────────────────
    # "Instructor consent and completion of Independent Study Form are required
    #  prior to end of WEEK 2 of the term. MCMURTRY 108..." - no course prereqs
    "ARTHIST 298":  [],
    "ARTSTUDI 246": [],
    "ARTSTUDI 250": [],
    "ARTSTUDI 261": [],
    "ARTSTUDI 272": [],
    "ARTSTUDI 273": [],
    "FILMEDIA 299": [],
    # "140, 145, or consent" - 140 and 145 are OR alternatives
    "ARTSTUDI 245": [["ARTSTUDI 140", "ARTSTUDI 145"]],

    # ── ATHLETIC ─────────────────────────────────────────────────────────────────
    # "Must be verified Olympic candidate... at least 30 hours (1 unit) or 60 hours (2 units)"
    # LEAST 30, ATHLETIC 60, ATHLETIC 10 are all spurious from unit descriptions
    "ATHLETIC 50": [],

    # ── BIO ──────────────────────────────────────────────────────────────────────
    # "Prerequisites: None. Please only enroll in the lecture section (section 01) on Axess."
    # SECTION 01 is an enrollment instruction, not a course code
    "BIO 82": [],
    "BIO 83": [],
    "BIO 84": [],

    # ── BIOE ─────────────────────────────────────────────────────────────────────
    # "BIOMEDIN 210 or 214 or 215 or 217 or 260" - all OR; split as AND
    "BIOE 212": [["BIOMEDIN 210", "BIOMEDIN 214", "BIOMEDIN 215",
                  "BIOMEDIN 217", "BIOMEDIN 260"]],

    # ── CEE ──────────────────────────────────────────────────────────────────────
    # "CEE 107H/207H, CEE 107R/207R, or permission" - two slash-OR pairs, both AND
    "CEE 107D": [["CEE 107H", "CEE 207H"], ["CEE 107R", "CEE 207R"]],

    # ── CHINA / CHINLANG ─────────────────────────────────────────────────────────
    # "CHINA 105/205 or equivalent" - slash = OR
    "CHINA 106": [["CHINA 105", "CHINA 205"]],
    # "CHINLANG 126/206 or equivalent" - slash = OR
    "CHINA 107": [["CHINLANG 126", "CHINLANG 206"]],
    # "Chinlang 103, Chinlang 103B or equivalent" - 103 and 103B are OR alternatives
    "CHINLANG 125": [["CHINLANG 103", "CHINLANG 103B"]],
    # "213/213B or equivalent" - slash = OR
    "CHINLANG 251": [["CHINLANG 213", "CHINLANG 213B"]],

    # ── CME ──────────────────────────────────────────────────────────────────────
    # "CME 200/ME 300A, equivalent, or consent" - slash = OR
    "CME 204": [["CME 200", "ME 300A"]],

    # ── COMM ─────────────────────────────────────────────────────────────────────
    # "COMM 104, EARTHSYS 191/291, or consent" - slash pair; MARCH 19 is application date
    "COMM 177C": [["COMM 104", "EARTHSYS 191", "EARTHSYS 291"]],

    # ── CS ───────────────────────────────────────────────────────────────────────
    # "CS106B, CS106X, or equivalent" - OR; split as AND
    "CS 41": [["CS 106B", "CS 106X"]],
    # "no formal pre-reqs but CS142/CS193x ... helps" - soft/informal; WEEK 1 spurious
    "CS 47": [],
    # "Prerequisite: CS106A." followed by enrollment note "See CS182 for lecture"
    # CS 182 and CS 100 are cross-enrollment notes; JANUARY 6 is a date
    "CS 182W": [["CS 106A"]],

    # ── EPI ──────────────────────────────────────────────────────────────────────
    # "EPI 258/259 or equivalent" - slash = OR
    "EPI 270": [["EPI 258", "EPI 259"]],

    # ── FAMMED ───────────────────────────────────────────────────────────────────
    # "PREREQUISITES: None. PERIODS AVAILABLE: 1-12, full time for 4 weeks, 10 students per period"
    # FAMMED 12 and FAMMED 10 are spurious period/enrollment counts
    "FAMMED 301A": [],

    # ── FRENLANG ─────────────────────────────────────────────────────────────────
    # "FRENLANG 22C or 23C or equivalent" - OR; split as AND
    "FRENLANG 120": [["FRENLANG 22C", "FRENLANG 23C"]],

    # ── GEP ──────────────────────────────────────────────────────────────────────
    # "GEP 106/206, EARTHSYS 185, or consent" - slash pair; all OR alternatives
    "GEP 107": [["GEP 106", "GEP 206", "EARTHSYS 185"]],

    # ── MATSCI ───────────────────────────────────────────────────────────────────
    # "MATSCI 195/205 or equivalent" - slash = OR
    "MATSCI 199": [["MATSCI 195", "MATSCI 205"]],

    # ── ME ───────────────────────────────────────────────────────────────────────
    # "ME103 or equivalent ... ME 203 or consent" - 103 and 203 are UG/grad equivalents → OR
    "ME 318": [["ME 103", "ME 203"]],

    # ── MED (additional) ─────────────────────────────────────────────────────────
    # "MED 300A. PERIODS AVAILABLE: P1-12" → MED 12 and MED 211 spurious period codes
    "MED 306A": [["MED 300A"]],
    # "Completion of internal medicine core clerkship. PERIODS AVAILABLE: 4-11"
    # MED 11, DIRECTLY 2 spurious; clerkship completion = informal, not specific course
    "MED 324E": [],
    # "MED 300A. PERIODS AVAILABLE: 1-12" → MED 12, WONG 2, MED 100, MED 30 spurious
    "MED 325B": [["MED 300A"]],
    # "MED 300A. PERIODS AVAILABLE: 1-12" → MED 12, EPENA 28, MED 45 spurious
    "MED 330A": [["MED 300A"]],

    # ── MGTECON ──────────────────────────────────────────────────────────────────
    # "MGTECON 607, STATS 300B, or equivalent" - all OR alternatives
    "MGTECON 661": [["MGTECON 607", "STATS 300B"]],

    # ── MS&E ─────────────────────────────────────────────────────────────────────
    # "212, CS 261, or equivalent" - MS&E 212 and CS 261 are OR alternatives
    "MS&E 319": [["MS&E 212", "CS 261"]],

    # ── MUSIC ────────────────────────────────────────────────────────────────────
    # "MUSIC 65B or 65BZ, or equivalent" - OR; split as AND
    "MUSIC 73":  [["MUSIC 65B", "MUSIC 65BZ"]],
    "MUSIC 73Z": [["MUSIC 65B", "MUSIC 65BZ"]],

    # ── NENS ─────────────────────────────────────────────────────────────────────
    # "PREREQUISITES: None. ... NENS 12, LEUNGK 25" - all spurious from clerkship admin text
    "NENS 301A": [],

    # ── NSUR (additional) ────────────────────────────────────────────────────────
    # "PREREQUISITES: None. PERIODS AVAILABLE: 1-12" - NSUR 12, PEREZ 3, BUILDING 100, NSUR 129 spurious
    "NSUR 304B": [],

    # ── OBGYN ────────────────────────────────────────────────────────────────────
    # "PREREQUISITES: OBGYN 300A. PERIODS AVAILABLE: 1-12" - OBGYN 12 is spurious period code
    "OBGYN 304A": [["OBGYN 300A"]],
    # "PREREQUISITES: OBGYN 300A and SURG 300A. PERIODS AVAILABLE: 1-12" - OBGYN 12, OBGYN 300 spurious
    "OBGYN 305A": [["OBGYN 300A"], ["SURG 300A"]],
    # "PREREQUISITES: OBGYN 300A. PERIODS AVAILABLE: 1-12" - OBGYN 12, OBGYN 725 spurious
    "OBGYN 307A": [["OBGYN 300A"]],
    # "PREREQUISITES: OBGYN 300A. PERIODS AVAILABLE: 1-12" - OBGYN 12 spurious
    "OBGYN 308A": [["OBGYN 300A"]],

    # ── OSPMADRD ─────────────────────────────────────────────────────────────────
    # "SPANLANG 13 or 23B or equivalent placement" - OR; split as AND (6 courses same prereq)
    "OSPMADRD 190": [["SPANLANG 13", "SPANLANG 23B"]],
    "OSPMADRD 191": [["SPANLANG 13", "SPANLANG 23B"]],
    "OSPMADRD 192": [["SPANLANG 13", "SPANLANG 23B"]],
    "OSPMADRD 193": [["SPANLANG 13", "SPANLANG 23B"]],
    "OSPMADRD 194": [["SPANLANG 13", "SPANLANG 23B"]],
    "OSPMADRD 195": [["SPANLANG 13", "SPANLANG 23B"]],

    # ── PHIL ─────────────────────────────────────────────────────────────────────
    # "PHIL 80 and at least one other PHIL course numbered over 99" - OVER 99 spurious
    "PHIL 180": [["PHIL 80"]],
    # "For undergrads Phil 80 and at least one further course ... numbered above 99" - ABOVE 99 spurious
    "PHIL 187C": [["PHIL 80"]],

    # ── PHYSWELL ─────────────────────────────────────────────────────────────────
    # "one of the following PE classes: PE 12, PE 5, PE 7, PE 14, PE 16, PE 17" - all OR
    "PHYSWELL 13": [["PE 12", "PE 5", "PE 7", "PE 14", "PE 16", "PE 17"]],
    # "Successfully complete swim skills assessment (front float, back float...)" - SWIM 50/2 spurious
    "PHYSWELL 52": [["PHYSWELL 51"]],
    # "Ability to swim 100 yards ... SWIM 100, PHYSWELL 100, X 50" - all spurious ability descriptors
    "PHYSWELL 53": [["PHYSWELL 52"]],
    # "Ability to tread deep water... swim 100/200 meter intervals under 5/9 minutes" - ability desc
    "PHYSWELL 54": [],
    "PHYSWELL 55": [],

    # ── POLISCI ──────────────────────────────────────────────────────────────────
    # "POLISCI 450A ... SCI 450A, SCI 450B" wrong dept; "DECEMBER 1" is a date
    "POLISCI 450B": [["POLISCI 450A"]],

    # ── PORTLANG ─────────────────────────────────────────────────────────────────
    # "PORTLANG 2A, PORTLANG 3 or equivalent" - OR; split as AND
    "PORTLANG 11A": [["PORTLANG 2A", "PORTLANG 3"]],

    # ── PSYC (additional) ────────────────────────────────────────────────────────
    # "PREREQUISITES: None. PERIODS AVAILABLE: 2-12" - PSYC 12, JQUTOB 1 spurious
    "PSYC 333A": [],

    # ── RADO ─────────────────────────────────────────────────────────────────────
    # "MED 300A and/or SURG 300A. PERIODS AVAILABLE: 1-5, 9-12" - RADO 12 spurious period code
    "RADO 300A": [["MED 300A", "SURG 300A"]],

    # ── SPANLANG ─────────────────────────────────────────────────────────────────
    # "SPANLANG 12C, 12R or 12SL" - all OR; split as AND
    "SPANLANG 13C": [["SPANLANG 12C", "SPANLANG 12R", "SPANLANG 12SL"]],

    # ── STRAMGT ──────────────────────────────────────────────────────────────────
    # "STRAMGT 356 / BIOE 376 / SUSTAIN 376" - slash notation = all OR alternatives
    "STRAMGT 366": [["STRAMGT 356", "BIOE 376", "SUSTAIN 376"]],

    # ── SURG (additional) ────────────────────────────────────────────────────────
    # "SURG 300A, Surgery Core Clerkship. PERIODS AVAILABLE: Visiting students: Periods 1-4 only"
    # PERIODS 1 and PERIOD 12 are spurious from visiting-student schedule text
    "SURG 338A": [["SURG 300A"]],
}

# Full-catalog semantic audit of the stored `prerequisites` text against the
# generated `prereqGroups`.  These entries intentionally exclude recommended,
# preferred, helpful, encouraged, suggested, desirable, concurrent/corequisite,
# registration-only, and administrative references.
CORRECTIONS.update({
    # Recommended/optional references that are not prerequisites.
    "BIOS 216": [],
    "CHPR 282": [],
    "CS 356": [],
    "MATSCI 156": [],
    "MATSCI 256": [],
    "ME 132": [["ME 30"]],
    "OCEANS 186H": [],
    "STATS 116X": [],

    # Required courses missed by compact notation or complex prose.
    "CS 193P": [["CS 106A"], ["CS 106B", "CS 106X"], ["CS 107"]],
    "CS 229": [["CS 106A", "CS 106B", "CS 106X"],
               ["CS 109", "MATH 151", "STATS 116"],
               ["MATH 51", "CS 205"]],
    "CS 324H": [["CS 224C", "CS 224N", "CS 224U", "CS 224S", "CS 329X", "CS 384"]],
    "FRENLANG 124": [["FRENLANG 23C"]],
    "GERLANG 2": [["GERLANG 1"]],
    "GERLANG 3": [["GERLANG 2"]],
    "GERLANG 21": [["GERLANG 3"]],
    "GERLANG 22": [["GERLANG 21"]],
    "GERLANG 23": [["GERLANG 22"]],
    "KORLANG 3": [["KORLANG 2"]],
    "LINGUIST 180": [["CS 106B"], ["CS 106A"], ["CS 109"], ["CS 107"]],
    "MGTECON 604": [["ECON 270", "MGTECON 603"]],
    "PWR 99BNCR": [["PWR 194NCR"]],
    "RUSSLANG 101": [["RUSSLANG 23"]],

    # User-confirmed interpretations for ambiguous source text/schema limits.
    "HEBRLANG 2": [["HEBRLANG 1"]],  # source incorrectly names the course itself
    "CS 221": [["CS 103", "CS 103B"], ["CS 106B", "CS 106X"], ["CS 109"], ["CS 161"]],

    # Incorrect AND/OR structure.
    "ARABLANG 21A": [["ARABLANG 2A", "ARABLANG 3"]],
    "ARTSTUDI 245": [["ARTSTUDI 140", "ARTSTUDI 145"]],
    "BIOE 212": [["BIOMEDIN 210", "BIOMEDIN 214", "BIOMEDIN 215", "BIOMEDIN 217", "BIOMEDIN 260"]],
    "CEE 107D": [["CEE 107H", "CEE 207H"], ["CEE 107R", "CEE 207R"]],
    "CHINA 106": [["CHINA 105", "CHINA 205"]],
    "CHINA 107": [["CHINLANG 126", "CHINLANG 206"]],
    "CHINLANG 125": [["CHINLANG 103", "CHINLANG 103B"]],
    "CHINLANG 251": [["CHINLANG 213", "CHINLANG 213B"]],
    "CME 104": [["CME 102", "ENGR 155A"]],
    "CME 204": [["CME 200", "ME 300A"]],
    "CME 206": [["CME 200", "ME 300A"], ["CME 204", "ME 300B"]],
    "CS 25": [["CS 224N", "CS 231N", "CS 230"]],
    "CS 41": [["CS 106B", "CS 106X"]],
    "GEP 107": [["GEP 106", "GEP 206", "EARTHSYS 185"]],
    "MUSIC 73": [["MUSIC 65B", "MUSIC 65BZ"]],
    "MUSIC 73Z": [["MUSIC 65B", "MUSIC 65BZ"]],
    "MS&E 319": [["MS&E 212", "CS 261"]],
    "OSPMADRD 190": [["SPANLANG 13", "SPANLANG 23B"]],
    "OSPMADRD 191": [["SPANLANG 13", "SPANLANG 23B"]],
    "OSPMADRD 192": [["SPANLANG 13", "SPANLANG 23B"]],
    "OSPMADRD 193": [["SPANLANG 13", "SPANLANG 23B"]],
    "OSPMADRD 194": [["SPANLANG 13", "SPANLANG 23B"]],
    "OSPMADRD 195": [["SPANLANG 13", "SPANLANG 23B"]],
    "OSPPARIS 23P": [["FRENLANG 21C", "FRENLANG 22C", "OSPPARIS 22P"]],
    "OSPSANTG 13S": [["OSPSANTG 11", "OSPSANTG 21B", "OSPSANTG 12", "OSPSANTG 22B"]],
    "PORTLANG 11A": [["PORTLANG 2A", "PORTLANG 3"]],
    "SPANLANG 12R": [["SPANLANG 11C", "SPANLANG 11R", "SPANLANG 11SL", "SPANLANG 21B"]],
    "SPANLANG 12SL": [["SPANLANG 11C", "SPANLANG 11R", "SPANLANG 11SL", "SPANLANG 21B"]],
    "SPANLANG 13C": [["SPANLANG 12C", "SPANLANG 12R", "SPANLANG 12SL"]],
    "SPANLANG 13R": [["SPANLANG 12C", "SPANLANG 12R", "SPANLANG 12M", "SPANLANG 12S",
                       "SPANLANG 22B", "SPANLANG 21SL"]],
    "SPANLANG 101": [["SPANLANG 13C", "SPANLANG 13R", "SPANLANG 13SL", "SPANLANG 23B",
                       "SPANLANG 13S", "SPANLANG 13M"]],

    # Administrative prose, measurements, dates, and annotations parsed as courses.
    "ARABLANG 10": [],
    "CEE 260D": [],
    "CHEM 223": [["CHEM 123"]],
    "CS 183E": [],
    "EPS 190": [["EPS 1"], ["EPS 102"], ["EPS 105"]],
    "FEMGEN 108": [],
    "GSBGEN 393": [["STRAMGT 546"]],
    "MATSCI 145": [["MATSCI 144"]],
    "PHYSWELL 34": [],
    "PUBLPOL 109Q": [],
    "RAD 306A": [],

    # Clerkship schedule, location, contact, and student-year leakage.
    "DERM 398A": [],
    "EMED 308A": [],
    "EMED 313A": [["EMED 301A"]],
    "MED 300A": [],
    "MED 305A": [["MED 300A"]],
    "MED 308C": [["MED 300A"]],
    "MED 314A": [["MED 300A"]],
    "MED 325C": [["MED 300A"]],
    "MED 328A": [],
    "MED 330C": [["MED 300A"]],
    "MED 347A": [],
    "NENS 307A": [],
    "NENS 308A": [],
    "NSUR 304C": [],
    "OPHT 300A": [],
    "OPHT 301A": [],
    "PEDS 300A": [],
    "RAD 303A": [],
    "SURG 300A": [],
    "SURG 319A": [["SURG 300A"]],
    "UROL 308A": [],
    "UROL 308B": [],
    "UROL 338A": [["UROL 308A"], ["UROL 308B"], ["UROL 308C", "SURG 300A"]],
    "UROL 398A": [],

    # Registration directions, corequisites, reversed exclusions, and shared prose.
    "CS 499": [],
    "CS 499P": [],
    "EE 290B": [["EE 290A"]],
    "EE 290C": [["EE 290B"]],
    "EE 290D": [["EE 290C"]],
    "EE 290E": [["EE 290D"]],
    "MATSCI 161": [["MATSCI 156"]],
    "ME 80": [["ENGR 14"]],
    "OCEANS 173H": [],
    "PHIL 80": [],
    "POLISCI 450B": [["POLISCI 450A"]],
    "STATS 298": [],
    "STATS 398": [],
})

# ════════════════════════════════════════════════════════════════════════════
# ── BATCH 4: independent comprehensive pass - new spurious codes / OR bugs ─
# ════════════════════════════════════════════════════════════════════════════
CORRECTIONS.update({
    # ── IMMUNOL ──────────────────────────────────────────────────────────────────
    # "IMMUNOL 201/MI 211" - slash = OR; split as AND
    "IMMUNOL 202": [["IMMUNOL 201", "MI 211"]],

    # ── ITALLANG ─────────────────────────────────────────────────────────────────
    # "ITALLANG 2A, ITALLANG 3" - OR alternatives (two parallel tracks into this level)
    "ITALLANG 20":  [["ITALLANG 2A", "ITALLANG 3"]],
    "ITALLANG 21A": [["ITALLANG 2A", "ITALLANG 3"]],

    # ── JAPANLNG ─────────────────────────────────────────────────────────────────
    # URL "page_id=263" in prereq text produces spurious JAPANLNG 263
    "JAPANLNG 211": [["JAPANLNG 103"]],
    "JAPANLNG 212": [["JAPANLNG 211"]],
    "JAPANLNG 213": [["JAPANLNG 212"]],
    # URL "page_id=23" produces spurious JAPANLNG 23
    "JAPANLNG 22":  [["JAPANLNG 21"]],

    # ── MATSCI ───────────────────────────────────────────────────────────────────
    # "MATSCI 193/203" - slash = OR; split as AND
    "MATSCI 198": [["MATSCI 193", "MATSCI 203"]],

    # ── OCEANS ───────────────────────────────────────────────────────────────────
    # "80 miles south of Stanford's main campus" → OCEANS 80 spurious from distance text
    "OCEANS 200H": [],
    # "Formally BIOHOPK 290H" = formerly-known-as note, not a course prereq
    "OCEANS 290H": [],

    # ── OIT ──────────────────────────────────────────────────────────────────────
    # "MATH 113, 115, or equivalent" - OR (either course satisfies the prereq)
    "OIT 676": [["MATH 113", "MATH 115"]],

    # ── OSPKYOTO ─────────────────────────────────────────────────────────────────
    # URL "page_id=39" produces spurious OSPKYOTO 39
    "OSPKYOTO 101K": [["JAPANLNG 23"]],

    # ── OSPPARIS ─────────────────────────────────────────────────────────────────
    # "French 1A" - parser kept English dept name "FRENCH" instead of "FRENLANG"
    "OSPPARIS 2A": [["FRENLANG 1A"]],

    # ── PHYSWELL ─────────────────────────────────────────────────────────────────
    # "90-yard target space", "fly a ball over [a] 140-yard..." → PHYSWELL 90/140 spurious
    "PHYSWELL 36": [],

    # ── POLISCI ──────────────────────────────────────────────────────────────────
    # "POLISCI 150A/355A" - slash = OR; split as AND
    "POLISCI 150B": [["POLISCI 150A", "POLISCI 355A"]],

    # ── PSYCH ────────────────────────────────────────────────────────────────────
    # "1, 10, and consent" - PSYCH 1 AND PSYCH 10 both required; PSYCH 1 was dropped
    "PSYCH 195": [["PSYCH 1"], ["PSYCH 10"]],

    # ── SYMSYS ───────────────────────────────────────────────────────────────────
    # "beyond the level of PSYCH 1" - PSYCH 1 is the minimum bar, NOT the prereq itself
    "SYMSYS 203": [],
})


def norm_key(dept: str, number: str) -> str:
    return f"{dept.strip().upper()} {number.strip().upper()}"


def main():
    base = Path(__file__).parent.parent / "src" / "data" / "catalog"
    core_path = base / "courses-core-2627.json"

    print("Reading core catalog...")
    core = json.loads(core_path.read_text())

    applied = 0
    not_found = []

    for course in core:
        key = norm_key(course["depts"][0], course["numbers"][0])
        if key in CORRECTIONS:
            course["prereqGroups"] = CORRECTIONS[key]
            applied += 1

    # Verify all correction keys were found
    all_keys = {norm_key(c["depts"][0], c["numbers"][0]) for c in core}
    for k in CORRECTIONS:
        if k not in all_keys:
            not_found.append(k)

    print(f"Applied {applied} corrections.")
    if not_found:
        print(f"WARNING: {len(not_found)} correction keys not found in catalog:")
        for k in not_found:
            print(f"  {k}")

    print(f"Writing {core_path}...")
    core_path.write_text(json.dumps(core, ensure_ascii=False, separators=(",", ":")))
    print("Done.")


if __name__ == "__main__":
    main()
