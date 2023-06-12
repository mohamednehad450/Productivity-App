import { FC } from "react";
import { Checkbox, } from "../common";
import { ThemeSettings } from "./hooks";
import SettingRow from "./SettingRow";

interface ThemeSettingsInputProps {
    themeSettings: ThemeSettings
    onChange: (s: ThemeSettings) => void
}


const ThemeSettingsInput: FC<ThemeSettingsInputProps> = ({ themeSettings, onChange }) => {


    return (
        <div className="settings-container">
            <span className="settings-header">
                Theme Settings
            </span>
            <SettingRow
                title="Dark Mode?"
            >
                <Checkbox
                    checked={themeSettings.theme === 'dark'}
                    onChange={dark => onChange({ ...themeSettings, theme: dark ? 'dark' : 'light' })}
                />
            </SettingRow>
            <SettingRow
                title="Solar?"
            >
                <Checkbox
                    checked={themeSettings.solar}
                    onChange={solar => onChange({ ...themeSettings, solar, })}
                />
            </SettingRow>
        </div>
    )
}

export default ThemeSettingsInput