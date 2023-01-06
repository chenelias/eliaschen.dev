import React from 'react'
import { BsPlayFill, BsPauseFill, BsSkipEndFill, BsFillSkipStartFill } from 'react-icons/bs'
import { SiYoutubemusic } from 'react-icons/si'
import YouTube, { YouTubePlayer } from 'react-youtube'
let videoElement: YouTubePlayer = null

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

const Musicplayer = ({ playList, playeritems, playListo, setPlayerItems, playerload }) => {
    return (
        <div className="music:ml-[-10px] mt-2 items-center">
            <button
                onClick={() => {
                    scrollToTop()
                    setPlayerItems(
                        playList[playeritems.snippet.position === 0 ? playListo - 1 : playeritems.snippet.position - 1]
                    )
                }}
                className="text-4xl p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg"
            >
                <BsFillSkipStartFill />
            </button>
            <button className="text-4xl p-1 items-center hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg music:mx-[30px] mx-[45px]">
                {playerload ? (
                    <div className="spinner-container">
                        <div className="loading-spinner !h-[37px] w-[37px]"></div>
                    </div>
                ) : (
                    <BsPauseFill />
                )}
            </button>
            <button
                onClick={() => {
                    scrollToTop()
                    setPlayerItems(
                        playList[playeritems.snippet.position === playListo - 1 ? 0 : playeritems.snippet.position + 1]
                    )
                }}
                className="text-4xl p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg"
            >
                <BsSkipEndFill />
            </button>
        </div>
    )
}

export default Musicplayer
