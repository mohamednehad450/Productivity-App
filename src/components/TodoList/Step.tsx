import React, { FC } from "react";
import { Checkbox } from "../common";

// Types
import type { Step } from "./hooks";
import DateBadge from "./DateBadge";

interface StepRowProps {
  step: Step;
  onChange: () => void;
}

const StepRow: FC<StepRowProps> = ({ step, onChange }) => {
  const { title, checked, dueDate } = step;
  return (
    <div className="step-container">
      <div className="step-row">
        <div className="row-section">
          <span className={`step-title ${checked ? "crossed" : ""}`}>
            {title}
          </span>
        </div>
        <span className="row">
          <DateBadge date={dueDate} crossed={!!checked} />
          <Checkbox checked={!!checked} onChange={onChange} />
        </span>
      </div>
    </div>
  );
};

export default StepRow;
