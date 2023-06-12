import { FC, useState } from "react";
import { ListRow, ActionSelect } from "../common";
import HabitEntries from "./HabitEntries";
import NewHabitOverlay from "./NewHabitOverlay";

import { ReactComponent as ExpandIcon } from '../../icons/expand.svg'

import type { Habit } from "../../API";


interface HabitRowProps {
    habit: Habit
    expanded: boolean
    remove: (id: Habit['id']) => void
    update: (id: Habit['id'], h: Partial<Habit>) => Promise<any>
    addEntry: (id: Habit['id'], d: Date) => Promise<any>
    removeEntry: (id: Habit['id'], d: Date) => Promise<any>
    onClick: (id: Habit['id']) => void
}


const HaibtRow: FC<HabitRowProps> = ({
    habit,
    expanded,
    onClick,
    remove,
    update,
    addEntry,
    removeEntry
}) => {

    const [edit, setEdit] = useState(false)

    return (
        <>
            {edit && (
                <NewHabitOverlay
                    close={() => setEdit(false)}
                    submit={h => update(habit.id, h)}
                    initialHabit={habit}
                />
            )}
            <ListRow
                onClick={() => onClick(habit.id)}
                expanded={expanded}
                leftItem={(
                    <span className='text-title'>{habit.title}</span>
                )}
                rightItem={(
                    <>
                        <span className={`icon icon-gray ${expanded ? 'flip' : ''}`}>
                            <ExpandIcon />
                        </span>
                        <ActionSelect
                            actions={[
                                { label: 'Edit', action: () => setEdit(true) },
                                { label: 'Delete', action: () => remove(habit.id) },
                            ]}
                        />
                    </>
                )}
                expandedItem={
                    <HabitEntries
                        entries={habit.entries}
                        onAdd={(d) => addEntry(habit.id, d)}
                        onRemove={(d) => removeEntry(habit.id, d)}
                    />
                }
            />
        </>
    )
}



export default HaibtRow