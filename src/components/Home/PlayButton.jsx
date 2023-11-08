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

const PlayButton = ({ album }) => {
  const [selectSong, isPlaying, currentAlbum, togglePlaying] = usePlayerStore(state => [state.selectSong, state.isPlaying, state.album, state.togglePlaying])

  const handleClick = (e) => {
    e.preventDefault()
    if (album?.id === currentAlbum?.id) {
      togglePlaying()
    } else {
      selectSong(album.id)
    }
  }

  return (
    <div className="flex h-10 w-10 bg-sky-700 justify-center align-middle rounded-full p-3 z-10 cursor-pointer" onClick={(e) => handleClick(e)}>
      {
        isPlaying && album.id === currentAlbum.id
          ? <PauseIcon className="self-center"/>
          : <PlayIcon className="self-center"/>
      }
    </div>
  )
}

export default PlayButton
