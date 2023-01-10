import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'
export default function Footer() {
    return (
        <footer>
            <div className="mb-[20px] mt-[60px] block minxs:flex max-w-full">
                <p className="text-md">
                    &copy;&ensp;{new Date().getFullYear()}&thinsp;EliasChen.&thinsp;All rights reserved.
                </p>
                <div className="flex-1"></div>
                <div className="text-md">
                    <Link
                        alt="Link of eliaschen's github home page (open in new tab)"
                        className=" text-gray-500 hover:text-gray-900 dark:hover:text-white transition items-center inline-flex"
                        target="_blank"
                        href="https://github.com/chenelias/"
                    >
                        <BsGithub />
                        &thinsp;GitHub
                    </Link>
                </div>
            </div>
        </footer>
    )
}
