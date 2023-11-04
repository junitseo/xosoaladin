import XosoTinhTable from '@/components/XosoTinhTable'
import addingZeroToMonth from '@/helpers/addingZeroToMonth'
import IDataXoso from '@/Interfaces/IDataXoso'
import { provinces } from '@/mocks/provinces'
import { provincesSlug } from '@/mocks/provincesSlug'
import { getKqxsTinh } from '@/services/api'
import Head from 'next/head'
import { GetServerSidePropsContext } from 'next/types'
import Router from 'next/router'
import { config } from '@/config'
import replaceDashFromDate from '@/helpers/replaceDashFromDate'

const KqxsTinh = ({
    kqxs,
    dateXoso,
    provinceId,
    url,
}: {
    kqxs: IDataXoso
    dateXoso: string
    provinceId: number
    url: string
}) => {
    return (
        <div>
            <Head>
                <link rel="canonical" href={`${config.baseURL}/${url}`} />
                <meta
                    name="description"
                    content={`Kết quả xổ số ${provinces[provinceId]} - xo-so-${provincesSlug[provinceId]} - KQXS - XS - XSMN - XSMB - XSMT - XSKT - Xổ số ALADIN`}
                />
            </Head>
            <h1
                style={{
                    fontSize: '24px',
                    margin: '15px 0px',
                    textAlign: 'center',
                }}
            >
                Kết quả xổ số {provinces[provinceId]} ngày{' '}
                {replaceDashFromDate(dateXoso)}
            </h1>
            <XosoTinhTable
                dataXoso={kqxs}
                date={kqxs.resultObj?.[0].listXSTT?.[0].dayPrize}
                regionName={provinces[provinceId]}
            />
        </div>
    )
}

export default KqxsTinh

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const url = context.resolvedUrl
    const date = context.query.date
    const province = context.params ? context.params.province : ''
    const provinceId = Object.keys(provincesSlug).find(
        //@ts-ignore
        (key: number) => provincesSlug[key] == province
    )
    console.log("date",date);
    console.log("provinceId",provinceId);
    
    const kqxs = await getKqxsTinh(
        typeof date == 'string' ? date : addingZeroToMonth(new Date()),
        provinceId ? Number(provinceId) : 1
    )

    return {
        props: {
            kqxs: {
                isSuccessed: true,
                resultObj: kqxs.data,
            },
            dateXoso:
                typeof date == 'string' ? date : addingZeroToMonth(new Date()),
            provinceId: provinceId || 1,
            url,
        },
    }
}
