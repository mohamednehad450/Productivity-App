import React, { FC } from "react";
import { useAuth } from "../../API";
import { useProvideHabits, habitsContext } from "./hooks";

const ProvideHabits: FC = ({ children }) => {
  const auth = useAuth();
  const habits = useProvideHabits(auth);
  return (
    <habitsContext.Provider value={habits}>{children}</habitsContext.Provider>
  );
};

export default ProvideHabits;
