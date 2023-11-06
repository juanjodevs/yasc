import songs from '@data/songs.json'
import { usePlayerStore } from 'src/store'

const Songselector = () => {
  const selectSong = usePlayerStore(state => state.selectSong)
  const handleClick = (id) => {
    selectSong(id)
  }
  return (
    <div className='flex flex-row gap-5 m-5 justify-center cursor-pointer'>
      {
        songs.map((song) => (
          <div className='flex flex-col text-center' key={song.id} onClick={() => handleClick(song.id)}>
            <div className='flex justify-center'><img src={song.cover}/></div>
            <div>{song.title}</div>
            <div className='font-light italic text-sm'>{song.artist}</div>
          </div>
        ))
      }
    </div>
  )
}

export default Songselector
