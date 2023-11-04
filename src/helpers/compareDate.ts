// eslint-disable-next-line import/no-anonymous-default-export
export default (firstDate: Date, secondDate: Date) => {
    if (
        firstDate.getFullYear() > secondDate.getFullYear() ||
        (firstDate.getMonth() > secondDate.getMonth() &&
            firstDate.getFullYear() >= secondDate.getFullYear()) ||
        (firstDate.getDate() > secondDate.getDate() &&
            firstDate.getMonth() >= secondDate.getMonth() &&
            firstDate.getFullYear() >= secondDate.getFullYear())
    ) {
        return true
    }
    return false
}
