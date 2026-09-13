import Link from "next/link";
import { MediaLinks } from "/components/data/MediaLinks";

export default function Footer() {
  return (
    <footer>
      <div className="mb-[20px] mt-[50px] block max-w-full minxs:flex">
        <p className="notranslate text-sm">
          &copy;&ensp;
          <span>{new Date().getFullYear()}</span>
          <span className="mx-1 inline-block">EliasChen.</span>
          <span>All rights reserved.</span>
        </p>
        <div className="flex-1"></div>
        <div className="mt-3 flex items-center gap-4 text-sm minxs:mt-0">
          {MediaLinks.map(({ icon: Icon, ...links }) => (
            <Link
              key={links.url}
              aria-label={
                "Link of eliaschen's " + links.name + " (open in new tab)"
              }
              className="inline-flex items-center gap-1.5 text-gray-500 transition hover:text-gray-900 dark:hover:text-white"
              target="_blank"
              href={links.url}
            >
              <Icon className="h-[1.15rem] w-[1.15rem]" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
