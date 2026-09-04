import type { MajorConfig } from '../majorSchema';
import { CS_MS_2526 } from './cs-ms-2526';
import { MSE_MS_2526 } from './mse-ms-2526';
import { CEE_MS_2526 } from './cee-ms-2526';
import { AA_MS_2526 } from './aa-ms-2526';
import { MATSCI_MS_2526 } from './matsci-ms-2526';
import { CHEMENG_MS_2526 } from './chemeng-ms-2526';
import { EE_MS_2526 } from './ee-ms-2526';
import { STATS_MS_2526 } from './stats-ms-2526';
import { BIOE_MS_2526 } from './bioe-ms-2526';
import { ME_MS_2526 } from './me-ms-2526';
import { CME_MS_2526 } from './cme-ms-2526';
import { BMDS_MS_2526 } from './bmds-ms-2526';
import { INTLPOL_MA_2526 } from './intlpol-ma-2526';
import { PUBLPOL_MA_2526 } from './publpol-ma-2526';
import { BIO_MS_2526 } from './bio-ms-2526';
import { DESIGN_MS_2526 } from './design-ms-2526';
import { COMM_MA_2526 } from './comm-ma-2526';
import { HISTORY_MA_2526 } from './history-ma-2526';
import { SOCIO_MA_2526 } from './socio-ma-2526';
import { SYMBO_MS_2526 } from './symbo-ms-2526';

export const BUILT_IN_COTERMS: MajorConfig[] = [CS_MS_2526, MSE_MS_2526, CEE_MS_2526, AA_MS_2526, MATSCI_MS_2526, CHEMENG_MS_2526, EE_MS_2526, STATS_MS_2526, BIOE_MS_2526, ME_MS_2526, CME_MS_2526, BMDS_MS_2526, INTLPOL_MA_2526, PUBLPOL_MA_2526, BIO_MS_2526, DESIGN_MS_2526, COMM_MA_2526, HISTORY_MA_2526, SOCIO_MA_2526, SYMBO_MS_2526];
export const BUILT_IN_COTERM_MAP: Record<string, MajorConfig> = Object.fromEntries(
  BUILT_IN_COTERMS.map(m => [m.id, m])
);
