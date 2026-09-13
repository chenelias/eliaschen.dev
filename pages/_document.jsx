import { Html, Main, Head, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" style={{ scrollBehavior: "smooth" }}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&family=Source+Code+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="shortcut icon"
          href="https://www.eliaschen.dev/favicon.ico"
        />
        <meta
          name="keywords"
          content="eliaschen, EliasChen, Elias Chen, elias chen, elias, chen, font-end developer"
        />
        <meta name="author" content="Elias Chen" />
        {/* og:/twitter: tags live in _app.jsx, per route. */}
      </Head>
      <body className="dark:bg-[#111111] bg-[#f9fafb] dark:text-white duration-75">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
