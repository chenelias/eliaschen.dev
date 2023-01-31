import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { BiGitRepoForked } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs'
const PinnedRepos = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const LoadingSkeleton = (
        <div className="lg:h-[280px] bg-gradient-to-r from-purple-400 to-orange-500 dark:from-purple-500 dark:to-orange-700 w-full p-[4px] rounded-xl shadow-lg shodow-black-/5 dark:shadow-zinc-200/5 duration-300">
            <div className="flex flex-col cursor-pointer gap-4 p-4 dark:bg-zinc-800 bg-slate-200 rounded-lg h-full">
                <div>
                    <h1 className="dark:text-zinc-300 text-zinc-900 font-bold w-full tracking-tight text-2xl">
                        <Skeleton className="rounded-lg" baseColor="#202020" count="1" highlightColor="#666" />
                    </h1>
                </div>
                <div className=" lg:h-[140px]">
                    <p className="line-clamp-5 ">
                        {' '}
                        <Skeleton className="rounded-lg" count="3" baseColor="#202020" highlightColor="#666" />
                    </p>
                </div>
                <div className="dark:text-zinc-400 text-zinc-500 gap-2 text-base items-center font-semibold block">
                    <Skeleton
                        className="rounded-lg"
                        baseColor="#202020"
                        width="130px"
                        count="1"
                        highlightColor="#666"
                    />
                    <Skeleton
                        className="rounded-lg"
                        baseColor="#202020"
                        count="1"
                        width="100px"
                        highlightColor="#666"
                    />
                </div>
            </div>
        </div>
    )
    const loadingdisplay = (
        <div className="grid grid-cols-1 lg:grid-cols-3  w-full gap-6 mt-4">
            {LoadingSkeleton}
            {LoadingSkeleton}
            {LoadingSkeleton}
            {LoadingSkeleton}
            {LoadingSkeleton}
            {LoadingSkeleton}
        </div>
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
      <Link
        className="group cursor-pointer block"
        target="_blank"
        href={repo.link}
        aria-label={"github repository " + repo.repo}
      >
        {/* from-purple-400 to-orange-500 dark:from-purple-500 dark:to-orange-700  */}
        <div className="lg:h-[250px] bg-gradient-to-r from-purple-300 to-neutral-600 dark:from-purple-900 dark:to-neutral-600 w-full p-[4px] rounded-xl shadow-lg shodow-black-/5 dark:shadow-zinc-200/5 hover:shadow-xl hover:scale-[101%] dark:hover:shadow-zinc-200/20 hover:shadow-black/20 duration-300">
          <div className="flex flex-col cursor-pointer gap-4 p-4 dark:bg-zinc-800 bg-slate-200 rounded-lg h-full">
            <div>
              <h1 className="dark:text-zinc-300 text-zinc-900 font-bold w-full tracking-tight text-2xl">
                {repo.repo}
              </h1>
            </div>
            <div className=" lg:h-[130px]">
              <p className="line-clamp-4 ">{repo.description}</p>
            </div>

            <div className="dark:text-zinc-400 text-zinc-500 gap-2 text-base items-center font-semibold block">
              <div className="flex">
                <p className="items-center flex text-lg font-bold">
                  <MdOutlineFavoriteBorder />
                  &thinsp;{repo.stars}
                </p>
                &ensp;
                <p className="items-center flex text-lg font-bold">
                  <BiGitRepoForked />
                  &thinsp;{repo.forks}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <div
                  style={{ backgroundColor: repo.languageColor }}
                  className={` rounded-full h-[15px] w-[15px] border-1`}
                ></div>
                <p className=" inline-flex items-center">{repo.language}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ));
    return (
        <main>
            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-3  w-full gap-6 mt-4">{searchresult}</div>
                <Link href="/projects" className="group float-right mt-5 p-1">
                    <div className="items-center flex w-[210px] text-xl">
                        <p className="float-left">View all my projects</p>
                        <div className="ml-1 group-hover:ml-3 duration-200">
                            <BsArrowRight />
                        </div>
                    </div>
                </Link>
            </div>
            <div>&thinsp;</div>
        </main>
    )
}

export default PinnedRepos
