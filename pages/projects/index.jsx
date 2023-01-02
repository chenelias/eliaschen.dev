import React, { useState, useEffect } from 'react'
import Body from '/components/Body.tsx'
import Link from 'next/link'
import { AiFillGithub } from 'react-icons/ai'
import { MdOutlineFavoriteBorder, MdLanguage } from 'react-icons/md'
import { HiOutlineTrash } from 'react-icons/hi'
import { TbGitFork } from 'react-icons/tb'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const tokenkey = process.env.GITHUB_TOKEN

const index = ({ repodata }) => {
    const [focusSearch, setFocusSearch] = useState(false)
    const [repoSearch, setRepoSearch] = useState('')
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [user, setuser] = useState(null)
    const loadingdisplay = (
        <Body title="Projects">
            <h1 className="font-extrabold text-6xl tracking-tight">Projects</h1>
            <div className="mt-[20px]"></div>
            <Skeleton baseColor="#202020" width="100px" highlightColor="#666" />
            <div className="mt-[40px]"></div>
            <Skeleton baseColor="#202020" height="42px" clasName="rounded-lg" highlightColor="#666" />
            <div className="mt-10">
                <Skeleton
                    height="122px"
                    count="3"
                    className="w-full my-2 rounded-lg"
                    baseColor="#202020"
                    borderRadius="10px"
                    highlightColor="#666"
                />
            </div>
        </Body>
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
    function InputonChange(x) {
        setRepoSearch(x)
        setFocusSearch(x != '' ? true : false)
    }
    function clearicon() {
        setRepoSearch('')
        document.querySelector('.RepoSearchInput').value = ''
    }
    if (data.length === 0) {
        console.log('No items found')
    } else {
        console.log(data)
    }
    var searchresult = data
        .sort((a, b) => (a.pushed_at < b.pushed_at ? 1 : -1))
        .filter((repo) => repo.name.toUpperCase().includes(repoSearch) || repo.name.toLowerCase().includes(repoSearch))
        .map((repo) => (
            <Link className="group cursor-pointer block" target="_blank" href={repo.html_url}>
                <div className="shadow-md shodow-black-/10 dark:shadow-zinc-200/10 hover:shadow-lg dark:hover:shadow-zinc-200/10 hover:shadow-black/10 flex transform hover:scale-[1.01] transition-all w-full w-max-xl p-3 my-5 rounded-lg bg-gradient-to-r dark:bg-zinc-800 bg-slate-200 break-words">
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
        <Body title="Projects">
            <div className=" items-center">
                <h1 className="font-extrabold text-6xl tracking-tight">Projects</h1>
                <div className="flex items-center mt-4">
                    <p className="text-lg flex items-center">
                        <AiFillGithub />
                        &thinsp;
                        <span className="font-bold">{data.length}</span>&thinsp;/&thinsp;Repos
                    </p>
                </div>
            </div>
            <div class="relative w-full mt-6">
                <input
                    onChange={(x) => InputonChange(x.target.value)}
                    aria-label="Search projects"
                    type="text"
                    placeholder="Search projects"
                    className="RepoSearchInput block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                />
                <div className=" absolute right-0 h-[41px] top-0 py-[8px] rounded-md flex items-center">
                    {repoSearch !== '' ? (
                        <button
                            className="mr-[4px] text-red-600 p-[1px] text-[27px] dark:hover:bg-slate-700 rounded-md hover:bg-slate-200 transition-all"
                            onClick={() => clearicon()}
                        >
                            <span className="">
                                <HiOutlineTrash />
                            </span>
                        </button>
                    ) : (
                        ''
                    )}
                    <svg
                        class="h-[25px] w-[25px] mr-2 text-gray-400 dark:text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>
            </div>
            <div className="mt-10">
                <div>
                    {searchresult}
                    {searchresult.length === 0 ? (
                        <h1 className=" text-2xl font-bold text-center">No projects found.</h1>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </Body>
    )
}

export default index
