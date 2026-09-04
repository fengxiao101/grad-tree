import { useEffect, useMemo, useState } from 'react';
import type { MajorConfig } from '../data/majorSchema';
import { getCachedBuiltInProgram, loadProgram } from '../data/programRegistry';

export function useProgramConfigs(ids: readonly string[]): MajorConfig[] {
  const key = ids.join('\u0000');

  const resolveKnown = () => ids
    .map(id => getCachedBuiltInProgram(id))
    .filter((config): config is MajorConfig => Boolean(config));

  const [configs, setConfigs] = useState<MajorConfig[]>(resolveKnown);

  useEffect(() => {
    let cancelled = false;
    setConfigs(resolveKnown());
    Promise.all(ids.map(id => loadProgram(id))).then(loaded => {
      if (!cancelled) {
        setConfigs(loaded.filter((config): config is MajorConfig => Boolean(config)));
      }
    });
    return () => { cancelled = true; };
  // key captures the ordered selection; ids itself is a fresh array each render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const configById = new Map(configs.map(config => [config.id, config]));
  return ids
    .map(id => configById.get(id))
    .filter((config): config is MajorConfig => Boolean(config));
}

export function useProgramConfig(id: string | null | undefined): MajorConfig | null {
  const ids = useMemo(() => id ? [id] : [], [id]);
  return useProgramConfigs(ids)[0] ?? null;
}
