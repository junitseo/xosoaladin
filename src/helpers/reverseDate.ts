// eslint-disable-next-line import/no-anonymous-default-export
export default (date: string, divider = '-') => {
    const dateArray: string[] = date?.split(divider)
    return `${dateArray?.[2]}${divider}${dateArray?.[1]}${divider}${dateArray?.[0]}`
}
