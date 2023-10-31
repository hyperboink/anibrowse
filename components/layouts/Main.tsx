import React from 'react'
import Header from './Header'
import { PageContextProvider } from '../../context/PageContext'
import Footer from './Footer'

export default function Main({children}: { children: React.ReactNode }) {
  return (
    <>
        <Header/>
        
        <PageContextProvider>
            {children}
        </PageContextProvider>

        <Footer/>
    </>
  )
}
