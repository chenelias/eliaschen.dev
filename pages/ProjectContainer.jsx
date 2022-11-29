import React, { useEffect, useState } from 'react'

const ProjectContainer = () => {
    const tokenkey = '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'
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const loadingdisplay = <div></div>
    // --------------------------------------------
    useEffect(() => {
        setLoading(true)
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

    return (
        <div>
            {' '}
            {/* {data
                .filter(
                    (repo) =>
                        repo.name.toUpperCase().includes(repoSearch) || repo.name.toLowerCase().includes(repoSearch)
                )
                .sort((a, b) => (a.pushed_at < b.pushed_at ? 1 : -1))

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
                ))} */}
        </div>
    )
}
export default ProjectContainer
