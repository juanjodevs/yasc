import { useEffect, useRef, useState } from 'react'
import { usePlayerStore } from '../store'

const Player = () => {
  const audioRef = useRef()
  const [
    song,
    isPlaying,
    togglePlaying
  ] = usePlayerStore((state) => [
    state.song,
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
    <div className="flex flex-col max-w-[300px] m-auto pt-10 gap-2">
      <audio autoPlay ref={audioRef}>
        <source src={song ? `/music/${song.file}` : null}/>
      </audio>
      {song && <button className={`${isPlaying ? 'bg-red-700' : 'bg-teal-700'} px-5 py-2 rounded text-white cursor-pointer`} onClick={() => togglePlaying()}>{isPlaying ? 'Pause' : 'Play'}</button>}
      <div className="flex flex-row gap-2">
        {duration !== 0 && (
          <>
            <span className="text-xs">{formatTime(currentTime)}/{formatTime(duration)}</span>
            <input className="w-full" type="range" min="0" max={duration} onChange={(e) => handleBar(e.target.value)} value={currentTime} />
          </>
        )}
      </div>
    </div>
  )
}

export default Player
