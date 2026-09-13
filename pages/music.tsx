import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Body from "../components/Body";

const MusicPlayer = dynamic(() => import("../components/MusicPlayer"), {
  ssr: false,
  loading: () => (
    <div className="mt-7 flex flex-col gap-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
        >
          <Skeleton className="rounded-md" height="18px" width="55%" />
          <Skeleton className="mt-1 rounded-md" height="12px" width="30%" />
        </div>
      ))}
    </div>
  ),
});

const Music = () => {
  return (
    <Body title="Music">
      <div>
        <h1 className="text-[3rem] font-extrabold tracking-tight">Music</h1>
        <p className="mt-1 text-lg">A collection of my favorite tunes</p>
      </div>
      <MusicPlayer />
    </Body>
  );
};

export default Music;
