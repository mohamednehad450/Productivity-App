import React, { FC } from 'react'
import DatePick from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import IconButton from './IconButton';

import { ReactComponent as CalendarIcon } from '../../icons/calendar.svg'


interface DatePickerProps {
    onChange: (date: Date) => void
    date?: Date
    emptyPlaceholder?: string
    disabled?: boolean

}

const CustomInput = ({ value, onClick, emptyPlaceholder = '', disabled }: any) => {
    return (
        <IconButton className="icon-gray" disabled={disabled} icon={<CalendarIcon />} onClick={onClick} label={value || emptyPlaceholder} />
    );
}


const DatePicker: FC<DatePickerProps> = ({ date, onChange, emptyPlaceholder, disabled }) => {
    return (
        <DatePick
            disabled={disabled}
            selected={date}
            onChange={(date: Date) => onChange(date)}
            customInput={<CustomInput disabled={disabled} emptyPlaceholder={emptyPlaceholder} />}
            showTimeSelect
            dateFormat="d/MM/yyyy, h:mm aa"
            filterDate={(date) => (date.getTime() > Date.now()) || date.toDateString() === new Date().toDateString()}
        />
    )
}

export default DatePicker