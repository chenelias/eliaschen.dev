import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { AiFillGithub } from 'react-icons/ai'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { TbGitFork } from 'react-icons/tb'
export async function getServerSideProps(context) {
    const headers = {
        Authorization: 'Token ' + process.env.GITHUB_KEY,
    }
    const res = await fetch('https://api.github.com/users/chenelias/repos', { headers: headers })
    const data = await res.json()
    return {
        props: { data },
    }
}
const index = ({ data }) => {
    const [repoSearch, setRepoSearch] = useState('')
    return (
        <main>
            <Head>
                <title>EliasChen - Projects</title>
            </Head>
            <h1 className="font-extrabold text-6xl tracking-tight">Projects</h1>
            <div class="relative w-full mt-6">
                <input
                    onChange={(x) => setRepoSearch(x.target.value)}
                    aria-label="Search projects"
                    type="text"
                    placeholder="Search projects"
                    class="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                />
                <svg
                    class="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
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
            <div className="mt-8">
                {/* <h1 className="text-3xl ">Recent Update</h1> */}
                <div>
                    {data
                        .filter(
                            (repo) =>
                                repo.name.toUpperCase().includes(repoSearch) ||
                                repo.name.toLowerCase().includes(repoSearch)
                        )
                        .map((repo) => (
                            <Link className="group cursor-pointer block" target="_blank" href={repo.html_url}>
                                <div className="border flex transform hover:scale-[1.01] transition-all w-full w-max-xl p-3 my-4 rounded-lg bg-gradient-to-r dark:from-gray-800 dark:to-slate-600 from-slate-300 to-gray-400 break-words">
                                    <div className="block">
                                        <div className="flex">
                                            <p className="items-center text-xl flex mr-1">
                                                <AiFillGithub />
                                            </p>
                                            <h1 className="font-light text-md">{repo.full_name}</h1>
                                        </div>
                                        <h1 className="font-bold !block text-3xl group-hover:underline">{repo.name}</h1>
                                        <div className="flex p-1">
                                            <p className="items-center mr-3 font-bold text-lg flex">
                                                <TbGitFork />
                                                &thinsp;{repo.forks_count}
                                            </p>
                                            <p className="items-center font-bold text-lg flex">
                                                <MdOutlineFavoriteBorder />
                                                &thinsp;{repo.stargazers_count}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex-1"></div>
                                    <div className="items-center block"></div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </main>
    )
}

export default index
