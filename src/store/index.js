import { create } from 'zustand'
import songs from '@data/songs.json'

const usePlayerStore = create((set) => ({
  isPlaying: false,
  song: null,
  selectSong: (id) => set((state) => (state.song = songs.find((song) => song.id === id))),
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying }))
}))

export { usePlayerStore }
