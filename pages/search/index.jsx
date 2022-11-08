import React, { useState } from 'react'
export default function search() {
    const [inputv, setinputv] = React.useState('')

    const Navlinks = [
        {
            title: 'Blog',
            link: '/blog',
        },
        {
            title: 'Works',
            link: '/works',
        },
        {
            title: 'About',
            link: '/about',
        },
        {
            title: 'Links',
            link: '/links',
        },
    ]
    return (
        <container>
            <h2>Search</h2>
            <input type="search" onChange={(x) => setinputv(x.target.value)} className="bg-gray-500 text-white p-2" />
            <div className="bg-gray-300 rounded-lg">
                {Navlinks.filter(
                    (links) =>
                        links.title.toUpperCase().includes(inputv) || links.title.toLowerCase(inputv).includes(inputv)
                ).map((links) => (
                    <h1 key={links.link} className="px-2 hover:underline underline-offset-[6px]">
                        {links.title}
                    </h1>
                ))}
            </div>
        </container>
    )
}
