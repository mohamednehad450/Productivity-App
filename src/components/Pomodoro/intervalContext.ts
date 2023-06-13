import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import type { PomodoroInterval } from "./hooks";

export interface IntervalContext {
  intervals: PomodoroInterval[];
  addInterval: (p: PomodoroInterval) => void;
  getInterval: (id: PomodoroInterval["id"]) => PomodoroInterval | undefined;
}

const defaultIntervalContext: any = {
  intervals: [],
  addInterval: async () => console.error("Intervals context not initialized"),
  getInterval: async () => console.error("Intervals context not initialized"),
};

export const intervalContext = createContext<IntervalContext>(
  defaultIntervalContext
);

export const useIntervals = () => useContext(intervalContext);

export const useProvideIntervals = (): IntervalContext => {
  const [intervals, setIntervals] = useState<PomodoroInterval[]>(
    JSON.parse(window.localStorage.getItem("intervals") || "[]")
  );

  useEffect(() => {
    window.localStorage.setItem("intervals", JSON.stringify(intervals));
  }, [intervals]);

  const addInterval: IntervalContext["addInterval"] = (p) =>
    setIntervals((ps) => [p, ...ps]);

  const getInterval: IntervalContext["getInterval"] = (id) =>
    intervals.find((p) => p.id === id);

  return {
    intervals,
    addInterval,
    getInterval,
  };
};
