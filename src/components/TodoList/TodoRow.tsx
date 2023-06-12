import { useState } from "react";
import { Checkbox, ColorTag, ListRow, ActionSelect } from "../common";
import StepRow from "./Step";
import { NewTodoOverlay, useTodo, DateBadge } from ".";
import { Link } from "react-router-dom";
import { routes } from "../../screens";

import { ReactComponent as ExpandIcon } from "../../icons/expand.svg";
import { ReactComponent as TimerIcon } from "../../icons/pomodoro.svg";

// Types
import { Todo } from "../../API";
import { FormatedTodo } from "./utils";

interface TodoRowProps {
  todo: FormatedTodo;
  expanded: boolean;
  onClick?: (id: Todo["id"]) => void;
}

const TodoRow = (props: TodoRowProps) => {
  const { todo, onClick, expanded: exp } = props;
  const { title, tag, steps, id, dueDate, stepsLeft, expandable, checked } =
    todo;

  const [editing, setEditing] = useState(false);

  const expanded = exp && expandable && !editing;

  const { updateTodo, checkStep, deleteTodo, getTag, checkTodo } = useTodo();

  return (
    <>
      {editing && (
        <NewTodoOverlay
          done={() => setEditing(false)}
          submit={(t) => updateTodo(todo.id, t)}
          initialTodo={todo}
        />
      )}
      <ListRow
        onClick={() => onClick && onClick(id)}
        expanded={expanded}
        expandedClassName="steps-expanded"
        leftItem={
          <span className={`text-title ${checked ? "crossed" : ""}`}>
            {title}
          </span>
        }
        rightItem={
          <>
            {steps.length ? (
              <span className="text-note">
                {stepsLeft
                  ? `${stepsLeft} step${stepsLeft > 1 ? "s" : ""} left`
                  : "done"}
              </span>
            ) : null}
            <DateBadge date={dueDate} hideDate crossed={!!checked} />
            <Link
              className="icon icon-pomodoro"
              to={`${routes.POMODORO}?todo=${id}`}
            >
              <TimerIcon />
            </Link>
            <ColorTag tag={getTag(tag) || { color: "#fff", label: "None" }} />
            {expandable ? (
              <span className={`icon icon-gray ${expanded ? "flip" : ""}`}>
                <ExpandIcon />
              </span>
            ) : (
              <Checkbox
                checked={!!checked}
                onChange={() => checkTodo(id, todo)}
              />
            )}
            <ActionSelect
              actions={[
                { label: "Edit", action: () => setEditing(true) },
                { label: "Delete", action: () => deleteTodo(todo.id) },
              ]}
            />
          </>
        }
        expandedItem={
          steps.length
            ? steps?.map((step) => (
                <StepRow
                  key={step.id}
                  step={step}
                  onChange={(s) => checkStep(todo, s.id || "")}
                />
              ))
            : null
        }
      />
    </>
  );
};

export default TodoRow;
