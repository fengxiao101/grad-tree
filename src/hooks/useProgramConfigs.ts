import { useEffect, useMemo, useState } from 'react';
import type { MajorConfig } from '../data/majorSchema';
import { getCachedBuiltInProgram, loadProgram } from '../data/programRegistry';

export function useProgramConfigs(ids: readonly string[], userPrograms: MajorConfig[]): MajorConfig[] {
  const key = ids.join('\u0000');
  const userById = useMemo(
    () => new Map(userPrograms.map(program => [program.id, program])),
    [userPrograms],
  );

  const resolveKnown = () => ids
    .map(id => userById.get(id) ?? getCachedBuiltInProgram(id))
    .filter((config): config is MajorConfig => Boolean(config));

  const [configs, setConfigs] = useState<MajorConfig[]>(resolveKnown);

  useEffect(() => {
    let cancelled = false;
    setConfigs(resolveKnown());
    Promise.all(ids.map(id => loadProgram(id, userPrograms))).then(loaded => {
      if (!cancelled) {
        setConfigs(loaded.filter((config): config is MajorConfig => Boolean(config)));
      }
    });
    return () => { cancelled = true; };
  // key captures the ordered selection while userPrograms captures uploaded changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, userPrograms]);

  const configById = new Map(configs.map(config => [config.id, config]));
  return ids
    .map(id => configById.get(id))
    .filter((config): config is MajorConfig => Boolean(config));
}

export function useProgramConfig(
  id: string | null | undefined,
  userPrograms: MajorConfig[],
): MajorConfig | null {
  const ids = useMemo(() => id ? [id] : [], [id]);
  return useProgramConfigs(ids, userPrograms)[0] ?? null;
}
