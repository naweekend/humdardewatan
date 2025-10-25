import { useRef, useState } from "react";

export default function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-md group">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto rounded-md"
        controls={false}
      />

      {/* Circular Play/Pause button */}
      <button
        onClick={handleTogglePlay}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span
          className={`flex items-center justify-center w-16 h-16 rounded-full bg-green-800/60 text-white transition hover:bg-emerald-800/80 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </span>
      </button>
    </div>
  );
}

/* ▶️ Play Icon */
function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></svg>
  );
}

/* ⏸️ Pause Icon */
function PauseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause-icon lucide-pause"><rect x="14" y="3" width="5" height="18" rx="1" /><rect x="5" y="3" width="5" height="18" rx="1" /></svg>
  );
}
