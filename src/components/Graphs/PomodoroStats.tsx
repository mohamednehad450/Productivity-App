import { FC, useState } from "react";
import { useStats } from ".";
import { isSameMonth, monthDateFormat } from "../../utils";
import { Button, Checkbox, Select } from "../common";
import SettingRow from "../Settings/SettingRow";
import PomodoroGraph from "./PomodoroGraph";

interface PomodoroStatsProps {}

type SortOption = { id: "tags" | "todos"; label: string };

const sortByTag: SortOption = { id: "tags", label: "Sort by: Tags" };
const sortByTodo: SortOption = { id: "todos", label: "Sort by: Todos" };

const PomodoroStats: FC<PomodoroStatsProps> = () => {
  const { pomodoroStats: stats } = useStats();

  const [sortby, setSortby] = useState(sortByTodo);
  const [time, setTime] = useState<"real" | "default">("default");

  return (
    <div className="border-bottom">
      <div className="section-header margin padding-top">Pomodoro Stats</div>
      <div className="stats-body">
        <div className="row">
          <Button
            onClick={() => {
              const d = new Date(stats.month);
              d.setMonth(stats.month.getMonth() - 1);
              stats.setMonth(d);
            }}
          >
            Back
          </Button>
          <span className="text-title">{monthDateFormat(stats.month)}</span>
          <Button
            disabled={isSameMonth(stats.month, new Date())}
            onClick={() => {
              const d = new Date(stats.month);
              d.setMonth(stats.month.getMonth() + 1);
              stats.setMonth(d);
            }}
          >
            Next
          </Button>
        </div>
        <div className="row wrap justify-center padding-top">
          <Select
            options={[sortByTag, sortByTodo]}
            onChange={(o) => setSortby(o)}
            selected={sortby}
          />
          <SettingRow title="Show real Time?">
            <Checkbox
              onChange={(val) => (val ? setTime("real") : setTime("default"))}
              checked={time === "real"}
            />
          </SettingRow>
        </div>
        <div className="center">
          <PomodoroGraph settings={{ time, sortby: sortby.id }} stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default PomodoroStats;
