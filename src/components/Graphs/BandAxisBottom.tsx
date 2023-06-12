import { FC } from "react";
import { ScaleBand } from "d3-scale";

interface BandAxisBottomProps {
    xScale: ScaleBand<string>
    innerHeight: number
    innerWidth: number
    tickFormat?: (tickValue: string) => string
    rotateLabel?: number
}

const BandAxisBottom: FC<BandAxisBottomProps> = ({
    xScale,
    innerHeight,
    innerWidth,
    tickFormat,
    rotateLabel = 0,
}) => (
    <>
        {xScale.domain().map((tickValue) => (
            <g
                className="tick"
                key={tickValue}
                transform={`
                translate(
                    ${(xScale(tickValue) || 0) + xScale.bandwidth() / 2},
                    ${innerHeight}
                ) 
                rotate(${rotateLabel})
                `}
            >
                <text
                    style={{
                        textAnchor: rotateLabel > 0 ? 'start' : rotateLabel < 0 ? 'end' : 'middle',
                    }}
                    className="tick-text"
                    fill="gray"
                    dy="1.32em"
                >
                    {tickFormat ? tickFormat(tickValue) : tickValue}
                </text>
            </g>
        ))}
        <g className="tick" >
            <line y2={innerHeight} className="tick-line" />
            <line y2={innerHeight} y1={0} x1={innerWidth} x2={innerWidth} className="tick-line" />
        </g>
    </>
);

export default BandAxisBottom