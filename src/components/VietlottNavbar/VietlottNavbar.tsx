import styles from '@/styles/Components/VietlottNavbar/VietlottNavbar.module.scss'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const VietlottNavbar: NextPage = () => {
    const router = useRouter()
    const pageUrl: string =
        router.pathname.split('/')[router.pathname.split('/').length - 1]
    return (
        <div className={styles.vietlottNavbar}>
            <ul>
                <li
                    style={
                        pageUrl == 'vietlott'
                            ? { borderBottom: '5px solid #a0522c' }
                            : {}
                    }
                >
                    <Link href={'/kqxs/dien-toan/vietlott'}>Vietlott</Link>
                </li>
                <li
                    style={
                        pageUrl == 'power655'
                            ? { borderBottom: '5px solid #a0522c' }
                            : {}
                    }
                >
                    <Link href={'/kqxs/dien-toan/power655'}>Power 6/55</Link>
                </li>
                <li
                    style={
                        pageUrl == 'mega645'
                            ? { borderBottom: '5px solid #a0522c' }
                            : {}
                    }
                >
                    <Link href={'/kqxs/dien-toan/mega645'}>Mega 6/45</Link>
                </li>
                <li
                    style={
                        pageUrl == 'max3d'
                            ? { borderBottom: '5px solid #a0522c' }
                            : {}
                    }
                >
                    <Link href={'/kqxs/dien-toan/max3d'}>Max 3D</Link>
                </li>
                <li
                    style={
                        pageUrl == 'max3dpro'
                            ? { borderBottom: '5px solid #a0522c' }
                            : {}
                    }
                >
                    <Link href={'/kqxs/dien-toan/max3dpro'}>Max3D Pro</Link>
                </li>
            </ul>
        </div>
    )
}

export default VietlottNavbar
