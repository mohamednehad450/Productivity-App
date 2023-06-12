import { FC } from "react";

import { ReactComponent as CalendarIcon } from "../../icons/calendar.svg";

interface DateBadgeProps {
  date?: Date | string | null;
  hideDate?: boolean;
  crossed?: boolean;
}

const DateBadge: FC<DateBadgeProps> = ({ date, hideDate, crossed }) => {
  return date ? (
    <span className="date-badge">
      <span className="icon icon-gray date-badge-icon">
        <CalendarIcon />
      </span>
      <span
        className={`date-badge-date${hideDate ? " hide-date" : ""}${
          crossed ? " crossed" : ""
        }`}
      >
        {new Date(date).toLocaleDateString()}
      </span>
    </span>
  ) : null;
};

export default DateBadge;
