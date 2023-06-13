import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { defaultPomodoroSettings } from "../Settings";
import { useIntervals } from "./intervalContext";
import { breakSound, workSound } from "../../audio";
import { pushNotifications } from "../../utils";

import type { PomodoroSettings } from "../Settings";
import type { Todo } from "../TodoList";
import { v4 } from "uuid";
export interface PomodoroInterval {
  id: string;
  todoId?: Todo["id"];
  startDate: string;
  endDate: string;
  defaultDuration: number;
}

enum PomodoroMode {
  WORK = "work",
  BREAK = "break",
  LONGBREAK = "longbreak",
}

// Reducers Actions
enum PomodoroActions {
  tick = "TICK",
  reset = "RESET",
  skip = "SKIP",
}

// units in milieseconds
interface PomodoroState {
  mode: PomodoroMode;
  defaultTime: number;
  timeLeft: number;
  notifyState?: PomodoroMode;
}

interface PomodoroStats {
  round: number;
  goal: number;
  date: Date | string;
}

interface Pomodoro {
  state: PomodoroState;
  stats: PomodoroStats;
}

// Reducers Type
type PomodoroReducer = (
  pomodoro: {
    state: PomodoroState;
    stats: PomodoroStats;
  },
  action: {
    type: PomodoroActions;
    payload: {
      settings: PomodoroSettings;
    };
  }
) => Pomodoro;

const defaultPomodoroState: PomodoroState = {
  mode: PomodoroMode.WORK,
  defaultTime: defaultPomodoroSettings[PomodoroMode.WORK] * 1000,
  timeLeft: defaultPomodoroSettings[PomodoroMode.WORK] * 1000,
};

const defaultPomodoroStats: PomodoroStats = {
  round: 0,
  goal: 0,
  date: new Date(),
};

interface PomodoroContext {
  state: PomodoroState;
  stats: PomodoroStats;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  skip: () => void;
  setTodo: (id?: Todo["id"]) => void;
}

const pomodoroContext = createContext<PomodoroContext>({
  state: defaultPomodoroState,
  stats: defaultPomodoroStats,
  isRunning: false,
  start: () => console.error("pomodoro not initialized"),
  stop: () => console.error("pomodoro not initialized"),
  reset: () => console.error("pomodoro not initialized"),
  skip: () => console.error("pomodoro not initialized"),
  setTodo: () => console.error("pomodoro not initialized"),
});

const usePomodoro = () => useContext(pomodoroContext);

const TICK = 1000;

