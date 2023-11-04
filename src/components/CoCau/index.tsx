import styles from '@/styles/Components/CoCau/index.module.scss'

const CoCau = () => {
    return (
        <div className={styles.cocau}>
            <div className={styles.cocauWrapper}>
                <p className={styles.cocauTitle}>Thông Tin Về Kết Quả Xổ Số Kiến Thiết Miền Nam</p>
                <p className={styles.cocauHeading}>1. Lịch mở thưởng</p>
                <ul>
                    <li>- Thứ Hai: TP.HCM - Đồng Tháp - Cà Mau</li>
                    <li>- Thứ Ba: Bến Tre - Vũng Tàu - Bạc Liêu</li>
                    <li>- Thứ Tư: Đồng Nai - Cần Thơ - Sóc Trăng</li>
                    <li>- Thứ Năm: Tây Ninh - An Giang - Bình Thuận</li>
                    <li>- Thứ Sáu: Vĩnh Long - Bình Dương - Trà Vinh</li>
                    <li>- Thứ Bảy: TP.HCM - Long An - Bình Phước - Hậu Giang</li>
                    <li>- Chủ Nhật: Tiền Giang - Kiên Giang - Đà Lạt</li>
                </ul>
                <p className={styles.cocauHeading}>2. Cơ cấu giải thưởng</p>
                <ul>
                    <li>- Vé số truyền thống miền Nam phát hành loại vé với mệnh giá 10.000đ (mười nghìn đồng).</li>
                    <li>- Mỗi tỉnh phát hành 1.000.000 vé loại 6 chữ số</li>
                    <li>- Kết quả xổ số miền Nam có 9 giải (từ giải ĐB đến giải Tám) bao gồm 18 dãy số, tương đương với 18 lần quay thưởng</li>
                </ul>
                <div className = {styles.cocauTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Giải thưởng</th>
                                <th>Tiền thưởng (VNĐ)</th>
                                <th>Trùng</th>
                                <th>Số lượng giải thưởng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Giải ĐB</td>
                                <td>2.000.000.000</td>
                                <td>6 số</td>
                                <td>01</td>
                            </tr>
                            <tr>
                                <td>Giải Nhất</td>
                                <td>30.000.000</td>
                                <td>5 số</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>Giải Nhì</td>
                                <td>15.000.000</td>
                                <td>5 số</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>Giải Ba</td>
                                <td>10.000.000</td>
                                <td>5 số</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>Giải Tư</td>
                                <td>3.000.000</td>
                                <td>5 số</td>
                                <td>70</td>
                            </tr>
                            <tr>
                                <td>Giải Năm</td>
                                <td>1.000.000</td>
                                <td>4 số</td>
                                <td>100</td>
                            </tr>
                            <tr>
                                <td>Giải Sáu</td>
                                <td>400.000</td>
                                <td>4 số</td>
                                <td>300</td>
                            </tr>
                            <tr>
                                <td>Giải Bảy</td>
                                <td>200.000</td>
                                <td>3 số</td>
                                <td>1.000</td>
                            </tr>
                            <tr>
                                <td>Giải Tám</td>
                                <td>100.000</td>
                                <td>2 số</td>
                                <td>10.000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CoCau