import { FC } from "react";

interface NumCardProps {
    title: string
    count: number
}

const NumCard: FC<NumCardProps> = ({ title, count }) => {


    return (
        <div className="numcard">
            <span className="numcard-title" >{title}</span>
            <span className="numcard-count">{count}</span>
        </div>
    );
}

export default NumCard