import React from "react";
import Body from "/components/Body";

export default function unavailable() {
  return (
    <Body title="Unavailable for now">
      <h1 className="font-extrabold text-3xl tracking-tight">
        <span className="underline underline-offset-2 decoration-wavy text-purple-500">
          Guesstbook
        </span>{" "}
        is unavailable for now... QQ
      </h1>
      <p className="mt-4">
        Supabase has paused my project, so I'm just gonna self-host my database
        from now on...
      </p>
    </Body>
  );
}
