import Image from 'next/image'
import eliaschen from '../public/eliaschen.jpg'
import Link from 'next/link'

export default function HomePage() {
    return (
        <container>
            <div className="flex flex-col-reverse sm:flex-row items-start my-5">
                <div className="flex flex-col pr-8">
                    <h1 className="font-extrabold mt-6 text-4xl md:text-5xl tracking-tight">Elias Chen</h1>
                    <h2 className="text-gray-700 dark:text-gray-200 mb-1 mt-[-0.1px]">
                        Developer&ensp;//&ensp;Learner&nbsp;&bull;&nbsp;Taiwan
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-16">
                        By night a solo developer learning/developing front-end development, by day the learner lives in
                        Taiwan.
                    </p>
                </div>
                <div className="w-[130px] sm:w-[180px] relative sm:my-[25px] my-[-15px] sm:mx-0 mx-[-10px] ">
                    <Image src={eliaschen} alt="eliaschen" className="w-auto rounded-full grayscale" />
                </div>
            </div>
            <div className="mt-[-40px]">
                <h1 className="text-3xl font-bold mb-1">Develop skills</h1>
                <p className="text-md">
                    &emsp;Web ( React / Next / Astro / Vue ), Mobile (ReactNative), Desktop (Electron), Python, C++
                </p>
            </div>
            <div className="mt-[20px]">
                <h1 className="text-3xl font-bold mb-1">Hobby</h1>
                <p className="text-md">&emsp;Develop, Art, Photography, English</p>
            </div>
        </container>
    )
}
