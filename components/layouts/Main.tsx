import React from 'react'
import Head from 'next/head'
import Header from './Header'
import { PageContextProvider } from '@/context/PageContext'
import Footer from './Footer'

export default function Main({children}: { children: React.ReactNode }) {
  return (
    <>
        <Head>
          <title>AniBrowse</title>
        </Head>

        <Header/>

        <PageContextProvider>
            {children}
        </PageContextProvider>

        <Footer/>
    </>
  )
}
