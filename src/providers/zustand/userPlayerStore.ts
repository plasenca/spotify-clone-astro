import { create } from "zustand";

interface CurrentMusic {
  playlist: any;
  song: any;
  songs: any[];
}

interface PlayerStore {
  isPlaying: boolean;
  currentMusic: CurrentMusic;
  volumen: number;
  setVolumen: Function;
  setIsPlaying: Function;
  setCurrentMusic: Function;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  currentMusic: { playlist: null, song: null, songs: [] },
  volumen: 1,
  setVolumen: (volumen: number) => set({ volumen }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setCurrentMusic: (currentMusic: CurrentMusic) => set({ currentMusic }),
}));
