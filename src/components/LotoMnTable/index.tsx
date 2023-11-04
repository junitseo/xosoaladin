import ILotoTable from '@/Interfaces/ILotoTable'
import { provinces } from '@/mocks/provinces'
import styles from '@/styles/Components/LotoMnTable/index.module.scss'
import { NextPage } from 'next/types'

const LotoMnTable: NextPage<ILotoTable> = (props: ILotoTable) => {
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
    function getKeyByValue<T extends {}>(object: T, value: string) {
        return Object.keys(object).find(
            (key) => object[key as keyof object] == value
        )
    }
    return (
        <div className={styles.lotoMnTable}>
            {props.dataXoso?.resultObj?.map((item) => {
                return (
                    <div className={styles.lotoMnTableColumn}>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={3}>{item.provinceName}</th>
                                </tr>
                            </thead>
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                onMouseOutLoto(
                                                    [0],
                                                    'all',
                                                    item.listXSTT?.[0]
                                                        ?.provinceId
                                                )
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto(
                                                    [0],
                                                    'all',
                                                    Number(
                                                        getKeyByValue(
                                                            provinces,
                                                            item.provinceName
                                                        )
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                onMouseOutLoto(
                                                    [1],
                                                    'all',
                                                    item.listXSTT?.[0]
                                                        ?.provinceId
                                                )
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto(
                                                    [1],
                                                    'all',
                                                    Number(
                                                        getKeyByValue(
                                                            provinces,
                                                            item.provinceName
                                                        )
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                    <td>
                                        <span
                                            onMouseOut={() =>
                                                onMouseOutLoto(
                                                    [2],
                                                    'all',
                                                    item.listXSTT?.[0]
                                                        ?.provinceId
                                                )
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto(
                                                    [2],
                                                    'all',
                                                    Number(
                                                        getKeyByValue(
                                                            provinces,
                                                            item.provinceName
                                                        )
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                onMouseOutLoto(
                                                    [3],
                                                    'all',
                                                    item.listXSTT?.[0]
                                                        ?.provinceId
                                                )
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto(
                                                    [3],
                                                    'all',
                                                    Number(
                                                        getKeyByValue(
                                                            provinces,
                                                            item.provinceName
                                                        )
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                onMouseOutLoto(
                                                    [4],
                                                    'all',
                                                    item.listXSTT?.[0]
                                                        ?.provinceId
                                                )
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto(
                                                    [4],
                                                    'all',
                                                    Number(
                                                        getKeyByValue(
                                                            provinces,
                                                            item.provinceName
                                                        )
                                                    )
                                                )
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
                                                            )[0]
                                                        )
                                                    ),
                                                'donvi',
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                onMouseOutLoto(
                                                    [5],
                                                    'all',
                                                    item.listXSTT?.[0]
                                                        ?.provinceId
                                                )
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto(
                                                    [5],
                                                    'all',
                                                    Number(
                                                        getKeyByValue(
                                                            provinces,
                                                            item.provinceName
                                                        )
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                            )[1] == '6'
                                                    )
                                                    .map((item) =>
                                                        Number(
                                                            item.loto.split(
                                                                ''
                                                            )[0]
                                                        )
                                                    ),
                                                'chuc',
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
                                            )
                                        }
                                    >
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
                                                onMouseOutLoto(
                                                    [6],
                                                    'all',
                                                    item.listXSTT?.[0]
                                                        ?.provinceId
                                                )
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto(
                                                    [6],
                                                    'all',
                                                    Number(
                                                        getKeyByValue(
                                                            provinces,
                                                            item.provinceName
                                                        )
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                onMouseOutLoto(
                                                    [7],
                                                    'all',
                                                    item.listXSTT?.[0]
                                                        ?.provinceId
                                                )
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto(
                                                    [7],
                                                    'all',
                                                    Number(
                                                        getKeyByValue(
                                                            provinces,
                                                            item.provinceName
                                                        )
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                onMouseOutLoto(
                                                    [8],
                                                    'all',
                                                    item.listXSTT?.[0]
                                                        ?.provinceId
                                                )
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto(
                                                    [8],
                                                    'all',
                                                    Number(
                                                        getKeyByValue(
                                                            provinces,
                                                            item.provinceName
                                                        )
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                                                onMouseOutLoto(
                                                    [9],
                                                    'all',
                                                    item.listXSTT?.[0]
                                                        ?.provinceId
                                                )
                                            }
                                            onMouseOver={() =>
                                                onMouseOverLoto(
                                                    [9],
                                                    'all',
                                                    Number(
                                                        getKeyByValue(
                                                            provinces,
                                                            item.provinceName
                                                        )
                                                    )
                                                )
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
                                                Number(
                                                    getKeyByValue(
                                                        provinces,
                                                        item.provinceName
                                                    )
                                                )
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
                )
            })}
        </div>
    )
}

export default LotoMnTable
