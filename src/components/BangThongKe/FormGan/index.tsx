import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import reverseDate from '@/helpers/reverseDate'
import { provinces } from '@/mocks/provinces'
import { getResultFormGan } from '@/services/api'
import styles from '@/styles/Components/BangThongKe/FormLo.module.scss'
import { useState } from 'react'

const FormGan = ({
    sortBy,
    setResultFormGan,
}: {
    sortBy: 'province' | 'region'
    setResultFormGan: any
}) => {
    const [province, setProvince] = useState(15)
    const [region, setRegion] = useState(1)
    const [number, setNumber] = useState('')
    const [searchType, setSearchType] = useState<'headTail' | 'special'>(
        'headTail'
    )

    const onSubmit = async () => {
        if (!number) {
            alert('Vui lòng nhập dãy số'!)
            return
        }
        try {
            const result = await getResultFormGan({
                province,
                region,
                number,
                sortBy,
                searchType,
            })

            setResultFormGan(result.data)
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
            <div className={styles.inputNumber}>
                <label>Tra cứu: </label>
                <input
                    checked={searchType == 'headTail'}
                    type="radio"
                    onChange={(e) => setSearchType('headTail')}
                />
                <span style={{ fontSize: '13px', marginLeft: '5px' }}>
                    Đầu đuôi
                </span>
                <input
                    checked={searchType == 'special'}
                    style={{ marginLeft: '10px' }}
                    type="radio"
                    onChange={(e) => setSearchType('special')}
                />
                <span style={{ fontSize: '13px', marginLeft: '5px' }}>
                    Đặc biệt
                </span>
            </div>
            <div className={styles.inputSubmit}>
                <div className="button-statistic" onClick={() => onSubmit()}>
                    <span>Thống kê</span>
                </div>
            </div>
        </div>
    )
}

export default FormGan
