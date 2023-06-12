import { ScaleLinear } from "d3-scale";
import { FC } from "react";

interface LinearAxisLeftProps {
    yScale: ScaleLinear<number, number>
    innerWidth: number
    reverse?: boolean
    hideLineTicks?: boolean
    tickFormat?: (tickValue: number) => string
}
// export const AxisLeft = ({ yScale ,innerWidth, tickFormat}) =>
//  	yScale.ticks().map(tickValue => (

//   ));

const LinearAxisLeft: FC<LinearAxisLeftProps> = ({
    reverse,
    hideLineTicks,
    yScale,
    innerWidth,
    tickFormat
}) => (
    <>
        {yScale.ticks().map(tickValue => (
            <g className="tick"
                key={tickValue}
                transform={`translate(0,${reverse ?
                    (yScale.range()[1] - yScale(tickValue) || 0) :
                    (yScale(tickValue) || 0)
                    })`}
            >
                {!hideLineTicks && <line x2={innerWidth} className="tick-line" />}

                <text
                    className="tick-text"
                    style={{ textAnchor: 'end' }}
                    dx="-1em"
                    dy="0.3em"
                >
                    {tickFormat ? tickFormat(tickValue) : tickValue}
                </text>
            </g>
        ))}

    </>
);

export default LinearAxisLeft
