import { useEffect, useState } from "react";
import { Header, IconButton } from "../components/common";
import {
  NewHabitOverlay,
  useHabits,
  HabitRow,
} from "../components/HabitTracker";

import { ReactComponent as AddIcon } from "../icons/add-outline.svg";

import type { Habit } from "../components/HabitTracker";

const HabitTracker = () => {
  useEffect(() => {
    document.title = "Habit Tracker";
  }, []);

  const [overlay, setOverlay] = useState(false);
  const [expanded, setExpanded] = useState<Habit["id"]>("");
  const {
    habits,
    addNewHabit,
    removeHabit,
    updateHabit,
    addEntry,
    removeEntry,
  } = useHabits();

  return (
    <div className="container">
      {overlay && (
        <NewHabitOverlay
          close={() => setOverlay(false)}
          submit={(habit) => addNewHabit(habit)}
        />
      )}
      <Header
        title="Habit Tracker"
        actions={
          <IconButton
            onClick={() => setOverlay(true)}
            icon={<AddIcon />}
            className="header-actions-icon"
          />
        }
      />
      {habits.map((h) => (
        <HabitRow
          habit={h}
          key={h.id}
          expanded={h.id === expanded}
          onClick={(id) => setExpanded(expanded === h.id ? "" : id)}
          remove={(id) => removeHabit(id)}
          update={(id, h) => updateHabit(id, h)}
          addEntry={addEntry}
          removeEntry={removeEntry}
        />
      ))}
    </div>
  );
};

export default HabitTracker;
