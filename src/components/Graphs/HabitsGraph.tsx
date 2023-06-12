import { FC } from "react"
import { scaleBand, scaleLinear } from 'd3';
import { BandAxisBottom, LinearAxisLeft, BarChartMarks } from ".";

import type { StatsContext } from "./hooks"

interface HabitsGraphProps {
    stats: StatsContext['habitsStats']
}

const WIDTH = 450;
const HEIGHT = 450;
const MARGIN = { top: 20, right: 50, bottom: 100, left: 50 };
const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
const innerWidth = WIDTH - MARGIN.left - MARGIN.right;


const HabitsGraph: FC<HabitsGraphProps> = ({ stats }) => {

    const { habits } = stats

    const xScale = scaleBand()
        .domain(habits.map(h => h.id))
        .range([0, innerWidth])
        .paddingInner(0.5)
        .paddingOuter(0.3);

    const maxY = Math.max(habits.reduce((acc, h) => Math.max(acc, h.entries.length), 0), 10)
    const yScale = scaleLinear()
        .domain([0, maxY])
        .range([0, innerHeight]);

    return (
        <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
            <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
                <BandAxisBottom
                    xScale={xScale}
                    innerHeight={innerHeight}
                    innerWidth={innerWidth}
                    tickFormat={(id) => habits.find(h => h.id === id)?.title || ''}
                    rotateLabel={-25}
                />
                <LinearAxisLeft
                    yScale={yScale}
                    innerWidth={innerWidth}
                    reverse
                />
                <BarChartMarks
                    yScale={yScale}
                    xScale={xScale}
                    yValue={(h) => h.entries.length}
                    xValue={(h) => h.id}
                    tooltipFormat={n => n > 1 ? n + ' times' : n + ' time'}
                    data={habits}
                />
            </g>
        </svg>
    )
}


export default HabitsGraph