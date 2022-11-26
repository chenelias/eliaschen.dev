import React from 'react'
export async function getServerSideProps(context) {
    const res = await fetch('https://api.github.com/users/chenelias/repos', {
        headers: {
            Authorization:
                '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',
        },
    })
    const usr = await fetch('https://api.github.com/users/chenelias', {
        headers: {
            Authorization:
                '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',
        },
    })
    const data = await res.json()
    const user = await usr.json()
    return {
        props: { data, user },
    }
}

const ProjectContainer = () => {
    return (
        <container>
            <p className="text-4xl font-bold">Top Projects</p>
        </container>
    )
}

export default ProjectContainer
