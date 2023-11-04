import styles from '@/styles/Components/NavbarZoomTable/index.module.scss'
import Link from 'next/link'

const NavbarZoomTable = () => {
    return (
        <div className={styles.navbarZoom}>
            <button>
                <Link href={'/truc-tiep/xo-so-mien-bac'}>Miền Bắc</Link>
            </button>
            <button>
                <Link href={'/truc-tiep/xo-so-mien-trung'}>Miền Trung</Link>
            </button>
            <button>
                <Link href={'/truc-tiep/xo-so-mien-nam'}>Miền Nam</Link>
            </button>
        </div>
    )
}

export default NavbarZoomTable
