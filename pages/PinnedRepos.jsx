import React from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BiGitRepoForked } from "react-icons/bi";

const hasText = (value) => typeof value === "string" && value.trim().length > 0;

const PinnedRepos = ({ data = [] }) => {
  const LoadingSkeleton = (
    <div className="lg:h-[280px] bg-gradient-to-r from-pink-300 to-pink-400 dark:from-pink-700 dark:to-pink-800 w-full p-[4px] rounded-xl home-card-shadow duration-300">
      <div className="flex flex-col cursor-pointer gap-4 p-4 dark:bg-zinc-800 bg-slate-200 rounded-lg h-full">
        <div>
          <h1 className="dark:text-zinc-300 text-zinc-900 font-bold w-full tracking-tight text-2xl">
            <Skeleton
              className="rounded-lg"
              baseColor="#202020"
              count="1"
              highlightColor="#666"
            />
          </h1>
        </div>
        <div className=" lg:h-[140px]">
          <p className="line-clamp-5 ">
            {" "}
            <Skeleton
              className="rounded-lg"
              count="3"
              baseColor="#202020"
              highlightColor="#666"
            />
          </p>
        </div>
        <div className="dark:text-zinc-400 text-zinc-500 gap-2 text-base items-center font-semibold block">
          <Skeleton
            className="rounded-lg"
            baseColor="#202020"
            width="130px"
            count="1"
            highlightColor="#666"
          />
          <Skeleton
            className="rounded-lg"
            baseColor="#202020"
            count="1"
            width="100px"
            highlightColor="#666"
          />
        </div>
      </div>
    </div>
  );
  const loadingdisplay = (
    <div className="home-scaffold grid grid-cols-1 lg:grid-cols-3  w-full gap-6 mt-4">
      {LoadingSkeleton}
      {LoadingSkeleton}
      {LoadingSkeleton}
      {LoadingSkeleton}
      {LoadingSkeleton}
      {LoadingSkeleton}
    </div>
  );
  if (!data || data.length === 0) return loadingdisplay;
  var searchresult = data.map((repo) => (
    <Link
      key={repo.link || repo.repo}
      className="group cursor-pointer block"
      target="_blank"
      href={repo.link}
      aria-label={"github repository " + repo.repo}
    >
      {/* from-purple-400 to-orange-500 dark:from-purple-500 dark:to-orange-700  */}
      <div className="lg:h-[250px] bg-gradient-to-r from-purple-300 to-purple-400 dark:from-purple-700 dark:to-purple-900 w-full p-[4px] rounded-xl home-card-shadow home-card-shadow-hover hover:scale-[101%] duration-300">
        <div className="flex flex-col cursor-pointer gap-4 p-4 dark:bg-zinc-800 bg-slate-200 rounded-lg h-full">
          <div>
            {hasText(repo.repo) && (
              <h1 className="dark:text-zinc-300 text-zinc-900 font-bold w-full tracking-tight text-xl">
                {repo.repo}
              </h1>
            )}
          </div>
          <div className=" lg:h-[130px]">
            {hasText(repo.description) && (
              <p className="line-clamp-4 ">{repo.description}</p>
            )}
          </div>

          <div className="dark:text-zinc-400 text-zinc-500 gap-2 text-base items-center font-semibold block">
            <div className="flex">
              <p className="items-center flex text-lg font-bold">
                <MdOutlineFavoriteBorder />
                &thinsp;{repo.stars}
              </p>
              &ensp;
              <p className="items-center flex text-lg font-bold">
                <BiGitRepoForked />
                &thinsp;{repo.forks}
              </p>
            </div>
            {hasText(repo.language) && (
              <div className="flex gap-2 items-center">
                <div
                  style={{ backgroundColor: repo.languageColor }}
                  className="rounded-full h-[15px] w-[15px] border-1"
                ></div>
                <p className="inline-flex items-center">{repo.language}</p>
              </div>
            )}
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
      </div>
      <div>&thinsp;</div>
    </main>
  );
};

export default PinnedRepos;
