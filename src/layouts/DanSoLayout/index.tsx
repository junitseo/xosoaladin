import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import Navbar from '@/components/Navbar'
import NavbarMobile from '@/components/NavbarMobile'
import styles from '@/styles/Layouts/DanSoLayout/index.module.scss'
import Head from 'next/head'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { useRouter } from 'next/router'

const DanSoLayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const keyH1: { [key: string]: string } = {
        '/so-dau-duoi/mien-nam':
            'Sớ đầu đuôi miền nam - so dau duoi mn - XSKT Xổ số ALADIN™ - XSMN - XSMB - XSMT',
        '/so-dau-duoi/mien-bac':
            'Sớ đầu đuôi miền bắc - so dau duoi mb - XSKT Xổ số ALADIN™ - XSMN - XSMB - XSMT',
        '/so-dau-duoi/mien-trung':
            'Sớ đầu đuôi miền trung - so dau duoi mt - XSKT Xổ số ALADIN™ - XSMN - XSMB - XSMT',
        '/': 'Xổ Số Hôm Nay - Kết Quả Xổ Số Kiến Thiết 3 Miền - KQXS - XS - XSKT Xổ số ALADIN™ - XSMN - XSMB - XSMT',
        '/dan-so': 'Tạo dàn số- XSKT Xổ số ALADIN™ - XSMN - XSMB - XSMT',
        '/kqxs/xo-so-mien-nam':
            'Xổ Số Hôm Nay - KQXS - XS - XSMN - XSKT - Xổ số ALADIN™',
        '/kqxs/xo-so-mien-bac':
            'Xổ Số Hôm Nay - KQXS - XS - XSMB - XSKT - Xổ số ALADIN™',
        '/kqxs/xo-so-mien-trung':
            'Xổ Số Hôm Nay - KQXS - XS - XSMT - XSKT - Xổ số ALADIN™',
        '/giai-ma-giac-mo':
            'Tin tức xổ số mới nhất - Tin tức XS - Giải Mã Giấc Mơ - Sổ Mơ - Xổ số ALADIN™',
        '/tin-tuc':
            'Tin tức xổ số mới nhất - Tin tức XS - Giải Mã Giấc Mơ - Sổ Mơ - Xổ số ALADIN™',
        '/truc-tiep/xo-so-mien-trung':
            'Xổ Số Hôm Nay - KQXS - XS - XSMT - XSKT - Xổ số ALADIN™',
        '/truc-tiep/xo-so-mien-bac':
            'Xổ Số Hôm Nay - KQXS - XS - XSMB - XSKT - Xổ số ALADIN™',
        '/truc-tiep/xo-so-mien-nam':
            'Xổ Số Hôm Nay - KQXS - XS - XSMN - XSKT - Xổ số ALADIN™',
        '/du-doan':
            'Soi cầu dự đoán xổ số miền bắc - miền trung - miền nam - Dự đoán XSMB - Dự đoán XSMT - Dự đoán XSMN',
    }
    return (
        <>
            <Head>
                <title>{keyH1[router.pathname] || 'Xổ số ALADIN'}</title>
                <meta
                    name="description"
                    content="Xổ số ALADIN - dàn số - KQXS - XS - Xo so - CHÍNH XÁC 100%, SIÊU ĐẦY ĐỦ, SIÊU NHANH! Xem ngay kết quả xổ số cập nhật trực tiếp từ các công ty xổ số kiến thiết 3 MIỀN BẮC, TRUNG, NAM"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta property="og:url" content="https://xosoaladin.com" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="Xổ số Aladin" />
                <meta
                    property="og:description"
                    content="Xổ Số Hôm Nay - KQXS - XS - XSMN - XSMT - XSMB - XSKT - Xổ số ALADIN™"
                />
                <meta
                    property="og:image"
                    content="https://xosoaladin.com/images/logo.webp"
                />
                <title>{keyH1[router.pathname] || 'Xổ số ALADIN'}</title>
                <meta
                    name="description"
                    content={
                        keyH1[router.pathname] ||
                        `Xổ số ALADIN kết quả xổ số - KQXS - XS - Xo so - CHÍNH XÁC 100%, SIÊU ĐẦY ĐỦ, SIÊU NHANH! Xem ngay kết quả xổ số cập nhật trực tiếp từ các công ty xổ số kiến thiết 3 MIỀN BẮC, TRUNG, NAM`
                    }
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.mainLayoutWrapper}>
                <div className={styles.mainLayout}>
                    <Header />
                    {isMobile ? <NavbarMobile /> : <Navbar />}
                    <div className={styles.mainLayoutContent}>{children}</div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default DanSoLayout
