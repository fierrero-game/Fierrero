import { useEffect, useRef, useState } from "react";

export function useAnimatedNumber(target: number, duration = 600): number {
  const [displayValue, setDisplayValue] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number>(fromRef.current);

  useEffect(() => {
    const from = fromRef.current;
    const to = target;
    if (from === to) return;

    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out: rápido al inicio, suave al final
      setDisplayValue(from + (to - from) * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration]);

  return displayValue;
}