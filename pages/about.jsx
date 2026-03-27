import React, { useEffect, useState } from "react";
import fs from "fs";
import path from "path";
import Body from "/components/Body.tsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const About = ({ aboutContent }) => {
  const [isAboutFontReady, setIsAboutFontReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const markReady = () => {
      if (isMounted) {
        setIsAboutFontReady(true);
      }
    };

    if (typeof document === "undefined" || !document.fonts) {
      markReady();
      return () => {
        isMounted = false;
      };
    }

    const ensureFontLoaded = async () => {
      try {
        await document.fonts.load('1em "Chenyuluoyan"', "About Me");
        await document.fonts.ready;
      } finally {
        markReady();
      }
    };

    ensureFontLoaded();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Body title="About">
      {isAboutFontReady ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h1 className="about-handwrite font-extrabold text-6xl tracking-tight">About Me</h1>
          <div className="about-handwrite about-handwrite-content mt-5 space-y-4 text-lg leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="py-1 text-2xl text-purple-300 font-bold tracking-tight">{children}</h2>
                ),
                p: ({ children }) => <p>{children}</p>,
                ul: ({ children }) => <ul className="space-y-2">{children}</ul>,
                li: ({ children }) => (
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-[1px] font-semibold">
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
          <br />
        </motion.div>
      ) : (
        <div className="home-scaffold mt-2 min-h-[70vh] space-y-10 pb-8" aria-hidden="true">
          <Skeleton height={58} width={320} />
          <div className="space-y-6">
            <Skeleton height={40} width="100%" />
            <Skeleton height={40} width="95%" />
            <Skeleton height={40} width="98%" />
            <Skeleton height={40} width="92%" />
            <Skeleton height={40} width="96%" />
            <Skeleton height={40} width="90%" />
            <Skeleton height={40} width="94%" />
            <Skeleton height={40} width="88%" />
          </div>
        </div>
      )}
    </Body>
  );
};

export const getStaticProps = async () => {
  const aboutPath = path.join(process.cwd(), "components", "data", "about.md");
  const aboutContent = fs.readFileSync(aboutPath, "utf8");

  return {
    props: {
      aboutContent,
    },
  };
};

export default About;
