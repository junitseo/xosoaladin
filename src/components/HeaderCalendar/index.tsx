import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import reverseDate from '@/helpers/reverseDate'
import styles from '@/styles/Components/HeaderCalendar/index.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const HeaderCalendar = () => {
    const inputDateRef = useRef<any>(null)
    const [date, setDate] = useState<string>('')
    const router = useRouter()

    const handleChangeDateOfWeek = (value: number) => {
        const toDay = new Date().getDay()
        const diff = toDay - value
        let haveResultDate = 0
        if (diff < 0) {
            haveResultDate = 7
        }

        const dateToGetData = new Date(
            new Date().setDate(new Date().getDate() - diff - haveResultDate)
        )

        setDate(reverseDate(addingZeroToMonth(dateToGetData)))
        handleChangeDatePicker(reverseDate(addingZeroToMonth(dateToGetData)))
    }

    const handleChangeDatePicker = (value: string) => {
        router.push(`/kqxs?date=${reverseDate(value)}`)
    }

    useEffect(() => {
        const date = router.query?.date
            ? reverseDate(router.query?.date.toString())
            : reverseDate(addingZeroToMonth(new Date()))
        setDate(date)
    }, [router.query])

    const handleNextDate = () => {
        const nextDate = reverseDate(
            addingZeroToMonth(
                new Date(new Date(date).setDate(new Date(date).getDate() + 1))
            )
        )
        setDate(nextDate)
        handleChangeDatePicker(nextDate)
    }

    const handlePreviousDate = () => {
        const prevDate = reverseDate(
            addingZeroToMonth(
                new Date(new Date(date).setDate(new Date(date).getDate() - 1))
            )
        )
        setDate(prevDate)
        handleChangeDatePicker(prevDate)
    }

    const handleNextWeek = () => {
        const nextWeek = reverseDate(
            addingZeroToMonth(
                new Date(new Date(date).setDate(new Date(date).getDate() + 7))
            )
        )
        setDate(nextWeek)
        handleChangeDatePicker(nextWeek)
    }

    const handlePreviousWeek = () => {
        const prevWeek = reverseDate(
            addingZeroToMonth(
                new Date(new Date(date).setDate(new Date(date).getDate() - 7))
            )
        )
        setDate(prevWeek)
        handleChangeDatePicker(prevWeek)
    }

    const handleNextMonth = () => {
        const nextMonth = reverseDate(
            addingZeroToMonth(
                new Date(new Date(date).setMonth(new Date(date).getMonth() + 1))
            )
        )
        setDate(nextMonth)
        handleChangeDatePicker(nextMonth)
    }

    const handlePreviousMonth = () => {
        const prevMonth = reverseDate(
            addingZeroToMonth(
                new Date(new Date(date).setMonth(new Date(date).getMonth() - 1))
            )
        )
        setDate(prevMonth)
        handleChangeDatePicker(prevMonth)
    }

    return (
        <div className={styles.headerCalendar}>
            <div className={styles.headerCalendarOption}>
                <ul>
                    <li onClick={() => handleChangeDateOfWeek(1)}>Thứ 2</li>
                    <li onClick={() => handleChangeDateOfWeek(2)}>Thứ 3</li>
                    <li onClick={() => handleChangeDateOfWeek(3)}>Thứ 4</li>
                    <li onClick={() => handleChangeDateOfWeek(4)}>Thứ 5</li>
                    <li onClick={() => handleChangeDateOfWeek(5)}>Thứ 6</li>
                    <li onClick={() => handleChangeDateOfWeek(6)}>Thứ 7</li>
                    <li onClick={() => handleChangeDateOfWeek(0)}>CN</li>
                </ul>
            </div>
            <div className={styles.headerCalendarList}>
                <div className={styles.headerCalendarListDate}>
                    <ul>
                        <li onClick={handlePreviousMonth}>{`<<<`}</li>
                        <li onClick={handlePreviousWeek}>{`<<`}</li>
                        <li onClick={handlePreviousDate}>{`<`}</li>
                        <li onClick={() => inputDateRef.current?.showPicker()}>
                            {reverseDate(date)}{' '}
                            <img
                                alt="xosoaladin.com"
                                src="/icons/schedule.webp"
                                width={18}
                                style={{ marginLeft: '4px' }}
                            />
                            <input
                                ref={inputDateRef}
                                type="date"
                                value={date}
                                style={{
                                    visibility: 'hidden',
                                    position: 'absolute',
                                }}
                                onChange={(e) =>
                                    handleChangeDatePicker(e.target.value)
                                }
                            />
                        </li>
                        <li onClick={handleNextDate}>{'>'}</li>
                        <li onClick={handleNextWeek}>{'>>'}</li>
                        <li onClick={handleNextMonth}>{'>>>'}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HeaderCalendar
