import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext, Habit, HabitError } from "../../API";

import {
  getHabits as getHabitsApi,
  updateHabit as updateHabitApi,
  removeHabit as removeHabitApi,
  addNewHabit as addNewHabitApi,
  addEntry as addEntryApi,
  removeEntry as removeEntryApi,
} from "../../API";
import {
  removeFromArray,
  replaceFromArray,
  updateItemInArray,
} from "../../utils";

interface HabitContext {
  habits: Habit[];
  getHabits: () => void;
  updateHabit: (
    id: Habit["id"],
    h: Partial<Habit>
  ) => Promise<void | HabitError>;
  removeHabit: (id: Habit["id"]) => Promise<void | HabitError>;
  addNewHabit: (h: Partial<Habit>) => Promise<void | HabitError>;
  addEntry: (id: Habit["id"], date: Date) => Promise<void>;
  removeEntry: (id: Habit["id"], date: Date) => Promise<void>;
}

function habitsNotinitialized(): any {
  console.warn("Habits context not initialized");
}

const defaultHabitsContext: HabitContext = {
  habits: [],
  getHabits: habitsNotinitialized,
  updateHabit: habitsNotinitialized,
  removeHabit: habitsNotinitialized,
  addNewHabit: habitsNotinitialized,
  addEntry: habitsNotinitialized,
  removeEntry: habitsNotinitialized,
};

const habitsContext = createContext(defaultHabitsContext);

const useHabits = () => useContext(habitsContext);

const useProvideHabits = ({ user, signout }: AuthContext): HabitContext => {
  const isAuthError = (err: any): boolean => {
    const { response, isAxiosError } = err;
    if (isAxiosError) {
      const { status } = response;
      if (status === 401 || status === 403) {
        return true;
      }
    }
    return false;
  };

  const handleHabitErr = (err: any): any => {
    const { response, isAxiosError } = err;

    if (isAuthError(err)) {
      signout();
    }

    if (isAxiosError) {
      const { status, data } = response;

      if (status === 404) {
        // eslint-disable-next-line no-throw-literal
        throw { notFound: true, ...data };
      } else if (status === 400) {
        throw data;
      } else if (status === 500) {
        alert(
          "Somthing went wrong, Please try again later or refresh the page."
        );
      }
    }
  };

  const [habits, setHabits] = useState<Habit[]>([]);

  const getHabits = useCallback(
    () => getHabitsApi(user).then((habits) => habits && setHabits(habits)),
    [user]
  );

  const updateHabit = (id: Habit["id"], h: Partial<Habit>) =>
    updateHabitApi(id, h, user)
      .then((habit: Habit) => setHabits((arr) => replaceFromArray(arr, habit)))
      .catch(handleHabitErr);

  const removeHabit = (id: Habit["id"]) =>
    removeHabitApi(id, user)
      .then(() => setHabits((arr) => removeFromArray(arr, id)))
      .catch(handleHabitErr);

  const addNewHabit = (h: Partial<Habit>) =>
    addNewHabitApi(h, user)
      .then((habit) => setHabits((arr) => [habit, ...arr]))
      .catch(handleHabitErr);

  const addEntry = (id: Habit["id"], date: Date) =>
    addEntryApi(id, date, user)
      .then(() =>
        setHabits((arr) =>
          updateItemInArray(arr, id, (h) => ({
            ...h,
            entries: [...h.entries, date],
          }))
        )
      )
      .catch((err) => (err.isAxiosError ? handleHabitErr(err) : getHabits()));

  const removeEntry = (id: Habit["id"], date: Date) =>
    removeEntryApi(id, date, user)
      .then(() => {
        setHabits((arr) =>
          updateItemInArray(arr, id, (h) => ({
            ...h,
            entries: h.entries.filter((d) => {
              return (
                new Date(d).toLocaleDateString() !==
                new Date(date).toLocaleDateString()
              );
            }),
          }))
        );
      })
      .catch((err) => (err.isAxiosError ? handleHabitErr(err) : getHabits()));

  useEffect(() => {
    getHabits();
  }, [getHabits]);

  return {
    habits,
    getHabits,
    updateHabit,
    removeHabit,
    addNewHabit,
    addEntry,
    removeEntry,
  };
};

export { useHabits, useProvideHabits, habitsContext };
