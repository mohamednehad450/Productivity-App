import { FC, useEffect, useState } from "react";
import { Button, ButtonsRow, Overlay, TextInput } from "../common";
import { Habit } from "./hooks";
import { v4 } from "uuid";
import { title } from "process";

interface NewHabitOverlayProps {
  close: () => void;
  submit: (h: Habit) => void;
  initialHabit?: Habit;
}

const NewHabitOverlay: FC<NewHabitOverlayProps> = ({
  close,
  submit,
  initialHabit,
}) => {
  const [habit, setHabit] = useState<Habit>(
    initialHabit || { created: "", entries: [], id: v4(), title: "" }
  );
  const [err, setErr] = useState<string>();

  useEffect(() => {
    if (!habit.title) {
      setErr("Must enter habit title");
    } else {
      setErr(undefined);
    }
  }, [title]);

  return (
    <Overlay>
      <div className="overlay-container">
        <TextInput
          value={habit.title}
          onChange={(title) => setHabit({ ...habit, title })}
          placeholder="Habit Title"
          className="input-lg padding padding-top-2"
          errors={err ? [err] : []}
        />
        <ButtonsRow className="margin-end">
          <Button type="secondary" onClick={close}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() =>
              submit({ ...habit, created: new Date().toDateString() })
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
