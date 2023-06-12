import { FC } from "react";
import { TagMark } from ".";

import type { Tag } from "../../API";

interface TagsMarkProps {
  tags: Tag[];
  x: number;
  y: number;
}

const r = 10;
const padding = 10;

const TagsMark: FC<TagsMarkProps> = ({ x, y, tags }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      {tags.map((tag, i) => (
        <TagMark key={tag.id} tag={tag} x={0} y={(r * 2 + padding) * i} r={r} />
      ))}
    </g>
  );
};

export default TagsMark;
