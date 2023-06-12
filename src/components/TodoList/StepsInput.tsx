import React, { FC } from "react";
import { IconButton } from "../common";
import { createEmptyStep, StepError } from "../../API";
import StepInput from "./StepInput";

import { ReactComponent as Add } from "../../icons/add-fill.svg";

import type { Step } from "../../API";

interface StepsInputProps {
  onChange: (steps: Step[]) => void;
  steps: Step[];
  errors?: StepError[];
}

const StepsInput: FC<StepsInputProps> = ({ onChange, steps, errors }) => {
  return (
    <div className="steps-input-container ">
      <IconButton
        className="icon-prime"
        icon={<Add />}
        label="Add Step"
        onClick={() => onChange([createEmptyStep(), ...steps])}
      />
      <div className="indent scroll">
        {steps.map((step, index) => (
          <StepInput
            error={errors && errors[index]}
            key={step.id}
            step={step}
            onChange={(s) => {
              steps[index] = s;
              onChange([...steps]);
            }}
            remove={(step) =>
              onChange(steps.filter(({ id }) => id !== step.id))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default StepsInput;
