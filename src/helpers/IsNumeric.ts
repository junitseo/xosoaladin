export function isNumeric(str: string | undefined): boolean {
    if (str) {
        if (typeof str != 'string') return false // we only process strings!
        return !isNaN(+str) // ...and ensure strings of whitespace fail
    } else {
        return false
    }
}
