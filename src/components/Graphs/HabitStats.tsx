import { FC } from "react";
import { isSameMonth, monthDateFormat } from "../../utils";
import { Button } from "../common";
import HabitsGraph from "./HabitsGraph";
import { useStats } from "./hooks";

const HabitStats: FC = () => {
  const { habitsStats } = useStats();

  return (
    <div className="border-bottom">
      <div className="section-header margin padding-top">Habits Stats</div>
      <div className="stats-body">
        <div className="row">
          <Button
            onClick={() => {
              const d = new Date(habitsStats.month);
              d.setMonth(habitsStats.month.getMonth() - 1);
              habitsStats.setMonth(d);
            }}
          >
            Back
          </Button>
          <span className="text-title">
            {monthDateFormat(habitsStats.month)}
          </span>
          <Button
            disabled={isSameMonth(habitsStats.month, new Date())}
            onClick={() => {
              const d = new Date(habitsStats.month);
              d.setMonth(habitsStats.month.getMonth() + 1);
              habitsStats.setMonth(d);
            }}
          >
            Next
          </Button>
        </div>
        <div className="center">
          <HabitsGraph stats={habitsStats} />
        </div>
      </div>
    </div>
  );
};

export default HabitStats;
