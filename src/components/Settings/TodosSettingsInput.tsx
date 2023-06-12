import { FC } from "react";
import { Checkbox, Select } from "../common";
import { TodoSettings } from "./hooks";
import SettingRow from "./SettingRow";

interface TodosSettingsInputProps {
  todoSettings: TodoSettings;
  onChange: (s: TodoSettings) => void;
}

const SortLabel = {
  added: "Date Added",
  title: "Title",
  dueDate: "Due Date",
  stepsLeft: "Steps Left",
  checked: "Checked",
};

const todoSortOptios: { id: TodoSettings["sortTodosBy"]; label: string }[] = [
  { id: "added", label: SortLabel["added"] },
  { id: "title", label: SortLabel["title"] },
  { id: "dueDate", label: SortLabel["dueDate"] },
  { id: "stepsLeft", label: SortLabel["stepsLeft"] },
  { id: "checked", label: SortLabel["checked"] },
];

const stepSortOptios: { id: TodoSettings["sortStepsBy"]; label: string }[] = [
  { id: "title", label: SortLabel["title"] },
  { id: "dueDate", label: SortLabel["dueDate"] },
  { id: "checked", label: SortLabel["checked"] },
];

const TodosSettingsInput: FC<TodosSettingsInputProps> = ({
  todoSettings,
  onChange,
}) => {
  return (
    <div className="settings-container">
      <span className="settings-header">Todos Settings</span>
      <SettingRow title="Hide Checked Todos?">
        <Checkbox
          checked={todoSettings.hideCheckedTodos}
          onChange={(hideCheckedTodos) =>
            onChange({ ...todoSettings, hideCheckedTodos })
          }
        />
      </SettingRow>
      <SettingRow title="Sort Todos By">
        <div className="setting-row align-center">
          <Select
            options={todoSortOptios}
            selected={{
              id: todoSettings.sortTodosBy,
              label: SortLabel[todoSettings.sortTodosBy],
            }}
            onChange={(o) => onChange({ ...todoSettings, sortTodosBy: o.id })}
          />
          <span className="setting-title">Ascending?</span>
          <Checkbox
            checked={todoSettings.todosAscending}
            onChange={(todosAscending) =>
              onChange({ ...todoSettings, todosAscending })
            }
          />
        </div>
      </SettingRow>
      <SettingRow title="Sort Steps By">
        <div className="setting-row align-center">
          <Select
            options={stepSortOptios}
            selected={{
              id: todoSettings.sortStepsBy,
              label: SortLabel[todoSettings.sortStepsBy],
            }}
            onChange={(o) => onChange({ ...todoSettings, sortStepsBy: o.id })}
          />
          <span className="setting-title">Ascending?</span>
          <Checkbox
            checked={todoSettings.stepsAscending}
            onChange={(stepsAscending) =>
              onChange({ ...todoSettings, stepsAscending })
            }
          />
        </div>
      </SettingRow>
    </div>
  );
};

export default TodosSettingsInput;
