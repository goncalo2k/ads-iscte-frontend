'use client';

import { useEffect, useState } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

export function useWindowSize(debounceMs = 10): WindowSize {
  const [size, setSize] = useState<WindowSize>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const onResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }, debounceMs);
    };

    // set once on mount (in case of hydration differences)
    onResize();

    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', onResize);
    };
  }, [debounceMs]);

  return size;
}
