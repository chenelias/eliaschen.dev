import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Body from "../components/Body";

const MusicPlayer = dynamic(() => import("../components/MusicPlayer"), {
  ssr: false,
  loading: () => (
    <div>
      <Skeleton className="my-2" count={5} borderRadius="10px" height="80px" />
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
