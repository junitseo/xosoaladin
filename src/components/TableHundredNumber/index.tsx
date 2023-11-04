import { hundredNumber, twelveZodiacs, worship } from '@/mocks/SoMo'
import React, { useState } from 'react'

const tabs = [
    {
        id: '1',
        name: 'THỜ CÚNG',
    },
    {
        id: '3',
        name: '100 CON SỐ',
    },
    {
        id: '2',
        name: '12 CON GIÁP',
    },
]

function TableHundredNumber() {
    const [tab, setTab] = useState('1')
    return (
        <div className="box-hundred-number">
            <ul>
                {tabs?.map((item) => (
                    <li key={item?.id}>
                        <p
                            onClick={() => setTab(item?.id)}
                            className={tab === item?.id ? 'active' : ''}
                        >
                            {item?.name}
                        </p>
                    </li>
                ))}
            </ul>

            <div className="content">
                <table
                    border={0}
                    cellPadding={2}
                    cellSpacing={0}
                    width={'100%'}
                >
                    <tbody>
                        {(tab === '3'
                            ? hundredNumber
                            : tab === '2'
                            ? twelveZodiacs
                            : worship
                        )?.map((item) => (
                            <tr key={item?.name}>
                                <td style={{ width: '49%', fontSize: '14px' }}>
                                    <span
                                        style={{
                                            backgroundPosition:
                                                item?.backgroundPosition,
                                        }}
                                        className="conso100"
                                    ></span>
                                    ({item?.name})
                                </td>
                                <td style={{ width: '19%' }}>
                                    {item?.firstNumber && (
                                        <span
                                            className={`ball30 ${
                                                item?.firstNumberClass || ''
                                            }`}
                                        >
                                            {item?.firstNumber}
                                        </span>
                                    )}
                                </td>
                                <td style={{ width: '19%' }}>
                                    {item?.secondNumber && (
                                        <span
                                            className={`ball30 ${
                                                item?.secondNumberClass || ''
                                            }`}
                                        >
                                            {item?.secondNumber || ''}
                                        </span>
                                    )}
                                </td>
                                <td style={{ width: '19%' }}>
                                    {item?.thirdNumber && (
                                        <span
                                            className={`ball30 ${
                                                item?.thirdNumberClass || ''
                                            }`}
                                        >
                                            {item?.thirdNumber || ''}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableHundredNumber
