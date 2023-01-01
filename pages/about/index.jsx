import React from 'react'
import Body from '/components/Body.tsx'
import Image from 'next/image'
import 'react-loading-skeleton/dist/skeleton.css'
const AboutPage = () => {
    return (
        <Body title="About">
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
                    <Image
                        className="rounded-xl mr-3 mb-3 !h-[250px] !w-auto"
                        src={require('/public/eliaschen.jpg')}
                        alt="EliasChen"
                        placeholder="blur"
                    />
                    <Image
                        className="rounded-xl mr-3 mb-3 !h-[250px] !w-auto"
                        src={require('/public/eliaschen-origin.jpg')}
                        alt="EliasChen"
                        placeholder="blur"
                    />
                </div>
            </div>
        </Body>
    )
}

export default AboutPage
