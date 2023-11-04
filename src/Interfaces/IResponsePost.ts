import IDreamPost from './IDreamPost'
import IPredictionPost from './IPredictionPost'

export default interface IResponsePosts {
    total: number
    skip: number
    pageSize: number
    datas: IDreamPost[]
}
