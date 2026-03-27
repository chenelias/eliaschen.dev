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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import "../components/SiteTransitions";

function MyApp({ Component, pageProps }) {
  const [isCustomFontReady, setIsCustomFontReady] = useState(false);

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
            <main className="pt-24 md:pt-28 px-[15px] xs:px-[25px] mx-auto max-w-4xl">
              <Component {...pageProps} />
              <Analytics />
              <Footer />
            </main>
          </RouteTransitions>
        </motion.div>
      ) : (
        <main className="pt-24 md:pt-28 px-[15px] xs:px-[25px] mx-auto max-w-4xl">
          <div className="home-scaffold mt-2 min-h-[70vh] space-y-8 pb-8" aria-hidden="true">
            <Skeleton height={58} width={320} />
            <div className="space-y-6">
              <Skeleton height={40} width="100%" />
              <Skeleton height={40} width="95%" />
              <Skeleton height={40} width="98%" />
              <Skeleton height={40} width="92%" />
              <Skeleton height={40} width="96%" />
              <Skeleton height={40} width="90%" />
            </div>
          </div>
        </main>
      )}
    </main>
  );
}

export default MyApp;
