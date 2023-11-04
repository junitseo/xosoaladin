import ILotoTable from '@/Interfaces/ILotoTable'
import styles from '@/styles/Components/LotoMbTable/index.module.scss'
import { NextPage } from 'next/types'

const LotoMbTable: NextPage<ILotoTable> = (props: ILotoTable) => {
    const onMouseOverLoto = (
        number: number[],
        type: string,
        region: number
    ) => {
        props.setLotoChosen && props.setLotoChosen({ number, type, region })
    }

    const onMouseOutLoto = (number: number[], type: string, region: number) => {
        props.setLotoChosen &&
            props.setLotoChosen({ number: [-1], type: '-1', region: 0 })
    }
    return (
        <div className={styles.lotoMbTable}>
            {props.dataXoso?.resultObj?.map((item) => (
                <>
                    <div className={styles.lotoMbTableColumn}>
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>Chục</td>
                                    <td>Số</td>
                                    <td>Đơn vị</td>
                                </tr>
                                <tr>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[1] == '0'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[0]
                                                        )
                                                    ),
                                                'chuc',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[1] == '0'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[0]
                                            )
                                            .toString()}
                                    </td>
                                    <td>
                                        <span
                                            onMouseOut={() =>
                                                onMouseOutLoto([0], 'all', 0)
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto([0], 'all', 0)
                                            }
                                        >
                                            0
                                        </span>
                                    </td>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[0] == '0'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[1]
                                                        )
                                                    ),
                                                'donvi',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[0] == '0'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[1]
                                            )
                                            .toString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[1] == '1'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[0]
                                                        )
                                                    ),
                                                'chuc',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[1] == '1'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[0]
                                            )
                                            .toString()}
                                    </td>
                                    <td>
                                        <span
                                            onMouseOut={() =>
                                                onMouseOutLoto([1], 'all', 0)
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto([1], 'all', 0)
                                            }
                                        >
                                            1
                                        </span>
                                    </td>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[0] == '1'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[1]
                                                        )
                                                    ),
                                                'donvi',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[0] == '1'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[1]
                                            )
                                            .toString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[1] == '2'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[0]
                                                        )
                                                    ),
                                                'chuc',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[1] == '2'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[0]
                                            )
                                            .toString()}
                                    </td>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                [
                                                    Number(
                                                        item?.listXSTT
                                                            ?.filter(
                                                                (rs) =>
                                                                    rs.loto?.split(
                                                                        ''
                                                                    )[0] == '2'
                                                            )
                                                            .map(
                                                                (item) =>
                                                                    item.loto.split(
                                                                        ''
                                                                    )[0]
                                                            )
                                                    ),
                                                ],
                                                'chuc',
                                                0
                                            )
                                        }
                                    >
                                        <span
                                            onMouseOut={() =>
                                                onMouseOutLoto([2], 'all', 0)
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto([2], 'all', 0)
                                            }
                                        >
                                            2
                                        </span>
                                    </td>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[0] == '2'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[1]
                                                        )
                                                    ),
                                                'donvi',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[0] == '2'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[1]
                                            )
                                            .toString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[1] == '3'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[0]
                                                        )
                                                    ),
                                                'chuc',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[1] == '3'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[0]
                                            )
                                            .toString()}
                                    </td>
                                    <td>
                                        <span
                                            onMouseOut={() =>
                                                onMouseOutLoto([3], 'all', 0)
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto([3], 'all', 0)
                                            }
                                        >
                                            3
                                        </span>
                                    </td>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[0] == '3'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[1]
                                                        )
                                                    ),
                                                'donvi',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[0] == '3'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[1]
                                            )
                                            .toString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[1] == '4'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[0]
                                                        )
                                                    ),
                                                'chuc',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[1] == '4'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[0]
                                            )
                                            .toString()}
                                    </td>
                                    <td>
                                        <span
                                            onMouseOut={() =>
                                                onMouseOutLoto([4], 'all', 0)
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto([4], 'all', 0)
                                            }
                                        >
                                            4
                                        </span>
                                    </td>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[0] == '4'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[1]
                                                        )
                                                    ),
                                                'donvi',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[0] == '4'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[1]
                                            )
                                            .toString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.lotoMbTableColumn}>
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>Chục</td>
                                    <td>Số</td>
                                    <td>Đơn vị</td>
                                </tr>
                                <tr>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[1] == '5'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[0]
                                                        )
                                                    ),
                                                'chuc',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[1] == '5'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[0]
                                            )
                                            .toString()}
                                    </td>
                                    <td>
                                        <span
                                            onMouseOut={() =>
                                                onMouseOutLoto([5], 'all', 0)
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto([5], 'all', 0)
                                            }
                                        >
                                            5
                                        </span>
                                    </td>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[0] == '5'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[1]
                                                        )
                                                    ),
                                                'donvi',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[0] == '5'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[1]
                                            )
                                            .toString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[1] == '6'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[0]
                                            )
                                            .toString()}
                                    </td>
                                    <td>
                                        <span
                                            onMouseOut={() =>
                                                onMouseOutLoto([6], 'all', 0)
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto([6], 'all', 0)
                                            }
                                        >
                                            6
                                        </span>
                                    </td>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[0] == '6'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[1]
                                                        )
                                                    ),
                                                'donvi',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[0] == '6'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[1]
                                            )
                                            .toString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[1] == '7'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[0]
                                                        )
                                                    ),
                                                'chuc',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[1] == '7'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[0]
                                            )
                                            .toString()}
                                    </td>
                                    <td>
                                        <span
                                            onMouseOut={() =>
                                                onMouseOutLoto([7], 'all', 0)
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto([7], 'all', 0)
                                            }
                                        >
                                            7
                                        </span>
                                    </td>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[0] == '7'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[1]
                                                        )
                                                    ),
                                                'donvi',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[0] == '7'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[1]
                                            )
                                            .toString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[1] == '8'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[0]
                                                        )
                                                    ),
                                                'chuc',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[1] == '8'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[0]
                                            )
                                            .toString()}
                                    </td>
                                    <td>
                                        <span
                                            onMouseOut={() =>
                                                onMouseOutLoto([8], 'all', 0)
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto([8], 'all', 0)
                                            }
                                        >
                                            8
                                        </span>
                                    </td>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[0] == '8'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[1]
                                                        )
                                                    ),
                                                'donvi',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[0] == '8'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[1]
                                            )
                                            .toString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[1] == '9'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[0]
                                                        )
                                                    ),
                                                'chuc',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[1] == '9'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[0]
                                            )
                                            .toString()}
                                    </td>
                                    <td>
                                        <span
                                            onMouseOut={() =>
                                                onMouseOutLoto([9], 'all', 0)
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto([9], 'all', 0)
                                            }
                                        >
                                            9
                                        </span>
                                    </td>
                                    <td
                                        onMouseOut={() =>
                                            onMouseOutLoto([0], 'all', 0)
                                        }
                                        onMouseOver={() =>
                                            onMouseOverLoto(
                                                item?.listXSTT
                                                    ?.filter(
                                                        (rs) =>
                                                            rs.loto?.split(
                                                                ''
                                                            )[0] == '9'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[1]
                                                        )
                                                    ),
                                                'donvi',
                                                0
                                            )
                                        }
                                    >
                                        {item?.listXSTT
                                            ?.filter(
                                                (rs) =>
                                                    rs.loto?.split('')[0] == '9'
                                            )
                                            .map(
                                                (item) => item.loto.split('')[1]
                                            )
                                            .toString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            ))}
        </div>
    )
}

export default LotoMbTable
