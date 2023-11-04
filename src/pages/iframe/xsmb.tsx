import styles from '@/styles/pages/kqxs/xo-so-mien-trung/index.module.scss'
import { GetServerSidePropsContext } from 'next/types'
import IDataXoso from '@/Interfaces/IDataXoso'
import {
    getKqxsMb,
} from '@/services/api'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import XsmbTable from '@/components/XsmbTable'
import reverseDate from '@/helpers/reverseDate'
import IDataXosoMore from '@/Interfaces/IDataXosoMore'
import compareTime from '@/helpers/compareTime'
import WaitingLoterry from '@/components/WaitingLottery'
import compareDateEqual from '@/helpers/compareDateEqual'
import StatisticLayout from '@/layouts/StatisticLayout'

const IframeXosoMienBac = ({
    dataXoso,
    dateXoso,
    haveDate,
}: {
    dataXoso: IDataXoso
    dateXoso: string
    haveDate: boolean
}) => {

    return (
        <div className={styles.xosoMienBac}>
            {dataXoso?.resultObj?.length > 0 && (
                <XsmbTable
                    regionName="Miền Bắc"
                    dataXoso={dataXoso}
                    date={dateXoso}
                    isHideZoom
                />
            )}
            <div style={{ marginTop: '15px' }}></div>
        </div>
    )
}

export default IframeXosoMienBac

//@ts-ignore
IframeXosoMienBac.getLayout = (page) => {
    return <StatisticLayout>{page}</StatisticLayout>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const prevDate: Date = new Date(
        new Date().setDate(new Date().getDate() - 1)
    )
    let haveDate = true
    let dateXoso = compareTime(
        new Date(),
        new Date(new Date(new Date().setTime(45)).setHours(18))
    )
        ? addingZeroToMonth(new Date())
        : addingZeroToMonth(prevDate)
    if (context.query?.date) {
        dateXoso =
            typeof context.query?.date == 'string'
                ? context.query?.date
                : dateXoso
        if (
            compareDateEqual(new Date(reverseDate(dateXoso)), new Date()) &&
            !compareTime(
                new Date(),
                new Date(new Date(new Date().setTime(45)).setHours(18))
            )
        ) {
            dateXoso = addingZeroToMonth(new Date(prevDate))
        }
    } else {
        haveDate = false
    }
    const dataXoso = await getKqxsMb(dateXoso)

    return {
        props: {
            dataXoso: dataXoso.data,
            dateXoso: dateXoso,
            haveDate: haveDate,
        },
    }
}
