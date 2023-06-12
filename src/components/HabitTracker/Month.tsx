import { FC, useEffect, useState } from "react"
import { Habit } from "../../API"
import { getDaysInMonth } from "../../utils"
import { NumCheckBox } from "../common"



const daySym = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', "Sa"]

interface MonthProps {
    date: Date
    entries: Habit['entries']
    onChange: (d: Date, checked: boolean) => void
    updateDate?: boolean
}

const Month: FC<MonthProps> = ({ date: initDate, entries, onChange, updateDate }) => {
    const [date, setDate] = useState(initDate)
    useEffect(() => {
        updateDate && setDate(initDate)
    }, [initDate, updateDate])

    const m = date.getMonth()
    const y = date.getFullYear()
    const daysInMonth = getDaysInMonth(m, y)

    date.setDate(1)
    const fistDayOfWeek = date.getDay()

    const rows = Math.ceil((fistDayOfWeek + daysInMonth) / 7)
    const dSet = new Set<string>(entries.map(d => new Date(d).toLocaleDateString()))
    return (
        <table className="table-container">
            <thead>
                <tr className="entries-row">
                    {daySym.map(s => <td key={s} className="entry">{s}</td>)}
                </tr>
            </thead>
            <tbody>
                {[...Array(rows)].map((_, row) => (
                    <tr className="entries-row" key={String(row)}>
                        {[...Array(7)].map((_, cell) => {
                            const day = cell - fistDayOfWeek + (row * 7) + 1
                            const cellDate = (day < 1 || day > daysInMonth) ? null : new Date(`${y}/${m + 1}/${day}`)
                            const checked = !!cellDate && dSet.has(cellDate.toLocaleDateString())
                            const isToday = cellDate?.toLocaleDateString() === new Date().toLocaleDateString()
                            return (
                                <td
                                    key={String(cell)}
                                    className={
                                        `entry${checked ? ' entry-checked' : ''}${isToday ? ' entry-today' : ''}`
                                    }
                                >
                                    {cellDate && (
                                        <NumCheckBox
                                            onChange={(checked) => onChange(cellDate, checked)}
                                            checked={checked}
                                            number={day}
                                        />
                                    )}
                                </td>
                            )
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )

}

export default Month