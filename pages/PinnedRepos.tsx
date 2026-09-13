import React from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BiGitRepoForked } from "react-icons/bi";
import type { PinnedRepo } from "../components/data/api";

const hasText = (value: string | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

interface PinnedReposProps {
  data?: PinnedRepo[];
  loading?: boolean;
}

const PinnedRepos = ({ data = [], loading = false }: PinnedReposProps) => {
  const LoadingSkeleton = (
    <div className="lg:h-[190px] bg-gradient-to-r from-pink-300 to-pink-400 dark:from-pink-700 dark:to-pink-800 w-full p-[4px] rounded-xl home-card-shadow duration-300">
      <div className="flex flex-col cursor-pointer gap-2 p-3 dark:bg-zinc-800 bg-slate-200 rounded-lg h-full">
        <div>
          <h1 className="dark:text-zinc-300 text-zinc-900 font-bold w-full tracking-tight text-lg">
            <Skeleton className="rounded-lg" count={1} />
          </h1>
        </div>
        <div className="lg:h-[80px]">
          <p className="line-clamp-3 text-sm">
            {" "}
            <Skeleton className="rounded-lg" count={2} />
          </p>
        </div>
        <div className="dark:text-zinc-400 text-zinc-500 gap-2 text-sm items-center font-semibold block">
          <Skeleton className="rounded-lg" width="130px" count={1} />
          <Skeleton className="rounded-lg" count={1} width="100px" />
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
      <div className="mt-4 rounded-lg border border-black/10 dark:border-white/10 p-4 text-sm text-zinc-500 dark:text-zinc-400">
        No featured projects available right now.
      </div>
    );
  }
  var searchresult = data.map((repo) => {
    const repoName = `${repo.author}/${repo.name}`;
    const repoLink = `https://github.com/${repoName}`;

    return (
      <Link
        key={repoName}
        className="group cursor-pointer block"
        target="_blank"
        href={repoLink}
        aria-label={"github repository " + repoName}
      >
        {/* from-purple-400 to-orange-500 dark:from-purple-500 dark:to-orange-700  */}
        <div className="lg:h-[190px] bg-gradient-to-r from-purple-300 to-purple-400 dark:from-purple-700 dark:to-purple-900 w-full p-[4px] rounded-xl home-card-shadow home-card-shadow-hover hover:scale-[101%] duration-300">
          <div className="flex flex-col cursor-pointer gap-2 p-3 dark:bg-zinc-800 bg-slate-200 rounded-lg h-full">
            <div>
              {hasText(repo.name) && (
                <h1 className="dark:text-zinc-300 text-zinc-900 font-bold w-full tracking-tight text-lg">
                  {repo.name}
                </h1>
              )}
            </div>
            <div className="lg:h-[80px]">
              {hasText(repo.description) && (
                <p className="line-clamp-3 text-sm">{repo.description}</p>
              )}
            </div>

            <div className="dark:text-zinc-400 text-zinc-500 gap-2 text-sm items-center font-semibold block">
              <div className="flex">
                <p className="items-center flex text-base font-bold">
                  <MdOutlineFavoriteBorder />
                  &thinsp;{repo.stars}
                </p>
                &ensp;
                <p className="items-center flex text-base font-bold">
                  <BiGitRepoForked />
                  &thinsp;{repo.forks}
                </p>
              </div>
              {hasText(repo.language) && (
                <div className="flex gap-2 items-center">
                  <div
                    style={{ backgroundColor: repo.languageColor }}
                    className="rounded-full h-[12px] w-[12px] border-1"
                  ></div>
                  <p className="inline-flex items-center">{repo.language}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-3  w-full gap-6 mt-4">
        {searchresult}
      </div>
    </main>
  );
};

export default PinnedRepos;
