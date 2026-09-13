import Link from "next/link";
import { MediaLinks } from "/components/data/MediaLinks";

export default function Footer() {
  return (
    <footer>
      <div className="mb-[20px] mt-[50px] block minxs:flex max-w-full">
        <p className="text-sm notranslate">
          &copy;&ensp;
          <span>{new Date().getFullYear()}</span>
          <span className="mx-1 inline-block">EliasChen.</span>
          <span>All rights reserved.</span>
        </p>
        <div className="flex-1"></div>
        <div className="text-sm mt-3 minxs:mt-0 flex items-center gap-4">
          {MediaLinks.map(({ icon: Icon, ...links }) => (
            <Link
              key={links.url}
              aria-label={
                "Link of eliaschen's " + links.name + " (open in new tab)"
              }
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition items-center inline-flex gap-1.5"
              target="_blank"
              href={links.url}
            >
              <Icon className="w-[1.15rem] h-[1.15rem]" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
