import React, { useEffect, useState } from 'react'

const ProjectContainer = () => {
    const tokenkey = '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'
    const [repo, setData] = useState(null)
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
            <div>
                {repo.map((data) => (
                    <div>
                        <h1>{data.naem}</h1>
                    </div>
                ))}
            </div>
        </container>
    )
}
export default ProjectContainer
