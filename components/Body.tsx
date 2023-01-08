import Head from 'next/head'
import React from 'react'

export default function Body(props) {
    return (
        <main>
            <Head>
                <title className="notranslate">{'EliasChen - ' + props.title}</title>
            </Head>
            {props.children}
        </main>
    )
}




 