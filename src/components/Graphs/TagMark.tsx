import { FC } from "react";

import type { Tag } from "../../API";

interface TagMarkProps {
    tag: Tag
    x: number
    y: number
    r: number
}

const TagMark: FC<TagMarkProps> = ({ tag, x, y, r }) => {
    return (
        <g transform={`translate(${x}, ${y})`}>
            <circle
                r={r}
                fill={tag.color}
            ></circle>
            <text style={{ textAnchor: 'start' }} dx="1.25em" dy="0.4em" className="tick-text" >
                {tag.label}
            </text>
        </g>
    );
}

export default TagMark