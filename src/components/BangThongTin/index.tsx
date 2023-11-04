import styles from '@/styles/Components/BangThongTin/index.module.scss'

const BangThongTin = ({
    data,
}: {
    data: { title: string; slug: string }[]
}) => {
    return (
        <div className={styles.main_content}>
            <div className={styles.image}>
                <img
                    src="https://www.minhngoc.net.vn/upload/images/content/thue-thu-nhap-trung-xo-so.jpg"
                    alt="xosoaladin.com"
                />
            </div>
            <div className={styles.title_summary}>
                <a href="giai-ma-giac-mo/abc">
                    Trúng số phải đóng thuế bao nhiêu phần trăm?
                </a>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nulla rerum aut voluptate quia, enim quae consequuntur
                    eligendi nobis impedit magnam doloremque consectetur nam
                    doloribus beatae ullam? Molestiae iusto animi quidem!
                </p>
            </div>
            <div className={styles.clearFloat}></div>
        </div>
    )
}

export default BangThongTin
