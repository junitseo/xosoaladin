import { ReactNode, useEffect, useState } from 'react'
import styles from '@/styles/Layouts/MainLayout/index.module.scss'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import InformationBox from '@/components/InformationBox'
import Footer from '@/components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@/components/Loading'
import { getHomeBanner, getPostsSideBar } from '@/services/api'
import Head from 'next/head'
import Script from 'next/script'
import TableHundredNumber from '@/components/TableHundredNumber'
import { isMobile } from 'react-device-detect'
import NavbarMobile from '@/components/NavbarMobile'
import { config } from '@/config'
import { useRouter } from 'next/router'
import keyH1 from '@/mocks/keyH1'

interface IBanner {
    bannerLeft: string
    bannerRight1: string
    bannerRight2: string
    linkBannerLeft: string
    linkBannerRight1: string
    linkBannerRight2: string
    analytics: string
}

const MainLayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter()

    const loading = useSelector((state: { loading: boolean }) => state.loading)
    const [data, setData] = useState<
        {
            _id: string
            post_title: string
            post_slug: string
            post_image: string
        }[]
    >([])

    const [banner, setBanner] = useState<IBanner>()

    const getInfor = async () => {
        try {
            const [banner, result] = await Promise.all([
                getHomeBanner(),
                getPostsSideBar(),
            ])
            setBanner(banner.data.banner)
            setData(result.data?.posts)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getInfor()
    }, [])
    return (
        <>
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-94PQSH07R0"
            ></Script>
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-94PQSH07R0', {
                        page_path: window.location.pathname,
                    });
                    `,
                }}
            />
            <Script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `{
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": "https://xosoaladin.com"
                    },
                    "headline": "",
                    "image": "https://xosoaladin.com/images/logo.webp",  
                    "author": {
                      "@type": "Person",
                      "name": "Gofiber Admin"
                    },  
                    "publisher": {
                      "@type": "Organization",
                      "name": "",
                      "logo": {
                        "@type": "ImageObject",
                        "url": ""
                      }
                    },
                    "datePublished": ""
                  }`,
                }}
            />
            <Head>
                <meta
                    name="google-site-verification"
                    content="MyWHr8eBDnIqhH60AJpwtad6Bdb5z0f87f-voMrOLTU"
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
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.mainLayoutWrapper}>
                {loading && <Loading />}
                <div className={styles.mainLayout}>
                    <Header />
                    {isMobile ? <NavbarMobile /> : <Navbar />}
                    <div className={styles.mainLayoutContent}>
                        {!isMobile && (
                            <div className={styles.mainLayoutSidebar}>
                                <Sidebar
                                    bannerLeft={banner?.bannerLeft || ''}
                                    linkBannerLeft={
                                        banner?.linkBannerLeft || ''
                                    }
                                />
                            </div>
                        )}
                        <div className={styles.mainLayoutPage}>{children}</div>
                        <div className={styles.mainLayoutAdvertise}>
                            <InformationBox data={data} />
                            <div style={{ marginTop: '10px' }}>
                                {!isMobile && <TableHundredNumber />}
                            </div>
                            <div className={styles.rightAdvertise}>
                                {banner?.bannerRight1 && !isMobile && (
                                    <a href={banner?.linkBannerRight1}>
                                        <img
                                            style={{
                                                marginTop: '10px',
                                                width: '100%',
                                            }}
                                            src={`${config.CDN_URL}/${banner?.bannerRight1}`}
                                            alt="xosoaladin.com"
                                        />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default MainLayout
