import dynamic from "next/dynamic";
import Body from "/components/Body.tsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogList = dynamic(() => import("../components/BlogList"), {
  ssr: false,
  loading: () => (
    <div className="p-5">
      <Skeleton
        height="122px"
        count="3"
        className="w-full my-2 rounded-lg"
        borderRadius="10px"
      />
    </div>
  ),
});

const Blog = () => {
  return (
    <Body title="Blog">
      <div>
        <h1 className="font-extrabold text-[3rem] tracking-tight">Blog</h1>
        <BlogList />
      </div>
    </Body>
  );
};

export default Blog;
