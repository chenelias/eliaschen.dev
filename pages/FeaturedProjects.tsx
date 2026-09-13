"use client";
import { useEffect, useState } from "react";
import PinnedRepos from "./PinnedRepos";
import { parsePinnedRepos, type PinnedRepo } from "../components/data/api";

const PINNED_REPOS_API = "https://pinned.berrysauce.dev/get/chenelias";

export default function FeaturedProjects() {
  const [pinnedRepos, setPinnedRepos] = useState<PinnedRepo[]>([]);
  const [isPinnedLoading, setIsPinnedLoading] = useState(true);
  const featuredRepos = pinnedRepos.slice(0, 3);

  useEffect(() => {
    const controller = new AbortController();

    const loadPinnedRepos = async () => {
      try {
        const pinnedRes = await fetch(PINNED_REPOS_API, {
          signal: controller.signal,
        });
        if (!pinnedRes.ok || controller.signal.aborted) return;
        const pinnedData: unknown = await pinnedRes.json();
        if (!controller.signal.aborted) {
          setPinnedRepos(parsePinnedRepos(pinnedData));
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
