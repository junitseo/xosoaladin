// eslint-disable-next-line import/no-anonymous-default-export
export default (firstDate: Date, secondDate: Date) => {
    if (
        firstDate.getHours() > secondDate.getHours() ||
        (firstDate.getHours() >= secondDate.getHours() &&
            firstDate.getMinutes() >= secondDate.getMinutes())
    ) {
        return true
    }
    return false
}
