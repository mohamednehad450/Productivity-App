export interface Option {
  id: number | string;
  label?: string;
}

export interface SelectItemProps<T extends Option> {
  option: T;
  isSelected?: boolean;
  onClick: () => void;
}

function SelectItem<T extends Option>({
  option,
  isSelected = false,
  onClick,
}: SelectItemProps<T>) {
  return (
    <div
      className={`default-select-row ${
        isSelected ? "default-select-row-selected" : ""
      }`}
      onClick={onClick}
    >
      <span className="default-select-input-title">{option.label}</span>
    </div>
  );
}

export default SelectItem;
