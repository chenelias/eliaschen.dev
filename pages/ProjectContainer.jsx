import React, { useEffect, useState } from 'react'
import tokenkey from '/components/api/tokenkey'
const ProjectContainer = () => {
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
            <div>
                
            </div>
        </container>
    )
}

export default ProjectContainer
