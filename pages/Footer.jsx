import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'
export default function Footer() {
    return (
        <footer>
            <div class="mb-10 my-[70px] mt-[100px]  block minxs:flex max-w-full">
                <p class="text-md">
                    &copy;&ensp;{new Date().getFullYear()}&thinsp;EliasChen.&thinsp;All rights reserved.
                </p>
                <div class="flex-1"></div>
                <ul class="text-md">
                    <Link
                        class=" text-gray-500 hover:text-gray-900 dark:hover:text-white transition items-center inline-flex"
                        target="_blank"
                        href="https://github.com/chenelias/eliaschen.dev"
                    >
                        <BsGithub />
                        &thinsp;Source
                    </Link>
                </ul>
            </div>
        </footer>
    )
}
