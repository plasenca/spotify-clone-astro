import { useState, useRef, useEffect } from "react";

import { usePlayerStore } from "@/providers/zustand/userPlayerStore";

export const PlayIcon = () => (
  <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" style={{ fill: "black" }}>
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z">
    </path>
  </svg>
);

export const PauseIcon = () => (
  <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" fill="black" style={{ fill: "black" }}>
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z">
    </path>
  </svg>
);


export function Player() {
  const { isPlaying, setIsPlaying } = usePlayerStore(state => state);
  const [currentSong, setCurrentSong] = useState(null);

  const audioRef = useRef(null);

  useEffect(( )=> {

    if(!audioRef) return;
    
    (audioRef.current! as HTMLAudioElement).src = '/music/1/01.mp3';
  }, []);

  const handlePlay = () => {
    try {
      if(!audioRef) return;

      const audioElement = audioRef.current! as HTMLAudioElement;

      if (isPlaying) {
        audioElement.pause();
        return;
      }

      audioElement.play();
      audioElement.volume = 0.1;
    } finally {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div >Current Zone</div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2" onClick={handlePlay}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
      <div >Volumen</div>
      <audio ref={audioRef}></audio>
    </div>
  );
}
