import Image from "next/image";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

// Dynamically import data-fetching components - they load on client side
// while the hero section renders immediately
const FeaturedProjects = dynamic(() => import("./FeaturedProjects"), {
  ssr: false,
  loading: () => (
    <div className="mt-[50px]">
      <h1 className="tracking-tighter text-2xl mb-3 font-extrabold">
        Featured Projects
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-6 mt-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="lg:h-[250px] bg-gradient-to-r from-purple-300 to-purple-400 dark:from-purple-700 dark:to-purple-900 w-full p-[4px] rounded-xl animate-pulse">
            <div className="h-full dark:bg-zinc-800 bg-slate-200 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  ),
});

const FeaturedBlogs = dynamic(() => import("./FeaturedBlogs"), {
  ssr: false,
  loading: () => (
    <div className="mt-[40px] mb-[20px]">
      <h1 className="tracking-tighter text-2xl mb-3 font-extrabold">
        Blogs
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-6 mt-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="lg:h-[330px] bg-gradient-to-r from-pink-300 to-pink-400 dark:from-pink-600 dark:to-pink-900 w-full p-[4px] rounded-xl animate-pulse">
            <div className="h-full dark:bg-zinc-800 bg-slate-200 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>EliasChen - Developer</title>
      </Head>
      <div className="xs:ml-0 ml-2">
        <div className="flex flex-col-reverse sm:flex-row items-start my-5 ">
          <div className="flex flex-col pr-8">
            <h1 className="font-black mt-6 text-4xl tracking-tight notranslate">
              Elias Chen
            </h1>
            <h2 className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-1 mt-[-0.1px]">
              YI-KAI CHEN&ensp;//&ensp;Developer
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-16">
              A high schooler in Taiwan passionate about computer science and eager to step out of their comfort zone.
            </p>
          </div>
          <div className="flex-1"></div>
          <div className="w-[130px] sm:w-[140px] relative sm:my-[25px] my-[-15px] sm:mx-0 mx-[-10px] ">
            <Image
              placeholder="blur"
              src={require("/public/eliaschen.jpg")}
              alt="eliaschen"
              className="w-auto rounded-full"
            />
          </div>
        </div>
        <div className="mt-[-40px]">
          <h1 className="text-xl font-medium mb-1">Interested in</h1>
          <p className="text-sm">
            &thinsp;Full-Stack Development / Mobile App Development / Cloud Computing
          </p>
        </div>
        <Link href="/about" className="group inline-block mt-5 p-1">
          <div className="items-center flex w-[150px] text-sm whitespace-nowrap">
            <p className="text-base md:text-lg whitespace-nowrap">Learn more about me</p>
            <div className="ml-2 transition-transform duration-200 group-hover:translate-x-2">
              <BsArrowRight />
            </div>
          </div>
        </Link>
      </div>
      <FeaturedProjects />
      <FeaturedBlogs />
    </main>
  );
}
