import { FC } from "react";
import { useProvideHabits, habitsContext } from "./hooks";

const ProvideHabits: FC = ({ children }) => {
  const habits = useProvideHabits();
  return (
    <habitsContext.Provider value={habits}>{children}</habitsContext.Provider>
  );
};

export default ProvideHabits;
