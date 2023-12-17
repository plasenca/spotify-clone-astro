import { useState, useRef, useEffect } from "react";

import { usePlayerStore } from "@/providers/zustand/userPlayerStore";
import { Slider } from "./Slider";

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

const VolumenDisabledIcon = () => (
  <svg data-encore-id="icon" role="presentation" aria-label="Volume off" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z">
    </path>
    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z">
    </path>
  </svg>
);

const VolumenMaxIcon = () =>(
  <svg data-encore-id="icon" role="presentation" aria-label="Volume high" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z">
    </path>
    <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z">
    </path>
  </svg>
);

const VolumenControl = () => {

  const volumen = usePlayerStore(state => state.volumen);
  const setVolumen = usePlayerStore(state => state.setVolumen);

  const prevVolume = useRef(volumen);

  const isVolumeSilence = volumen === 0;
  
  const handleClickVolume = () => {

    if(isVolumeSilence) {
      handleClickSilence();
      return;
    };

    prevVolume.current = volumen;
    setVolumen(0);
  }

  const handleClickSilence = () => {
    setVolumen(prevVolume.current);
  }

  return (<div className="flex justify-center items-center gap-x-2">

    <button className="opacity-70 hover:opacity-100 transition" onClick={handleClickVolume}>
      {isVolumeSilence ? <VolumenDisabledIcon/> : <VolumenMaxIcon />}
    </button>
    <Slider
      defaultValue={[100]}
      max={100}
      min={0}
      className="w-[95px]"
      value={[volumen * 100]}
      onValueChange={(value) => {
        const [newVolumen] = value;

        const volumenValue = newVolumen / 100;
        setVolumen(volumenValue);
      }}
    />
  </div>);

};

const CurrentSong = ({image, title, artists}: {[key: string]: string}) => {

  const artistString = new Intl.ListFormat("es", {
    style: "long",
    type: "conjunction",
  }).format(artists);

  return (
    <div className={`flex items-center gap-5 relative overflow-hidden`}>
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={image} alt={title} />
      </picture>
      <div className="flex flex-col">
        <h3 className="font-semibold text-sm block">
          {title}
        </h3>
        <span className="text-xs text-gray-400">
          {artistString}
        </span>
      </div>
    </div>
  );
};

const SongControl = ({audio}:{[key: string]: HTMLAudioElement|null}) => {
  const [currentTime, setCurrentTime] = useState(0);

  const formatter = (time?: number|null) => {
    if(!time) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    const secondsString = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${secondsString}`;
  }

  const handleTimeUpdate = () =>{
    if(!audio) return;

    setCurrentTime(audio.currentTime);
  }

  useEffect(() => {
    if(!audio) return;


    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    }
  });

  const totalDuration = audio?.duration ?? 0;

  return (
    <div className="flex flex-row justify-between gap-x-4 text-xs">
      <span className="opacity-50 w-12 text-right">{formatter(currentTime)}</span>
      <Slider
      value={[currentTime]}
      max={audio?.duration ?? 0}
      min={0}
      className="w-[400px]"
      onValueChange={(value) => {
        if(!audio) return;

        audio.currentTime = value[0];
      }}
    />
    <span className="opacity-50 w-12">
      {totalDuration ? formatter(totalDuration) : "0:00"}
    </span>
    </div>
  )
}


export function Player() {
  const { isPlaying, setIsPlaying, currentMusic, volumen } = usePlayerStore(state => state);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if(!audioRef) return;

    audioRef.current!.volume = volumen;
  }, [volumen]);

  useEffect(() =>{

    isPlaying ? audioRef.current!.play() : audioRef.current!.pause();

  },[isPlaying]);

  useEffect(()=>{
    const { song, playlist } = currentMusic;

    if(song){
      audioRef.current!.pause();

      const src = `/music/${playlist.id}/0${song.id}.mp3`;
      audioRef.current!.src = src;
      audioRef.current!.play();
    }

  },[currentMusic]);
  

  const handlePlay = () => {
    try {
      if(!audioRef) return;

      const audioElement = audioRef.current!;

      if (isPlaying) {
        audioElement.pause();
        return;
      }

      audioElement.play();
    } finally {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div >
        <CurrentSong {...currentMusic.song} />
      </div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center pt-2">
          <button className="bg-white rounded-full p-2" onClick={handlePlay}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
        <SongControl audio={audioRef.current}/>
      </div>
      <VolumenControl/>
      <audio ref={audioRef}></audio>
    </div>
  );
}
