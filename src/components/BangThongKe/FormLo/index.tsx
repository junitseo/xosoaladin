import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import reverseDate from '@/helpers/reverseDate'
import { provinces } from '@/mocks/provinces'
import { getResultFormLo } from '@/services/api'
import styles from '@/styles/Components/BangThongKe/FormLo.module.scss'
import { useState } from 'react'

const FormLo = ({
    sortBy,
    setResultFormLo,
}: {
    sortBy: 'province' | 'region'
    setResultFormLo: any
}) => {
    const [province, setProvince] = useState(15)
    const [region, setRegion] = useState(1)
    const [number, setNumber] = useState('')
    const [startDate, setStartDate] = useState<any>()
    const [endDate, setEndDate] = useState<any>()

    const onSubmit = async () => {
        if (!number) {
            alert('Vui lòng nhập dãy số'!)
            return
        }
        try {
            const result = await getResultFormLo({
                province,
                region,
                number,
                startDate: startDate
                    ? reverseDate(addingZeroToMonth(startDate))
                    : '',
                endDate: endDate ? reverseDate(addingZeroToMonth(endDate)) : '',
                sortBy,
            })

            setResultFormLo(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className={styles.inputRegion}>
                {sortBy == 'region' ? (
                    <>
                        <label>Miền: </label>
                        <select
                            onChange={(e) => setRegion(Number(e.target.value))}
                        >
                            <option value={1}>Miền Bắc</option>
                            <option value={2}>Miền Trung</option>
                            <option value={3}>Miền Nam</option>
                        </select>
                    </>
                ) : (
                    <>
                        <label>Miền: </label>
                        <select
                            value={province}
                            onChange={(e) =>
                                setProvince(Number(e.target.value))
                            }
                        >
                            {Object.keys(provinces).map((item: string) => {
                                return (
                                    <option value={item}>
                                        {provinces[Number(item)]}
                                    </option>
                                )
                            })}
                        </select>
                    </>
                )}
            </div>
            <div className={styles.inputNumber}>
                <label>Dãy số: </label>
                <input
                    placeholder="Nhập dãy số"
                    onChange={(e) => setNumber(e.target.value)}
                />
            </div>
            <div className={styles.inputDate}>
                <div className={styles.inputDateStart}>
                    <label>Ngày bắt đầu: </label>
                    <input
                        type="date"
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                    />
                </div>
                <div className={styles.inputDateEnd}>
                    <label>Ngày kết thúc: </label>
                    <input
                        type="date"
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                    />
                </div>
            </div>
            <div className={styles.inputSubmit}>
                <div className="button-statistic" onClick={() => onSubmit()}>
                    <span>Thống kê</span>
                </div>
            </div>
        </div>
    )
}

export default FormLo
