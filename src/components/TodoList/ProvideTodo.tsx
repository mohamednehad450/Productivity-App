import { FC } from "react";
import { useProvideTodo } from ".";
import { todoContext } from ".";
import { useAuth } from "../../API";

const ProvideTodo: FC = ({ children }) => {
  const auth = useAuth();
  const todo = useProvideTodo(auth);

  return <todoContext.Provider value={todo}>{children}</todoContext.Provider>;
};

export default ProvideTodo;