const useProvidePomodoro = (settings: PomodoroSettings): PomodoroContext => {
  const [pomodoro, dispatch] = useReducer(pomodoroReducer, {
    state: newState(PomodoroMode.WORK, settings),
    stats: defaultPomodoroStats,
  });

  const { addInterval } = useIntervals();

  const [pomInterval, setPomInterval] = useState<Partial<PomodoroInterval>>();

  const [timer, setTimer] = useState<any>();

  // Cleans up the Timer
  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  // Mode Change Effect
  useEffect(() => {
    // Handles autoStart
    if (!settings.autoStart) {
      clearTimeout(timer);
      setTimer(undefined);
    }
    // Submiting Pomodoro Interval to Api
    if (pomodoro.state.mode !== PomodoroMode.WORK) {
      if (pomInterval?.startDate) {
        addInterval({
          defaultDuration: settings.work,
          endDate: new Date().toISOString(),
          id: v4(),
          startDate: pomInterval.startDate,
          todoId: pomInterval.todoId,
        }); // TODO: Handles api error
        setPomInterval((p) => ({ todoId: p?.todoId }));
      }
    }

    // Initializing Pomodoro Interval
    if (pomodoro.state.mode === PomodoroMode.WORK) {
      setPomInterval((p) =>
        !!timer
          ? {
              ...p,
              startDate: new Date().toISOString(),
              defaultDuration: settings.work,
            }
          : { todoId: p?.todoId }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pomodoro.state.mode]);

  // Hanlde notifiy effect
  useEffect(() => {
    setTimeout(() => {
      switch (pomodoro.state.notifyState) {
        case PomodoroMode.WORK:
          settings.enableSound && workSound.play();
          settings.enableNotifications &&
            pushNotifications("Work session is over, It's time for a break.");
          break;
        case PomodoroMode.LONGBREAK:
          settings.enableSound && breakSound.play();
          settings.enableNotifications &&
            pushNotifications(
              "Long break is over, It's time to get back to work."
            );
          break;
        case PomodoroMode.BREAK:
          settings.enableSound && breakSound.play();
          settings.enableNotifications &&
            pushNotifications(
              "Short Break is over, It's time to get back to work."
            );
          break;
      }
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pomodoro.state.notifyState]);

  // Resets when settings changes
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const tick = () => {
    dispatch({
      type: PomodoroActions.tick,
      payload: {
        settings: settings,
      },
    });
  };

  const start = () => {
    if (!timer) {
      setTimer(setInterval(tick, TICK));
    }
    if (!pomInterval?.startDate && PomodoroMode.WORK) {
      setPomInterval((p) => ({
        ...p,
        startDate: new Date().toISOString(),
        defaultDuration: settings.work,
      }));
    }
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(undefined);
    }
  };

  const reset = () => {
    clearInterval(timer);
    setTimer(undefined);
    dispatch({
      type: PomodoroActions.reset,
      payload: {
        settings: settings,
      },
    });
  };

  const skip = () => {
    dispatch({
      type: PomodoroActions.skip,
      payload: {
        settings: settings,
      },
    });
    if (!settings.submitOnSkip) {
      setPomInterval((p) => ({ todoId: p?.todoId }));
    }
  };

  const setTodo = (id?: Todo["id"]) => {
    setPomInterval((p) => ({ ...p, todoId: id }));
  };

  return {
    ...pomodoro,
    isRunning: !!timer,
    start,
    stop,
    reset,
    skip,
    setTodo,
  };
};

function newState(
  mode: PomodoroMode,
  settings: PomodoroSettings,
  notifyState?: PomodoroMode
): PomodoroState {
  return {
    notifyState,
    mode,
    timeLeft: settings[mode] * 1000,
    defaultTime: settings[mode] * 1000,
  };
}

const pomodoroReducer: PomodoroReducer = (
  { state, stats },
  { type, payload: { settings } }
) => {
  function nextPomodoro(
    state: PomodoroState,
    stats: PomodoroStats,
    settings: PomodoroSettings
  ): Pomodoro {
    // Time is up: Switching to a new mode
    if (state.timeLeft - TICK < 0) {
      switch (state.mode) {
        case PomodoroMode.WORK:
          const s = {
            ...stats,
            round: stats.round + 1,
            goal: stats.goal + 1,
          };
          // Should go on a long or short break?
          if (stats.round + 1 >= settings.longBreakAfter) {
            return {
              state: newState(
                PomodoroMode.LONGBREAK,
                settings,
                state.notifyState
              ),
              stats: s,
            };
          } else
            return {
              state: newState(PomodoroMode.BREAK, settings, state.notifyState),
              stats: s,
            };
        case PomodoroMode.BREAK:
          return {
            state: newState(PomodoroMode.WORK, settings, state.notifyState),
            stats,
          };
        case PomodoroMode.LONGBREAK:
          return {
            state: newState(PomodoroMode.WORK, settings, state.notifyState),
            stats: { ...stats, round: 0 },
          };
        default:
          throw new Error("Invalid PomodoroMode");
      }
    } else {
      return {
        state: {
          ...state,
          timeLeft: state.timeLeft - TICK,
        },
        stats,
      };
    }
  }

  switch (type) {
    case PomodoroActions.tick:
      return nextPomodoro(
        {
          ...state,
          notifyState: state.timeLeft - TICK < 0 ? state.mode : undefined,
        },
        stats,
        settings
      );
    case PomodoroActions.skip:
      return nextPomodoro(
        {
          ...state,
          timeLeft: 0,
          notifyState: undefined,
        },
        stats,
        settings
      );
    case PomodoroActions.reset:
      return {
        state: newState(state.mode, settings),
        stats,
      };
    default:
      return {
        state,
        stats,
      };
  }
};

export { usePomodoro, useProvidePomodoro, pomodoroContext };
export type { PomodoroState, PomodoroMode, PomodoroContext };
