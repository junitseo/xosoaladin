import { getServerSideSitemap } from 'next-sitemap'

export const getServerSideProps = async (ctx: any) => {
    const result = await fetch(
        `https://api.xosoaladin.com/api/v1/posts/getPostByTax?&pageSize=1000000000pageIndex=1&slug=du-doan`
    )
    const posts = await result.json()
    if (posts && posts?.posts?.length > 0) {
        const newsSitemaps = posts?.posts?.map((item: any) => ({
            loc: `https://xosoaladin.com/du-doan/${item.post_slug?.toString()}`,
            lastmod: new Date(item.createdAt).toISOString(),
        }))
        const fields = [...newsSitemaps]
        console.log(fields)
        return getServerSideSitemap(ctx, fields || [])
    }

    return getServerSideSitemap(ctx, [])
}

export default function SiteMap() {
    return <></>
}
