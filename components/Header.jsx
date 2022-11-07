import React from 'react'
import { FaSlackHash } from 'react-icons/fa'
import Link from 'next/link'
const Header = () => {
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
        <header className="fixed w-full pq2 p-4 z-20 flex dark:bg-[rgba(17, 17, 17,0.29)] bg-[rgba(249, 250, 251,0.30)] backdrop-blur-xl">
            <nav className="flex items-center gap-3 text-base">
                <Link href="/" className="group">
                    <h2 className=" font-bold text-xl flex tracking-tighter items-center">
                        <span className=" text-3xl duration-150 group-hover:rotate-[17.5deg]">
                            <FaSlackHash />
                        </span>
                        EliasChen.dev
                    </h2>
                </Link>
                <nav className="headernav ml-1 text-lg inline-flex">
                    {Navlinks.map((links) => (
                        <Link
                            key={links.link}
                            className="px-2 hover:underline underline-offset-[6px]"
                            href={links.link}
                        >
                            {links.title}
                        </Link>
                    ))}
                </nav>
            </nav>
        </header>
    )
}

export default Header
