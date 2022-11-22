import { Menu, Transition } from '@headlessui/react'
import { IoMenu } from 'react-icons/io5'
import { NavLinks } from './data/Navlinks'
import Link from 'next/link'
import React, { useState } from 'react'
import { Fragment } from 'react'
export default function NavlinkDropMenu() {
    const [menuopen, setmenuopen] = useState(true)
    return (
        <Menu as="div" className="text-left relative block xs:hidden">
            <div>
                <Menu.Button
                    className="cursor-pointer p-2 rounded-lg bg-[#d1d5db] hover:ring-[2px] ring-black dark:ring-white  dark:bg-[#444444] transition-all"
                    aria-label="menu"
                    onClick={() => setmenuopen(true)}
                >
                    <IoMenu className="h-5 w-5" />
                </Menu.Button>
            </div>
            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={` absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border border-zinc-400 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-zinc-400 dark:divide-zinc-700`}
                >
                    <div className="py-1 ">
                        <div className="px-3 py-1 uppercase font-mplus font-bold text-xs">Navigation</div>
                    </div>
                    {NavLinks.map((links) => (
                        <Link
                            onClick={() => setmenuopen(false)}
                            key={links.link}
                            href={links.link}
                            className="text-md block py-2 px-3 hover:bg-gray-300 dark:hover:bg-zinc-500 rounded-[3px]"
                        >
                            {links.title}
                        </Link>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
