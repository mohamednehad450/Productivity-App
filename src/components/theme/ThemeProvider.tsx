import { FC } from "react";
import { useSettings } from "../Settings";

const ThemeProvider: FC = ({ children }) => {
  const {
    settings: {
      themeSettings: { theme, solar },
    },
  } = useSettings();
  return <div className={`${theme}${solar ? " solar" : ""}`}>{children}</div>;
};

export default ThemeProvider;
