import React, { FC } from 'react'
import { Checkbox } from '../common'

// Types
import type { Step } from '../../API'
import DateBadge from './DateBadge'

interface StepRowProps {
    step: Step,
    onChange: (step: Partial<Step>) => void
}

const StepRow: FC<StepRowProps> = ({ step, onChange }) => {
    const { title, checked, id, dueDate } = step
    return (
        <div className="step-container">
            <div className="step-row">
                <div className="row-section">
                    <span className={`step-title ${checked ? 'crossed' : ''}`}>{title}</span>
                </div>
                <span className='row'>
                    <DateBadge date={dueDate} crossed={!!checked} />
                    <Checkbox
                        checked={!!checked}
                        onChange={(b) => onChange({ id, checked: b ? new Date() : null })}
                    />
                </span>
            </div>
        </div>
    )
}

export default StepRow