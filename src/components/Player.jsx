import { useEffect, useRef, useState } from 'react'
import { usePlayerStore } from '@store/index'

export const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="self-center" width="36" height="36" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" strokeWidth="0" fill="currentColor"></path>
  </svg>
)

export const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="self-center" width="36" height="36" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" strokeWidth="0" fill="currentColor"></path>
    <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" strokeWidth="0" fill="currentColor"></path>
  </svg>
)

const Player = () => {
  const audioRef = useRef()
  const [
    song,
    album,
    isPlaying,
    togglePlaying
  ] = usePlayerStore((state) => [
    state.song,
    state.album,
    state.isPlaying,
    state.togglePlaying
  ])
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (song) {
      if (!isPlaying) {
        togglePlaying()
      }
      audioRef.current.load()
    }
  }, [song])

  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', () => {
      setCurrentTime(audioRef.current.currentTime)
    })
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(audioRef.current.duration)
    })
  }, [audioRef])

  const handleBar = (time) => {
    audioRef.current.currentTime = time
  }

  const formatTime = (time) => {
    if (time === null) return '00:00'
    const minutes = parseInt(time / 60)
    const seconds = parseInt(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      <audio autoPlay ref={audioRef}>
        <source src={song ? `/music/${album.id}/${song}` : null}/>
      </audio>
      {
        song && album && (
          <div className="grid grid-cols-3 justify-between w-full">
            <div className="w-[300px] self-center mx-2 p-2">
              <a href={`/album/${album.id}`} className="grid grid-cols-[50px_1fr] gap-5">
                <picture className="h-12 w-12 self-center">
                  <img
                    className="object-cover h-full w-full rounded"
                    src={album.cover}
                    alt={`${album.title} cover`}
                    width="48"
                    height="48" />
                </picture>
                <div className="flex flex-col">
                  <span className="text-white">{album.title}</span>
                  <span className="text-xs font-thin">{album.artists.join(', ')}</span>
                </div>
              </a>
            </div>
            <div className='flex flex-col justify-center'>
              <div className="self-center flex h-10 w-10 bg-sky-700 justify-center rounded-full p-3 z-10 cursor-pointer my-2" onClick={togglePlaying}>
                {
                  isPlaying
                    ? <PauseIcon className="self-center"/>
                    : <PlayIcon className="self-center"/>
                }
              </div>
              <div className="flex flex-row gap-2 min-w-[500px] text-neutral-400 justify-center">
                <span className="text-xs">{formatTime(currentTime)}</span>
                <input
                  className="w-[400px] cursor-pointer opacity-60 hover:opacity-100 appearance-none h-1 self-center bg-neutral-600 hover:bg-neutral-400"
                  type="range"
                  min="0"
                  max={duration}
                  onChange={(e) => handleBar(e.target.value)} value={currentTime}
                />
                <span className="text-xs">{formatTime(duration)}</span>
              </div>
            </div>
            <div className='flex justify-end'>

            </div>
          </div>
        )
      }
    </>

  )
}

export default Player
