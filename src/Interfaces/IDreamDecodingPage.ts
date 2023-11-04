import IPredictionPost from './IPredictionPost'
import ISoMoData from './ISoMoData'

export default interface IDreamDecodingPage {
    posts: IPredictionPost[]
    pageSize: number
    dream: ISoMoData[]
}
