import Body from "/components/Body.tsx";
import { MediaLinks } from "/components/data/MediaLinks";
const Link = () => {
  return (
    <Body title="Links">
      <h1 className="font-extrabold text-[3rem] tracking-tight">Links</h1>
      <div class="mt-8">
        {MediaLinks.map((links) => (
          <a
            key={links.url || links.name}
            href={links.url}
            aria-label={"Link of eliaschen's " + links.name}
            target="_blank"
            class="dark:bg-[#1d1d20] hover:-translate-y-[0.2rem] duration-150 flex bg-[#e2e8f0] rounded-lg shadow-md cursor-pointer items-center my-4 p-2 px-3"
          >
            <p class="font-bold !m-0">{links.name}&thinsp;</p>
            <div class="flex-1" />
            <p class="font-code">
              &thinsp;@<span class="font-code">{links.username}</span>
            </p>
          </a>
        ))}
      </div>
    </Body>
  );
};
export default Link;
