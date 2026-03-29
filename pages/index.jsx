import Image from "next/image";
import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import PinnedRepos from "./PinnedRepos";
import RecentlyBlog from "./RecentlyBlog";
import Head from "next/head";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const PINNED_REPOS_API =
  "https://gh-pinned-repos-tsj7ta5xfhep.deno.dev/?username=chenelias";
const RECENT_BLOGS_API = "https://dev.to/api/articles?username=eliaschen";

export default function HomePage() {
  const [pinnedRepos, setPinnedRepos] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [isPinnedLoading, setIsPinnedLoading] = useState(true);
  const [isBlogLoading, setIsBlogLoading] = useState(true);
  const featuredRepos = pinnedRepos.slice(0, 3);
  const featuredBlogs = recentBlogs.slice(0, 3);

  useEffect(() => {
    const controller = new AbortController();

    const loadPinnedRepos = async () => {
      try {
        const pinnedRes = await fetch(PINNED_REPOS_API, { signal: controller.signal });
        if (!pinnedRes.ok || controller.signal.aborted) return;
        const pinnedData = await pinnedRes.json();
        if (!controller.signal.aborted) {
          setPinnedRepos(Array.isArray(pinnedData) ? pinnedData : []);
        }
      } catch {
        if (!controller.signal.aborted) {
          setPinnedRepos([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsPinnedLoading(false);
        }
      }
    };

    const loadRecentBlogs = async () => {
      try {
        const blogRes = await fetch(RECENT_BLOGS_API, { signal: controller.signal });
        if (!blogRes.ok || controller.signal.aborted) return;
        const blogData = await blogRes.json();
        if (!controller.signal.aborted) {
          setRecentBlogs(Array.isArray(blogData) ? blogData : []);
        }
      } catch {
        if (!controller.signal.aborted) {
          setRecentBlogs([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsBlogLoading(false);
        }
      }
    };

    loadPinnedRepos();
    loadRecentBlogs();

    return () => controller.abort();
  }, []);

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
      <div className="mt-[50px]">
        <h1 className="tracking-tighter text-2xl mb-3 font-extrabold">
          Featured Projects
        </h1>
        <PinnedRepos data={featuredRepos} loading={isPinnedLoading} />
      </div>
      <div className="mt-[40px] mb-[20px]">
        <h1 className="tracking-tighter text-2xl mb-3 font-extrabold">
          Blogs
        </h1>
        <RecentlyBlog data={featuredBlogs} loading={isBlogLoading} />
      </div>
    </main>
  );
}
