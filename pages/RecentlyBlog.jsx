import React from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";

const hasText = (value) => typeof value === "string" && value.trim().length > 0;

const RecentlyBlog = ({ data = [], loading = false }) => {
  const LoadingSkeleton = (
    <div className="lg:h-[330px] bg-gradient-to-r from-pink-300 to-pink-400 dark:from-pink-600 dark:to-pink-900 w-full p-[4px] rounded-xl home-card-shadow home-card-shadow-hover hover:scale-[103%] duration-300">
      <div className="flex h-full flex-col justify-between cursor-pointer p-4 dark:bg-zinc-800 bg-slate-200 rounded-lg">
        <div>
          <Skeleton
            className="rounded-lg"
            width="60px"
            count="1"
          />
          <h1 className="dark:text-zinc-300 text-zinc-900 font-bold w-full tracking-tight text-xl">
            <Skeleton
              className="rounded-lg"
              height="50px"
              count="1"
            />
          </h1>
        </div>
        <div className="flex-1 py-3">
          <p className="line-clamp-3 ">
            {" "}
            <Skeleton
              className="rounded-lg"
              count="3"
            />
          </p>
        </div>
        <Skeleton
          className="rounded-lg"
          count="2"
        />
        <div className="dark:text-zinc-400 text-zinc-500 gap-2 text-sm items-center font-semibold block">
        </div>
      </div>
    </div>
  );
  const loadingdisplay = (
    <div className="home-scaffold grid grid-cols-1 lg:grid-cols-3  w-full gap-6 mt-4">
      {LoadingSkeleton}
      {LoadingSkeleton}
      {LoadingSkeleton}
    </div>
  );
  if (loading) return loadingdisplay;
  if (!data || data.length === 0) {
    return (
      <main>
        <div className="mt-4 rounded-lg border border-black/10 dark:border-white/10 p-4 text-sm text-zinc-500 dark:text-zinc-400">
          No blog articles available right now.
        </div>
        <Link href="/blog" className="group float-right mt-5 p-1">
          <div className="flex w-auto items-center gap-2 text-lg">
            <p className="whitespace-nowrap">View all my articles</p>
            <div className="transition-transform duration-200 group-hover:translate-x-2">
              <BsArrowRight />
            </div>
          </div>
        </Link>
      </main>
    );
  }
  var searchresult = data
    .filter((item, index) => index < 3)
    .map((blog) => (
      <Link
        key={blog.data}
        aria-label={"link of article " + blog.title}
        className="group cursor-pointer block"
        target="_blank"
        href={blog.url}
      >
        <div className="lg:h-[330px] bg-gradient-to-r from-pink-300 to-pink-400 dark:from-pink-600 dark:to-pink-900 w-full p-[4px] rounded-xl home-card-shadow home-card-shadow-hover hover:scale-[101%] duration-300">
          <div className="flex h-full flex-col justify-between cursor-pointer p-4 dark:bg-zinc-800 bg-slate-200 rounded-lg">
            <div>
              {hasText(blog.type_of) && (
                <p className="text-zinc-400 text-xs uppercase ml-[2px] notranslate">
                  {blog.type_of}
                </p>
              )}
              {hasText(blog.title) && (
                <h1 className="dark:text-zinc-300 text-zinc-900 font-extrabold w-full tracking-tight text-xl mb-[-10px]">
                  {blog.title}
                </h1>
              )}
            </div>
            <div className="dark:text-zinc-400 text-zinc-500 gap-2 text-sm items-center font-semibold block pt-3">
              <ul className="flex flex-wrap text-xs p-1 ml-[-3px]">
                {(Array.isArray(blog.tag_list) ? blog.tag_list : [])
                  .filter((tag) => hasText(tag))
                  .slice(0, 4)
                  .map((tag) => (
                    <p key={`${blog.id}-${tag}`} className="mr-1">
                      #{tag}
                    </p>
                  ))}
              </ul>
              <div className="flex">
                <p className="items-center flex text-base font-bold">
                  <MdOutlineFavoriteBorder />
                  &thinsp;{blog.public_reactions_count}
                </p>
                &ensp;
                <p className="items-center flex text-base font-bold">
                  <AiOutlineComment />
                  &thinsp;{blog.comments_count}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ));
  return (
    <main>
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3  w-full gap-6 mt-4">
          {searchresult}
        </div>

        <Link href="/blog" className="group float-right mt-5 p-1">
          <div className="flex w-auto items-center gap-2 text-lg">
            <p className="whitespace-nowrap">View all my articles</p>
            <div className="transition-transform duration-200 group-hover:translate-x-2">
              <BsArrowRight />
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default RecentlyBlog;
