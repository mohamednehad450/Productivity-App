import { createContext, useContext, useEffect, useState } from "react";
import { removeFromArray, updateItemInArray } from "../../utils";

export type Habit = {
  id: string;
  title: string;
  created: string;
  entries: string[];
};

interface HabitContext {
  habits: Habit[];
  updateHabit: (id: Habit["id"], h: Partial<Habit>) => void;
  removeHabit: (id: Habit["id"]) => void;
  addNewHabit: (h: Habit) => void;
  addEntry: (id: Habit["id"], date: Date) => void;
  removeEntry: (id: Habit["id"], date: Date) => void;
}

function dateToEntry(entry: Date): string {
  return `${entry.getFullYear()}-${entry.getMonth() + 1}-${entry.getDate()}`;
}

function habitsNotinitialized(): any {
  console.warn("Habits context not initialized");
}

const defaultHabitsContext: HabitContext = {
  habits: [],
  updateHabit: habitsNotinitialized,
  removeHabit: habitsNotinitialized,
  addNewHabit: habitsNotinitialized,
  addEntry: habitsNotinitialized,
  removeEntry: habitsNotinitialized,
};

const habitsContext = createContext(defaultHabitsContext);

const useHabits = () => useContext(habitsContext);

const useProvideHabits = (): HabitContext => {
  const [habits, setHabits] = useState<Habit[]>(
    JSON.parse(window.localStorage.getItem("habits") || "[]")
  );

  useEffect(() => {
    window.localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const updateHabit = (id: Habit["id"], h: Partial<Habit>) =>
    setHabits((hs) => updateItemInArray(hs, id, (old) => ({ ...old, ...h })));

  const removeHabit = (id: Habit["id"]) =>
    setHabits((hs) => removeFromArray(hs, id));

  const addNewHabit = (h: Habit) => setHabits((arr) => [h, ...arr]);

  const addEntry = (id: Habit["id"], date: Date) =>
    setHabits((arr) =>
      updateItemInArray(arr, id, (h) => {
        const dateStr = dateToEntry(date);
        if (h.entries.some((d) => d === dateStr)) return h;
        return {
          ...h,
          entries: [...h.entries, dateStr],
        };
      })
    );

  const removeEntry = (id: Habit["id"], date: Date) =>
    setHabits((hs) =>
      updateItemInArray(hs, id, (h) => {
        return {
          ...h,
          entries: h.entries.filter((e) => e !== dateToEntry(date)),
        };
      })
    );

  return {
    habits,
    updateHabit,
    removeHabit,
    addNewHabit,
    addEntry,
    removeEntry,
  };
};

export { useHabits, useProvideHabits, habitsContext };
