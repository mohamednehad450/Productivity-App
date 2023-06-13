import ProvideSettings from "./ProvideSettings";
import PomodoroSettingsInput from "./PomodoroSettingsInput";
import ThemeSettingsInput from "./ThemeSettingsInput";
import TodosSettingsInput from "./TodosSettingsInput";

import {
  useSettings,
  useProvideSettings,
  settingsContext,
  defaultPomodoroSettings,
} from "./hooks";

import type {
  SettingsContext,
  Settings,
  PomodoroSettings,
  ThemeSettings,
  TodoSettings,
} from "./hooks";

export {
  useSettings,
  useProvideSettings,
  settingsContext,
  ProvideSettings,
  defaultPomodoroSettings,
  PomodoroSettingsInput,
  ThemeSettingsInput,
  TodosSettingsInput,
};
export type {
  SettingsContext,
  Settings,
  PomodoroSettings,
  ThemeSettings,
  TodoSettings,
};
