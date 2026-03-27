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
    <header className="fixed inset-x-0 top-3 z-50 px-3">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-black/10 bg-[rgba(249,250,251,0.68)] shadow-[0_6px_18px_rgba(2,6,23,0.08)] backdrop-blur-lg dark:border-white/10 dark:bg-[rgba(17,17,17,0.62)] dark:shadow-[0_6px_18px_rgba(2,6,23,0.28)]">
          <nav className="flex items-center gap-3 px-3 py-2 text-base">
            <Link href="/" className="group">
              <h2 className="font-bold text-base flex gap-1 tracking-tighter items-center notranslate">
                <span className=" text-2xl !mt-[2px] duration-150 group-hover:rotate-[17.5deg]">
                  <FaSlackHash />
                </span>
              </h2>
            </Link>
            <div className="headernav text-sm hidden md:inline-flex">
              {NavLinks.map((links) => (
                <Link
                  key={links.link}
                  aria-label={links.title}
                  className={`${
                    links.title === "" ? "hidden" : ""
                  } px-2 hover:underline underline-offset-[8px] ${
                    router.pathname == links.link
                      ? "font-extrabold text-purple-500"
                      : "font-normal"
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
      </div>
    </header>
  );
}

export default Header
