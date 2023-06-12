import { FC, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "../common";
import Month from "./Month";
import { monthDateFormat } from "../../utils";

import type { Habit } from "../../API";

interface HabitEntriesProps {
  entries: Habit["entries"];
  onAdd: (d: Date) => void;
  onRemove: (d: Date) => void;
}

interface SlideObj {
  dir: "left" | "right";
  first: boolean;
}

const HabitEntries: FC<HabitEntriesProps> = ({ entries, onAdd, onRemove }) => {
  const [date, setDate] = useState(new Date());
  const [slide, setSlide] = useState<SlideObj>({
    first: true,
    dir: "left",
  });

  return (
    <div>
      <div className="row">
        <Button
          onClick={() => {
            const d = new Date(date);
            d.setMonth(date.getMonth() - 1);
            setDate(d);
            setSlide((s) => ({
              first: !s.first,
              dir: "left",
            }));
          }}
        >
          Back
        </Button>
        <span className="text-title">{monthDateFormat(date)}</span>
        <Button
          onClick={() => {
            const d = new Date(date);
            d.setMonth(date.getMonth() + 1);
            setDate(d);
            setSlide((s) => ({
              first: !s.first,
              dir: "right",
            }));
          }}
        >
          Next
        </Button>
      </div>
      <div className="entries-container">
        <div className="slide-container">
          <CSSTransition
            timeout={300}
            unmountOnExit
            in={slide.first}
            classNames={
              slide.first
                ? `slide-${slide.dir}`
                : slide.dir === "right"
                ? "slide-left"
                : "slide-right"
            }
          >
            <Month
              date={date}
              onChange={(d, checked) => (checked ? onAdd(d) : onRemove(d))}
              entries={entries}
              updateDate={slide.first}
            />
          </CSSTransition>
          <CSSTransition
            timeout={300}
            unmountOnExit
            in={!slide.first}
            classNames={
              !slide.first
                ? `slide-${slide.dir}`
                : slide.dir === "right"
                ? "slide-left"
                : "slide-right"
            }
          >
            <Month
              date={date}
              onChange={(d, checked) => (checked ? onAdd(d) : onRemove(d))}
              entries={entries}
              updateDate={!slide.first}
            />
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};

export default HabitEntries;
