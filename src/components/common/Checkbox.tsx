import { FC } from "react";

interface CheckboxProps {
  disabled?: boolean;
  checked?: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  disabled = false,
  checked = false,
  onChange,
  className = "",
}) => {
  return (
    <label className="checkbox-container">
      <input
        checked={checked}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        type="checkbox"
      ></input>
      <span
        className={`checkmark ${
          disabled ? "checkmark-disabled" : ""
        } ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 5v14H5V5h14m2-2H3v18h18V3z" />
          <path
            className="checked"
            d="M21 3H3v18h18V3zM10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
      </span>
    </label>
  );
};

export default Checkbox;
