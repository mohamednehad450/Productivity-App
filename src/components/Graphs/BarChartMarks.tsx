import { ScaleBand, ScaleLinear } from "d3-scale";

interface BarChartMarksProps<T> {
  data: T[];
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
  xValue: (d: T) => string;
  yValue: (d: T) => number;
  tooltipFormat: (n: number) => string;
}

function BarChartMarks<T>({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
}: BarChartMarksProps<T>) {
  return (
    <>
      {data.map((d) => (
        <rect
          className="todomark"
          key={xValue(d)}
          x={xScale(xValue(d))}
          y={-yScale(yValue(d)) + yScale.range()[1]}
          width={xScale.bandwidth()}
          height={yScale(yValue(d))}
          fill={"var(--default-bar-color)"}
        >
          <title>{tooltipFormat(yValue(d))}</title>
        </rect>
      ))}
    </>
  );
}

export default BarChartMarks;
