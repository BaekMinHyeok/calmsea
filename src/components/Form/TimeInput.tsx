import { ChangeEvent, useState } from 'react'
import {
    TimeInputWrap,
    TimeLabel,
    TimeInputStyle,
} from '@/components/Form/Form.styes'

interface TimeInputProps {
    id: string
    label: string
    onChange: (minutes: number) => void
}

export function TimeInput({ id, label, onChange }: TimeInputProps) {
    const [startTime, setStartTime] = useState('00:00')
    const [endTime, setEndTime] = useState('00:00')

    const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value)
        calculateDuration(e.target.value, endTime)
    }

    const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEndTime(e.target.value)
        calculateDuration(startTime, e.target.value)
    }

    const calculateDuration = (start: string, end: string) => {
        const startMinutes = convertToMinutes(start)
        const endMinutes = convertToMinutes(end)

        const duration = endMinutes - startMinutes

        onChange(duration)
    }

    const convertToMinutes = (time: string): number => {
        const [hours, minutes] = time.split(':').map(Number)
        return hours * 60 + minutes
    }

    return (
        <div>
            <TimeLabel htmlFor={id}>{label}</TimeLabel>
            <TimeInputWrap>
                <TimeInputStyle
                    id={id}
                    type="time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                />
                <span>~</span>
                <TimeInputStyle
                    id={id}
                    type="time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                />
            </TimeInputWrap>
        </div>
    )
}
