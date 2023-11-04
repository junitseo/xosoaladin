import IPostStatisticData from '@/Interfaces/IPostStatisticData'
import axios, { AxiosInstance, AxiosResponse } from 'axios'

// const axiosInstance: AxiosInstance = axios.create({
//     baseURL: 'http://localhost:8011/api/v1',
// })

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://api.xosoaladin.com/api/v1',
})

const axiosInstanceForServerSide: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8011/api/v1',
})

export const getKqxsmtServerSide = (date: string): Promise<AxiosResponse> =>
    axiosInstanceForServerSide.get(`/kqxs/xsmt/${date}`)
export const getKqxsmnServerSide = (date: string): Promise<AxiosResponse> =>
    axiosInstanceForServerSide.get(`/kqxs/xsmn/${date}`)
export const getKqxsMbServerSide = (date: string): Promise<AxiosResponse> =>
    axiosInstanceForServerSide.get(`/kqxs/xsmb/${date}`)
export const getMega645ServerSide = (date: string): Promise<AxiosResponse> =>
    axiosInstanceForServerSide.get(`/mega645/${date}`)
export const getMax3DServerSide = (date: string): Promise<AxiosResponse> =>
    axiosInstanceForServerSide.get(`/max3d/${date}`)
export const getMax3DProServerSide = (date: string): Promise<AxiosResponse> =>
    axiosInstanceForServerSide.get(`/max3dpro/${date}`)
export const getPower655ServerSide = (date: string): Promise<AxiosResponse> =>
    axiosInstanceForServerSide.get(`/power655/${date}`)
export const getHomeBannerServerSide = (): Promise<AxiosResponse> =>
    axiosInstanceForServerSide.get(`/home-banner`)

export const getHomeBanner = (): Promise<AxiosResponse> =>
    axiosInstance.get(`/home-banner`)
// getKQXS
export const getKqxsmt = (date: string): Promise<AxiosResponse> =>
    axiosInstance.get(`/kqxs/xsmt/${date}`)
export const getKqxsmn = (date: string): Promise<AxiosResponse> =>
    axiosInstance.get(`/kqxs/xsmn/${date}`)
export const getKqxsMb = (date: string): Promise<AxiosResponse> =>
    axiosInstance.get(`/kqxs/xsmb/${date}`)
export const getMega645 = (date: string): Promise<AxiosResponse> =>
    axiosInstance.get(`/mega645/${date}`)
export const getMax3D = (date: string): Promise<AxiosResponse> =>
    axiosInstance.get(`/max3d/${date}`)
export const getMax3DPro = (date: string): Promise<AxiosResponse> =>
    axiosInstance.get(`/max3dpro/${date}`)
export const getPower655 = (date: string): Promise<AxiosResponse> =>
    axiosInstance.get(`/power655/${date}`)
export const getTaxBySlug = (slug: string): Promise<AxiosResponse> =>
    axiosInstance.get(`/taxonomy/${slug}`)
export const getPostByTaxId = (
    tax_id: string,
    limit: number,
    skip: number,
    post_id?: string
): Promise<AxiosResponse> =>
    axiosInstance.get(
        `/posts/getAllByTax?tax=${tax_id}&limit=${limit}&skip=${skip}&post_id=${
            post_id || ''
        }`
    )
export const getPostBySlug = (slug: string): Promise<AxiosResponse> =>
    axiosInstance.get(`/posts/${slug}`)

export const getKqxsTinh = (
    date: string,
    provinceId: number
): Promise<AxiosResponse> =>
    axiosInstance.get(`/kqxs/xsTinh?date=${date}&provinceId=${provinceId}`)

export const getKqxsTinhIframe = (
    date: string,
    provinceId: number
): Promise<AxiosResponse> =>
    axiosInstance.get(
        `/kqxs/xsTinhIframe?date=${date}&provinceId=${provinceId}`
    )
