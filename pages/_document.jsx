import { Html, Head, Main, NextScript } from 'next/document'
import Footer from './Footer'
import Header from './Header'
import Link from 'next/link'
export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&family=Source+Code+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>
            <body className="mx-auto max-w-4xl">
                    <Main />
                    <NextScript />
            </body>
        </Html>
    )
}
