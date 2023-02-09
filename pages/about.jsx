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
                <h2 className="text-lg">
          Elias is a writer, developer, and font end developer. He spends his days tinkering with code and creating beautiful fonts that help people communicate more effectively. He loves traveling and exploring new places, and he's always looking for ways to connect with others. Elias is passionate about making the world a better.
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