export const getDreams = () => axiosInstance.get('/dream')
export const getStatistic = (data: IPostStatisticData) =>
    axiosInstance.post('/statistic', data)
export const getAllSpecialPrizeProvince = (province: number) => {
    return axiosInstance.get(`/kqxs/getAllSpecialPrizeProvince/${province}`)
}
export const getAllSpecialPrizeMb = () =>
    axiosInstance.post('/kqxs/getAllSpecialPrizeMb')
export const getAllSpecialPrizeMn = () =>
    axiosInstance.post('/kqxs/getAllSpecialPrizeMn')
export const getAllSpecialPrizeMt = () =>
    axiosInstance.post('/kqxs/getAllSpecialPrizeMt')
export const getTopByRegion = (region: number) =>
    axiosInstance.get(`/kqxs/getTopByRegion/${region}`)
export const getAllByHead = (region: number) =>
    axiosInstance.get(`/kqxs/getAllByHead/${region}`)
export const getAllByTail = (region: number) =>
    axiosInstance.get(`/kqxs/getAllByTail/${region}`)
export const getAllSpecialLotoPrizeMb = () =>
    axiosInstance.get(`/kqxs/getAllSpecialLotoMb`)
export const getAllSpecialLotoPrizeMbReverse = () =>
    axiosInstance.get(`/kqxs/getAllSpecialLotoMbReverse`)
export const getAllByHeadProvince = (provinceId: number) =>
    axiosInstance.get(`/kqxs/getAllByHeadProvince/${provinceId}`)
export const getAllByTailProvince = (provinceId: number) =>
    axiosInstance.get(`/kqxs/getAllByTailProvince/${provinceId}`)
export const getTopByProvince = (provinceId: number) =>
    axiosInstance.get(`/kqxs/getTopByProvince/${provinceId}`)
export const checkKqxs = (
    province: string | string[] | undefined,
    number: string | string[] | undefined,
    date: string | string[] | undefined
) =>
    axiosInstance.post('/kqxs/checkKqxs', {
        province,
        date,
        number,
    })
export const getAllPostByCategory = (
    pageIndex: number,
    cateSlug: string = 'giai-ma-giac-mo'
) => {
    return axiosInstance.get(
        `/posts/getPostByTax?pageSize=${10}&pageIndex=${pageIndex}&slug=${cateSlug}&limit=${5}`
    )
}

export const getPostsSideBar = () => {
    return axiosInstance.get(`/posts/getPosts`)
}

export const getFooterInformation = () => {
    return axiosInstance.get('/information')
}

export const getResultFormLo = ({
    province,
    region,
    startDate,
    endDate,
    number,
    sortBy,
}: {
    province?: number
    region?: number
    startDate: string
    endDate: string
    number: string
    sortBy: 'province' | 'region'
}) => {
    return axiosInstance.get(
        `/kqxs/getResultFormLo?province=${province}&region=${region}&startDate=${startDate}&endDate=${endDate}&number=${number}&sortBy=${sortBy}`
    )
}

export const getResultFormGan = ({
    province,
    region,
    number,
    sortBy,
    searchType,
}: {
    province?: number
    region?: number
    number: string
    sortBy: 'province' | 'region'
    searchType: 'headTail' | 'special'
}) => {
    return axiosInstance.get(
        `/kqxs/getResultFormGan?province=${province}&region=${region}&number=${number}&sortBy=${sortBy}&searchType=${searchType}`
    )
}

export const getResultTanSuat = ({
    province,
    region,
    number,
    sortBy,
    searchType,
}: {
    province?: number
    region?: number
    number: string
    sortBy: 'province' | 'region'
    searchType: 'headTail' | 'special'
}) => {
    return axiosInstance.get(
        `/kqxs/getResultTanSuat?province=${province}&region=${region}&number=${number}&sortBy=${sortBy}&searchType=${searchType}`
    )
}

export const getSeoByLink = async ({ link }: { link: string }) => {
    return axiosInstance.get(`/seo/getSeoByLink?link=${link}`)
}
