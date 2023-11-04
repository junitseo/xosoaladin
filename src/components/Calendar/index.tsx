import { NextPage } from 'next/types'
import styles from '@/styles/Components/Calendar/index.module.scss'
import Calendar, { CalendarTileProperties } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import ICalendar from '@/Interfaces/ICalendar'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import { useRouter } from 'next/router'

const CalendarComponent: NextPage = () => {
    const router = useRouter()
    const routerPath = router.asPath
    const originalRouter = routerPath.split('?')?.[0]
    const handleSetDate = (value: Date): void => {
        router.push(`/kqxs?date=${addingZeroToMonth(new Date(value))}`)
    }

    return (
        <div className={styles.calendar}>
            <Calendar
                onChange={(value: Date) => handleSetDate(value)}
                locale="vi"
                className={styles.calendarReact}
                tileDisabled={(props: CalendarTileProperties) =>
                    (props.date.getDate() > new Date().getDate() &&
                        props.date.getMonth() >= new Date().getMonth() &&
                        props.date.getFullYear() >= new Date().getFullYear()) ||
                    (props.date.getMonth() > new Date().getMonth() &&
                        props.date.getFullYear() >= new Date().getFullYear()) ||
                    props.date.getFullYear() > new Date().getFullYear()
                }
            />
        </div>
    )
}

export default CalendarComponent
