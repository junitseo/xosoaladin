import ITopAppearTable from './ITopAppear'
import IXosoResult from './IXosoResult'

interface IXsStatistic {
    specialStatistic: IXosoResult[]
    arrayDate: string[]
    province: number
    topAppear: ITopAppearTable[]
    allHead: {
        _id: string
        total: number
    }[]
    allTail: {
        _id: string
        total: number
    }[]
    tags: any
}

export default IXsStatistic
