"use client";
import { useEffect, useState } from "react";
import RecentlyBlog from "./RecentlyBlog";

const RECENT_BLOGS_API = "https://dev.to/api/articles?username=eliaschen";

export default function FeaturedBlogs() {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [isBlogLoading, setIsBlogLoading] = useState(true);
  const featuredBlogs = recentBlogs.slice(0, 3);

  useEffect(() => {
    const controller = new AbortController();

    const loadRecentBlogs = async () => {
      try {
        const blogRes = await fetch(RECENT_BLOGS_API, { signal: controller.signal });
        if (!blogRes.ok || controller.signal.aborted) return;
        const blogData = await blogRes.json();
        if (!controller.signal.aborted) {
          setRecentBlogs(Array.isArray(blogData) ? blogData : []);
        }
      } catch {
        if (!controller.signal.aborted) {
          setRecentBlogs([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsBlogLoading(false);
        }
      }
    };

    loadRecentBlogs();

    return () => controller.abort();
  }, []);

  return (
    <div className="mt-[40px] mb-[20px]">
      <h1 className="tracking-tighter text-2xl mb-3 font-extrabold">
        Blogs
      </h1>
      <RecentlyBlog data={featuredBlogs} loading={isBlogLoading} />
    </div>
  );
}
