// eslint-disable-next-line import/no-anonymous-default-export
export default (type: string, number: string) => {
    if (number.length >= 3) {
        if (type == 'full') {
            return number
        } else if (type == '2') {
            const numberSplit = number.split('')
            const newNumber = `${numberSplit[numberSplit.length - 2]}${
                numberSplit[numberSplit.length - 1]
            }`
            return newNumber
        } else if (type == '3') {
            const numberSplit = number.split('')
            const newNumber = `${numberSplit[numberSplit.length - 3]}${
                numberSplit[numberSplit.length - 2]
            }${numberSplit[numberSplit.length - 1]}`
            return newNumber
        }
    } else {
        return number
    }
}
