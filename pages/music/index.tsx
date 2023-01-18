import React, { useEffect, useState, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Body from '../../components/Body'
import { BsPlayFill, BsPauseFill, BsSkipEndFill, BsFillSkipStartFill } from 'react-icons/bs'
import { SiYoutubemusic } from 'react-icons/si'
import Link from 'next/link'
import YouTube, { YouTubePlayer } from 'react-youtube'
import { CgClose } from 'react-icons/cg'
import { MdPlaylistPlay } from 'react-icons/md'
const tokenkey = process.env.YOUTUBE_TOKEN
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
    const [playervolume, setplayervolume] = useState(true)
    function scrollToTop() {
        window.scrollTo({
            top: 10,
            behavior: 'smooth',
        })
    }
    useEffect(() => {
        setplayerload(true)
    }, [playeritems && playeritems])

    useEffect(() => {
        setLoading(true)
        fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLyOL_RMmwqydRtzTaTuzHc7GCXlAR2aO8&key=${'AIzaSyC4mJJQYLGdN6Anr4eQkgNUgN_WVyvGHEk'}&maxResults=1000`,
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
        // document.getElementById('player').style.scrollMarginTop = `30px`
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
    function ControlIcon() {
        if (videostatus === 2) {
            return (
                <p onClick={() => videoElement.target.playVideo()}>
                    <BsPlayFill />
                </p>
            )
        } else if (videostatus === 1) {
            return (
                <p onClick={() => videoElement.target.pauseVideo()}>
                    <BsPauseFill />
                </p>
            )
        } else {
            return (
                <div className="spinner-container">
                    <div className="loading-spinner !h-[37px] w-[37px]"></div>
                </div>
            )
        }
    }

    return (
        <Body title="Music">
            <div>
                <h1 className="font-extrabold text-6xl tracking-tight">Music</h1>
                <p className="text-lg mt-1">List of my favorite songs.</p>
            </div>
            {/* // todo: play and viewlist btn start here  */}
            <div className="playbuttton:flex block ">
                <button
                    aria-label="Play all songs"
                    onClick={() => musicplayersetup(playList[Math.floor(Math.random() * playListo)])}
                    className="flex items-center rounded-xl bg-[#ce9dff] p-3 mt-2 text-xl text-left font-bold duration-100 hover:bg-[#c081ff] dark:bg-[#9900ff] dark:hover:bg-[#9900ffb2]"
                >
                    <p className="text-2xl">
                        <BsPlayFill />
                    </p>
                    &thinsp;Play random song
                </button>
                <button>
                    <Link
                        aria-label="View playlist on youtubemusic"
                        href="https://music.youtube.com/playlist?list=PLyOL_RMmwqydRtzTaTuzHc7GCXlAR2aO8"
                        className="playbuttton:ml-3 flex items-center rounded-xl bg-zinc-200 text-left px-3 py-[5px] mt-2 font-bold duration-100 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
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
                className={`music:block block bg-purple-50 dark:bg-neutral-800 shadow-xl rounded-lg mt-5 w-full music:h-[220px] h-auto overflow-hidden duration-100 transition-all items-center relative  ${
                    !playeritems ? '!hidden ' : 'block'
                } px-[10px] py-[10px]`}
                id="player"
            >
                <div className="flex music:h-0">
                    <div className="flex-1"></div>
                    <div className="music:block items-center g-red-500 rounded-full h-5 w-5 mr-2">
                        <button
                            aiia-label="close musicplayer"
                            onClick={() => setPlayerItems(null)}
                            className="music:flex music:overflow-visible bg-slate-300 hover:bg-slate-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 duration-100 rounded-full p-1 text-xl ml-auto"
                        >
                            <CgClose />
                        </button>
                    </div>
                </div>
                <div className="music:flex block items-center">
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
                    {/* // todo: musicplayer start here */}
                    <div className="block">
                        {playeritems && (
                            <div className="music:text-left text-center shrink-0 block items-center py-auto music:ml-[50px] mt-2 music:mt-0">
                                <div className="flex">
                                    <div className="items-center max-w-[525px] music:mx-0 mx-auto flex">
                                        <div className="block">
                                            <h1 className="font-bold text-2xl notranslate">
                                                {playeritems.snippet.title.split(/[[:(]/)[0]}
                                            </h1>
                                            <Link
                                                target={'_blank'}
                                                href={
                                                    'https://music.youtube.com/channel/' +
                                                    playeritems.snippet.videoOwnerChannelId
                                                }
                                                className="hover:opacity-70 duration-75"
                                            >
                                                <p>
                                                    {playeritems.snippet.videoOwnerChannelTitle.replace(
                                                        / - Topic/g,
                                                        ' '
                                                    )}
                                                </p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
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
                                        ) : (
                                            ControlIcon()
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
                                    <div className="block items-center music:mx-0 mx-4 music:mt-0 mt-2">
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
                                            className="musicplayerrange xss:w-[300px] music:w-[550px] w-[290px] ml-0 music:ml-[-5px]"
                                        />
                                        <p className="text-[0.5px] !flex music:!hidden">
                                            <br />
                                        </p>
                                        {/* TODO moble controler*/}
                                      <div className="mt-[-5px]">
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
                                      </div >
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
                            target={'_blank'}
                            href={
                                'https://music.youtube.com/watch?v=' +
                                playeritems.snippet.resourceId.videoId +
                                '&list=' +
                                playeritems.snippet.playlistId
                            }
                            className={`flex bg-neutral-200 drop-shadow-md hover:drop-shadow-lg mt-4 dark:hover:bg-neutral-700 hover:bg-neutral-300 duration-100  text-zinc-700 dark:text-zinc-300 text-lg dark:bg-neutral-800 rounded-lg py-2 px-3 font-bold items-center w-full ${
                                !playeritems ? '!hidden ' : 'block'
                            }`}
                        >
                            <p className="text-xl ">
                                <SiYoutubemusic />
                            </p>
                            &nbsp;
                            <p>Playing on youtube music</p>
                        </Link>
                    </div>
                )}
                {playeritems && (
                    <p className=" text-zinc-300 dark:text-zinc-700 mt-[1px] text-xs items-center notranslate w-full text-right">
                        Power by&nbsp;
                        <Link
                            href={'https://developers.google.com/youtube/iframe_api_reference'}
                            className="hover:dark:text-white hover:text-black duration-75"
                            target="_blank"
                            area-aria-label=""
                        >
                            <span className="text-xs mt-1 ">YoutubeIframePlayer</span>
                        </Link>
                    </p>
                )}
            </div>{' '}
            {/* // todo: list start here */}
            <ol className="mt-7">
                {loading || !playList
                    ? LoadDisplay
                    : playList.map((items) => (
                          <li>
                              <button
                                  onClick={() => {
                                      musicplayersetup(items)
                                  }}
                                  key={items.id}
                                  className="cursor-pointer group shadow-md shodow-black-/10 dark:shadow-zinc-200/10 hover:shadow-lg w-full dark:hover:shadow-zinc-200/10 hover:shadow-black/10 transform transition-all duration-100  bg-zinc-100 dark:bg-zinc-800 py-2 pr-2 rounded-lg mt-4 items-center flex"
                              >
                                  <div className="flex w-[25px] items-center px-5 py-1 mr-1 ml-2 notranslate h-[40px]">
                                      {playeritems &&
                                          (playeritems.id === items.id ? (
                                              <p
                                                  key={items.id}
                                                  className="text-2xl mr-[5px] ml-[-14px] group-hover:block"
                                              >
                                                  <div className="now playing flex mt-7 ml-1" id="music">
                                                      <span className="bar n1 bg-black dark:bg-white">A</span>
                                                      <span className="bar n2 bg-black dark:bg-white">B</span>
                                                      <span className="bar n3 bg-black dark:bg-white">c</span>
                                                  </div>
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
                          </li>
                      ))}
            </ol>
        </Body>
    )
}
export default index
