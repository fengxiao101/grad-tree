import type { MajorConfig } from '../../data/majorSchema';
import type { ProgramSummary } from '../../data/programRegistry';

// Turning program configs into entries for the searchable pickers.

// Maps id-prefix → canonical dept abbreviation for search keywords.
// Only entries that differ from the prefix itself are listed.
export const DEPT_KEYWORD: Record<string, string> = {
  humbi: 'humbio',
  symbo: 'symsys',
  mse: 'ms&e mse management science engineering',
  polisci: 'polisci political science',
  datasci: 'datasci data science ds',
  cs: 'cs computer science',
  ee: 'ee electrical engineering',
  me: 'me mechanical engineering',
  econ: 'econ economics',
  math: 'math mathematics',
  bio: 'bio biology',
  psych: 'psych psychology',
  stats: 'stats statistics',
  music: 'music',
  energy: 'energy science engineering ese',
  pubpol: 'public policy publpol',
  ling: 'linguistics ling',
  socio: 'sociology soc',
  anthro: 'anthropology anthro',
  humrts: 'human rights humrts',
  complit: 'comparative literature complit',
  geoph: 'geophysics geophys',
};

export type ProgramOption = Pick<MajorConfig, 'id' | 'name' | 'school' | 'year'> | ProgramSummary;

function programKeywords(m: ProgramOption): string {
  const prefix = m.id.split('-')[0];
  const dept = DEPT_KEYWORD[prefix] ?? prefix;
  return `${dept} ${m.name} ${m.school}`.toLowerCase();
}

export interface SearchOption { value: string; label: string; keywords: string; group: string; }

export function configsToOptions(configs: ProgramOption[], group: string): SearchOption[] {
  return configs
    .map(m => ({
      value: m.id,
      label: m.name,
      keywords: programKeywords(m),
      group,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
