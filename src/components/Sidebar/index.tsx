import styles from '@/styles/Components/Sidebar/index.module.scss'
import CalendarComponent from '../Calendar'
import LiveResult from '../LiveResult'
import XosoLiveResult from '../XosoResult'
import Link from 'next/link'
import { config } from '@/config'
import { isMobile } from 'react-device-detect'

const Sidebar = ({
    bannerLeft,
    linkBannerLeft,
}: {
    bannerLeft: string
    linkBannerLeft: string
}) => {
    return (
        <div className={styles.sidebarWrapper}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarLiveResult}>
                    {!isMobile && <LiveResult />}
                </div>
                {/* <div
                    className={styles.sidebarCalendar}
                    style={{ marginTop: '15px' }}
                >
                    <CalendarComponent />
                </div> */}
                <div className={styles.sidebarXosoResult}>
                    {!isMobile && <XosoLiveResult />}
                </div>
                {bannerLeft && !isMobile && (
                    <div className={styles.sidebarAdvertise}>
                        <a href={linkBannerLeft}>
                            <img
                                src={`${config.CDN_URL}/${bannerLeft}`}
                                alt="xosoaladin.com"
                            />
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar
