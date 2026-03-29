"use client";
import { useEffect, useState } from "react";
import PinnedRepos from "./PinnedRepos";

const PINNED_REPOS_API =
  "https://gh-pinned-repos-tsj7ta5xfhep.deno.dev/?username=chenelias";

export default function FeaturedProjects() {
  const [pinnedRepos, setPinnedRepos] = useState([]);
  const [isPinnedLoading, setIsPinnedLoading] = useState(true);
  const featuredRepos = pinnedRepos.slice(0, 3);

  useEffect(() => {
    const controller = new AbortController();

    const loadPinnedRepos = async () => {
      try {
        const pinnedRes = await fetch(PINNED_REPOS_API, { signal: controller.signal });
        if (!pinnedRes.ok || controller.signal.aborted) return;
        const pinnedData = await pinnedRes.json();
        if (!controller.signal.aborted) {
          setPinnedRepos(Array.isArray(pinnedData) ? pinnedData : []);
        }
      } catch {
        if (!controller.signal.aborted) {
          setPinnedRepos([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsPinnedLoading(false);
        }
      }
    };

    loadPinnedRepos();

    return () => controller.abort();
  }, []);

  return (
    <div className="mt-[50px]">
      <h1 className="tracking-tighter text-2xl mb-3 font-extrabold">
        Featured Projects
      </h1>
      <PinnedRepos data={featuredRepos} loading={isPinnedLoading} />
    </div>
  );
}
