import React, { FC } from "react";
import { ReactComponent as Circle } from "../../icons/circle.svg";

import type { Tag } from "../../API";

interface ColorTagProps {
  tag: Partial<Tag>;
  showLabel?: boolean;
  className?: string;
}

const ColorTag: FC<ColorTagProps> = ({
  tag,
  showLabel = false,
  className = "",
}) => {
  return showLabel ? (
    <span className={`tagrow ${className}`}>
      <span className="icon">
        <Circle style={{ fill: tag.color || "#fff" }} />
      </span>
      <span className="tagrow-label">{tag.label}</span>
    </span>
  ) : (
    <span className="icon">
      <Circle style={{ fill: tag.color || "#fff" }} />
    </span>
  );
};

export default ColorTag;
