import IDataXosoMore from './IDataXosoMore'

export default interface IXosoMore {
    numberOfDate: number
    setNumberOfDate: (date: number) => void
    listXosoMore: IDataXosoMore[]
    region?: string
    dayOfWeek?: number
}
