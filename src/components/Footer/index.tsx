import styles from '@/styles/Components/Footer/index.module.scss'
import Link from 'next/link'
import { GiCheckMark } from 'react-icons/gi'
import { BsYoutube } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { getFooterInformation } from '@/services/api'

const Footer = () => {
    const [information, setInformation] = useState<any>()
    const getInformation = async () => {
        try {
            const result = await getFooterInformation()
            console.log(result)
            setInformation(result.data?.information)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getInformation()
    }, [])
    return (
        <>
            <div className={styles.footer}>
                <div className={styles.footerWrapper}>
                    <div
                        className={styles.footerInformation}
                        // style={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                        <div className={styles.footerInformationColumn}>
                            <p style={{ marginBottom: '5px' }}>
                                <span>{information?.webName}</span>
                            </p>
                            <p
                                style={{
                                    fontSize: '12px',
                                    fontWeight: 400,
                                    marginBottom: '5px',
                                }}
                            >
                                {information?.address}
                            </p>
                            <p style={{ marginBottom: '5px' }}>
                                Liên hệ: {information?.contact}{' '}
                            </p>
                        </div>
                        <div className={styles.footerInformationColumn}>
                            <p style={{ marginBottom: '5px' }}>
                                {information?.companyName}
                            </p>
                            <p
                                style={{
                                    fontSize: '12px',
                                    fontWeight: 400,
                                    marginBottom: '5px',
                                }}
                            >
                                {information?.email}
                            </p>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            gap: '30px',
                            alignItems: 'center',
                        }}
                    ></div>
                    <div className={styles.footerCenter}>
                        <div className={styles.footerCenterTitle}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    flexWrap: 'wrap',
                                }}
                            >
                                <Link href={'/tin-tuc/dieu-khoan-su-dung'}>
                                    Điều khoản sử dụng |
                                </Link>
                                <p>Liên hệ: {information?.email} |</p>
                                <a href={information?.webUrl}>
                                    {information?.webUrl}
                                </a>
                            </div>
                            <p style={{ marginTop: '20px' }}>
                                Xem trên Google Tìm Kiếm | Chỉ đường đến XỔ SỐ
                                ALADIN
                            </p>
                            <p style={{ marginTop: '20px' }}>
                                Copyright © 2023 ALADIN™ All right Reserved
                            </p>
                            <div
                                style={{
                                    marginTop: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '5px',
                                }}
                            >
                                <Link
                                    href={information?.zalo || ''}
                                    rel="nofollow"
                                >
                                    <img
                                        width={30}
                                        height={30}
                                        src="/icons/zalo_icon.png"
                                        alt="xosoaladin"
                                    />
                                </Link>
                                <Link
                                    href={information?.facebook || ''}
                                    rel="nofollow"
                                >
                                    <img
                                        width={40}
                                        height={40}
                                        src="/icons/facebook-icon.png"
                                        alt="xosoaladin"
                                    />
                                </Link>
                                <Link
                                    href={information?.tiktok || ''}
                                    rel="nofollow"
                                >
                                    <img
                                        width={37}
                                        height={37}
                                        src="/icons/tiktok-icon.png"
                                        alt="xosoaladin"
                                    />
                                </Link>
                                <Link
                                    href={information?.linkedin || ''}
                                    rel="nofollow"
                                >
                                    <img
                                        width={40}
                                        height={40}
                                        src="/icons/linkedin-icon.png"
                                        alt="xosoaladin"
                                    />
                                </Link>
                                <Link
                                    href={information?.youtube || ''}
                                    rel="nofollow"
                                >
                                    <img
                                        width={40}
                                        height={40}
                                        src="/icons/youtube-icon.png"
                                        alt="xosoaladin"
                                    />
                                </Link>
                                <Link
                                    href={information?.telegram || ''}
                                    rel="nofollow"
                                >
                                    <img
                                        width={30}
                                        height={30}
                                        src="/icons/telegram-icon.png"
                                        alt="xosoaladin"
                                    />
                                </Link>
                                <Link
                                    href={information?.skype || ''}
                                    rel="nofollow"
                                >
                                    <img
                                        width={30}
                                        height={30}
                                        src="/icons/skype-icon.png"
                                        alt="xosoaladin"
                                    />
                                </Link>
                            </div>
                            <div style={{ marginTop: '25px' }}>
                                <img
                                    width={'200px'}
                                    src="/images/logo-footer.webp"
                                    alt="xo so aladin"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.footerBottom}>
                        thông tin : {information?.information}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer
