import "../styles/globals.css";
import Footer from "./Footer";
import Header from "./Header";
import NextNProgress from "nextjs-progressbar";
import "/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import RouteTransitions from "../components/RouteTransitions";
// import SiteTransitions from "../components/SiteTransitions";
import { motion } from "framer-motion";

function MyApp({ Component, pageProps, session }) {
  return (
    <main className="">
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
      <Header />
      {/* <SiteTransitions> */}
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
        transition={{
          // type: "spring",
          // stiffness: 400,
          // damping: 10,
        }}
      >
        <RouteTransitions>
          <main className="pt-20 px-[15px] xs:px-[25px] mx-auto max-w-4xl">
            <SessionProvider session={session}>
              <Component {...pageProps} />
              <Analytics />
            </SessionProvider>
            <Footer />
          </main>
        </RouteTransitions>
        {/* </SiteTransitions> */}
      </motion.div>
    </main>
  );
}

export default MyApp;
