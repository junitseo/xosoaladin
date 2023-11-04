import IXosoResult from './IXosoResult'

interface IResultEnd {
    loto: string
    prizeId: number
}

interface IResultHead {
    loto: string
    prizeId: number
}

interface IResultObj {
    serialDb: string
    listXSTT: IXosoResult[]
    provinceName: string
    provinceNameNoSign: string
    provinceRegion: number
    resultEnd: IResultEnd[]
    resultHead: IResultHead[]
}

export type { IResultEnd, IResultObj, IResultHead }
