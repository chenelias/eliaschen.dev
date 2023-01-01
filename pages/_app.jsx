import '../styles/globals.css'
import Footer from './Footer'
import Header from './Header'
import NextNProgress from 'nextjs-progressbar'
import '/styles/globals.css'
function MyApp({ Component, pageProps }) {
    return (
        <main className="">
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
        </main>
    )
}

export default MyApp
