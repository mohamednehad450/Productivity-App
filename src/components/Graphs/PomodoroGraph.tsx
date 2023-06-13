import { FC } from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { formatMinToHour } from "../../utils";
import { LinearAxisLeft, BandAxisBottom } from ".";

import type { StatsContext } from ".";
import type { IntervalWithTodo } from "./hooks";
import BarChartMarks from "./BarChartMarks";

interface PomodoroGraphProps {
  stats: StatsContext["pomodoroStats"];
  settings: {
    time: "real" | "default";
    sortby: "todos" | "tags";
  };
}

interface IntervalDataItem {
  id: string;
  title: string;
  intervals: IntervalWithTodo[];
}

const WIDTH = 500;
const HEIGHT = 400;
const MARGIN = { top: 20, right: 50, bottom: 100, left: 80 };
const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
const innerWidth = WIDTH - MARGIN.left - MARGIN.right;

function getIntervalLength(i: IntervalWithTodo, setting: "real" | "default") {
  if (setting === "real") {
    return (
      (new Date(i.endDate).getTime() - new Date(i.startDate).getTime()) /
      1000 /
      60
    );
  } else return i.defaultDuration / 60;
}

const PomodoroGraph: FC<PomodoroGraphProps> = ({ stats, settings }) => {
  const { intervals, tags, todos } = stats;

  const data: IntervalDataItem[] = [];

  if (settings.sortby === "tags") {
    for (let tag of tags.values()) {
      data.push({
        intervals: intervals.filter((i) => i.todo?.tag?.id === tag.id),
        id: String(tag.id),
        title: tag.label,
      });
    }
    const noneIntervals = intervals.filter((i) => !i.todo?.tag);
    noneIntervals.length &&
      data.push({ id: "NONE", title: "None", intervals: noneIntervals });
  } else {
    for (let todo of todos.values()) {
      data.push({
        intervals: intervals.filter((i) => i.todo?.id === todo.id),
        id: String(todo.id),
        title: todo.title,
      });
    }
    const noneIntervals = intervals.filter((i) => !i.todo);
    noneIntervals.length &&
      data.push({ id: "NONE", title: "None", intervals: noneIntervals });
  }

  const xScale = scaleBand<any>()
    .domain(data.map((d) => d.id))
    .range([0, innerWidth])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  const maxY = Math.max(
    data.reduce(
      (acc, d) =>
        Math.max(
          acc,
          d.intervals.reduce<number>(
            (acc, i) => acc + getIntervalLength(i, settings.time),
            0
          )
        ),
      0
    ),
    60
  );

  const yScale = scaleLinear().domain([0, maxY]).range([0, innerHeight]);

  return (
    <>
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
          <BandAxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            innerWidth={innerWidth}
            tickFormat={(id) => data.find((d) => d.id === id)?.title || ""}
            rotateLabel={-25}
          />
          <LinearAxisLeft
            innerWidth={innerWidth}
            yScale={yScale}
            tickFormat={formatMinToHour}
            reverse
          />
          <BarChartMarks
            xScale={xScale}
            yScale={yScale}
            xValue={(d) => d.id}
            yValue={(d) =>
              d.intervals.reduce(
                (acc, i) => acc + getIntervalLength(i, settings.time),
                0
              ) || 0
            }
            tooltipFormat={formatMinToHour}
            data={data}
          />
        </g>
      </svg>
    </>
  );
};

export default PomodoroGraph;
