import { Menu, Transition } from '@headlessui/react'
import { IoMenu } from 'react-icons/io5'
import { NavLinks } from './data/Navlinks'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

export default function NavlinkDropMenu() {
    const router = useRouter()

    return (
        <div>
            <Menu as="div" className="text-left relative block md:hidden">
                {({ open }) => (
                    <div>
                        <span>
                            <Menu.Button
                                aria-label="dropdown menu button"
                                className="cursor-pointer rounded-lg border border-black/10 bg-[rgba(249,250,251,0.68)] p-2 text-gray-800 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:border-white/10 dark:bg-[rgba(17,17,17,0.62)] dark:text-gray-100 dark:hover:bg-white/10 dark:focus-visible:ring-white/40"
                            >
                                <IoMenu className="h-5 w-5" />
                            </Menu.Button>
                        </span>
                        <Transition
                            show={open}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border border-zinc-400 bg-gray-100 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:divide-zinc-700">
                                <div className="py-1 ">
                                    <div className="px-3 py-1 uppercase font-mplus font-bold text-xs">Navigation</div>
                                </div>
                                {NavLinks.filter((links) => links.title !== '').map((links) => (
                                    <Menu.Item key={links.link}>
                                        {({ active }) => (
                                            <Link
                                                href={links.link}
                                                className={`text-md block py-2 px-3 rounded-[3px] ${
                                                    active ? 'bg-gray-300 dark:bg-zinc-500' : ''
                                                } ${
                                                    router.pathname == links.link
                                                        ? 'font-bold underline underline-offset-[6px]'
                                                        : 'font-normal'
                                                }`}
                                            >
                                                {links.title}
                                            </Link>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </div>
                )}
            </Menu>
        </div>
    )
}
