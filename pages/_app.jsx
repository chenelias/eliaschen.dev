import '../styles/globals.css'
import Footer from './Footer'
import Header from './Header'
import NextNProgress from 'nextjs-progressbar'
import '/styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
    const [supabase] = useState(() => createBrowserSupabaseClient())
    return (
        <main className="">
            <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
                <NextNProgress
                    options={{
                        showSpinner: false,
                    }}
                    color="#a855f7"
                    startPosition={0.1}
                    stopDelayMs={100}
                    height={3}
                    showOnShallow={false}
                />
                <Header />
                <main className="pt-20 px-[25px] mx-auto max-w-4xl">
                    <Component {...pageProps} />
                    <Footer />
                </main>
            </SessionContextProvider>
        </main>
    )
}

export default MyApp
