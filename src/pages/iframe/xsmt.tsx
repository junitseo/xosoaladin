import styles from '@/styles/pages/kqxs/xo-so-mien-nam/index.module.scss'
import { GetServerSidePropsContext } from 'next/types'
import IDataXoso from '@/Interfaces/IDataXoso'
import { getKqxsmt } from '@/services/api'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import XsmnTable from '@/components/XsmnTable'
import reverseDate from '@/helpers/reverseDate'
import { useDispatch } from 'react-redux'
import IDataXosoMore from '@/Interfaces/IDataXosoMore'
import { useEffect, useState } from 'react'
import { closeLoading, openLoading } from '@/redux/action/loading'
import WaitingLoterry from '@/components/WaitingLottery'
import compareTime from '@/helpers/compareTime'
import compareDateEqual from '@/helpers/compareDateEqual'
import StatisticLayout from '@/layouts/StatisticLayout'

const IframeXosoMienTrung = ({
    dataXoso,
    dateXoso,
    haveDate,
}: {
    dataXoso: IDataXoso
    dateXoso: string
    haveDate: boolean
}) => {
  
    return (
        <div className={styles.xosoMienTrung}>
            {dataXoso?.resultObj?.length > 0 && (
                <XsmnTable
                    dataXoso={dataXoso}
                    date={dateXoso}
                    regionName="Miền Trung"
                    isHideZoom
                />
            )}
        </div>
    )
}

export default IframeXosoMienTrung

//@ts-ignore
IframeXosoMienTrung.getLayout = (page) => {
    return <StatisticLayout>{page}</StatisticLayout>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const prevDate: Date = new Date(
        new Date().setDate(new Date().getDate() - 1)
    )
    let haveDate = true
    let dateXoso = compareTime(
        new Date(),
        new Date(new Date(new Date().setTime(45)).setHours(17))
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
                new Date(new Date(new Date().setTime(45)).setHours(17))
            )
        ) {
            dateXoso = addingZeroToMonth(new Date(prevDate))
        }
    } else {
        haveDate = false
    }
    const dataXoso = await getKqxsmt(dateXoso)
    return {
        props: {
            dataXoso: dataXoso.data,
            dateXoso: dateXoso,
            haveDate: haveDate,
        },
    }
}
