import { FC } from "react";
import { useProvideTodo } from ".";
import { todoContext } from ".";

const ProvideTodo: FC = ({ children }) => {
  const todo = useProvideTodo();

  return <todoContext.Provider value={todo}>{children}</todoContext.Provider>;
};

export default ProvideTodo;
