// eslint-disable-next-line import/no-anonymous-default-export
export default (MyDate: Date, divider = '-') => {
    const MyDateString =
        getDay2Digits(MyDate) +
        divider +
        getMonth2Digits(MyDate) +
        divider +
        MyDate.getFullYear()

    return MyDateString
}

function getMonth2Digits(date: Date) {
    // 👇️ Add 1, because getMonth is 0-11
    const month = date.getMonth() + 1

    if (month < 10) {
        return '0' + month
    }

    return month
}

function getDay2Digits(date: Date) {
    const day = date.getDate()

    if (day < 10) {
        return '0' + day
    }

    return day
}
