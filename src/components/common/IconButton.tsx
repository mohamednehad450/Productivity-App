import React, { ReactNode, FC, MouseEventHandler } from "react";

interface IconButtonProps {
  icon: ReactNode;
  label?: string;
  className?: string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  onClick,
  disabled = false,
  label = "",
  className = "",
}) => {
  return (
    <button
      className={`iconbutton ${className} ${disabled ? "btn-disabled" : ""}`}
      onClick={onClick}
    >
      <span className="icon">{icon}</span>
      <span className="iconbutton-label">{label}</span>
    </button>
  );
};

export default IconButton;
