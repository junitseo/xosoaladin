import IPostDetail from '@/Interfaces/IPostDetail'
import CoCau from '@/components/CoCau'
import RelativePost from '@/components/RelativePost'
import { getPostBySlug } from '@/services/api'
import styles from '@/styles/pages/GiaiMaGiacMo/index.module.scss'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next/types'
import { useEffect } from 'react'

const PostDetail = ({ post }: { post: any }) => {
    const router = useRouter()
    const { slug, category_slug } = router.query

    useEffect(() => {
        if (!post || post?.length == 0) {
            router.push('/404')
        }
    }, [post])
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href={`https://xosoaladin.com/${category_slug}/${slug}`}
                />
            </Head>
            <>
                <section id={styles.dream}>
                    <div className={styles.box}>
                        <div className={styles.left}>
                            <div className={styles.content}>
                                <div>
                                    <h1
                                        style={{
                                            marginBottom: '15px',
                                            fontWeight: 'bold',
                                            fontSize: '24px',
                                        }}
                                    >
                                        {post?.post_title}
                                    </h1>
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: post?.post_content,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <RelativePost
                            tax_id={post.post_taxid}
                            post_id={post?._id}
                            tax_slug={category_slug?.toString()}
                        />
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <CoCau />
                    </div>
                </section>
            </>
        </>
    )
}

export default PostDetail

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const post = await getPostBySlug(
        ctx.params?.slug ? ctx.params.slug?.toString() : ''
    )

    return {
        props: {
            post: post.data,
        },
    }
}
