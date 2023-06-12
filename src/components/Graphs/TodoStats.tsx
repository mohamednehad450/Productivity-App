import { FC } from "react";
import { useStats } from ".";
import { isSameMonth, monthDateFormat } from "../../utils";
import { Button } from "../common";
import TodosGraph from "./TodosGraph";

interface TodoStatsProps {}

const TodoStats: FC<TodoStatsProps> = () => {
  const { todoStats } = useStats();

  return (
    <div className="border-bottom">
      <div className="section-header margin padding-top">Todos Stats</div>
      <div className="stats-body">
        <div className="row">
          <Button
            onClick={() => {
              const d = new Date(todoStats.month);
              d.setMonth(todoStats.month.getMonth() - 1);
              todoStats.setMonth(d);
            }}
          >
            Back
          </Button>
          <span className="text-title">{monthDateFormat(todoStats.month)}</span>
          <Button
            disabled={isSameMonth(todoStats.month, new Date())}
            onClick={() => {
              const d = new Date(todoStats.month);
              d.setMonth(todoStats.month.getMonth() + 1);
              todoStats.setMonth(d);
            }}
          >
            Next
          </Button>
        </div>
        <div className="center">
          <TodosGraph stats={todoStats} />
        </div>
      </div>
    </div>
  );
};

export default TodoStats;
