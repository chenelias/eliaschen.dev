import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { BiGitRepoForked } from 'react-icons/bi'
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
            <div className="lg:h-[280px] bg-gradient-to-r from-purple-400 to-orange-500 dark:from-purple-500 dark:to-orange-700 w-full p-[6px] rounded-xl shadow-lg shodow-black-/5 dark:shadow-zinc-200/5 hover:shadow-2xl hover:scale-[103%] dark:hover:shadow-zinc-200/25 hover:shadow-black/25 duration-300">
                <div class="flex flex-col cursor-pointer gap-4 p-4 dark:bg-zinc-800 bg-slate-200 rounded-lg h-full">
                    <div>
                        <h1 class="dark:text-zinc-300 text-zinc-900 font-bold w-full tracking-tight text-2xl">
                            {repo.repo}
                        </h1>
                    </div>
                    <div class=" lg:h-[140px]">
                        <p className="line-clamp-5 ">{repo.description}</p>
                    </div>

                    <div class="dark:text-zinc-400 text-zinc-500 gap-2 text-base items-center font-semibold block">
                        <div className="flex">
                            <p className="items-center flex text-lg font-bold">
                                <MdOutlineFavoriteBorder />
                                &thinsp;{repo.stars}
                            </p>&ensp;
                            <p className="items-center flex text-lg font-bold">
                                <BiGitRepoForked />
                                &thinsp;{repo.forks}
                            </p>
                        </div>
                        <div class="flex gap-2 items-center">
                            <div
                                style={{ backgroundColor: repo.languageColor }}
                                className={` rounded-full h-[15px] w-[15px] border-1`}
                            ></div>
                            <p class=" inline-flex items-center">{repo.language}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    ))
    return (
        <main>
            <div className="mt-10">
                <h1 className="font-bold text-4xl mb-6">Repos</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3  w-full gap-6 mt-4">{searchresult}</div>
            </div>
        </main>
    )
}

export default PinnedRepos
