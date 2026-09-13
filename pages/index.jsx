import fs from "fs";
import path from "path";
import Image from "next/image";
import dynamic from "next/dynamic";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
          <div
            key={i}
            className="lg:h-[250px] bg-gradient-to-r from-purple-300 to-purple-400 dark:from-purple-700 dark:to-purple-900 w-full p-[4px] rounded-xl animate-pulse"
          >
            <div className="h-full dark:bg-zinc-800 bg-slate-200 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  ),
});

export default function HomePage({ aboutContent }) {
  return (
    <main>
      <Head>
        <title>EliasChen - Developer</title>
      </Head>
      <div className="xs:ml-0 ml-2">
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center my-5 ">
          <div className="flex flex-col pr-8">
            <h1 className="font-black text-4xl tracking-tight notranslate">
              Elias Chen
            </h1>
            <h2 className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-1 mt-[-0.1px]">
              YI-KAI CHEN&ensp;//&ensp;Developer
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A high schooler in Taiwan, obsessed with cats.
            </p>
          </div>
          <div className="flex-1"></div>
          <div className="w-[130px] sm:w-[140px] relative my-[-15px] sm:my-0 sm:mx-0 mx-[-10px] ">
            <Image
              placeholder="blur"
              src={require("/public/eliaschen.jpg")}
              alt="eliaschen"
              className="w-auto rounded-full"
            />
          </div>
        </div>
        <div className="mt-6">
          <div className="space-y-4 text-base leading-loose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="py-1 text-lg text-purple-300 font-bold tracking-tight">
                    {children}
                  </h2>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    {children}
                  </a>
                ),
                p: ({ children }) => <p>{children}</p>,
                ul: ({ children }) => <ul className="space-y-2">{children}</ul>,
                li: ({ children }) => (
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true" className="font-semibold">
                      &gt;
                    </span>
                    <span>{children}</span>
                  </li>
                ),
              }}
            >
              {aboutContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <FeaturedProjects />
    </main>
  );
}

export const getStaticProps = async () => {
  const aboutPath = path.join(process.cwd(), "components", "data", "about.md");
  const aboutContent = fs.readFileSync(aboutPath, "utf8");

  return {
    props: {
      aboutContent,
    },
  };
};
