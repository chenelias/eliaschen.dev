import React, { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Body from "../components/Body";
import {
  BsPlayFill,
  BsPauseFill,
  BsSkipEndFill,
  BsFillSkipStartFill,
} from "react-icons/bs";
import { SiYoutubemusic } from "react-icons/si";
import Link from "next/link";
import YouTube, { YouTubePlayer } from "react-youtube";
import { CgClose } from "react-icons/cg";
import { MdPlaylistPlay } from "react-icons/md";
import { TiArrowShuffle } from "react-icons/ti";
const tokenkey = process.env.YOUTUBE_TOKEN;
// import Musicplayer from './musicplayer'
let videoElement: YouTubePlayer = null;
const Music = () => {
  const [loading, setLoading] = React.useState(true);
  const [playList, setPlaylist] = React.useState(null);
  const [playListo, setPlaylisto] = React.useState(null);
  // Player
  const [playerload, setplayerload] = React.useState(true);
  const [playeritems, setPlayerItems] = React.useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setvtime] = useState(null);
  const [videoduration, setvideoduration] = useState(null);
  const [currentseconds, setcurrentseconds] = useState(null);
  const [videostatus, setvideostatus] = useState(null);
  const [playervolume, setplayervolume] = useState(true);
  function scrollToTop() {
    window.scrollTo({
      top: 10,
      behavior: "smooth",
    });
  }
  useEffect(() => {
    setplayerload(true);
  }, [playeritems && playeritems]);
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLyOL_RMmwqydRtzTaTuzHc7GCXlAR2aO8&key=${"AIzaSyC4mJJQYLGdN6Anr4eQkgNUgN_WVyvGHEk"}&maxResults=1000`,
      {}
    )
      .then((res) => res.json())
      .then((data) => {
        setPlaylist(data.items);
        setPlaylisto(data.pageInfo.totalResults);
        setLoading(false);
      });
  }, []);
  const LoadDisplay = (
    <div>
      <Skeleton
        className="my-2"
        count={5}
        borderRadius="10px"
        height="80px"
        baseColor="#202020"
        highlightColor="#666"
      />
    </div>
  );
  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
    },
  };
  useEffect(() => {
    if (videostatus === 3) {
      setplayerload(true);
    }
    if (videostatus !== 3) {
      setplayerload(false);
    }
  }, [videostatus]);
  const _onReady = (event: YouTubePlayer) => {
    videoElement = event;
    // setplayerload(false)
    setIsPaused(false);
    setvtime(0);
    videoElement.target.unMute();
    videoElement.target.setVolume(100); // todo remove it in new mind
    videoElement.target.playVideo();
    setvideoduration(videoElement.target.getDuration());
  };
  function musicplayersetup(items) {
    setPlayerItems(items);
    // videoElement.target.setVolume(100);
    scrollToTop();
    // document.getElementById('player').style.scrollMarginTop = `30px`
  }
  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m >= 0 ? (m < 10 ? "0" + m + ":" : m + ":") : "0:";
    var sDisplay = s >= 0 ? (s < 10 ? "0" + s : +s) : "";
    return hDisplay + mDisplay + sDisplay;
  }
  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoElement) {
        let videoseconds = Math.floor(videoElement.target.getCurrentTime());
        setvtime(secondsToHms(videoseconds));
        setcurrentseconds(videoseconds);
        setvideostatus(videoElement.target.getPlayerState());
      }
    }, 0);
    return () => {
      clearInterval(interval);
    };
  }, []);
  function ControlIcon() {
    if (videostatus === 2) {
      return (
        <p onClick={() => videoElement.target.playVideo()}>
          <BsPlayFill />
        </p>
      );
    } else if (videostatus === 1) {
      return (
        <p onClick={() => videoElement.target.pauseVideo()}>
          <BsPauseFill />
        </p>
      );
    } else {
      return (
        <div className="spinner-container">
          <div className="loading-spinner !h-[37px] w-[37px]"></div>
        </div>
      );
    }
  }
  useEffect(() => {
    document.addEventListener("keypress", detectKeyDown, true);
  });
  const detectKeyDown = (e) => {
    if (e.key === " " && videostatus === 1) {
      scrollToTop();
      videoElement.target.pauseVideo();
    } else if (e.key === " " && videostatus === 2) {
      scrollToTop();
      videoElement.target.playVideo();
    }
  };
  return (
    <Body title="Music">
      <div>
        <h1 className="text-6xl font-extrabold tracking-tight">Music</h1>
        <p className="mt-1 text-lg">List of my favorite songs.</p>
      </div>
      {/* // todo: play and viewlist btn start here  */}
      <div className="flex ">
        <button
          aria-label="Play all songs"
          onClick={() => {
            musicplayersetup(playList[Math.floor(Math.random() * playListo)]);
          }}
          className="mt-2 flex items-center rounded-xl bg-[#ce9dff] p-3 text-left text-xl font-bold duration-100 hover:bg-[#c081ff] dark:bg-[#9900ff] dark:hover:bg-[#9900ffb2]"
        >
          <p className="text-3xl">
            <BsPlayFill />
          </p>
          {/* &thinsp;Shuffle play */}
        </button>
        <button>
          <Link
            aria-label="View playlist on youtubemusic"
            href="https://music.youtube.com/playlist?list=PLyOL_RMmwqydRtzTaTuzHc7GCXlAR2aO8"
            className="mt-2 flex dark:bg-zinc-700 items-center rounded-xl bg-zinc-200 px-3 py-[5px] text-left font-bold duration-100 hover:bg-zinc-300  dark:hover:bg-zinc-600 ml-3"
            target={"_blank"}
          >
            <p className="text-3xl">
              <MdPlaylistPlay />
            </p>
            <div className="ml-1 block">
              <p className="text-lg">View playlist</p>
              <p className="ml-[2px] text-xs">YoutubeMusic</p>
            </div>
          </Link>
        </button>
      </div>
      <div
        className={`relative mt-5 block h-auto w-full items-center overflow-hidden rounded-lg bg-purple-50 shadow-xl transition-all duration-100 dark:bg-neutral-800 music:block music:h-[220px]  ${
          !playeritems ? "!hidden " : "block"
        } px-[10px] py-[10px]`}
        id="player"
      >
        <div className="flex music:h-0">
          <div className="flex-1"></div>
          <div className="g-red-500 mr-2 h-5 w-5 items-center rounded-full music:block">
            <button
              aiia-label="close musicplayer"
              onClick={() => setPlayerItems(null)}
              className="ml-auto rounded-full bg-slate-300 p-1 text-xl duration-100 hover:bg-slate-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 music:flex music:overflow-visible"
            >
              <CgClose />
            </button>
          </div>
        </div>
        <div className="block items-center music:flex">
          {playeritems && (
            <YouTube
              videoId={playeritems.snippet.resourceId.videoId}
              opts={opts}
              onReady={_onReady}
              onStateChange={() => {}}
              onEnd={() => {
                musicplayersetup(
                  playList[
                    playeritems.snippet.position === playListo - 1
                      ? 0
                      : playeritems.snippet.position + 1
                  ]
                );
                setplayerload(true);
              }}
            />
          )}
          {playeritems && (
            <div
              className={`mx-auto block !h-[200px] !w-[200px] shrink-0 items-center overflow-hidden !rounded-lg bg-red-200 music:mx-0`}
            >
              <img
                className="dragnone musicalbumimg mt-[-34px] !h-[268px] !w-auto"
                src={playeritems.snippet.thumbnails.standard.url}
                alt=""
              />
            </div>
          )}
          {/* // todo: musicplayer start here */}
          <div className="block">
            {playeritems && (
              <div className="py-auto mt-2 block shrink-0 items-center text-center music:ml-[50px] music:mt-0 music:text-left">
                <div className="flex">
                  <div className="mx-auto flex max-w-[525px] items-center music:mx-0">
                    <div className="block">
                      <h1 className="notranslate text-2xl font-bold">
                        {playeritems.snippet.title.split(/[[:(]/)[0]}
                      </h1>
                      <Link
                        target={"_blank"}
                        href={
                          "https://music.youtube.com/channel/" +
                          playeritems.snippet.videoOwnerChannelId
                        }
                        className="duration-75 hover:opacity-70"
                      >
                        <p>
                          {playeritems.snippet.videoOwnerChannelTitle.replace(
                            / - Topic/g,
                            " "
                          )}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-4 items-center music:ml-[-10px] music:mt-2">
                  <button
                    onClick={() => {
                      scrollToTop();
                      setPlayerItems(
                        playList[
                          playeritems.snippet.position === 0
                            ? playListo - 1
                            : playeritems.snippet.position - 1
                        ]
                      );
                    }}
                    className="rounded-lg p-1 text-4xl hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    <BsFillSkipStartFill />
                  </button>
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="mx-[50px] items-center rounded-lg p-1 text-4xl hover:bg-zinc-200 dark:hover:bg-zinc-700 music:mx-[30px]"
                  >
                    {playerload ? (
                      <div className="spinner-container">
                        <div className="loading-spinner !h-[37px] w-[37px]"></div>
                      </div>
                    ) : (
                      ControlIcon()
                    )}
                  </button>
                  <button
                    onClick={() => {
                      scrollToTop();
                      setPlayerItems(
                        playList[
                          playeritems.snippet.position === playListo - 1
                            ? 0
                            : playeritems.snippet.position + 1
                        ]
                      );
                    }}
                    className="rounded-lg p-1 text-4xl hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    <BsSkipEndFill />
                  </button>
                </div>
                {
                  <div className="mx-4 mt-2 block items-center music:mx-0 music:mt-0">
                    {/* <br /> */}
                    <input
                      value={currentseconds}
                      min="0"
                      max={videoduration}
                      onChange={(x) => {
                        setvtime(x.target.value);
                        videoElement.target.seekTo(x.target.value);
                      }}
                      step="1"
                      type="range"
                      className="musicplayerrange ml-0 w-[290px] xss:w-[300px] music:ml-[-5px] music:w-[550px]"
                    />
                    <p className="!flex text-[0.5px] music:!hidden">
                      <br />
                    </p>
                    {/* TODO moble controler*/}
                    <div className="mt-[-5px]">
                      <p className="mr-3 !inline-flex text-center music:!hidden">
                        <p>{time}</p>&thinsp;/&thinsp;
                        <p>
                          {(Math.floor(videoduration / 60) < 10
                            ? "0" + Math.floor(videoduration / 60)
                            : Math.floor(videoduration / 60)) +
                            ":" +
                            (Math.floor(videoduration % 60) < 10
                              ? "0" + Math.floor(videoduration % 60)
                              : Math.floor(videoduration % 60))}
                        </p>
                      </p>
                      {/* TODO esktop controler */}
                      <p className="!mt-[-7px] !hidden music:!flex">
                        <p>{time}</p>&thinsp;/&thinsp;
                        <p>
                          {(Math.floor(videoduration / 60) < 10
                            ? "0" + Math.floor(videoduration / 60)
                            : Math.floor(videoduration / 60)) +
                            ":" +
                            (Math.floor(videoduration % 60) < 10
                              ? "0" + Math.floor(videoduration % 60)
                              : Math.floor(videoduration % 60))}
                        </p>
                      </p>
                    </div>
                  </div>
                }
                {/* <div className="flex items-center">
                                    <div className="music:flex-1 mx-auto"></div>
                                    <button
                                        className="p-1 text-3xl hover:opacity-80 "
                                        onClick={() => setplayervolume(!playervolume)}
                                    >
                                        {playervolume ? <BsVolumeUpFill /> : <BsVolumeMuteFill />}
                                    </button>
                                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {playeritems && (
          <div className="flex">
            <Link
              target={"_blank"}
              href={
                "https://music.youtube.com/watch?v=" +
                playeritems.snippet.resourceId.videoId +
                "&list=" +
                playeritems.snippet.playlistId
              }
              className={`mt-4 flex w-full items-center rounded-lg bg-neutral-200 py-2 px-3  text-lg font-bold text-zinc-700 drop-shadow-md duration-100 hover:bg-neutral-300  dark:bg-neutral-800 dark:text-zinc-300 dark:hover:bg-neutral-700 ${
                !playeritems ? "!hidden " : "block"
              }`}
            >
              <p className="text-xl ">
                <SiYoutubemusic />
              </p>
              &nbsp;
              <p>Playing on Youtube Music</p>
            </Link>
          </div>
        )}
        {playeritems && (
          <p className=" notranslate mt-[1px] w-full items-center text-right text-xs text-zinc-300 dark:text-zinc-700">
            Power by&nbsp;
            <Link
              href={
                "https://developers.google.com/youtube/iframe_api_reference"
              }
              className="duration-75 hover:text-black hover:dark:text-white"
              target="_blank"
              area-aria-label=""
            >
              <span className="mt-1 text-xs ">YoutubeIframePlayer</span>
            </Link>
          </p>
        )}
      </div>{" "}
      {/* // todo: list start here */}
      <ol className="mt-7">
        {loading || !playList
          ? LoadDisplay
          : playList.map((items) => (
              <li>
                <button
                  onClick={() => {
                    musicplayersetup(items);
                  }}
                  key={items.id}
                  className="shodow-black-/10 group mt-4 flex w-full transform cursor-pointer items-center rounded-lg bg-zinc-100 py-2 pr-2  shadow-md transition-all duration-100 hover:shadow-lg hover:shadow-black/10 dark:bg-zinc-800 dark:shadow-zinc-200/10 dark:hover:shadow-zinc-200/10"
                >
                  <div className="notranslate mr-1 ml-2 flex h-[40px] w-[25px] items-center px-5 py-1">
                    {playeritems &&
                      (playeritems.id === items.id ? (
                        videostatus === 1 ? (
                          <p
                            key={items.id}
                            className="mr-[5px] ml-[-14px] text-2xl group-hover:block"
                          >
                            <div
                              className="now playing mt-7 ml-1 flex"
                              id="music"
                            >
                              <span className="bar n1 bg-black dark:bg-white"></span>
                              <span className="bar n2 bg-black dark:bg-white"></span>
                              <span className="bar n3 bg-black dark:bg-white"></span>
                            </div>
                          </p>
                        ) : (
                          <p
                            key={items.id}
                            className="mr-[5px] ml-[-14px] text-2xl group-hover:block"
                          >
                            <div
                              className="items-center mt-7 ml-1 flex"
                              id="music"
                            >
                              <span className="bg-black dark:bg-white h-[1px] w-[5px] mr-[3px]"></span>
                              <span className="bg-black dark:bg-white h-[1px] w-[5px] mr-[3px]"></span>
                              <span className="bg-black dark:bg-white h-[1px] w-[5px] mr-[3px]"></span>
                            </div>
                          </p>
                        )
                      ) : (
                        <div key={items.id}>
                          <p className="ml-[-11px] block text-xl group-hover:hidden">
                            {items.snippet.position + 1}
                          </p>
                          <p className="mr-[5px] ml-[-14px] hidden text-3xl group-hover:block">
                            <BsPlayFill />
                          </p>
                        </div>
                      ))}

                    {!playeritems ? (
                      <div>
                        <p className="ml-[-11px] block text-xl group-hover:hidden">
                          {items.snippet.position + 1}
                        </p>
                        <p className="mr-[5px] ml-[-14px] hidden text-3xl group-hover:block">
                          <BsPlayFill />
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="block text-left">
                    <h1 className="notranslate text-xl font-bold">
                      {items.snippet.title.split(/[[:(]/)[0]}
                    </h1>
                    <p className="text-xs ">
                      {items.snippet.videoOwnerChannelTitle.replace(
                        / - Topic/g,
                        " "
                      )}
                    </p>
                  </div>
                  <div className="flex-1"></div>
                  {/* <div className={`overflow-hidden rounded-lg block !h-[100px] !w-[100px] shrink-0 ml-1`}>
                                   <img
                                       className="dragnone musicalbumimg !w-auto !h-[100px]"
                                       src={items.snippet.thumbnails.medium.url}
                                       alt=""
                                   />
                               </div> */}
                </button>
              </li>
            ))}
      </ol>
    </Body>
  );
};
export default Music;
