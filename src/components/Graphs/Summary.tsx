import { FC } from "react";
import { useStats } from ".";
import NumCard from "./NumCard";

interface SummaryProps {}

const Summary: FC<SummaryProps> = () => {
  const {
    summary: {
      todoAdded,
      todoFinished,
      stepsFinished,
      pomodoroSession,
      checkedHabits,
    },
  } = useStats();

  return (
    <div className="border-bottom">
      <div className="section-header margin padding-top">Today's Summary</div>
      <div className="summary-body">
        <NumCard title="Todos Added" count={todoAdded} />
        <NumCard title="Todos Completed" count={todoFinished} />
        <NumCard title="Steps Completed" count={stepsFinished} />
        <span className="numcard-section">
          <NumCard title="Pomodoro Sessions" count={pomodoroSession} />
          <NumCard title="Checked Habits" count={checkedHabits} />
        </span>
      </div>
    </div>
  );
};

export default Summary;
