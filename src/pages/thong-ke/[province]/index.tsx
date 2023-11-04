import HeadTailAppear from '@/components/HeadTailAppear'
import SpecialStatisticTable from '@/components/SpecialStatisticTable/SpecialStatisticTable'
import TopAppearTable from '@/components/TopAppearTable'
import IXsStatistic from '@/Interfaces/IXsStaristic'
import { provinces } from '@/mocks/provinces'
import {
    getAllByHead,
    getAllByHeadProvince,
    getAllByTail,
    getAllByTailProvince,
    getAllSpecialPrizeMb,
    getAllSpecialPrizeProvince,
    getTopByProvince,
    getTopByRegion,
} from '@/services/api'
import Head from 'next/head'
import { GetServerSidePropsContext, NextPage } from 'next/types'

const ThongKeTinh: NextPage<IXsStatistic> = (props: IXsStatistic) => {
    return (
        <>
            {/* <Head>
                <link
                    rel="canonical"
                    href="https://xosoaladin.com/thong-ke/mien-bac"
                />
            </Head> */}
            <div>
                <h1
                    style={{
                        fontSize: '24px',
                        textAlign: 'center',
                        marginTop: '10px',
                        textTransform: 'uppercase',
                    }}
                >
                    THỐNG KÊ XỔ SỐ {provinces[props.province]}
                </h1>
                <div style={{ marginTop: '15px' }}>
                    <SpecialStatisticTable
                        specialStatistic={props.specialStatistic}
                        arrayDate={props.arrayDate}
                    />
                </div>
                <div style={{ marginTop: '25px' }}>
                    <TopAppearTable topAppear={props.topAppear} />
                </div>
                <div style={{ marginTop: '25px', marginBottom: '20px' }}>
                    <HeadTailAppear
                        headAppear={props.allHead}
                        tailAppear={props.allTail}
                    />
                </div>
            </div>
        </>
    )
}

export default ThongKeTinh

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const province = context.query.province || ''
    const [specialStatistic, topAppear, allHead, allTail] = await Promise.all([
        getAllSpecialPrizeProvince(Number(province)),
        getTopByProvince(Number(province)),
        getAllByHeadProvince(Number(province)),
        getAllByTailProvince(Number(province)),
    ])
    console.log(allHead)
    return {
        props: {
            province,
            specialStatistic: specialStatistic.data.specialStatistic,
            topAppear: topAppear.data,
            allHead: allHead.data,
            allTail: allTail.data,
            arrayDate: specialStatistic.data.arrayDate,
        },
    }
}
