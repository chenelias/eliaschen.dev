import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const tokenkey = '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'
const PinnedRepos = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [user, setuser] = useState(null)
    const loadingdisplay = (
        <main>
            <Skeleton baseColor="#202020" width="340px" height="60px" highlightColor="#444" />
        </main>
    )
    useEffect(() => {
        setLoading(true)
        fetch('https://gh-pinned-repos.egoist.dev/?username=chenelias', {})
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return loadingdisplay
    if (!data) return loadingdisplay
    var searchresult = data.map((repo) => (
        <Link className="group cursor-pointer block" target="_blank" href={repo.link}>
            <div className="lg:h-[260px] bg-gradient-to-r from-zinc-400 to-orange-500 w-full p-[6px] rounded-xl shadow-lg shodow-black-/5 dark:shadow-zinc-200/5 hover:shadow-2xl hover:scale-[103%] dark:hover:shadow-zinc-200/25 hover:shadow-black/25 duration-300">
                <div class="flex flex-col cursor-pointer justify-between gap-4 p-4 dark:bg-zinc-800 bg-slate-200 rounded-lg h-full">
                    <div>
                        <h1 class="dark:text-zinc-300 text-zinc-900 font-bold w-full tracking-tight text-2xl">
                            {repo.repo}
                        </h1>
                    </div>
                    <div class="bg-purple-500">
                        <p className="truncate ">{repo.description}</p>
                    </div>
                    <div class="dark:text-zinc-400 text-zinc-500 gap-2 text-base items-center font-semibold flex">
                        <div
                            style={{ backgroundColor: repo.languageColor }}
                            className={` rounded-full h-[15px] w-[15px] border-1`}
                        ></div>
                        <p class="ml-[-3px] inline-flex items-center">{repo.language}</p>
                    </div>
                </div>
            </div>
        </Link>
    ))
    return (
        <main>
            <div className="mt-10">
                <h1 className="font-bold text-4xl mb-3">Repos</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 w-full gap-6 mt-4">{searchresult}</div>
            </div>
        </main>
    )
}

export default PinnedRepos
