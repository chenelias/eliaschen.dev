import React from 'react'
import Body from '/components/Body.tsx'
import Image from 'next/image'
import Link from 'next/link'
import 'react-loading-skeleton/dist/skeleton.css'
const About = () => {
    return (
        <Body title="About">
            <h1 className="font-extrabold text-6xl tracking-tight">About Me</h1>
            <div className="mt-5">
                <p className="font-bold text-xl">Short, 3rd Person</p>
                <h2 className="text-md ml-4">
                    EliasChen is a solo developer and loves coding, photography for now he still keep learning about
                    fullstack development and mobile development.
                </h2>
            </div>
            <br />
            <div className="mt-5">
                <p className="text-3xl font-bold">Headshots</p>
                <div className="mt-2 about:inline-flex block">
                    <div>
                        <Link href={'/eliaschen.jpg'}>
                            <Image
                                className="rounded-xl !mr-3 mb-3 !h-[250px] !w-auto"
                                src={require('/public/eliaschen.jpg')}
                                alt="EliasChen"
                                placeholder="blur"
                            />
                        </Link>
                    </div>
                    <Link href={'/eliaschen-origin.jpg'}>
                        <Image
                            className="rounded-xl mb-3 !h-[250px] !w-auto"
                            src={require('/public/eliaschen-origin.jpg')}
                            alt="EliasChen"
                            placeholder="blur"
                        />
                    </Link>
                </div>
            </div>
        </Body>
    )
}

export default About
