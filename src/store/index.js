import { create } from 'zustand'
import albums from '@lib/data.json'

const usePlayerStore = create((set) => ({
  isPlaying: false,
  song: null,
  album: null,
  selectSong: (id) => {
    const album = albums.find((album) => album.id === id)
    const song = album.songs[0]
    set({ song, album })
  },
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying }))
}))

export { usePlayerStore }
