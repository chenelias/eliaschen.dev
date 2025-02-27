import React from "react";
import Body from "/components/Body.tsx";
import { MediaLinks } from "/components/data/MediaLinks";
const Link = () => {
  return (
    <Body title="Links">
      <h1 className="font-extrabold text-6xl tracking-tight">Links</h1>
      <div class="mt-8">
        {MediaLinks.map((links) => (
          <a
            href={links.url}
            aria-label={"Link of eliaschen's " + links.name}
            target="_blank"
            class="dark:bg-[#1d1d20] hover:-translate-y-1 duration-150 flex bg-[#e2e8f0] rounded-lg shadow-lg cursor-pointer  pl-3 items-center my-4 p-1"
          >
            <p class="font-bold !m-0">{links.name}&thinsp;</p>
            {/* <p class="text-[#797979]">//</p> */}
            <div class="flex-1" />
            <p class="font-code">
              &thinsp;@<span class="font-code">{links.username}</span>
            </p>
            {/* <div class="pr-2 items-center"> */}
            {/*   <IonIcon className=" !text-[19px] items-center mt-[2px]" name={links.icon} /> */}
            {/* </div> */}
          </a>
        ))}
      </div>
    </Body>
  );
};
export default Link;
