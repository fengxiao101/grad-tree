import type { MajorConfig } from '../majorSchema';
import { MUSIC_MINOR_2526 } from './music-minor-2526';
import { CS_MINOR_2526 } from './cs-minor-2526';
import { ECON_MINOR_2526 } from './econ-minor-2526';
import { MATH_MINOR_2526 } from './math-minor-2526';
import { STATS_MINOR_2526 } from './stats-minor-2526';
import { DATASCI_MINOR_2526 } from './datasci-minor-2526';
import { BIO_MINOR_2526 } from './bio-minor-2526';
import { PSYCH_MINOR_2526 } from './psych-minor-2526';
import { PHYS_MINOR_2526 } from './phys-minor-2526';
import { POLISCI_MINOR_2526 } from './polisci-minor-2526';
import { HISTORY_MINOR_2526 } from './history-minor-2526';
import { CHEM_MINOR_2526 } from './chem-minor-2526';
import { COMM_MINOR_2526 } from './comm-minor-2526';
import { EARTHSYS_MINOR_2526 } from './earthsys-minor-2526';
import { ENGLISH_MINOR_2526 } from './english-minor-2526';
import { PHIL_MINOR_2526 } from './phil-minor-2526';
import { EE_MINOR_2526 } from './ee-minor-2526';
import { MATSCI_MINOR_2526 } from './matsci-minor-2526';
import { FILM_MINOR_2526 } from './film-minor-2526';
import { ETHSO_MINOR_2526 } from './ethso-minor-2526';
import { CRWRIT_MINOR_2526 } from './crwrit-minor-2526';
import { HUMBI_MINOR_2526 } from './humbi-minor-2526';
import { INTLR_MINOR_2526 } from './intlr-minor-2526';
import { SYMBO_MINOR_2526 } from './symbo-minor-2526';
import { MSE_MINOR_2526 } from './mse-minor-2526';
import { ME_MINOR_2526 } from './me-minor-2526';
import { ENERGY_MINOR_2526 } from './energy-minor-2526';
import { PUBPOL_MINOR_2526 } from './pubpol-minor-2526';
import { LING_MINOR_2526 } from './ling-minor-2526';
import { SOCIO_MINOR_2526 } from './socio-minor-2526';
import { ANTHRO_MINOR_2526 } from './anthro-minor-2526';
import { HUMRTS_MINOR_2526 } from './humrts-minor-2526';
import { COMPLIT_MINOR_2526 } from './complit-minor-2526';
import { GEOPH_MINOR_2526 } from './geoph-minor-2526';

export const BUILT_IN_MINORS: MajorConfig[] = [
  MUSIC_MINOR_2526,
  CS_MINOR_2526,
  ECON_MINOR_2526,
  MATH_MINOR_2526,
  STATS_MINOR_2526,
  DATASCI_MINOR_2526,
  BIO_MINOR_2526,
  PSYCH_MINOR_2526,
  PHYS_MINOR_2526,
  POLISCI_MINOR_2526,
  HISTORY_MINOR_2526,
  CHEM_MINOR_2526,
  COMM_MINOR_2526,
  EARTHSYS_MINOR_2526,
  ENGLISH_MINOR_2526,
  PHIL_MINOR_2526,
  EE_MINOR_2526,
  MATSCI_MINOR_2526,
  FILM_MINOR_2526,
  ETHSO_MINOR_2526,
  CRWRIT_MINOR_2526,
  HUMBI_MINOR_2526,
  INTLR_MINOR_2526,
  SYMBO_MINOR_2526,
  MSE_MINOR_2526,
  ME_MINOR_2526,
  ENERGY_MINOR_2526,
  PUBPOL_MINOR_2526,
  LING_MINOR_2526,
  SOCIO_MINOR_2526,
  ANTHRO_MINOR_2526,
  HUMRTS_MINOR_2526,
  COMPLIT_MINOR_2526,
  GEOPH_MINOR_2526,
];

export const BUILT_IN_MINOR_MAP: Record<string, MajorConfig> = Object.fromEntries(
  BUILT_IN_MINORS.map(m => [m.id, m])
);
