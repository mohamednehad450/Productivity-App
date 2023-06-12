import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
    getInterval as getIntervalAPI,
    getIntervals as getIntervalsAPI,
    addInterval as addIntervalAPI,
} from '../../API'

import type { PomodoroInterval, AuthContext } from "../../API";



export interface IntervalContext {
    intervals: PomodoroInterval[]
    addInterval: (p: Partial<PomodoroInterval>) => Promise<void>
    getInterval: (id: PomodoroInterval['id']) => Promise<PomodoroInterval>
}

const defaultIntervalContext: any = {
    intervals: [],
    addInterval: async () => console.error('Intervals context not initialized'),
    getInterval: async () => console.error('Intervals context not initialized'),
}

export const intervalContext = createContext<IntervalContext>(defaultIntervalContext)

export const useIntervals = () => useContext(intervalContext)

export const useProvideIntervals = ({ user }: AuthContext): IntervalContext => {

    const [intervals, setIntervals] = useState<PomodoroInterval[]>([])
    useEffect(() => { getIntervalsAPI(user).then(setIntervals) }, [user])

    const addInterval: IntervalContext['addInterval'] = useCallback((p) =>
        addIntervalAPI(p, user)
            .then(p => setIntervals(arr => [p, ...arr]))
        , [user])

    const getInterval: IntervalContext['getInterval'] = useCallback(async (id) => {
        const p = intervals.find(p => p.id === id)
        if (p) return p
        else return await getIntervalAPI(id, user)
    }, [user, intervals])


    return {
        intervals,
        addInterval,
        getInterval,
    }
}


