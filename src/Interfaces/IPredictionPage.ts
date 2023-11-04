import IDreamPost from './IDreamPost'
import IPredictionPost from './IPredictionPost'

export default interface IPredictionPage {
    posts: IPredictionPost[]
    pageSize: number
    firstItem: IDreamPost | undefined
}
