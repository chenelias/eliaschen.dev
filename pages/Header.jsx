import React from 'react'
import { FaSlackHash } from 'react-icons/fa'
import Link from 'next/link'
import ColorModeToggle from '/components/ColorModeToggle'
import NavlinkDropMenu from '../components/NavlinkDropMenu'
import { NavLinks } from '/components/data/Navlinks'
import { useRouter } from 'next/router'
const Header = () => {
    const router = useRouter()
    return (
        <header className="fixed w-full pq2 z-30 dark:bg-[rgba(17, 17, 17,0.29)] bg-[rgba(249, 250, 251,0.30)] backdrop-blur-lg">
            <div className="mx-auto max-w-4xl">
                <nav className="flex items-center gap-3 text-base m-3">
                    <Link href="/" className="group">
                        <h2 className=" font-bold text-xl flex tracking-tighter items-center">
                            <span className=" text-3xl !mt-[2px] duration-150 group-hover:rotate-[17.5deg]">
                                <FaSlackHash />
                            </span>
                            EliasChen.dev
                        </h2>
                    </Link>
                    <div className="headernav ml-1 text-lg hidden xs:inline-flex">
                        {NavLinks.map((links) => (
                            <Link
                                key={links.link}
                                alt={links.title}
                                className={`px-2 hover:underline underline-offset-[8px] ${
                                    router.pathname == links.link ? 'font-extrabold text-purple-500' : 'font-normal'
                                }`}
                                href={links.link}
                            >
                                {links.title}
                            </Link>
                        ))}
                    </div>
                    <div className="flex-1"></div>
                    <div className="items-center">
                        <ColorModeToggle />
                    </div>
                    <div className="">
                        <NavlinkDropMenu />
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
