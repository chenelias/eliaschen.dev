import dynamic from "next/dynamic";
import Body from "/components/Body.tsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogList = dynamic(() => import("../components/BlogList"), {
  ssr: false,
  loading: () => (
    <div className="mt-6 flex flex-col gap-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
        >
          <Skeleton className="rounded-md" height="20px" width="70%" />
          <Skeleton className="mt-2 rounded-md" height="14px" count={2} />
        </div>
      ))}
    </div>
  ),
});

const Blog = () => {
  return (
    <Body title="Blog">
      <div>
        <h1 className="text-[3rem] font-extrabold tracking-tight">Blog</h1>
        <BlogList />
      </div>
    </Body>
  );
};

export default Blog;
