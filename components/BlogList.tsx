"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillRead, AiOutlineComment } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { parseDevToArticles, type DevToArticle } from "./data/api";

const hasText = (value: string | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

export default function BlogList() {
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadArticles = async () => {
      try {
        const res = await fetch(
          "https://dev.to/api/articles?username=eliaschen",
          {
            signal: controller.signal,
          },
        );
        if (!res.ok || controller.signal.aborted) return;
        const data: unknown = await res.json();
        if (!controller.signal.aborted) {
          setArticles(parseDevToArticles(data));
        }
      } catch {
        if (!controller.signal.aborted) {
          setArticles([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadArticles();
    return () => controller.abort();
  }, []);

  const LoadDisplay = (
    <div className="flex flex-col gap-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
        >
          <Skeleton className="rounded-md" height="20px" width="70%" />
          <Skeleton className="mt-2 rounded-md" height="14px" count={2} />
        </div>
      ))}
    </div>
  );

  const query = search.trim().toLowerCase();
  const filteredArticles = articles.filter(
    (article) =>
      query === "" ||
      article.title.toLowerCase().includes(query) ||
      (article.tags ?? "").toLowerCase().includes(query),
  );

  const stat = (icon: React.ReactNode, label: React.ReactNode) => (
    <p className="!m-0 flex items-center gap-1">
      {icon}
      {label}
    </p>
  );

  return (
    <div>
      <div className="relative mt-6">
        <FiSearch
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
        />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search articles"
          type="text"
          placeholder="Search articles"
          className="w-full rounded-lg border border-zinc-200 bg-transparent px-9 py-2 text-sm text-zinc-900 transition duration-200 placeholder:text-zinc-400 focus:border-purple-400 focus:outline-none dark:border-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:border-purple-500"
        />
        {search !== "" && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setSearch("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-400 transition duration-200 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200"
          >
            <CgClose className="size-4" />
          </button>
        )}
      </div>

      <div className="mt-6">
        {loading ? (
          LoadDisplay
        ) : filteredArticles.length === 0 ? (
          <p className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
            No articles found.
          </p>
        ) : (
          <ul className="flex flex-col gap-3 !p-0">
            {filteredArticles.map((article) => (
              <li key={article.id} className="list-none">
                <Link
                  className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  href={article.url}
                  aria-label={"link of article " + article.title}
                >
                  <article className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-3 transition duration-200 group-hover:-translate-y-[0.15rem] group-hover:shadow-lg dark:border-zinc-800">
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="!m-0 font-bold leading-snug tracking-tight text-zinc-900 dark:text-zinc-200">
                        {article.title}
                      </h2>
                      {hasText(article.readable_publish_date) && (
                        <p className="!m-0 whitespace-nowrap font-code text-xs text-zinc-500 dark:text-zinc-400">
                          {article.readable_publish_date}
                        </p>
                      )}
                    </div>

                    {article.tag_list.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {article.tag_list
                          .filter((tag) => hasText(tag))
                          .slice(0, 4)
                          .map((tag) => (
                            <span
                              key={`${article.id}-${tag}`}
                              className="rounded-md bg-purple-200 px-1 py-[2px] text-[10px] font-bold text-purple-900 dark:bg-purple-900/50 dark:text-purple-200"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      {stat(
                        <MdOutlineFavoriteBorder />,
                        article.public_reactions_count,
                      )}
                      {stat(<AiOutlineComment />, article.comments_count)}
                      {typeof article.reading_time_minutes === "number" &&
                        stat(
                          <AiFillRead />,
                          `${article.reading_time_minutes} min`,
                        )}
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
