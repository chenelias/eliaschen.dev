import fs from "fs";
import path from "path";
import Image from "next/image";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ExperienceCard from "../components/ExperienceCard";
import { Experiences } from "../components/data/experiences";

const FeaturedProjects = dynamic(() => import("./FeaturedProjects"), {
  ssr: false,
  loading: () => (
    <div>
      <h1 className="mb-3 text-2xl font-extrabold tracking-tighter">
        Featured Projects
      </h1>
      <div className="mt-4 grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-full animate-pulse rounded-xl bg-gradient-to-r from-purple-300 to-purple-400 p-[4px] dark:from-purple-700 dark:to-purple-900 lg:h-[190px]"
          >
            <div className="h-full rounded-lg bg-slate-200 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  ),
});

export default function HomePage({ aboutContent }) {
  return (
    <main>
      <div className="ml-2 xs:ml-0">
        <div className="mt-5 flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center">
          <div className="flex flex-col">
            <h1 className="notranslate text-4xl font-black tracking-tight">
              Elias Chen
            </h1>
            <h2 className="mb-1 mt-[-0.1px] text-sm text-gray-500 dark:text-gray-400 md:text-base">
              YI-KAI CHEN&ensp;//&ensp;Developer
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A high schooler in Taiwan, obsessed with cats.
            </p>
          </div>
          <div className="relative w-[130px] shrink-0 overflow-hidden rounded-full sm:ml-auto sm:w-[140px]">
            {/* Out-of-focus copy, scaled up so the blur never pulls the
                image's own edge inward and leaves a gap. Decorative only. */}
            <Image
              src={require("/public/eliaschen.jpg")}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full scale-105 object-cover blur-sm"
            />
            <Image
              placeholder="blur"
              src={require("/public/eliaschen.jpg")}
              alt="eliaschen"
              className="avatar-focus relative w-auto"
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-10">
          <div className="text-base leading-loose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="mt-10 py-1 text-lg font-bold tracking-tight text-purple-300 first:mt-0">
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
                p: ({ children }) => <p className="mt-1">{children}</p>,
                ul: ({ children }) => (
                  <ul className="mt-1 space-y-2">{children}</ul>
                ),
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

          <FeaturedProjects />

          <div>
            <h2 className="py-1 text-lg font-bold tracking-tight text-purple-300">
              Experiences
            </h2>
            <ul className="mt-3 flex flex-col gap-3">
              {Experiences.map((experience) => (
                <ExperienceCard key={experience.name} {...experience} />
              ))}
            </ul>
          </div>
        </div>
      </div>
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
