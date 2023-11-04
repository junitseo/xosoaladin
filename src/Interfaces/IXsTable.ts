import IDataXoso from './IDataXoso'

export default interface IXstable {
    date: string
    dataXoSo: IDataXoso | undefined
    dayOfWeek?: number
    isDisplayProvince?: boolean
}
