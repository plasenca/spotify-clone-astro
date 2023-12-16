import { usePlayerStore } from "@/providers/zustand/userPlayerStore";
import { PauseIcon, PlayIcon } from "./Player";

interface CardPlayButtonProps {
  id: string;
}

export default function CardPlayButton(props: CardPlayButtonProps) {
  const { id } = props;

  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = usePlayerStore(state => state);

  const handlePlay = () => {
    setCurrentMusic({ playlist: { id } });

    setIsPlaying(!isPlaying);
  };

  const isPlayingSong = isPlaying && currentMusic?.playlist.id === id;

  return (
    <button onClick={handlePlay} className="card-play-button rounded-full bg-green-600 p-2.5">
      {isPlayingSong ? <PauseIcon/> : <PlayIcon/> } 
    </button>
  );
}