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
      <h1 className="tracking-tighter text-2xl mb-3 font-extrabold">
        Featured Projects
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-6 mt-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="lg:h-[190px] bg-gradient-to-r from-purple-300 to-purple-400 dark:from-purple-700 dark:to-purple-900 w-full p-[4px] rounded-xl animate-pulse"
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
      <div className="xs:ml-0 ml-2">
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-5 mt-5">
          <div className="flex flex-col">
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
          <div className="w-[130px] sm:w-[140px] shrink-0 sm:ml-auto relative overflow-hidden rounded-full">
            {/* Out-of-focus copy, scaled up so the blur never pulls the
                image's own edge inward and leaves a gap. Decorative only. */}
            <Image
              src={require("/public/eliaschen.jpg")}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover scale-105 blur-[4px]"
            />
            <Image
              placeholder="blur"
              src={require("/public/eliaschen.jpg")}
              alt="eliaschen"
              className="relative w-auto avatar-focus"
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-10">
          <div className="text-base leading-loose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="mt-10 first:mt-0 py-1 text-lg text-purple-300 font-bold tracking-tight">
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
            <h2 className="py-1 text-lg text-purple-300 font-bold tracking-tight">
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
