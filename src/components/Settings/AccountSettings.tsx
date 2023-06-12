import { FC } from "react";
import { useAuth } from "../../API";
import { Button } from "../common";
import SettingRow from "./SettingRow";

const AccountSettings: FC = () => {
  const { signout, user } = useAuth();

  return (
    <div className="settings-container">
      <span className="settings-header">
        Account Settings {user?.username ? `(${user.username})` : ""}
      </span>

      <SettingRow title="Logout?">
        <Button onClick={signout}>Sign Out</Button>
      </SettingRow>
    </div>
  );
};

export default AccountSettings;
