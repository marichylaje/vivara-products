import { useEffect, useMemo, useState } from "react";

type Options<T> = {
  serialize?: (value: T) => string;
  deserialize?: (raw: string) => T;
};

export function useLocalStorageState<T>(key: string, initialValue: T, options: Options<T> = {}) {
  const serialize = useMemo(
    () => options.serialize ?? ((v: T) => JSON.stringify(v)),
    [options.serialize],
  );
  const deserialize = useMemo(
    () => options.deserialize ?? ((raw: string) => JSON.parse(raw) as T),
    [options.deserialize],
  );

  const [state, setState] = useState<T>(() => {
    const raw = localStorage.getItem(key);
    if (raw === null) return initialValue;

    try {
      return deserialize(raw);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, serialize(state));
    } catch (err: unknown) {
      console.error({ err });
    }
  }, [key, serialize, state]);

  return [state, setState] as const;
}
