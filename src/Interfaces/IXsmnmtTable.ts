import IDataXoso from './IDataXoso'

export default interface IXsmnTable {
    date: string
    dataXoso: IDataXoso | undefined
    haveLock?: boolean
    regionName: string,
    isHideZoom?: boolean
}
