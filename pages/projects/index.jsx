import React, { useState } from 'react'
import Head from 'next/head'
export async function getServerSideProps(context) {
    const res = await fetch(`https://api.github.com/users/chenelias/repos`)
    const data = await res.json()
    return {
        props: { data },
    }
}
export const hello = [
    {
        name: 'helloworld',
    },
    {
        name: 'hello',
    },
]
const index = ({ data }) => {
    const [repoSearch, setRepoSearch] = useState('')
    return (
        <main>
            <Head>
                <title>EliasChen - Projects</title>
            </Head>
            <h1 className="font-extrabold text-6xl tracking-tight">Projects</h1>
            <input
                onChange={(x) => setRepoSearch(x.target.value)}
                name="reposearch"
                className="mt-6 text-xl p-2 rounded-md bg-slate-800"
            />
            <div className="mt-5">
                {data
                    .filter(
                        (repo) =>
                            repo.name.toUpperCase().includes(repoSearch) || repo.name.toLowerCase().includes(repoSearch)
                    )
                    .map((repo) => (
                        <div className="m-2">
                            <p>{repo.name}</p>
                        </div>
                    ))}
            </div>
        </main>
    )
}

export default index
