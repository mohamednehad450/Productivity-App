import { FC } from "react";
import { useProvideSettings, settingsContext } from ".";


const ProvideSettings: FC = ({ children }) => {

    const settings = useProvideSettings()

    return (
        <settingsContext.Provider value={settings}>
            {children}
        </settingsContext.Provider>
    )
}

export default ProvideSettings