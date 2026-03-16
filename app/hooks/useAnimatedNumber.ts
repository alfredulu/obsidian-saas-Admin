"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const parseNumericValue = (value: number | string) => {
  if (typeof value === "number") {
    return value;
  }
  const normalizedValue = String(value).replace(/[^0-9.-]/g, "");
  const parsed = Number(normalizedValue);
  return Number.isFinite(parsed) ? parsed : 0;
};

const countDecimalPlaces = (value: number | string) => {
  const normalizedValue = String(value).replace(/[^0-9.]/g, "");
  const decimalMatch = normalizedValue.match(/\.([0-9]+)/);
  return decimalMatch ? decimalMatch[1].length : 0;
};

const createDefaultFormatter = (decimalPlaces: number) => (value: number) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

export const useAnimatedNumber = (
  targetValue: number | string,
  duration = 1200,
  formatter?: (value: number) => string
) => {
  const targetNumber = useMemo(
    () => parseNumericValue(targetValue),
    [targetValue]
  );
  const decimalPlaces = useMemo(
    () => countDecimalPlaces(targetValue),
    [targetValue]
  );
  const formatValue = useMemo(
    () => formatter ?? createDefaultFormatter(decimalPlaces),
    [decimalPlaces, formatter]
  );
  const [displayValue, setDisplayValue] = useState(() => formatValue(0));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const startTimestamp = performance.now();
    const startValue = 0;
    setDisplayValue(formatValue(startValue));

    const animate = (timestamp: number) => {
      const elapsed = Math.max(0, timestamp - startTimestamp);
      let progress = Math.min(elapsed / duration, 1);
      progress = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (targetNumber - startValue) * progress;
      setDisplayValue(formatValue(currentValue));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [duration, formatValue, targetNumber]);

  return displayValue;
};
