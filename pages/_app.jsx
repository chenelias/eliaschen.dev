import "../styles/globals.css";
import Footer from "./Footer";
import Header from "./Header";
import NextNProgress from "nextjs-progressbar";
import "/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import RouteTransitions from "../components/RouteTransitions";
import SiteTransitions from "../components/SiteTransitions";

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
    </main>
  );
}

export default MyApp;
