import { FC } from "react"
import { usePomodoro, CircularProgress } from "."
import { formatTime } from "../../utils"

import { ReactComponent as PlayIcon } from '../../icons/play.svg'
import { ReactComponent as PauseIcon } from '../../icons/pause.svg'


interface PomodoroClockProps { }



const PomodoroClock: FC<PomodoroClockProps> = () => {

    const { state, isRunning, start, stop } = usePomodoro()
    const { timeLeft, defaultTime, mode, } = state

    return (
        <div className={`center pomodoro-${mode}`} onClick={() => isRunning ? stop() : start()}>
            <CircularProgress
                progress={defaultTime ? timeLeft / defaultTime : 0}
            >
                <text className="progress-text" x="50%" y="40%" dominantBaseline="middle" textAnchor="middle">
                    {formatTime(timeLeft)}
                </text>
                {isRunning ?
                    <PauseIcon className="pomodoro-icon" width={64} height={64} x="41%" y="60%" /> :
                    <PlayIcon className="pomodoro-icon" width={64} height={64} x="41%" y="60%" />
                }
            </CircularProgress>
        </div>
    )
}

export default PomodoroClock