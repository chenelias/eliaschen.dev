import Image from "next/image";
import "react-loading-skeleton/dist/skeleton.css";
import PinnedRepos from "./PinnedRepos";
import RecentlyBlog from "./RecentlyBlog";
import Head from "next/head";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default function HomePage({ pinnedRepos, recentBlogs }) {
  return (
    <main>
      <Head>
        <title>EliasChen - Developer</title>
      </Head>
      <div className="xs:ml-0 ml-2">
        <div className="flex flex-col-reverse sm:flex-row items-start my-5 ">
          <div className="flex flex-col pr-8">
            <h1 className="about-handwrite font-black mt-6 text-5xl md:text-6xl tracking-tight notranslate">
              Elias Chen
            </h1>
            <h2 className="about-handwrite text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-1 mt-[-0.1px]">
              YI-KAI CHEN&ensp;//&ensp;Developer
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-16">
              A kitten passionate about computer science and eager to step out of its comfort zone.
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
          <h1 className="about-handwrite text-3xl md:text-4xl font-bold mb-1">Skills</h1>
          <p className="text-lg">
            &thinsp;Full-Stack Development / Mobile App Development / DevOps
          </p>
        </div>
        <Link href="/about" className="group inline-block mt-5 p-1">
          <div className="items-center flex w-[150px] text-lg whitespace-nowrap">
            <p className="about-handwrite text-xl md:text-2xl whitespace-nowrap">Learn more about me</p>
            <div className="ml-2 transition-transform duration-200 group-hover:translate-x-2">
              <BsArrowRight />
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-[50px]">
        <h1 className="about-handwrite tracking-tighter text-5xl mb-6 font-extrabold">
          Featured Projects
        </h1>
        <PinnedRepos data={pinnedRepos} />
      </div>
      <div className="mt-[40px] mb-[20px]">
        <h1 className="about-handwrite tracking-tighter text-5xl mb-6 font-extrabold">
          Blogs
        </h1>
        <RecentlyBlog data={recentBlogs} />
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
  const [pinnedRes, blogRes] = await Promise.all([
    fetch("https://gh-pinned-repos-tsj7ta5xfhep.deno.dev/?username=chenelias"),
    fetch("https://dev.to/api/articles?username=eliaschen"),
  ]);

  const [pinnedRepos, recentBlogs] = await Promise.all([
    pinnedRes.ok ? pinnedRes.json() : [],
    blogRes.ok ? blogRes.json() : [],
  ]);

  return {
    props: {
      pinnedRepos: Array.isArray(pinnedRepos) ? pinnedRepos : [],
      recentBlogs: Array.isArray(recentBlogs) ? recentBlogs : [],
    },
  };
};
