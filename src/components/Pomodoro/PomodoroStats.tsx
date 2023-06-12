import { FC } from "react";
import { usePomodoro } from ".";
import { useSettings } from "../Settings";

interface PomodoroStatsProps {}

const PomodoroStats: FC<PomodoroStatsProps> = () => {
  const { stats } = usePomodoro();
  const {
    settings: {
      pomodoroSettings: { goal, longBreakAfter },
    },
  } = useSettings();

  return (
    <div className="pomodoro-stats">
      <span className="pomodoro-count">
        <span className="pomodoro-count-title">ROUND</span>
        <span className="pomodoro-count-value">
          {stats.round}/{longBreakAfter}
        </span>
      </span>
      <span className="pomodoro-count">
        <span className="pomodoro-count-title">GOAL</span>
        <span className="pomodoro-count-value">
          {stats.goal}/{goal}
        </span>
      </span>
    </div>
  );
};

export default PomodoroStats;
