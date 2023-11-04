import { Dispatch, SetStateAction } from 'react'

export default interface ICalendar {
    date: string
    setDate: Dispatch<SetStateAction<string>>
    region: number
}
