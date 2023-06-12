import { createContext, useContext, useMemo, useState } from "react";
import { isSameMonth, isToday } from '../../utils'
import { formatTodo, useTodo } from "../TodoList";
import { useIntervals } from "../Pomodoro";
import { useHabits } from "../HabitTracker";


import type { Habit, IntervalWithTodo, Step, Tag, Todo, TodoWithTag, } from "../../API";


export interface StatsContext {
    summary: {
        todoAdded: number
        todoFinished: number
        stepsFinished: number
        pomodoroSession: number
        checkedHabits: number
    },
    todoStats: {
        month: Date,
        added: TodoWithTag[]
        finished: TodoWithTag[]
        tags: Tag[]
        setMonth: (d: Date) => void
    },
    pomodoroStats: {
        month: Date,
        setMonth: (d: Date) => void
        intervals: IntervalWithTodo[]
        todos: Map<TodoWithTag['id'], TodoWithTag>
        tags: Map<Tag['id'], Tag>
    },
    habitsStats: {
        month: Date,
        setMonth: (d: Date) => void
        habits: Habit[]
    }
}



const defaultStatsContext: StatsContext = {
    summary: {
        todoAdded: 0,
        todoFinished: 0,
        stepsFinished: 0,
        pomodoroSession: 0,
        checkedHabits: 0,
    },
    todoStats: {
        month: new Date(),
        setMonth: () => console.error('Stats context not initialized'),
        added: [],
        finished: [],
        tags: []
    },
    pomodoroStats: {
        month: new Date(),
        setMonth: () => console.error('Stats context not initialized'),
        intervals: [],
        todos: new Map(),
        tags: new Map(),
    },
    habitsStats: {
        month: new Date(),
        setMonth: () => console.error('Stats context not initialized'),
        habits: []
    }
}

export const statsContext = createContext<StatsContext>(defaultStatsContext)

export const useStats = () => useContext(statsContext)

export const useProvideStats = (): StatsContext => {

    const { intervals } = useIntervals()
    const { todos, getTag } = useTodo()
    const { habits } = useHabits()

    const [todosMonth, setTodosMonth] = useState(new Date())
    const [intervalsMonth, setIntervalsMonth] = useState(new Date())
    const [habitsMonth, setHabitsMonth] = useState(new Date())

    const todoSummary = useMemo(() => {
        const todoAdded = todos
            .filter(t => isToday(t.date))
            .length
        const todoFinished = todos
            .filter(t => isToday(formatTodo(t).checked))
            .length
        const stepsFinished = todos
            .reduce<Step[]>((acc, t) => [...acc, ...t.steps], [])
            .filter(s => s.checked && isToday(s.checked))
            .length

        return {
            todoAdded,
            todoFinished,
            stepsFinished,
        }
    }, [todos])

    const pomodoroSession = useMemo(() => {
        const pomodoroSession = intervals
            .filter(i => isToday(i.startDate))
            .length
        return pomodoroSession
    }, [intervals])

    const checkedHabits = useMemo(() => {
        const checkedHabits = habits
            .filter(h => h.entries
                .reduce<boolean>((acc, d) => acc || isToday(d), false))
            .length
        return checkedHabits
    }, [habits])

    const todosStats = useMemo(() => {
        let added: TodoWithTag[] = []
        let finished: TodoWithTag[] = []
        const tags = new Set<Tag>()

        tags.add({ label: 'None', color: '#FFF', id: 'NONE' })

        for (let t of todos) {
            const tag = getTag(t.tag)
            isSameMonth(t.date, todosMonth) &&
                added.push({ ...t, tag, }) &&
                tag && tags.add(tag);

            isSameMonth(formatTodo(t).checked, todosMonth) &&
                finished.push({ ...t, tag }) &&
                tag && tags.add(tag);
        }
        added = added
            .sort((a, b) => {
                const aColor = a.tag?.color || '#FFF'
                const bColor = b.tag?.color || '#FFF'
                return aColor.localeCompare(bColor)
            })
            .reverse()

        finished = finished
            .sort((a, b) => {
                const aColor = a.tag?.color || '#FFF'
                const bColor = b.tag?.color || '#FFF'
                return aColor.localeCompare(bColor)
            })
            .reverse()
        return {
            added,
            finished,
            tags: [...tags.values()]
        }
    }, [todosMonth, todos, getTag])

    const pomodoroStats = useMemo(() => {

        const monthInterval = intervals.filter(i => isSameMonth(i.endDate, intervalsMonth))

        const todosIds = new Set(monthInterval.map(i => i.todo || ''))

        const todosMap = new Map<Todo['id'], TodoWithTag>()

        const tags = new Map<Tag['id'], Tag>()


        for (let id of todosIds) {
            const todo = todos.find(t => t.id === id)
            const tag = todo && getTag(todo.tag)
            tag && tags.set(tag.id, tag)
            todo && todosMap.set(id, { ...todo, tag: getTag(todo.tag) })
        }
        const intervalsWithTodos: IntervalWithTodo[] = monthInterval.map(i => ({ ...i, todo: todosMap.get(i.todo || '') }))


        return {
            intervals: intervalsWithTodos,
            todos: todosMap,
            tags,
        }
    }, [intervals, todos, getTag, intervalsMonth])


    const habitStats = useMemo(() => {

        const filterHabits = habits
            .map(h => ({ ...h, entries: h.entries.filter(d => isSameMonth(habitsMonth, d)) }))
            .filter(h => h.entries.length)

        return {
            habits: filterHabits
        }
    }, [habitsMonth, habits])

    return {
        summary: {
            ...todoSummary,
            pomodoroSession,
            checkedHabits,
        },
        todoStats: {
            month: todosMonth,
            setMonth: setTodosMonth,
            ...todosStats,
        },
        pomodoroStats: {
            month: intervalsMonth,
            setMonth: setIntervalsMonth,
            ...pomodoroStats
        },
        habitsStats: {
            month: habitsMonth,
            setMonth: setHabitsMonth,
            ...habitStats
        }
    }
}