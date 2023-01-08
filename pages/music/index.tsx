import React, { useEffect, useState, useRef } from 'react'
// import Body from '/components/Body'
import Head from 'next/head'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Image from 'next/image'
import { BsPlayFill, BsPauseFill, BsSkipEndFill, BsFillSkipStartFill } from 'react-icons/bs'
import { SiYoutubemusic } from 'react-icons/si'
import Link from 'next/link'
import YouTube, { YouTubePlayer } from 'react-youtube'
import { ImYoutube2 } from 'react-icons/im'
import { MdPlaylistPlay } from 'react-icons/md'
import { HiVolumeUp } from 'react-icons/hi'
// import Musicplayer from './musicplayer'
let videoElement: YouTubePlayer = null
const index = () => {
    const [loading, setLoading] = React.useState(true)
    const [playList, setPlaylist] = React.useState(null)
    const [playListo, setPlaylisto] = React.useState(null)
    // Player
    const [playerload, setplayerload] = React.useState(true)
    const [playeritems, setPlayerItems] = React.useState(null)
    const [isPaused, setIsPaused] = useState(false)
    const [time, setvtime] = useState(null)
    const [videoduration, setvideoduration] = useState(null)
    const [currentseconds, setcurrentseconds] = useState(null)
    const [videostatus, setvideostatus] = useState(null)
    function scrollToTop() {
        window.scrollTo({
            top: 115,
            behavior: 'smooth',
        })
    }
    useEffect(() => {
        setplayerload(true)
    }, [playeritems && playeritems])

    useEffect(() => {
        setLoading(true)
        fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLyOL_RMmwqydRtzTaTuzHc7GCXlAR2aO8&key=AIzaSyC4mJJQYLGdN6Anr4eQkgNUgN_WVyvGHEk&maxResults=1000`,
            {}
        )
            .then((res) => res.json())
            .then((data) => {
                setPlaylist(data.items)
                setPlaylisto(data.pageInfo.totalResults)
                setLoading(false)
            })
    }, [])
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
    )
    function musicplayersetup(items) {
        setPlayerItems(items)
        scrollToTop()
    }
    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: 1,
        },
    }
    useEffect(() => {
        if (videostatus === 3) {
            setplayerload(true)
        }
        if (videostatus !== 3) {
            setplayerload(false)
        }
    }, [videostatus])
    const _onReady = (event: YouTubePlayer) => {
        videoElement = event
        // setplayerload(false)
        setIsPaused(false)
        setvtime(0)
        videoElement.target.playVideo()
        videoElement.target.setVolume(100) // todo remove it in new mind
        setvideoduration(videoElement.target.getDuration())
    }
    function secondsToHms(d) {
        d = Number(d)
        var h = Math.floor(d / 3600)
        var m = Math.floor((d % 3600) / 60)
        var s = Math.floor((d % 3600) % 60)
        var hDisplay = h > 0 ? h + ':' : ''
        var mDisplay = m >= 0 ? (m < 10 ? '0' + m + ':' : m + ':') : '0:'
        var sDisplay = s >= 0 ? (s < 10 ? '0' + s : +s) : ''
        return hDisplay + mDisplay + sDisplay
    }
    useEffect(() => {
        const interval = setInterval(async () => {
            if (videoElement) {
                let videoseconds = Math.floor(videoElement.target.getCurrentTime())
                setvtime(secondsToHms(videoseconds))
                setcurrentseconds(videoseconds)
                setvideostatus(videoElement.target.getPlayerState())
            }
        }, 0)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <main>
            <Head>
                <title>EliasChen - Music</title>
            </Head>
            <div>
                <h1 className="font-extrabold text-6xl tracking-tight">Music</h1>
                <p className="text-lg mt-1">List of my favorite songs.</p>
            </div>
            <div className="smallsize:flex block">
                <button
                    aria-label="Play all songs"
                    onClick={() => musicplayersetup(playList[Math.floor(Math.random() * playListo+1)])}
                    className="flex items-center rounded-xl bg-[#ce9dff] p-3 mt-2 text-xl text-left font-bold duration-100 hover:bg-[#c081ff] dark:bg-[#9900ff] dark:hover:bg-[#9900ffb2]"
                >
                    <p className="text-2xl">
                        <BsPlayFill />
                    </p>
                    &thinsp;Play random {playListo} songs
                </button>
                <button className="smallsize:ml-3" aria-label="Play all songs">
                    <Link
                        href="https://music.youtube.com/playlist?list=PLyOL_RMmwqydRtzTaTuzHc7GCXlAR2aO8"
                        className="flex items-center rounded-xl bg-red-200 text-left px-3 h-[52px] mt-2 font-bold duration-100 hover:bg-red-300 dark:bg-red-400 dark:hover:bg-red-500"
                        target={'_blank'}
                    >
                        <p className="text-3xl">
                            <MdPlaylistPlay />
                        </p>
                        <div className="block ml-1">
                            <p className="text-lg">View playlist</p>
                            <p className="text-xs ml-[2px]">YoutubeMusic</p>
                        </div>
                    </Link>
                </button>
            </div>
            <div
                className={`music:flex block bg-purple-50 dark:bg-neutral-800 shadow-xl rounded-lg mt-5 w-full music:h-[220px] h-auto overflow-hidden duration-100 transition-all items-center relative  ${
                    !playeritems ? '!hidden ' : 'block'
                } px-[10px] py-[10px]`}
                id="musictop"
            >
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
                            )
                            setplayerload(true)
                        }}
                    />
                )}
                {playeritems && (
                    <div
                        className={`overflow-hidden !rounded-lg block !h-[200px] !w-[200px] shrink-0 items-center music:mx-0 mx-auto bg-red-200`}
                    >
                        <img
                            className="dragnone musicalbumimg !w-auto !h-[268px] mt-[-34px]"
                            src={playeritems.snippet.thumbnails.standard.url}
                            alt=""
                        />
                    </div>
                )}
                <div className="block">
                    {playeritems && (
                        <div className="music:text-left text-center shrink-0 block items-center py-auto music:ml-[50px] mt-2 music:mt-0">
                            <div className="flex">
                                <div className="items-center max-w-[525px] music:mx-0 mx-auto flex">
                                    {/* <p className="ml-[-55px] p-4 text-xl music:block hidden">   
                                        {playeritems.snippet.position + 1}
                                    </p> */}
                                    <div className="block">
                                        <h1 className="font-bold text-2xl notranslate">
                                            {playeritems.snippet.title.split(/[[:(]/)[0]}
                                        </h1>
                                        <p>{playeritems.snippet.videoOwnerChannelTitle.replace(/ - Topic/g, ' ')}</p>
                                    </div>
                                </div>
                            </div>
                            {/* <Musicplayer
                                playList={playList}
                                playeritems={playeritems}
                                playListo={playListo}
                                setPlayerItems={setPlayerItems}
                                playerload={playerload}
                            /> */}
                            <div className="music:ml-[-10px] mt-4 music:mt-2 items-center">
                                <button
                                    onClick={() => {
                                        scrollToTop()
                                        setPlayerItems(
                                            playList[
                                                playeritems.snippet.position === 0
                                                    ? playListo - 1
                                                    : playeritems.snippet.position - 1
                                            ]
                                        )
                                    }}
                                    className="text-4xl p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg"
                                >
                                    <BsFillSkipStartFill />
                                </button>
                                <button
                                    onClick={() => setIsPaused(!isPaused)}
                                    className="text-4xl p-1 items-center hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg music:mx-[30px] mx-[50px]"
                                >
                                    {playerload ? (
                                        <div className="spinner-container">
                                            <div className="loading-spinner !h-[37px] w-[37px]"></div>
                                        </div>
                                    ) : isPaused ? (
                                        <p onClick={() => videoElement.target.playVideo()}>
                                            <BsPlayFill />
                                        </p>
                                    ) : (
                                        <p onClick={() => videoElement.target.pauseVideo()}>
                                            <BsPauseFill />
                                        </p>
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        scrollToTop()
                                        setPlayerItems(
                                            playList[
                                                playeritems.snippet.position === playListo - 1
                                                    ? 0
                                                    : playeritems.snippet.position + 1
                                            ]
                                        )
                                    }}
                                    className="text-4xl p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg"
                                >
                                    <BsSkipEndFill />
                                </button>
                            </div>
                            {
                                <div className="block items-center music:mx-0 mx-4 music:mt-2 mt-2">
                                    {/* <br /> */}
                                    <input
                                        value={currentseconds}
                                        min="0"
                                        max={videoduration}
                                        onChange={(x) => {
                                            setvtime(x.target.value)
                                            videoElement.target.seekTo(x.target.value)
                                        }}
                                        step="1"
                                        type="range"
                                        className="musicplayerrange xss:w-[300px] music:w-[500px] w-[300px] ml-0 music:ml-[-5px] "
                                    />
                                    <p className="text-[0.5px] !flex music:!hidden mt-[-5px]">
                                        <br />
                                    </p>
                                    {/* TODO moble controler*/}
                                    <p className="music:!hidden !inline-flex text-center mr-3">
                                        <p>{time}</p>&thinsp;/&thinsp;
                                        <p>
                                            {(Math.floor(videoduration / 60) < 10
                                                ? '0' + Math.floor(videoduration / 60)
                                                : Math.floor(videoduration / 60)) +
                                                ':' +
                                                (Math.floor(videoduration % 60) < 10
                                                    ? '0' + Math.floor(videoduration % 60)
                                                    : Math.floor(videoduration % 60))}
                                        </p>
                                    </p>
                                    {/* TODO esktop controler */}
                                    <p className="music:!flex !hidden !mt-[-7px]">
                                        <p>{time}</p>&thinsp;/&thinsp;
                                        <p>
                                            {(Math.floor(videoduration / 60) < 10
                                                ? '0' + Math.floor(videoduration / 60)
                                                : Math.floor(videoduration / 60)) +
                                                ':' +
                                                (Math.floor(videoduration % 60) < 10
                                                    ? '0' + Math.floor(videoduration % 60)
                                                    : Math.floor(videoduration % 60))}
                                        </p>
                                    </p>
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>

            {playeritems && (
                <Link
                    target={'_blank'}
                    href={
                        'https://music.youtube.com/watch?v=' +
                        playeritems.snippet.resourceId.videoId +
                        '&list=' +
                        playeritems.snippet.playlistId
                    }
                    className={`flex bg-red-100 mt-4 dark:hover:bg-neutral-700 hover:bg-red-200 duration-100  text-zinc-700 dark:text-zinc-300 text-xl dark:bg-neutral-800 rounded-lg py-4 px-3 font-bold items-center w-full ${
                        !playeritems ? '!hidden ' : 'block'
                    }`}
                >
                    <p className="text-2xl ">
                        <SiYoutubemusic />
                    </p>
                    &nbsp;
                    <p>Listen on youtube music</p>
                </Link>
            )}
            <div className="mt-7 mb-[-40px]">
                {loading || !playList
                    ? LoadDisplay
                    : playList.map((items) => (
                          <button
                              onClick={() => {
                                  musicplayersetup(items)
                              }}
                              key={items.id}
                              className="cursor-pointer group shadow-md shodow-black-/10 dark:shadow-zinc-200/10 hover:shadow-lg w-full dark:hover:shadow-zinc-200/10 hover:shadow-black/10 transform transition-all duration-100  bg-zinc-100 dark:bg-zinc-800 py-2 pr-2 rounded-lg mt-4 items-center flex"
                          >
                              <div className="flex w-[25px] items-center px-5 py-1 mr-1 h-auto ml-2">
                                  {playeritems &&
                                      (playeritems.id === items.id ? (
                                          <p key={items.id} className="text-2xl mr-[5px] ml-[-14px] group-hover:block">
                                              <HiVolumeUp />
                                          </p>
                                      ) : (
                                          <div key={items.id}>
                                              <p className="text-xl block group-hover:hidden ml-[-11px]">
                                                  {items.snippet.position + 1}
                                              </p>
                                              <p className="text-3xl mr-[5px] ml-[-14px] hidden group-hover:block">
                                                  <BsPlayFill />
                                              </p>
                                          </div>
                                      ))}

                                  {!playeritems ? (
                                      <div>
                                          <p className="text-xl block group-hover:hidden ml-[-11px]">
                                              {items.snippet.position + 1}
                                          </p>
                                          <p className="text-3xl mr-[5px] ml-[-14px] hidden group-hover:block">
                                              <BsPlayFill />
                                          </p>
                                      </div>
                                  ) : (
                                      ''
                                  )}
                              </div>
                              <div className="block text-left">
                                  <h1 className="font-bold text-xl notranslate">
                                      {items.snippet.title.split(/[[:(]/)[0]}
                                  </h1>
                                  <p className="text-xs ">
                                      {items.snippet.videoOwnerChannelTitle.replace(/ - Topic/g, ' ')}
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
                      ))}
                <div className="float-right">
                    <p className="inline-flex mt-3 text-md items-center notranslate">
                        Power by&nbsp;
                        <Link href={'https://www.youtube.com/'} target="_blank" area-aria-label="link to youtube.com">
                            <span className="text-5xl mt-1">
                                <ImYoutube2 />
                            </span>
                        </Link>
                    </p>
                </div>
                <div className="">&nbsp;</div>
            </div>
        </main>
    )
}
export default index
{
    /* <Link
                             
                              target={'_blank'}
                              href={
                                  'https://music.youtube.com/watch?v=' +
                                  items.snippet.resourceId.videoId +
                                  '&list=' +
                                  items.snippet.playlistId
                              }
                          > */
}
{
    /* </Link> */
}
