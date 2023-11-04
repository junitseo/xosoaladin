import { Dispatch, SetStateAction } from 'react'
import IDataXoso from './IDataXoso'

export default interface ILotoTable {
    dataXoso: IDataXoso | undefined
    setLotoChosen?: Dispatch<
        SetStateAction<
            { number: number[]; type: string; region: number } | undefined
        >
    >
}
