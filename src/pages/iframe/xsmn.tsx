import styles from '@/styles/pages/kqxs/xo-so-mien-nam/index.module.scss'
import { GetServerSidePropsContext } from 'next/types'
import IDataXoso from '@/Interfaces/IDataXoso'
import { getKqxsmn } from '@/services/api'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import XsmnTable from '@/components/XsmnTable'
import { useEffect, useState } from 'react'
import IDataXosoMore from '@/Interfaces/IDataXosoMore'
import { useDispatch } from 'react-redux'
import { closeLoading, openLoading } from '@/redux/action/loading'
import reverseDate from '@/helpers/reverseDate'
import compareTime from '@/helpers/compareTime'
import WaitingLoterry from '@/components/WaitingLottery'
import compareDateEqual from '@/helpers/compareDateEqual'
import StatisticLayout from '@/layouts/StatisticLayout'

const IframeXosoMienNam = ({
    dataXoso,
    dateXoso,
    haveDate,
}: {
    dataXoso: IDataXoso
    dateXoso: string
    haveDate: boolean
}) => {

    return (
        <div className={styles.xosoMienNam}>
            {dataXoso.resultObj?.length > 0 && (
                <XsmnTable
                    regionName="Miền Nam"
                    dataXoso={dataXoso}
                    date={dateXoso}
                    isHideZoom
                />
            )}
        </div>
    )
}

export default IframeXosoMienNam

//@ts-ignore
IframeXosoMienNam.getLayout = (page) => {
    return <StatisticLayout>{page}</StatisticLayout>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const prevDate: Date = new Date(
        new Date().setDate(new Date().getDate() - 1)
    )
    let haveDate = true
    let dateXoso = compareTime(
        new Date(),
        new Date(new Date(new Date().setTime(45)).setHours(16))
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
                new Date(new Date(new Date().setTime(45)).setHours(16))
            )
        ) {
            dateXoso = addingZeroToMonth(new Date(prevDate))
        }
    } else {
        haveDate = false
    }
    const dataXoso = await getKqxsmn(dateXoso)
    return {
        props: {
            dataXoso: dataXoso.data,
            dateXoso: dateXoso,
            haveDate: haveDate,
        },
    }
}
