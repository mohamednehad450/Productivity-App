import { useEffect } from "react";
import { Header } from "../components/common";
import {
  HabitStats,
  PomodoroStats,
  Summary,
  TodoStats,
} from "../components/Graphs";

const Graphs = () => {
  useEffect(() => {
    document.title = "Graphs";
  }, []);

  return (
    <div className="container">
      <Header title="Graphs" />
      <Summary />
      <PomodoroStats />
      <TodoStats />
      <HabitStats />
    </div>
  );
};

export default Graphs;
