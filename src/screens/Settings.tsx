import { useEffect } from "react";
import { Header } from "../components/common";
import {
  PomodoroSettingsInput,
  ThemeSettingsInput,
  TodosSettingsInput,
  useSettings,
} from "../components/Settings";

const Settings = () => {
  useEffect(() => {
    document.title = "Settings";
  }, []);

  const { settings, updateSettings } = useSettings();

  return (
    <div className="container">
      <Header title="Settings" />
      <PomodoroSettingsInput
        pomodoroSettings={settings.pomodoroSettings}
        onChange={(pomodoroSettings) => updateSettings({ pomodoroSettings })}
      />
      <TodosSettingsInput
        todoSettings={settings.todoSettings}
        onChange={(todoSettings) => updateSettings({ todoSettings })}
      />
      <ThemeSettingsInput
        themeSettings={settings.themeSettings}
        onChange={(themeSettings) => updateSettings({ themeSettings })}
      />
    </div>
  );
};

export default Settings;
