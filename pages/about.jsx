import React from "react";
import fs from "fs";
import path from "path";
import Body from "/components/Body.tsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
const About = ({ aboutContent }) => {
  return (
    <Body title="About">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h1 className="font-extrabold text-[3rem] tracking-tight">About Me</h1>
        <div className="mt-5 space-y-4 text-base leading-loose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 className="py-1 text-lg text-purple-300 font-bold tracking-tight">{children}</h2>
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
        <br />
      </motion.div>
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
