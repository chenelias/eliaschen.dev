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
  // Mirrors the real card below: same gradient, height, padding and type
  // scale, so nothing shifts or changes color when the data lands.
  const LoadingSkeleton = (
    <div className="home-card-shadow w-full rounded-xl bg-gradient-to-r from-purple-300 to-purple-400 p-[4px] duration-300 dark:from-purple-700 dark:to-purple-900 lg:h-[190px]">
      <div className="flex h-full flex-col gap-2 rounded-lg bg-slate-200 p-3 dark:bg-zinc-800">
        <div className="text-lg">
          <Skeleton className="rounded-lg" width="70%" />
        </div>
        <div className="text-sm lg:h-[80px]">
          <Skeleton className="rounded-lg" count={3} />
        </div>
        <div className="text-sm">
          <Skeleton className="rounded-lg" width="110px" />
          <Skeleton className="rounded-lg" width="80px" />
        </div>
      </div>
    </div>
  );
  const loadingdisplay = (
    <div className="home-scaffold mt-4 grid w-full  grid-cols-1 gap-6 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <React.Fragment key={i}>{LoadingSkeleton}</React.Fragment>
      ))}
    </div>
  );
  if (loading) return loadingdisplay;
  if (!data || data.length === 0) {
    return (
      <div className="mt-4 rounded-lg border border-black/10 p-4 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">
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
        className="group block cursor-pointer"
        target="_blank"
        href={repoLink}
        aria-label={"github repository " + repoName}
      >
        {/* from-purple-400 to-orange-500 dark:from-purple-500 dark:to-orange-700  */}
        <div className="home-card-shadow home-card-shadow-hover w-full rounded-xl bg-gradient-to-r from-purple-300 to-purple-400 p-[4px] duration-300 hover:scale-[101%] dark:from-purple-700 dark:to-purple-900 lg:h-[190px]">
          <div className="flex h-full cursor-pointer flex-col gap-2 rounded-lg bg-slate-200 p-3 dark:bg-zinc-800">
            <div>
              {hasText(repo.name) && (
                <h1 className="w-full text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-300">
                  {repo.name}
                </h1>
              )}
            </div>
            <div className="lg:h-[80px]">
              {hasText(repo.description) && (
                <p className="line-clamp-3 text-sm">{repo.description}</p>
              )}
            </div>

            <div className="block items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              <div className="flex">
                <p className="flex items-center text-base font-bold">
                  <MdOutlineFavoriteBorder />
                  &thinsp;{repo.stars}
                </p>
                &ensp;
                <p className="flex items-center text-base font-bold">
                  <BiGitRepoForked />
                  &thinsp;{repo.forks}
                </p>
              </div>
              {hasText(repo.language) && (
                <div className="flex items-center gap-2">
                  <div
                    style={{ backgroundColor: repo.languageColor }}
                    className="h-[12px] w-[12px] rounded-full"
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
      <div className="mt-4 grid w-full  grid-cols-1 gap-6 lg:grid-cols-3">
        {searchresult}
      </div>
    </main>
  );
};

export default PinnedRepos;
