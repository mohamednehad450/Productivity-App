import React, { FC } from 'react'
import { IconButton, TextInput, DatePicker } from '../common'

import { ReactComponent as CancelIcon } from '../../icons/cancel-fill.svg'

import type { Step, StepError } from '../../API'

interface StepInputProps {
    step: Step
    onChange: (step: Step) => void
    remove: (step: Step) => void
    error?: StepError
}

const StepInput: FC<StepInputProps> = ({ step, error, onChange, remove }) => {
    return (
        <>
            <div className='input-row wrap'>
                <IconButton
                    className='icon-gray'
                    icon={<CancelIcon />}
                    onClick={() => remove(step)}
                />
                <TextInput
                    placeholder="New Step"
                    onChange={(title) => onChange({ ...step, title })}
                    value={step.title}
                    errors={error?.title}
                />
                <DatePicker
                    date={step.dueDate ? new Date(step.dueDate) : undefined}
                    onChange={(dueDate) => onChange({ ...step, dueDate })}
                    emptyPlaceholder="set a deadline (optional)"
                />
            </div>
            <hr></hr>
        </>
    )
}

export default StepInput