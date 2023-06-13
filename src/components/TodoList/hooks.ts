import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { removeFromArray, updateItemInArray } from "../../utils";

export interface Tag {
  color: string;
  label: string;
  id: string;
}

export interface Step {
  id: string;
  title: string;
  dueDate?: string;
  checked?: string;
}

export interface Todo {
  title: string;
  checked?: string;
  tagId?: Tag["id"];
  dueDate?: string;
  date: string;
  id: string;
  steps: Step[];
}

interface TodoContext {
  todos: Todo[];
  updateTodo: (id: Todo["id"], t: Todo) => void;
  deleteTodo: (id: Todo["id"]) => void;
  checkTodo: (id: Todo["id"]) => void;
  checkStep: (todoId: Todo["id"], stepId: Step["id"]) => void;
  addNewTodo: (t: Todo) => void;
  tags: Tag[];
  getTag: (id?: Tag["id"]) => Tag | undefined;
  addNewTag: (tag: Tag) => void;
  deleteTag: (id: Tag["id"]) => void;
  updateTag: (id: Tag["id"], tag: Tag) => void;
}

function getCheckedDate(steps: Step[]): Date {
  const date = new Date();
  date.setTime(Math.max(...steps.map((s) => new Date(s.checked!).getTime())));
  return date;
}

function todoNotinitialized(): any {
  console.warn("Todo context not initialized");
}

const defaultTodoContext: TodoContext = {
  todos: [],
  updateTodo: todoNotinitialized,
  deleteTodo: todoNotinitialized,
  addNewTodo: todoNotinitialized,
  checkTodo: todoNotinitialized,
  checkStep: todoNotinitialized,
  tags: [],
  getTag: todoNotinitialized,
  addNewTag: todoNotinitialized,
  deleteTag: todoNotinitialized,
  updateTag: todoNotinitialized,
};

const todoContext = createContext(defaultTodoContext);

const useTodo = () => useContext(todoContext);

const useProvideTodo = (): TodoContext => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(window.localStorage.getItem("todos") || "[]")
  );
  const [tags, setTags] = useState<Tag[]>(
    JSON.parse(window.localStorage.getItem("tags") || "[]")
  );

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    window.localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  const updateTodo = (id: Todo["id"], t: Partial<Todo>) =>
    setTodos((todos) =>
      updateItemInArray(todos, id, (old) => ({ ...old, ...t }))
    );

  const deleteTodo = (id: Todo["id"]) =>
    setTodos((todos) => removeFromArray(todos, id));

  const addNewTodo = (t: Todo) => setTodos((todos) => [t, ...todos]);

  const checkStep = (todoId: Todo["id"], stepId: Step["id"]) =>
    setTodos((todos) =>
      updateItemInArray(todos, todoId, (todo) => {
        const newSteps = updateItemInArray(todo.steps, stepId, (step) => ({
          ...step,
          checked: step.checked ? undefined : new Date().toISOString(),
        }));
        return {
          ...todo,
          steps: newSteps,
          checked: newSteps.some((s) => !s.checked)
            ? undefined
            : getCheckedDate(newSteps).toISOString(),
        };
      })
    );

  const checkTodo = (id: Todo["id"]) =>
    setTodos((todos) =>
      updateItemInArray(todos, id, (todo) => {
        if (todo.checked) {
          return {
            ...todo,
            checked: undefined,
          };
        } else {
          return {
            ...todo,
            checked: new Date().toISOString(),
            steps: todo.steps.map((s) => ({
              ...s,
              checked: s.checked ? s.checked : new Date().toISOString(),
            })),
          };
        }
      })
    );

  const addNewTag = (tag: Tag) => setTags((tags) => [tag, ...tags]);

  const updateTag = (id: Tag["id"], tag: Partial<Tag>) =>
    setTags((tags) =>
      updateItemInArray(tags, id, (old) => ({ ...old, ...tag }))
    );

  const deleteTag = (id: Tag["id"]) => setTags(removeFromArray(tags, id));

  const tagsMap: any = useMemo(() => {
    const map = new Map();
    tags.forEach((t) => map.set(t.id, t));
    return map;
  }, [tags]);
  const getTag = (id?: Tag["id"]): Tag | undefined => tagsMap.get(id);

  return {
    todos,
    updateTodo,
    deleteTodo,
    addNewTodo,
    checkTodo,
    checkStep,
    tags,
    getTag,
    addNewTag,
    updateTag,
    deleteTag,
  };
};

export { todoContext, useTodo, useProvideTodo };

export type { TodoContext };
