import { Router } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';
import NProgress from 'nprogress';

const PageContext = createContext({});

const PageContextProvider = ({children}: { children: React.ReactNode }) => {

    const [loading, setLoading] = useState(false);

    const state = {
        loading
    };

    useEffect(() => {
        Router.events.on('routeChangeStart', () => {
            NProgress.start();
            setLoading(true);
        });
        Router.events.on('routeChangeComplete', () => {
            NProgress.done(false);
            setLoading(false);
        });
        Router.events.on('routeChangeError', () => setLoading(false));
        return () => {
        Router.events.off('routeChangeStart', () => setLoading(true));
        Router.events.off('routeChangeComplete', () => setLoading(false));
        Router.events.off('routeChangeError', () => setLoading(false));
        };
    }, [Router.events]);

    

    return (
        <PageContext.Provider value={state}>
            {children}
            <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                <div className="flex flex-col justify-center overflow-hidden bg-blue-500"></div>
            </div>
        </PageContext.Provider>
    )
}

export { PageContext, PageContextProvider };