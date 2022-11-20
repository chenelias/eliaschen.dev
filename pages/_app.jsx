import '../styles/globals.css'
import Footer from './Footer'
import Header from './Header'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
    return (
        <main className="">
            <Header />
            <main className="pt-20 px-[25px] mx-auto max-w-4xl">
                <Component {...pageProps} />
                <Footer />
            </main>
        </main>
    )
}

export default MyApp
