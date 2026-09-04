import type { MajorConfig } from '../majorSchema';
import { AA_BS_2526 } from './aa-bs-2526';
import { ARTHIST_BA_2526 } from './arthist-ba-2526';
import { CEE_BS_2526 } from './cee-bs-2526';
import { ANTHRO_BA_2526 } from './anthro-ba-2526';
import { BIO_BS_2526 } from './bio-bs-2526';
import { CHEM_BS_2526 } from './chem-bs-2526';
import { CHEMENG_BS_2526 } from './chemeng-bs-2526';
import { COMM_BA_2526 } from './comm-ba-2526';
import { CSRE_BA_2526 } from './csre-ba-2526';
import { BIOC_BS_2526 } from './bioc-bs-2526';
import { BIOE_BS_2526 } from './bioe-bs-2526';
import { CS_BS_2526 } from './cs-bs-2526';
import { DATASCI_BS_2526 } from './datasci-bs-2526';
import { DESIGN_BS_2526 } from './design-bs-2526';
import { EARTHSYS_BS_2526 } from './earthsys-bs-2526';
import { ECON_BA_2526 } from './econ-ba-2526';
import { ENERGY_BS_2526 } from './energy-bs-2526';
import { ECON_BS_2526 } from './econ-bs-2526';
import { EE_BS_2526 } from './ee-bs-2526';
import { ENGLISH_BA_2526 } from './english-ba-2526';
import { HISTORY_BA_2526 } from './history-ba-2526';
import { HUMBI_BS_2526 } from './humbi-bs-2526';
import { IR_BA_2526 } from './ir-ba-2526';
import { LING_BA_2526 } from './ling-ba-2526';
import { MATH_BS_2526 } from './math-bs-2526';
import { MATSCI_BS_2526 } from './matsci-bs-2526';
import { ME_BS_2526 } from './me-bs-2526';
import { MUSIC_BA_2526 } from './music-ba-2526';
import { MSE_BS_2526 } from './mse-bs-2526';
import { PHIL_BA_2526 } from './phil-ba-2526';
import { PHYS_BS_2526 } from './phys-bs-2526';
import { POLISCI_BA_2526 } from './polisci-ba-2526';
import { PSYCH_BA_2526 } from './psych-ba-2526';
import { PUBLPOL_BA_2526 } from './publpol-ba-2526';
import { SOCIO_BA_2526 } from './socio-ba-2526';
import { STS_BA_2526 } from './sts-ba-2526';
import { STS_BS_2526 } from './sts-bs-2526';
import { SYMBO_BS_2526 } from './symbo-bs-2526';
import { URBANST_BA_2526 } from './urbanst-ba-2526';

// Built-in (hardcoded) majors: shown as defaults in the dropdown
export const BUILT_IN_MAJORS: MajorConfig[] = [
  AA_BS_2526,
  ANTHRO_BA_2526,
  ARTHIST_BA_2526,
  CEE_BS_2526,
  BIO_BS_2526,
  BIOC_BS_2526,
  CHEM_BS_2526,
  CHEMENG_BS_2526,
  COMM_BA_2526,
  CSRE_BA_2526,
  BIOE_BS_2526,
  CS_BS_2526,
  DATASCI_BS_2526,
  DESIGN_BS_2526,
  EARTHSYS_BS_2526,
  ECON_BA_2526,
  ENERGY_BS_2526,
  ECON_BS_2526,
  EE_BS_2526,
  ENGLISH_BA_2526,
  HISTORY_BA_2526,
  HUMBI_BS_2526,
  IR_BA_2526,
  LING_BA_2526,
  MATH_BS_2526,
  MATSCI_BS_2526,
  ME_BS_2526,
  MUSIC_BA_2526,
  MSE_BS_2526,
  PHIL_BA_2526,
  PHYS_BS_2526,
  POLISCI_BA_2526,
  PSYCH_BA_2526,
  PUBLPOL_BA_2526,
  SOCIO_BA_2526,
  STS_BA_2526,
  STS_BS_2526,
  SYMBO_BS_2526,
  URBANST_BA_2526,
];

export const BUILT_IN_MAJOR_MAP: Record<string, MajorConfig> = Object.fromEntries(
  BUILT_IN_MAJORS.map(m => [m.id, m])
);

// Backward compat
export const ALL_MAJORS = BUILT_IN_MAJORS;
export const MAJOR_MAP = BUILT_IN_MAJOR_MAP;
