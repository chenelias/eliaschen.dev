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
        <container>
            <p className="text-4xl font-bold">Top Projects</p>
            {/* <div>
                {data.map((repo) => (
                    <a
                        href={repo.html_url}
                        class="bg-gradient-to-r from-zinc-400 to-orange-500 w-full p-[6px] rounded-xl shadow-lg shodow-black-/5 dark:shadow-zinc-200/5 hover:shadow-2xl hover:scale-[103%] dark:hover:shadow-zinc-200/25 hover:shadow-black/25 duration-300"
                    >
                        <div class="flex flex-col cursor-pointer justify-between gap-4 p-4 dark:bg-zinc-800 bg-slate-200 rounded-lg h-full">
                            <div>
                                <h1 class="dark:text-zinc-300 text-zinc-900 mb-6 font-bold w-full tracking-tight m-0 text-xl">
                                    {repo.naem}
                                </h1>
                            </div>
                            <div class=" dark:text-zinc-400 text-zinc-500 gap-2 text-base items-center font-semibold">
                                <p class="m-0 inline-flex items-center">{repo.name}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div> */}
        </container>
    )
}

export default ProjectContainer
