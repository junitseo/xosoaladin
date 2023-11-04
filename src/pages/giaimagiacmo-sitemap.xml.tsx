import { getServerSideSitemap } from 'next-sitemap'

export const getServerSideProps = async (ctx: any) => {
    const result = await fetch(
        `https://api.xosoaladin.com/api/v1/posts/getPostByTax?pageIndex=1&slug=giai-ma-giac-mo&limit=1000000000000`
    )
    const posts = await result.json()
    if (posts && posts?.posts?.length > 0) {
        const newsSitemaps = posts?.posts?.map((item: any) => ({
            loc: `https://xosoaladin.com/giai-ma-giac-mo/${item.post_slug?.toString()}`,
            lastmod: new Date(item.createdAt).toISOString(),
        }))
        const fields = [...newsSitemaps]
        return getServerSideSitemap(ctx, fields || [])
    }

    return getServerSideSitemap(ctx, [])
}

export default function SiteMap() {
    return <></>
}
