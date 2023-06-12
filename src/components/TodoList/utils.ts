import { compDate } from '../../utils'

import type { Step, Todo } from "../../API"
import type { TodoSettings } from "../Settings"



const todoCompFns: { [key: string]: (t1: Todo, t2: Todo) => number } = {
    'added': (t1: Todo, t2: Todo) => compDate(t1.date, t2.date),
    'checked': (t1: Todo, t2: Todo) => {
        const c1 = isDone(t1)
        const c2 = isDone(t2)
        return c1 === c2 ? t1.title.localeCompare(t2.title) : c1 ? 1 : -1
    },
    'dueDate': (t1: Todo, t2: Todo) => {
        const d1 = getDueDate(t1)
        const d2 = getDueDate(t2)
        return d1 && d2 ? compDate(d1, d2) :
            !d1 && !d2 ? t1.title.localeCompare(t2.title) :
                d1 ? 1 : -1
    },
    'stepsLeft': (t1: Todo, t2: Todo) => {
        const sl1 = t1.steps.filter(s => !s.checked).length
        const sl2 = t2.steps.filter(s => !s.checked).length
        return sl1 > sl2 ? 1 : sl1 < sl2 ? -1 : t1.title.localeCompare(t2.title)
    },
    'title': (t1: Todo, t2: Todo) => t1.title.localeCompare(t2.title)
}

const stepCompFns: { [key: string]: (t1: Step, t2: Step) => number } = {
    'checked': (s1: Step, s2: Step) => {
        return s1.checked === s2.checked ? s1.title.localeCompare(s2.title) : s1.checked ? 1 : -1
    },
    'title': (s1: Step, s2: Step) => s1.title.localeCompare(s2.title),
    'dueDate': (s1: Step, s2: Step) => {
        return s1.dueDate && s2.dueDate ? compDate(s1.dueDate, s2.dueDate) :
            !s1.dueDate && !s2.dueDate ? s1.title.localeCompare(s2.title) :
                s1.dueDate ? 1 : -1
    },
}

function isDone(todo: Todo): boolean {
    return todo.steps.length ?
        todo.steps.reduce<boolean>((acc, s) => acc && !!s.checked, true) :
        !!todo.checked
}

function getDueDate(todo: Todo): Todo['dueDate'] {
    return todo.steps.length ?
        todo.steps.reduce<Todo['dueDate']>((acc, s) => {
            if (acc) {
                return s.dueDate ?
                    compDate(s.dueDate, acc) > 0 ? s.dueDate : acc
                    : acc
            } else {
                return s.dueDate
            }
        }, undefined) : todo.dueDate
}

function sortSteps(steps: Step[], settings: TodoSettings): Step[] {
    const ans = steps.sort(stepCompFns[settings.sortStepsBy])
    return settings.stepsAscending ? ans : ans.reverse()
}


function filterTodos(todos: Todo[], settings: TodoSettings): Todo[] {

    let results = todos
    if (settings.hideCheckedTodos) {
        results = results.filter(t => !isDone(t))
    }
    results = results.sort(todoCompFns[settings.sortTodosBy])

    results = results.map(t => ({ ...t, steps: sortSteps(t.steps, settings) }))

    return settings.todosAscending ? results : results.reverse()

}
export interface FormatedTodo extends Todo {
    expandable: boolean
    stepsLeft: number | undefined

}

export const formatTodo = (todo: Todo): FormatedTodo => {
    const {
        steps,
        dueDate: todoDueDate,
        checked: todoCheckedDate
    } = todo;

    const stepsLeft = steps.length ?
        steps.filter(step => !step.checked).length :
        undefined;

    // Get the maximum dueDate
    const dueDate = steps.length ?
        steps.reduce<Todo['dueDate']>((acc, { dueDate }) =>
            acc ?
                dueDate ?
                    acc > dueDate ? acc : dueDate
                    : acc
                : dueDate
            , undefined) :
        todoDueDate;

    // Get the maximum check date IF all is checked
    const checked = steps.length ?
        steps.reduce<Todo['checked']>((acc, { checked }) =>
            acc ?
                checked ?
                    acc > checked ? acc : checked
                    : null
                : null
            , steps[0].checked)
        : todoCheckedDate;


    return {
        ...todo,
        stepsLeft,
        expandable: !!steps.length,
        dueDate: dueDate || todoDueDate,
        checked,

    }
}

export { filterTodos, sortSteps, isDone }
