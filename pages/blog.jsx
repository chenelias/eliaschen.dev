import React from "react";
import Body from "/components/Body.tsx";
import Link from "next/link";
import { AiFillTags, AiFillRead, AiOutlineComment } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Blog = () => {
  const [search, setSearch] = React.useState("");
  const [articles, setArticles] = React.useState(null);
  const [load, setLoad] = React.useState(true);
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
  React.useEffect(() => {
    setLoad(true);
    fetch("https://dev.to/api/articles?username=eliaschen", {})
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoad(false);
      });
  }, []);
  var blogdisplay =
    load || !articles
      ? LoadDisplay
      : articles
          .filter(
            (data) =>
              data.title.toUpperCase().includes(search) ||
              data.title.toLowerCase().includes(search) ||
              data.tags.toLowerCase().includes(search) ||
              data.tags.toUpperCase().includes(search) ||
              data.tags.includes(search) ||
              data.title.includes(search)
          )
          .map((data) => (
            <Link
              key={data.id}
              className={`cursor-pointer block`}
              href={data.url}
            >
              <div className="shadow-md shodow-black-/10 dark:shadow-zinc-200/10 hover:shadow-lg dark:hover:shadow-zinc-200/10 hover:shadow-black/10 transform  transition-all w-full w-max-xl p-4 my-4 rounded-lg bg-gradient-to-r dark:bg-zinc-800 bg-slate-200">
                <p className="text-md items-center flex flex-wrap  text-zinc-500">
                  <p className="mr-1">#{data.tag_list[0]}</p>
                  <p className="mr-1">#{data.tag_list[1]}</p>
                  <p className="mr-1">#{data.tag_list[2]}</p>
                  <p className="mr-1">#{data.tag_list[3]}</p>
                </p>
                <p className="font-extrabold text-4xl">{data.title}</p>
                <div className="flex items-center mt-1">
                  <dir className="flex-1"></dir>
                  <div className="flex flex-wrap">
                    <p className="text-xl flex items-center ml-3 ">
                      <p className="text-lg">
                        <MdFavorite />
                      </p>
                      {data.public_reactions_count}
                    </p>
                    <p className="text-xl flex items-center ml-3">
                      <p className="text-lg">
                        <AiOutlineComment />
                      </p>
                      {data.comments_count}
                    </p>

                    <p className="text-xl flex items-center ml-3 whitespace-nowrap">
                      <p className="text-lg">
                        <AiFillRead />
                      </p>
                      &thinsp;
                      {data.reading_time_minutes}&thinsp;min
                    </p>
                    <p className="text-lg flex items-center ml-3 whitespace-nowrap">
                      <p className="text-lg">
                        <BiTimeFive />
                      </p>
                      &thinsp;
                      <p className="">{data.readable_publish_date}</p>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ));
  return (
    <Body title="Blog">
      <div>
        <h1 className="font-extrabold text-6xl tracking-tight">Blog</h1>
        <div class="relative w-full mt-6">
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
              class="h-[25px] w-[25px] mr-2 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
