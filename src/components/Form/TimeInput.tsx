import { ChangeEvent, useState } from 'react'

interface TimeInputProps {
    label: string
    onChange: (minutes: number) => void
}

export function TimeInput({ label, onChange }: TimeInputProps) {
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
        <>
            <label>{label}</label>
            <input
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
            />
            <span>~</span>
            <input type="time" value={endTime} onChange={handleEndTimeChange} />
        </>
    )
}
