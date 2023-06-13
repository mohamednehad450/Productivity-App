import { FC } from "react";

import type { Todo, Tag } from "../TodoList";

type TodoWithTag = Todo & { tag?: Tag };
interface TodosTagMarkProps {
  width: number;
  height: number;
  x: number;
  y: number;
  todos: TodoWithTag[];
}

const TodosTagMark: FC<TodosTagMarkProps> = ({
  width,
  height,
  x,
  y,
  todos,
}) => {
  return (
    <>
      {todos.map((t, i) => (
        <rect
          key={t.id}
          className="todomark"
          width={width}
          height={height / todos.length}
          x={x}
          y={y + (height / todos.length) * i}
          fill={t.tag?.color || "#ffffff"}
        >
          <title className="todomark-title">{t.title}</title>
        </rect>
      ))}
    </>
  );
};

export default TodosTagMark;
