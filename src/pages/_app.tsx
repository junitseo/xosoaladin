import MainLayout from '@/layouts/MainLayout'
import '@/styles/global.scss'
import '@/styles/globals.css'
import { AppLayoutProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@/redux/store/index'
import React, { ReactNode } from 'react'
import { GetServerSidePropsContext } from 'next/types'

const App = ({ Component, pageProps }: AppLayoutProps) => {
    const getLayout =
        Component.getLayout ||
        ((page: ReactNode) => (
            <Provider store={store}>
                <MainLayout children={page} />
            </Provider>
        ))

    return getLayout(<Component {...pageProps} />)
}

export default App

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const params: any = {
            link: '/lien-he',
        }
        const response = await getSeoByLink(params)

        const tags = response?.data?.data?.tags

        return {
            props: {
                tags: tags?.map((item: any) => item?.value) || [],
            },
        }
    } catch (error) {
        return {
            props: {},
        }
    }
}
