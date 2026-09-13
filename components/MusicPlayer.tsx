"use client";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
import { parsePlaylistItems, type PlaylistItem } from "./data/api";

let videoElement: YouTubePlayer = null;

export default function MusicPlayer() {
  const [loading, setLoading] = useState(true);
  const [playList, setPlaylist] = useState<PlaylistItem[]>([]);
  const [playListo, setPlaylisto] = useState(0);
  // Player
  const [playerload, setplayerload] = useState(true);
  const [playeritems, setPlayerItems] = useState<PlaylistItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setvtime] = useState<string | null>(null);
  const [videoduration, setvideoduration] = useState<number | null>(null);
  const [currentseconds, setcurrentseconds] = useState<number | null>(null);
  const [videostatus, setvideostatus] = useState<number | null>(null);

  // Fetch playlist on mount
  useEffect(() => {
    const controller = new AbortController();

    const loadPlaylist = async () => {
      try {
        const res = await fetch("/api/music-playlist", {
          signal: controller.signal,
        });
        if (!res.ok || controller.signal.aborted) return;
        const data: unknown = await res.json();
        if (!controller.signal.aborted) {
          const items = parsePlaylistItems(data);
          setPlaylist(items);
          setPlaylisto(items.length);
        }
      } catch {
        if (!controller.signal.aborted) {
          setPlaylist([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadPlaylist();
    return () => controller.abort();
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 10,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    setplayerload(true);
  }, [playeritems]);

  const LoadDisplay = (
    <div className="flex flex-col gap-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg border-[1px] border-zinc-200 p-3 dark:border-zinc-800"
        >
          <Skeleton className="rounded-md" height="18px" width="55%" />
          <Skeleton className="mt-1 rounded-md" height="12px" width="30%" />
        </div>
      ))}
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
    setIsPaused(false);
    setvtime("0");
    videoElement.target.unMute();
    videoElement.target.setVolume(100);
    setvideoduration(videoElement.target.getDuration());
    videoElement.target.playVideo();
  };

  function musicplayersetup(items: PlaylistItem) {
    setPlayerItems(items);
    scrollToTop();
  }

  function secondsToHms(d: number) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m >= 0 ? (m < 10 ? "0" + m + ":" : m + ":") : "0:";
    var sDisplay = s >= 0 ? (s < 10 ? "0" + s : "" + s) : "";
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
    return () => {
      document.removeEventListener("keypress", detectKeyDown, true);
    };
  });

  const detectKeyDown = (e: KeyboardEvent) => {
    if (e.key === " " && videostatus === 1) {
      scrollToTop();
      videoElement.target.pauseVideo();
    } else if (e.key === " " && videostatus === 2) {
      scrollToTop();
      videoElement.target.playVideo();
    }
  };

  return (
    <>
      {/* Play and viewlist buttons */}
      <div className="flex items-stretch gap-3">
        <button
          aria-label="Play all songs"
          onClick={() => {
            if (playList.length > 0) {
              musicplayersetup(playList[Math.floor(Math.random() * playListo)]);
            }
          }}
          disabled={loading || playList.length === 0}
          className="mt-2 flex items-center rounded-lg bg-purple-200 px-4 text-left text-3xl font-bold text-purple-900 transition duration-200 hover:bg-purple-300 disabled:opacity-50 dark:bg-purple-900/50 dark:text-purple-200 dark:hover:bg-purple-900/80"
        >
          <BsPlayFill />
        </button>
        <Link
          aria-label="View playlist on youtubemusic"
          href="https://music.youtube.com/playlist?list=PLyOL_RMmwqydRtzTaTuzHc7GCXlAR2aO8"
          className="mt-2 flex items-center gap-1 rounded-lg border-[1px] border-zinc-200 px-3 py-2 text-left font-bold transition duration-200 hover:-translate-y-[0.15rem] hover:shadow-lg dark:border-zinc-800"
          target={"_blank"}
        >
          <span className="text-3xl">
            <MdPlaylistPlay />
          </span>
          <span className="block">
            <span className="block leading-snug">View playlist</span>
            <span className="block text-xs text-zinc-500 dark:text-zinc-400">
              YoutubeMusic
            </span>
          </span>
        </Link>
      </div>

      {/* Player */}
      <div
        className={`relative mt-5 block h-auto w-full items-center overflow-hidden rounded-lg border-[1px] border-zinc-200 p-3 transition-all duration-100 dark:border-zinc-800 music:block music:h-[220px] ${
          !playeritems ? "!hidden " : "block"
        }`}
        id="player"
      >
        <div className="flex music:h-0">
          <div className="flex-1"></div>
          <div className="g-red-500 mr-2 h-5 w-5 items-center rounded-full music:block">
            <button
              aria-label="close musicplayer"
              onClick={() => setPlayerItems(null)}
              className="ml-auto rounded-md p-1 text-xl text-zinc-400 transition duration-200 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200 music:flex music:overflow-visible"
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
              onEnd={() => {
                musicplayersetup(
                  playList[
                    playeritems.snippet.position === playListo - 1
                      ? 0
                      : playeritems.snippet.position + 1
                  ],
                );
                setplayerload(true);
              }}
            />
          )}
          {playeritems && (
            <div
              className={`mx-auto block !h-[200px] !w-[200px] shrink-0 items-center overflow-hidden !rounded-lg bg-zinc-100 dark:bg-zinc-800 music:mx-0`}
            >
              <img
                className="dragnone musicalbumimg mt-[-34px] !h-[268px] !w-auto"
                src={playeritems.snippet.thumbnails.standard.url}
                alt=""
              />
            </div>
          )}
          {/* Music player controls */}
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
                            " ",
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
                        ],
                      );
                    }}
                    className="rounded-lg p-1 text-4xl transition duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <BsFillSkipStartFill />
                  </button>
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="mx-[50px] items-center rounded-lg p-1 text-4xl transition duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 music:mx-[30px]"
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
                        ],
                      );
                    }}
                    className="rounded-lg p-1 text-4xl transition duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <BsSkipEndFill />
                  </button>
                </div>
                {
                  <div className="mx-4 mt-2 block items-center music:mx-0 music:mt-0">
                    <input
                      value={currentseconds || 0}
                      min="0"
                      max={videoduration || 0}
                      onChange={(x) => {
                        const newSeconds = Number(x.target.value);
                        setcurrentseconds(newSeconds);
                        setvtime(secondsToHms(newSeconds));
                        videoElement.target.seekTo(newSeconds);
                      }}
                      step="1"
                      type="range"
                      className="musicplayerrange ml-0 w-[290px] xss:w-[300px] music:ml-[-5px] music:w-[550px]"
                    />
                    <div className="mt-1 font-code text-xs text-zinc-500 dark:text-zinc-400">
                      {videoduration && videoduration > 0 ? (
                        <p className="!m-0">
                          <span>{time || "00:00"}</span>&thinsp;/&thinsp;
                          <span>{secondsToHms(videoduration)}</span>
                        </p>
                      ) : (
                        <p className="!m-0">Loading...</p>
                      )}
                    </div>
                  </div>
                }
              </div>
            )}
          </div>
        </div>
      </div>

      {/* YouTube Music link */}
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
              className={`mt-4 flex w-full items-center rounded-lg border-[1px] border-zinc-200 py-2 px-3 font-bold text-zinc-700 transition duration-200 hover:-translate-y-[0.15rem] hover:shadow-lg dark:border-zinc-800 dark:text-zinc-300 ${
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
      </div>

      {/* Playlist */}
      <ol className="mt-7 flex flex-col gap-3 !p-0">
        {loading
          ? LoadDisplay
          : playList.map((items) => {
              const isCurrent = playeritems?.id === items.id;

              return (
                <li key={items.id} className="list-none">
                  <button
                    onClick={() => {
                      musicplayersetup(items);
                    }}
                    className="group flex w-full items-center gap-3 rounded-lg border-[1px] border-zinc-200 p-3 text-left transition duration-200 hover:-translate-y-[0.15rem] hover:shadow-lg dark:border-zinc-800"
                  >
                    <div className="notranslate flex h-[30px] w-7 shrink-0 items-center justify-center">
                      {isCurrent ? (
                        // Bars grow upward off their baseline (see the `pulse`
                        // keyframes), so the row has to anchor them to the bottom.
                        <div
                          className={
                            (videostatus === 1 ? "now playing" : "flex") +
                            " flex h-full items-end"
                          }
                          id="music"
                        >
                          {videostatus === 1 ? (
                            <>
                              <span className="bar n1 bg-black dark:bg-white"></span>
                              <span className="bar n2 bg-black dark:bg-white"></span>
                              <span className="bar n3 bg-black dark:bg-white"></span>
                            </>
                          ) : (
                            <>
                              <span className="mr-[3px] h-[1px] w-[5px] bg-black dark:bg-white"></span>
                              <span className="mr-[3px] h-[1px] w-[5px] bg-black dark:bg-white"></span>
                              <span className="mr-[3px] h-[1px] w-[5px] bg-black dark:bg-white"></span>
                            </>
                          )}
                        </div>
                      ) : (
                        <>
                          <span className="block text-sm font-code text-zinc-500 group-hover:hidden dark:text-zinc-400">
                            {items.snippet.position + 1}
                          </span>
                          <span className="hidden text-2xl group-hover:block">
                            <BsPlayFill />
                          </span>
                        </>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 className="notranslate truncate font-bold leading-snug tracking-tight text-zinc-900 dark:text-zinc-200">
                        {items.snippet.title.split(/[[:(]/)[0]}
                      </h2>
                      <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                        {items.snippet.videoOwnerChannelTitle.replace(
                          / - Topic/g,
                          " ",
                        )}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
      </ol>
    </>
  );
}
