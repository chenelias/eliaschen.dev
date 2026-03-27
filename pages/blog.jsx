import React from "react";
import Body from "/components/Body.tsx";
import Link from "next/link";
import { AiFillRead, AiOutlineComment } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const hasText = (value) => typeof value === "string" && value.trim().length > 0;

const Blog = ({ initialArticles }) => {
  const [search, setSearch] = React.useState("");
  const [articles, setArticles] = React.useState(initialArticles || []);
  const [load, setLoad] = React.useState(false);
  const [focusSearch, setFocusSearch] = React.useState();
  const [resultnone, setresultnone] = React.useState(false);
  const LoadDisplay = (
    <div className="p-5 ">
      <Skeleton
        height="122px"
        count="3"
        className="w-full my-2 rounded-lg"
        baseColor="#202020"
        borderRadius="10px"
        highlightColor="#666"
      />
    </div>
  );
  function InputonChange(x) {
    setSearch(x);
    setFocusSearch(x != "" ? true : false);
  }
  function clearicon() {
    setSearch("");
    document.querySelector(".SearchInput").value = "";
  }
  var blogdisplay =
    load || !articles
      ? LoadDisplay
      : articles
          .filter(
            (data) =>
              data.title.toUpperCase().includes(search) ||
              data.title.toLowerCase().includes(search) ||
              (data.tags && data.tags.toLowerCase().includes(search)) ||
              (data.tags && data.tags.toUpperCase().includes(search)) ||
              (data.tags && data.tags.includes(search)) ||
              data.title.includes(search)
          )
          .map((data) => (
            <Link
              key={data.id}
              aria-label={"link of article " + data.title}
              className="group cursor-pointer block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
              href={data.url}
            >
              <article className="shadow-md shodow-black-/10 dark:shadow-zinc-200/10 hover:shadow-lg dark:hover:shadow-zinc-200/10 hover:shadow-black/10 transform transition-all w-full w-max-xl p-4 my-4 rounded-lg dark:bg-zinc-800 bg-slate-200">
                <div>
                  {hasText(data.title) && (
                    <h2 className="dark:text-zinc-300 text-zinc-900 font-extrabold w-full tracking-tight text-3xl mb-[-10px]">
                      {data.title}
                    </h2>
                  )}
                </div>

                <div className="dark:text-zinc-400 text-zinc-500 gap-2 text-base items-center font-semibold block mt-3">
                  <ul className="flex flex-wrap text-xs p-1 ml-[-3px]">
                    {(Array.isArray(data.tag_list) ? data.tag_list : [])
                      .filter((tag) => hasText(tag))
                      .slice(0, 4)
                      .map((tag) => (
                        <span key={`${data.id}-${tag}`} className="mr-1">
                          #{tag}
                        </span>
                      ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <p className="items-center flex text-lg font-bold">
                      <MdOutlineFavoriteBorder />
                      &thinsp;{data.public_reactions_count}
                    </p>
                    <p className="items-center flex text-lg font-bold">
                      <AiOutlineComment />
                      &thinsp;{data.comments_count}
                    </p>
                    {typeof data.reading_time_minutes === "number" && (
                      <p className="items-center flex text-lg font-bold whitespace-nowrap">
                        <AiFillRead />
                        &thinsp;{data.reading_time_minutes}&thinsp;min
                      </p>
                    )}
                    {hasText(data.readable_publish_date) && (
                      <p className="items-center flex text-lg font-bold whitespace-nowrap">
                        <BiTimeFive />
                        &thinsp;{data.readable_publish_date}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ));
  return (
    <Body title="Blog">
      <div>
        <h1 className="about-handwrite font-extrabold text-6xl tracking-tight">Blog</h1>
        <div className="relative w-full mt-6">
          <input
            onChange={(x) => InputonChange(x.target.value)}
            aria-label="Search articles"
            type="text"
            placeholder="Search articles"
            className="SearchInput block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
          />
          <div className=" absolute right-0 h-[41px] top-0 py-[8px] rounded-md flex items-center">
            {search !== "" ? (
              <button
                aria-label="delete input box value"
                className="mr-[4px] text-red-600 p-[1px] text-[27px] dark:hover:bg-slate-700 rounded-md hover:bg-slate-200 transition-all"
                onClick={() => clearicon()}
              >
                <span className="">
                  <HiOutlineTrash />
                </span>
              </button>
            ) : (
              ""
            )}
            <svg
              className="h-[25px] w-[25px] mr-2 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="mt-10">
          {blogdisplay.length === 0 ? (
            <h1 className=" text-2xl font-bold text-center">
              No articles found.
            </h1>
          ) : (
            ""
          )}
          {blogdisplay}
        </div>
      </div>
    </Body>
  );
};

export default Blog;

export const getServerSideProps = async () => {
  const response = await fetch("https://dev.to/api/articles?username=eliaschen");
  const initialArticles = response.ok ? await response.json() : [];

  return {
    props: {
      initialArticles: Array.isArray(initialArticles) ? initialArticles : [],
    },
  };
};
