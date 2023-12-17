import { usePlayerStore } from "@/providers/zustand/userPlayerStore";
import { PauseIcon, PlayIcon } from "./Player";

interface CardPlayButtonProps {
  id: string;
}

export default function CardPlayButton(props: CardPlayButtonProps) {
  const { id } = props;

  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = usePlayerStore(state => state);

  const isPlayingSong = isPlaying && currentMusic?.playlist.id === id;

  const handlePlay = () => {
    if(isPlayingSong) {
      setIsPlaying(false);
      return;
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { song, playlist } = data;

        setIsPlaying(true);

        setCurrentMusic({
          playlist,
          song,
        });
      });
      

  };


  return (
    <button onClick={handlePlay} className="card-play-button rounded-full bg-green-600 p-2.5 hover:scale-105 hover:bg-green-500">
      {isPlayingSong ? <PauseIcon/> : <PlayIcon/> } 
    </button>
  );
}