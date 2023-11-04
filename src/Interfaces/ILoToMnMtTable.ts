import IDataXoso from './IDataXoso'

export default interface ILotoMnMtTable {
    dataXoso: IDataXoso | undefined
    provinceList: number[]
    type?: string
}
