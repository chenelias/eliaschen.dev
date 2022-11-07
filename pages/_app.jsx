import '../styles/globals.css'
import Footer from './Footer'
import Header from './Header'
function MyApp({ Component, pageProps }) {
    return (
        <main className="">
            <Header />
            <main className="pt-20 px-[30px]">
                <Component {...pageProps} />
                <Footer />
            </main>
        </main>
    )
}

export default MyApp
