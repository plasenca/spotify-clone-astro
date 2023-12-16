import { create } from "zustand";

interface CurrentMusic {
  playlist: any;
  song: any;
  songs: any[];
}

interface PlayerStore {
  isPlaying: boolean;
  currentMusic: CurrentMusic;
  setIsPlaying: Function;
  setCurrentMusic: Function;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  currentMusic: { playlist: null, song: null, songs: [] },
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setCurrentMusic: (currentMusic: CurrentMusic) => set({ currentMusic }),
}));
