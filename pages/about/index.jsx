import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { AboutImage } from '../../components/data/AboutImage'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
const AboutPage = () => {
    return (
        <main>
            <Head>
                <title>EliasChen - About</title>
            </Head>
            <h1 className="font-extrabold text-6xl tracking-tight">About Me</h1>
            <div className="mt-5">
                <p className="font-bold text-xl">Short, 3rd Person</p>
                <h2 className="text-md ml-4">
                    EliasChen is a solo developer and loves coding、photography, for now he still keep learning about
                    fullstack development and python and c++ programming.
                </h2>
            </div>
            <div className="mt-10">
                <p className="text-3xl font-bold">Headshots</p>
                <div className="mt-2 xs:inline-flex block">
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Image
                            className="rounded-xl mr-3 mb-3 !h-[250px] !w-auto"
                            src={require('/public/about/eliaschen.jpg')}
                            alt="EliasChen"
                        />
                        <Image
                            className="rounded-xl !h-[250px] !w-auto"
                            src={require('/public/about/eliaschen-origin.jpg')}
                            alt="EliasChen"
                        />
                    </SkeletonTheme>
                </div>
            </div>
        </main>
    )
}

export default AboutPage
