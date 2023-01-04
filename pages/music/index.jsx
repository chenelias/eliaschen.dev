import React, { useEffect } from 'react'
import Body from '/components/Body.tsx'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Image from 'next/image'
import { BsPlayFill } from 'react-icons/bs'
import { SiYoutubemusic } from 'react-icons/si'
import Link from 'next/link'
const index = () => {
    const [loading, setLoading] = React.useState(true)
    const [playList, setPlaylist] = React.useState(null)
    const [playListo, setPlaylisto] = React.useState(null)
    useEffect(() => {
        setLoading(true)
        fetch(
            'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLyOL_RMmwqydRtzTaTuzHc7GCXlAR2aO8&key=AIzaSyC4mJJQYLGdN6Anr4eQkgNUgN_WVyvGHEk&maxResults=1000',
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
                count="5"
                borderRadius="10px"
                height="80px"
                baseColor="#202020"
                highlightColor="#666"
            />
        </div>
    )
    const sizeimg="90px"
    return (
        <Body title="Music">
            <div>
                <h1 className="font-extrabold text-6xl tracking-tight">Music</h1>
                <p className="text-lg mt-1">YoutubeMusic playlist of my favorite songs.</p>
            </div>
            <button aria-label="Play all songs">
                <Link
                    href="https://music.youtube.com/playlist?list=PLyOL_RMmwqydRtzTaTuzHc7GCXlAR2aO8"
                    className="flex items-center rounded-xl bg-[#ce9dff] p-3 mt-2 text-xl font-bold duration-100 hover:bg-[#c081ff] dark:bg-[#9900ff] dark:hover:bg-[#9900ffb2]"
                    target={'_blank'}
                >
                    <BsPlayFill />
                    &thinsp;Play all&nbsp;{playListo}&nbsp;songs
                </Link>
            </button>
            <div className="mt-6">
                {loading || !playList
                    ? LoadDisplay
                    : playList.map((items) => (
                          <Link
                              key={items.id}
                              target={'_blank'}
                              href={
                                  'https://music.youtube.com/watch?v=' +
                                  items.snippet.resourceId.videoId +
                                  '&list=' +
                                  items.snippet.playlistId
                              }
                          >
                              <div className="shadow-md shodow-black-/10 dark:shadow-zinc-200/10 hover:shadow-lg dark:hover:shadow-zinc-200/10 hover:shadow-black/10 transform transition-all duration-100  bg-zinc-100 dark:bg-zinc-800 py-2 pr-2 rounded-lg my-5 items-center flex">
                                  <p className="text-xl mx-5">{items.snippet.position + 1}</p>
                                  <div className="block">
                                      <h1 className="font-bold text-xl">{items.snippet.title}</h1>
                                      <p className="text-xs ">
                                          {items.snippet.videoOwnerChannelTitle.replace(/ - Topic/g, null)}
                                      </p>
                                  </div>
                                  <div className="flex-1"></div>
                                  <div
                                      className={`overflow-hidden rounded-lg block !h-[100px] !w-[100px] shrink-0 ml-1`}
                                  >
                                      <img
                                          className="musicalbumimg !w-auto !h-[100px]"
                                          src={items.snippet.thumbnails.medium.url}
                                          alt=""
                                      />
                                  </div>
                              </div>
                          </Link>
                      ))}
            </div>
        </Body>
    )
}
export default index
