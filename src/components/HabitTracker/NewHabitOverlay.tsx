import { FC, useState } from "react";
import { Button, ButtonsRow, Overlay, TextInput } from "../common";

import type { Habit, HabitError } from "../../API";

interface NewHabitOverlayProps {
  close: () => void;
  submit: (h: Partial<Habit>) => Promise<void | HabitError>;
  initialHabit?: Habit;
}

const NewHabitOverlay: FC<NewHabitOverlayProps> = ({
  close,
  submit,
  initialHabit,
}) => {
  const [habit, setHabit] = useState<Partial<Habit>>(initialHabit || {});
  const [err, setErr] = useState<HabitError>({});

  return (
    <Overlay>
      <div className="overlay-container">
        <TextInput
          value={habit.title}
          onChange={(title) => setHabit({ ...habit, title })}
          placeholder="Habit Title"
          className="input-lg padding padding-top-2"
          errors={[...(err.title || []), ...(err.non_field_errors || [])]}
        />
        <ButtonsRow className="margin-end">
          <Button type="secondary" onClick={close}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() =>
              submit(habit)
                .then(close)
                .catch((err) => setErr(err))
            }
          >
            {initialHabit ? "Save" : "Add"}
          </Button>
        </ButtonsRow>
      </div>
    </Overlay>
  );
};

export default NewHabitOverlay;
