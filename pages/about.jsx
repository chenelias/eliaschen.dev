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
          Elias is a writer, developer from Taiwan. He want's creating something useful for every developers and users in addition to coding, he also writing article on <Link href={'https://ithelp.ithome.com.tw/users/20157673'} className="decoration-2 decoration-wavy">IT Help Help</Link> and <Link href={'https://dev.to/eliaschen/'} className="decoration-2 decoration-wavy">Dev.to</Link>
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
