import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { BiGitRepoForked } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs'
import { BiTimeFive } from 'react-icons/bi'
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
        </div>
    )
    useEffect(() => {
        setLoading(true)
        fetch('https://dev.to/api/articles?username=eliaschen', {})
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])
    if (isLoading) return loadingdisplay
    if (!data) return loadingdisplay
    var searchresult = data.filter((item, index) => index < 3).map((blog) => (
        <Link key={blog.data}  className="group cursor-pointer block" target="_blank" href={blog.url}>
            <div className="lg:h-[350px] bg-gradient-to-r from-gray-400 to-black dark:from-gray-400 dark:to-zinc-600 w-full p-[4px] rounded-xl shadow-lg shodow-black-/5 dark:shadow-zinc-200/5 hover:shadow-xl hover:scale-[103%] dark:hover:shadow-zinc-200/20 hover:shadow-black/20 duration-300">
                <div className="flex flex-col cursor-pointer gap-4 p-4 dark:bg-zinc-800 bg-slate-200 rounded-lg h-full">
                    <div>
                    <p className='text-zinc-400 text-md uppercase ml-[2px]'>{blog.type_of}</p>
                        <h1 className="dark:text-zinc-300 text-zinc-900 font-extrabold w-full tracking-tight text-3xl">
                            {blog.title}
                        </h1>
                    </div>
                    <div className=" lg:h-[130px]">
                        <p className="line-clamp-3">{blog.description}</p>
                    </div>

                    <div className="dark:text-zinc-400 text-zinc-500 gap-2 text-base items-center font-semibold block">
                    <div className='flex text-md'>
                    <p>{blog.tag_list[0]}</p>
                    <p>{blog.tag_list[0]}</p>
                    <p>{blog.tag_list[1]}</p>
                    <p>{blog.tag_list[3]}</p>
                    <p>{blog.tag_list[4]}</p>
                    </div>
                        <div className="flex">
                            <p className="items-center flex text-lg font-bold">
                                <MdOutlineFavoriteBorder />
                                &thinsp;{blog.public_reactions_count}
                            </p>
                            &ensp;
                            <p className="items-center flex text-lg font-bold">
                                <BiTimeFive />
                                &thinsp;{blog.readable_publish_date}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    ))
    return (
        <main>
            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-3  w-full gap-6 mt-4">{searchresult}</div>
                <Link href="/blog" className="group float-right mt-5 p-1">
                    <div className="items-center flex w-[180px]  text-xl">
                        <p className="float-left">View all my articles</p>
                        <div className="ml-1 group-hover:ml-3 duration-200">
                            <BsArrowRight />
                        </div>
                    </div>
                </Link>
            </div>
        </main>
    )
}

export default PinnedRepos
