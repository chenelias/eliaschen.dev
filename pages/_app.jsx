import "../styles/globals.css";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Script from "next/script";
import NextNProgress from "nextjs-progressbar";
import "/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import RouteTransitions from "../components/RouteTransitions";
import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
// import "../components/SiteTransitions";

const SITE_URL = "https://www.eliaschen.dev";
const DEFAULT_OG_IMAGE = "/eliaschen-png-500x500.png";

const SEO_BY_PATH = {
  "/": {
    title: "EliasChen - Developer",
    description:
      "Elias Chen's personal website featuring projects, blog posts, music picks, and development journey.",
  },
  "/about": {
    title: "About - EliasChen",
    description:
      "Learn more about Elias Chen, background, interests, and what drives the work behind this site.",
  },
  "/blog": {
    title: "Blog - EliasChen",
    description:
      "Read development notes, ideas, and technical articles written by Elias Chen.",
  },
  "/links": {
    title: "Links - EliasChen",
    description:
      "Find Elias Chen across platforms, social links, and developer profiles.",
  },
  "/music": {
    title: "Music - EliasChen",
    description:
      "A curated playlist of favorite tracks and music picks by Elias Chen.",
  },
  "/404": {
    title: "404 - EliasChen",
    description: "The page you are looking for could not be found.",
  },
  "/privacypolicy": {
    title: "Privacy & Policy - EliasChen",
    description:
      "Privacy policy and data handling information for eliaschen.dev.",
  },
  "/Footer": {
    title: "Footer - EliasChen",
    description: "Footer component preview route for eliaschen.dev.",
  },
  "/Header": {
    title: "Header - EliasChen",
    description: "Header component preview route for eliaschen.dev.",
  },
  "/PinnedRepos": {
    title: "Pinned Repos - EliasChen",
    description: "Pinned repositories showcase route for eliaschen.dev.",
  },
  "/RecentlyBlog": {
    title: "Recently Blog - EliasChen",
    description: "Recent blog card showcase route for eliaschen.dev.",
  },
};

function MyApp({ Component, pageProps }) {
  const [isCustomFontReady, setIsCustomFontReady] = useState(false);
  const router = useRouter();

  const currentPath = router.pathname || "/";
  const seo = SEO_BY_PATH[currentPath] || {
    title: "EliasChen - Developer",
    description:
      "Elias Chen's personal site with projects, blog posts, and portfolio content.",
  };
  const canonicalUrl = `${SITE_URL}${currentPath === "/" ? "" : currentPath}`;
  const ogImageUrl = `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  useEffect(() => {
    let isMounted = true;

    const markReady = () => {
      if (isMounted) {
        setIsCustomFontReady(true);
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
        await document.fonts.load('1em "Chenyuluoyan"', "Elias Chen");
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
    <main className="">
      <Head>
        <title key="title">{seo.title}</title>
        <meta key="description" name="description" content={seo.description} />
        <link key="canonical" rel="canonical" href={canonicalUrl} />

        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:site_name" property="og:site_name" content="EliasChen" />
        <meta key="og:title" property="og:title" content={seo.title} />
        <meta key="og:description" property="og:description" content={seo.description} />
        <meta key="og:url" property="og:url" content={canonicalUrl} />
        <meta key="og:image" property="og:image" content={ogImageUrl} />

        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content={seo.title} />
        <meta key="twitter:description" name="twitter:description" content={seo.description} />
        <meta key="twitter:image" name="twitter:image" content={ogImageUrl} />
      </Head>
      <Script
        src="https://www.eliaschen.dev/theme.js"
        strategy="beforeInteractive"
      />
      <NextNProgress
        options={{
          showSpinner: false,
        }}
        color="#a855f7"
        startPosition={0.1}
        stopDelayMs={100}
        height={3}
        showOnShallow={false}
      />
      {isCustomFontReady ? (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{
            // type: "spring",
            // stiffness: 400,
            // damping: 10,
            duration: 0.5,
          }}
        >
          <Header />
          {/* <SiteTransitions> */}
          <RouteTransitions>
            <main className="pt-24 md:pt-28 px-[20px] xs:px-[25px] mx-auto max-w-4xl">
              <Component {...pageProps} />
              <Analytics />
              <Footer />
            </main>
          </RouteTransitions>
        </motion.div>
      ) : (
        <main className="pt-24 md:pt-28 px-[20px] xs:px-[25px] mx-auto max-w-4xl" />
      )}
    </main>
  );
}

export default MyApp;
