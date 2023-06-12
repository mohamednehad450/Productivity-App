import { FC } from "react";
import { scaleBand, scaleLinear } from "d3";
import { BandAxisBottom, TagsMark, LinearAxisLeft, TodosTagMark } from ".";

import type { StatsContext } from "./hooks";

interface TodosGraphProps {
  stats: StatsContext["todoStats"];
}

const WIDTH = 550;
const HEIGHT = 400;
const MARGIN = { top: 20, right: 170, bottom: 50, left: 50 };
const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
const innerWidth = WIDTH - MARGIN.left - MARGIN.right;

const TodosGraph: FC<TodosGraphProps> = ({ stats }) => {
  const { added, finished, tags } = stats;
  const xs = ["Added", "Finished"];
  const xScale = scaleBand()
    .domain(xs)
    .range([0, innerWidth])
    .paddingInner(0.5)
    .paddingOuter(0.3);

  const maxY = Math.max(added.length, finished.length, 8);
  const yScale = scaleLinear().domain([0, maxY]).range([0, innerHeight]);

  return (
    <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        <BandAxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          innerWidth={innerWidth}
        />
        <LinearAxisLeft yScale={yScale} innerWidth={innerWidth} reverse />
        {[added, finished].map((todos, i) => (
          <TodosTagMark
            key={xs[i]}
            x={xScale(xs[i]) || 0}
            y={-(yScale(todos.length) || 0) + yScale.range()[1]}
            width={xScale.bandwidth()}
            height={yScale(todos.length) || 0}
            todos={todos}
          />
        ))}
        <TagsMark tags={tags} x={innerWidth + 36} y={12} />
      </g>
    </svg>
  );
};

export default TodosGraph;
