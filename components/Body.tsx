import Head from 'next/head'
import React from 'react'

export default function Body(props) {
    return (
        <main>
            <Head>
                <title>{'EliasChen - ' + props.title}</title>
            </Head>
            {props.children}
        </main>
    )
}
