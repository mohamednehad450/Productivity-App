import React, { FC } from "react";
import { useSettings } from "../Settings";

import { useProvidePomodoro, pomodoroContext } from "./index";
import { intervalContext, useProvideIntervals } from "./intervalContext";

const PomodoroClock: FC = ({ children }) => {
  const {
    settings: { pomodoroSettings },
  } = useSettings();
  const pomodoro = useProvidePomodoro(pomodoroSettings);

  return (
    <pomodoroContext.Provider value={pomodoro}>
      {children}
    </pomodoroContext.Provider>
  );
};

const PomodoroIntervals: FC = ({ children }) => {
  const intervals = useProvideIntervals();

  return (
    <intervalContext.Provider value={intervals}>
      {children}
    </intervalContext.Provider>
  );
};

const ProvidePomodoro: FC = ({ children }) => {
  return (
    <PomodoroIntervals>
      <PomodoroClock>{children}</PomodoroClock>
    </PomodoroIntervals>
  );
};

export default ProvidePomodoro;
