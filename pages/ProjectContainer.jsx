import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AiFillGithub } from 'react-icons/ai'
import { MdOutlineFavoriteBorder, MdLanguage } from 'react-icons/md'
import { TbGitFork } from 'react-icons/tb'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const tokenkey = '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'
const ProjectContainer = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [user, setuser] = useState(null)
    const loadingdisplay = (
        <main>
            <Skeleton baseColor="#202020" width="340px" height="60px" highlightColor="#444" />
            <div className="mt-[10px]"></div>
            <Skeleton baseColor="#202020" width="100px" highlightColor="#444" />
            <div className="mt-[40px]"></div>
            <Skeleton baseColor="#202020" height="42px" clasName="rounded-lg" highlightColor="#444" />
            <div className="mt-10">
                <Skeleton
                    height="122px"
                    count="3"
                    className="w-full my-2 rounded-lg"
                    baseColor="#202020"
                    highlightColor="#444"
                />
            </div>
        </main>
    )
    useEffect(() => {
        setLoading(true)
        fetch('https://api.github.com/users/chenelias', {
            headers: {
                Authorization: { tokenkey },
            },
        })
            .then((rrs) => rrs.json())
            .then((user) => {
                setuser(user)
                setLoading(false)
            })
        fetch('https://api.github.com/users/chenelias/repos', {
            headers: {
                Authorization: { tokenkey },
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return loadingdisplay
    if (!data) return loadingdisplay
    var searchresult = data
        .sort((a, b) => (a.pushed_at < b.pushed_at ? 1 : -1))
        .map((repo) => (
            <Link className="group cursor-pointer block" target="_blank" href={repo.html_url}>
                <div className="border flex transform hover:scale-[1.01] transition-all break-words">
                    <div className="block">
                        <div className="flex">
                            <p className="items-center text-xl flex mr-1">
                                <AiFillGithub />
                            </p>
                            <h1 className="font-light text-md">{repo.full_name}</h1>
                        </div>
                        <h1 className="font-bold !block text-3xl group-hover:underline">{repo.name}</h1>
                        <p className="text-md font-light">{repo.description}</p>
                        <div className="flex p-1 items-center">
                            <p className="items-center mr-3 font-bold text-lg flex">
                                <TbGitFork />
                                &thinsp;{repo.forks_count}
                            </p>
                            <p className="items-center mr-3 font-bold text-lg flex">
                                <MdOutlineFavoriteBorder />
                                &thinsp;{repo.stargazers_count}
                            </p>
                            {repo.language && (
                                <p className=" items-center font-bold text-md flex">
                                    <MdLanguage />
                                    &thinsp;
                                    {repo.language}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex-1"></div>
                    <div className="items-center block"></div>
                </div>
            </Link>
        ))
    return (
        <main>
            <div className="mt-10">
                <div>{searchresult}</div>
            </div>
        </main>
    )
}

export default ProjectContainer
