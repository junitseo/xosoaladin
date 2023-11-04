import IDreamPost from '@/Interfaces/IDreamPost'
import {
    getAllPostByCategory,
    getPostBySlug,
    getPostByTaxId,
} from '@/services/api'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const RelativePost = ({
    tax_id,
    post_id,
    tax_slug,
}: {
    tax_id: string
    post_id: string
    tax_slug?: string
}) => {
    const [posts, setPosts] = useState<IDreamPost[]>([])
    const getPostByTaxSlug = async () => {
        try {
            const result = await getPostByTaxId(tax_id, 5, 1, post_id)

            setPosts(result.data?.datas)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPostByTaxSlug()
    }, [])
    return (
        <div>
            <p style={{ fontWeight: 'bold' }}>Tin liên quan</p>
            <ul>
                {posts?.map((post) => {
                    return (
                        <li
                            style={{
                                marginTop: '10px',
                                marginLeft: '10px',
                                color: '#0029ad',
                            }}
                        >
                            <Link href={`/${tax_slug}/${post.post_slug}`}>
                                ► {post.post_title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default RelativePost
