import { FC, useState } from "react";
import { SelectItem } from ".";

import { ReactComponent as ExpandIcon } from "../../icons/expand.svg";

import type { SelectItemProps, Option } from ".";

interface SelectProps<T extends Option> {
  onChange: (arg: T) => void;
  options: T[];
  selected?: T;
  scroll?: boolean;
  right?: boolean;
  border?: boolean;
  CustomInput?: FC<{ selected?: T; onClick: () => void }>;
  CustomRow?: FC<SelectItemProps<T>>;
  Header?: FC<{ close: () => void }>;
  emptyTitle?: string;
}

function Select<T extends Option>({
  CustomInput,
  CustomRow = SelectItem,
  Header,
  selected,
  options,
  onChange,
  scroll = false,
  right = false,
  border = false,
  emptyTitle = "",
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {CustomInput ? (
        <CustomInput selected={selected} onClick={() => setOpen(!open)} />
      ) : (
        <div className="default-select-input" onClick={() => setOpen(!open)}>
          <span className="default-select-input-title">
            {selected ? selected.label : emptyTitle || " - Select"}
          </span>
          <span className={`default-select-input-icon ${open ? "flip" : ""}`}>
            <ExpandIcon />
          </span>
        </div>
      )}
      {open && (
        <>
          <div
            className={`
                        dropdown 
                        ${right ? "dropdown-right" : ""}
                        ${scroll ? "dropdown-scroll" : ""}
                        ${border ? "border" : ""}
                        `}
          >
            {Header && <Header close={() => setOpen(false)} />}
            {options.map((option) => (
              <CustomRow
                key={option.id}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                option={option}
                isSelected={option.id === selected?.id}
              />
            ))}
          </div>
          <div
            className="dismiss"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          ></div>
        </>
      )}
    </div>
  );
}

export default Select;
