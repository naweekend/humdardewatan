import { useRef, useState, useEffect } from "react";

export default function VideoPlayer({ src, stopBeforeEnd = 0 }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Pause video X seconds before it ends
  useEffect(() => {
    const video = videoRef.current;
    if (!video || stopBeforeEnd <= 0) return;

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - stopBeforeEnd) {
        video.pause();
        setIsPlaying(false);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [stopBeforeEnd]);

  // Show play button when video ends
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

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
    <div className="relative w-full overflow-hidden rounded-md">
      <video
        muted
        ref={videoRef}
        src={src}
        className="w-full h-auto rounded-md"
        controls={false}
      />

      {/* Play/Pause button */}
      <button
        onClick={handleTogglePlay}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-green-800/60 text-white hover:bg-emerald-800/80 transition">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </span>
      </button>
    </div>
  );
}

/* ▶️ Play Icon */
function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="white"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-play-icon"
    >
      <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
    </svg>
  );
}

/* ⏸️ Pause Icon */
function PauseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="white"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-pause-icon"
    >
      <rect x="14" y="3" width="5" height="18" rx="1" />
      <rect x="5" y="3" width="5" height="18" rx="1" />
    </svg>
  );
}
