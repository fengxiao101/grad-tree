import type { MajorConfig } from './majorSchema';
import { PROGRAM_MODULE_PATHS, PROGRAM_SUMMARIES } from './programManifest.generated';

export type ProgramCategory = 'major' | 'minor' | 'coterm';

export interface ProgramSummary {
  id: string;
  name: string;
  school: string;
  year: string;
  category: ProgramCategory;
}

type ProgramModule = Record<string, unknown>;
type ProgramLoader = () => Promise<ProgramModule>;

const modules = import.meta.glob<ProgramModule>([
  './majors/*-2526.ts',
  './minors/*-2526.ts',
  './cotermPrograms/*-2526.ts',
]);

const configCache = new Map<string, MajorConfig>();
const pendingLoads = new Map<string, Promise<MajorConfig | null>>();

export const BUILT_IN_MAJOR_OPTIONS = PROGRAM_SUMMARIES.filter(p => p.category === 'major');
export const BUILT_IN_MINOR_OPTIONS = PROGRAM_SUMMARIES.filter(p => p.category === 'minor');
export const BUILT_IN_COTERM_OPTIONS = PROGRAM_SUMMARIES.filter(p => p.category === 'coterm');

function isMajorConfig(value: unknown, id: string): value is MajorConfig {
  return Boolean(value && typeof value === 'object' && (value as MajorConfig).id === id);
}

export function getCachedBuiltInProgram(id: string | null | undefined): MajorConfig | null {
  return id ? configCache.get(id) ?? null : null;
}

export function loadBuiltInProgram(id: string): Promise<MajorConfig | null> {
  const cached = configCache.get(id);
  if (cached) return Promise.resolve(cached);

  const pending = pendingLoads.get(id);
  if (pending) return pending;

  const modulePath = PROGRAM_MODULE_PATHS[id];
  const loader = modulePath ? modules[modulePath] as ProgramLoader | undefined : undefined;
  if (!loader) return Promise.resolve(null);

  const promise = loader()
    .then(module => {
      const config = Object.values(module).find(value => isMajorConfig(value, id)) ?? null;
      if (config) configCache.set(id, config);
      return config;
    })
    .catch(error => {
      console.error(`Failed to load built-in program "${id}"`, error);
      return null;
    })
    .finally(() => pendingLoads.delete(id));

  pendingLoads.set(id, promise);
  return promise;
}

export async function loadProgram(
  id: string,
  userPrograms: MajorConfig[],
): Promise<MajorConfig | null> {
  return userPrograms.find(program => program.id === id) ?? loadBuiltInProgram(id);
}
